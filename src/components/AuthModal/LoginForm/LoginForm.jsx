import { useState } from 'react';
import { useAuth } from '../../../services/auth/AuthContext';
import { ApiError } from '../../../services/api/httpClient';
import AuthForm from '../AuthForm/AuthForm';
import AuthField from '../AuthField/AuthField';

// Backend sözleşmesi: 401 "Bad credentials" (enumeration önlemi — hangi alanın
// yanlış olduğu bilinçli söylenmez), 429 rate limit (IP başına dakikada 10 deneme)
function toErrorMessage(error) {
  if (error instanceof ApiError) {
    if (error.status === 401) return 'E-posta veya şifre hatalı.';
    if (error.status === 429) return 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.';
    if (error.status === 400) return 'E-posta ve şifre alanları boş olamaz.';
    return error.message;
  }
  return 'Sunucuya ulaşılamadı. Daha sonra tekrar deneyin.';
}

export default function LoginForm({ onSwitchView, onSuccess }) {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setError(null);
    setSubmitting(true);
    try {
      await login({ userName: email, password });
      onSuccess?.();
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Apple ID ile Giriş Yap"
      subtitle="Apple Store'a erişmek için giriş yapın"
      submitLabel="Giriş Yap"
      footerPrompt="Hesabın yok mu?"
      footerActionLabel="Kayıt Ol"
      onSwitchView={onSwitchView}
      onSubmit={handleSubmit}
      error={error}
      submitting={submitting}
    >
      <AuthField type="email" name="email" placeholder="E-posta" autoComplete="email" />
      <AuthField type="password" name="password" placeholder="Şifre" autoComplete="current-password" />
    </AuthForm>
  );
}
