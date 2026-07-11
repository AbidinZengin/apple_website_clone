import { request, ApiError } from '../api/httpClient';
import { getToken, setToken, clearToken } from './tokenStorage';

// Backend karşılıkları: Security/Controller/AuthController.java + RegisterController.java
const REGISTER = '/api/register';
const LOGIN = '/api/login';
const LOGOUT = '/api/logout';
const PROFILE = '/api/profile';

/**
 * Response DTO → UI modeli eşlemesi (bkz. validation-schema.md).
 * Backend alan adları değişirse tek dokunulacak yer burasıdır.
 * Beklenen şekle uymayan gövdede null döner — çağıran anlamlı hata üretir.
 */
function toAuthUser(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const username = raw.username ?? raw.userName;
  if (typeof username !== 'string' || username.length === 0) return null;
  const role = raw.role ?? (Array.isArray(raw.roles) ? raw.roles[0] : undefined);
  return { username, role: typeof role === 'string' ? role : 'USER' };
}

function extractToken(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return raw.token ?? raw.accessToken ?? raw.jwt ?? null;
}

/**
 * Yeni kullanıcı kaydı. Başarıda 201 döner.
 * Hatalar: 409 (kullanıcı zaten var), 400 (validasyon — şifre min 6 karakter).
 */
export function register({ userName, password }) {
  return request(REGISTER, { method: 'POST', body: { userName, password } });
}

/**
 * Stateless JWT login. Yanıttaki token saklanır, sonraki istekler
 * Authorization: Bearer ile authenticated gider. Hata: 401.
 * Yanıt gövdesinde kullanıcı bilgisi yoksa profile'dan tamamlanır.
 */
export async function login({ userName, password }) {
  const data = await request(LOGIN, { method: 'POST', body: { userName, password } });

  const token = extractToken(data);
  if (!token) {
    throw new ApiError(
      500,
      'Login yanıtında JWT bulunamadı — token/accessToken/jwt alanlarından biri bekleniyor.',
      data
    );
  }
  setToken(token);

  return toAuthUser(data) ?? getProfile();
}

/**
 * Stateless JWT'de gerçek çıkış = client'taki token'ın silinmesi
 * (sunucu token'ı iptal etmez, ömrü dolana kadar teknik olarak geçerlidir).
 * POST /api/logout yalnızca nezaketen, best-effort çağrılır — başarısız
 * olsa da oturum client'ta biter.
 */
export async function logout() {
  const token = getToken();
  clearToken();
  if (!token) return;
  try {
    await request(LOGOUT, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
  } catch {
    // sunucuya ulaşılamasa da çıkış tamamlanmış sayılır
  }
}

/**
 * Login olmuş kullanıcının { username, role } bilgisi. Anonim istekte 401 fırlatır.
 */
export async function getProfile() {
  const data = await request(PROFILE);
  const user = toAuthUser(data);
  if (!user) {
    throw new ApiError(500, 'Profil yanıtı beklenen formatta değil — {username, role} bekleniyor.', data);
  }
  return user;
}

/**
 * Sayfa açılışı için rahat sürüm: token yoksa istek bile atmadan null,
 * token geçersizse (401/403) token temizlenip null döner.
 */
export async function getCurrentUser() {
  if (!getToken()) return null;
  try {
    return await getProfile();
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      clearToken();
      return null;
    }
    throw error;
  }
}
