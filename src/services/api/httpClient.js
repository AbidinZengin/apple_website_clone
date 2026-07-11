import { getToken } from '../auth/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Backend'in GlobalExceptionHandler'ının döndürdüğü standart
// ErrorResponse gövdesini ({status, error, message, path}) taşır.
export class ApiError extends Error {
  constructor(status, message, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

// Token süresi dolduğunda (1 saat) herhangi bir korumalı istek 401 döner.
// AuthContext buraya bir handler kaydeder; böylece oturum düşüşü tek yerden
// yakalanıp UI state'i (user=null) güncellenir.
let onUnauthorized = null;
export function setOnUnauthorized(handler) {
  onUnauthorized = handler;
}

async function parseError(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    // gövde JSON değilse status yeterli
  }
  return new ApiError(res.status, body?.message ?? `İstek başarısız: ${res.status}`, body);
}

/**
 * fetch sarmalayıcısı (stateless JWT):
 * token varsa her isteğe Authorization: Bearer header'ı eklenir,
 * hata gövdeleri ApiError'a çevrilir. Cookie/CSRF akışı yoktur.
 */
export async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const finalHeaders = { ...headers };

  const token = getToken();
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  if (body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await parseError(res);
    // token VARKEN gelen 401 = süresi dolmuş/geçersiz oturum
    // (login'in kendi 401'i token'sız geldiği için buraya düşmez)
    if (error.status === 401 && token) onUnauthorized?.(error);
    throw error;
  }

  const contentType = res.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? res.json() : res.text();
}
