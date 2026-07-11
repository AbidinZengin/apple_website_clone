const STORAGE_KEY = 'apple-clone.jwt';

/**
 * JWT'nin tek saklama noktası. Stateless auth'ta oturumun kendisi bu token'dır;
 * localStorage sayesinde sayfa yenilense de oturum sürer.
 * (try/catch: localStorage bazı gizli pencere modlarında erişim hatası fırlatabilir.)
 */
export function getToken() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // saklanamazsa oturum yalnızca sayfa ömrü boyunca bellekte yaşar
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sessizce geç — token zaten okunamıyordur
  }
}
