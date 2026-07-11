import { useState } from 'react';
import { useAuth } from '../../../services/auth/AuthContext';
import { ApiError } from '../../../services/api/httpClient';
import AuthForm from '../AuthForm/AuthForm';
import AuthField from '../AuthField/AuthField';

// Backend sözleşmesi: kayıtlı kullanıcı adı da validasyon hatası da 400 döner;
// duplicate durumda bilinçli olarak genel mesaj verilir (enumeration önlemi),
// bu yüzden frontend de "bu e-posta dolu" diyemez. 429 = rate limit.
function toErrorMessage(error) {
  if (error instanceof ApiError) {
    if (error.status === 400) return 'Kayıt tamamlanamadı. Bilgileri kontrol edip farklı bir e-posta deneyin.';
    if (error.status === 429) return 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.';
    return error.message;
  }
  return 'Sunucuya ulaşılamadı. Daha sonra tekrar deneyin.';
}

export default function RegisterForm({ onSwitchView, onSuccess }) {
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Backend limitlerine (userName 3-50, password 6-100) takılmadan önce
  // anlaşılır Türkçe mesajlarla client'ta ön kontrol
  const handleSubmit = async ({ email, password, passwordConfirm }) => {
    if (email.length < 3 || email.length > 50) {
      setError('E-posta 3-50 karakter arasında olmalı.');
      return;
    }
    if (password.length < 6 || password.length > 100) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await register({ userName: email, password });
      onSuccess?.();
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Apple Hesabı Oluştur"
      subtitle="Apple Store'da alışveriş için hesabını oluştur"
      submitLabel="Kayıt Ol"
      footerPrompt="Zaten hesabın var mı?"
      footerActionLabel="Giriş Yap"
      onSwitchView={onSwitchView}
      onSubmit={handleSubmit}
      error={error}
      submitting={submitting}
    >
      <AuthField type="email" name="email" placeholder="E-posta" autoComplete="email" />
      <AuthField type="password" name="password" placeholder="Şifre" autoComplete="new-password" />
      <AuthField
        type="password"
        name="passwordConfirm"
        placeholder="Şifre (Tekrar)"
        autoComplete="new-password"
      />
    </AuthForm>
  );
}
