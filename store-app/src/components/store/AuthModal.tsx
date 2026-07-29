'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { register, login, ContactType } from '@/lib/auth';
import { ClayClose, ClayShield } from '@/components/icons/clay';

export default function AuthModal() {
  const { authOpen, setAuthOpen, authMode, setAuthMode, setUser } = useStore();
  const [contactType, setContactType] = useState<ContactType>('phone');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function reset() {
    setContact('');
    setPassword('');
    setName('');
    setError('');
  }

  function switchMode(m: 'login' | 'register') {
    setAuthMode(m);
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (authMode === 'register') {
        const result = register(contactType, contact, password, name);
        if (!result.ok) { setError(result.error || 'خطأ'); setLoading(false); return; }
        const loginResult = login(contactType, contact, password);
        if (loginResult.ok && loginResult.user) {
          setUser({
            id: loginResult.user.id,
            phone: loginResult.user.phone,
            email: loginResult.user.email,
            contactType: loginResult.user.contactType,
            name: loginResult.user.name,
          });
        }
        setAuthOpen(false);
        reset();
      } else {
        const result = login(contactType, contact, password);
        if (!result.ok) { setError(result.error || 'خطأ'); setLoading(false); return; }
        if (result.user) {
          setUser({
            id: result.user.id,
            phone: result.user.phone,
            email: result.user.email,
            contactType: result.user.contactType,
            name: result.user.name,
          });
        }
        setAuthOpen(false);
        reset();
      }
      setLoading(false);
    }, 400);
  }

  if (!authOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={() => { setAuthOpen(false); reset(); }} />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl overflow-hidden" style={{
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-color)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.03)',
        }}>

          {/* Header */}
          <div className="relative p-6 pb-4 text-center" style={{ borderBottom: '2px solid var(--border-color)' }}>
            <button onClick={() => { setAuthOpen(false); reset(); }}
              className="absolute top-4 left-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-color)',
              }}>
              <ClayClose size={16} />
            </button>
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{
              background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 8px 24px rgba(124,58,237,0.3)',
            }}>
              <ClayShield size={28} />
            </div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              {authMode === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {authMode === 'login' ? 'أدخل بياناتك للمتابعة' : 'أنشئ حسابك للبدء'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex mx-6 mt-4 rounded-2xl overflow-hidden" style={{
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-color)',
          }}>
            <button onClick={() => switchMode('login')}
              className="flex-1 py-2.5 text-sm font-bold transition-all"
              style={authMode === 'login' ? {
                background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                color: 'white',
              } : { color: 'var(--text-muted)' }}>
              تسجيل الدخول
            </button>
            <button onClick={() => switchMode('register')}
              className="flex-1 py-2.5 text-sm font-bold transition-all"
              style={authMode === 'register' ? {
                background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                color: 'white',
              } : { color: 'var(--text-muted)' }}>
              حساب جديد
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>الاسم</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03)',
                  }} />
              </div>
            )}

            {/* Contact Type Toggle */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>نوع الحساب</label>
              <div className="flex rounded-2xl overflow-hidden" style={{
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-color)',
              }}>
                <button type="button" onClick={() => { setContactType('phone'); setContact(''); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all"
                  style={contactType === 'phone' ? {
                    background: 'linear-gradient(145deg, #25d366, #128c7e)',
                    color: 'white',
                  } : { color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  هاتف
                </button>
                <button type="button" onClick={() => { setContactType('email'); setContact(''); }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all"
                  style={contactType === 'email' ? {
                    background: 'linear-gradient(145deg, #60a5fa, #3b82f6)',
                    color: 'white',
                  } : { color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  ايميل
                </button>
              </div>
            </div>

            {/* Contact Field */}
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {contactType === 'phone' ? 'رقم الهاتف' : 'البريد الالكتروني'}
              </label>
              <input required type={contactType === 'phone' ? 'tel' : 'email'} value={contact} onChange={e => setContact(e.target.value)}
                placeholder={contactType === 'phone' ? '05XXXXXXXX' : 'email@example.com'}
                className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03)',
                }} />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>كلمة المرور</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="4 أحرف على الأقل"
                className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none transition-all"
                style={{
                  background: 'var(--bg-surface)',
                  border: '2px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03)',
                }} />
            </div>

            {error && (
              <div className="px-4 py-2.5 rounded-2xl text-xs font-medium text-center"
                style={{
                  background: 'rgba(248,113,113,0.1)',
                  border: '1.5px solid rgba(248,113,113,0.2)',
                  color: '#f87171',
                }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              style={{
                background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 8px 24px rgba(124,58,237,0.3)',
              }}>
              {loading ? '...' : authMode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
