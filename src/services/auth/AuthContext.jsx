import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from './auth.service';
import { setOnUnauthorized } from '../api/httpClient';
import { clearToken } from './tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Token süresi (1 saat) dolduktan sonraki ilk korumalı istek 401 döner —
  // merkezi handler oturumu düşürür, hesap ikonu tekrar login modal'ına döner
  useEffect(() => {
    setOnUnauthorized(() => {
      clearToken();
      setUser(null);
    });
    return () => setOnUnauthorized(null);
  }, []);

  // Açılışta saklı JWT ile oturumu geri yükle (token yoksa istek atılmaz)
  useEffect(() => {
    let cancelled = false;
    authService
      .getCurrentUser()
      .then((current) => {
        if (!cancelled) setUser(current);
      })
      .catch((error) => {
        // Backend kapalıyken uygulama anonim modda çalışmaya devam eder
        console.warn('Oturum kontrolü başarısız:', error);
      })
      .finally(() => {
        if (!cancelled) setInitializing(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const loggedIn = await authService.login(credentials);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  // Kayıt sonrası aynı bilgilerle otomatik giriş — kullanıcı formu iki kez doldurmaz
  const register = useCallback(async (credentials) => {
    await authService.register(credentials);
    const loggedIn = await authService.login(credentials);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
