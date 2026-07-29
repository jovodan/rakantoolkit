'use client';

import { useStore } from '@/lib/store-context';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClayCart, ClaySearch, ClaySettings } from '@/components/icons/clay';

export default function Header() {
  const { cartCount, setCartOpen, searchQuery, setSearchQuery, user, setAuthOpen, logout } = useStore();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('rakan_theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem('rakan_theme');
    if (saved === 'light') setDark(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{
      background: dark ? 'rgba(11, 14, 23, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      borderBottom: '2px solid var(--border-color)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    }}>
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
            boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(124,58,237,0.3)',
          }}>
            <span className="text-lg">🛒</span>
          </div>
          <span className="text-lg font-bold hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            RaKaN <span style={{ color: 'var(--accent-cyan)' }}>Store</span>
          </span>
        </Link>

        {/* Admin */}
        <Link href="/admin" className="text-xs px-3 py-1.5 rounded-xl font-medium transition-all hover:scale-105"
          style={{
            color: 'var(--text-muted)',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-color)',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.03)',
          }}>
          ⚙️ لوحة التحكم
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg flex items-center justify-center" style={{
              background: 'linear-gradient(145deg, #67e8f9, #06b6d4)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), 0 2px 6px rgba(6,182,212,0.2)',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.5"/><path d="M16 16l5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتجات..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all"
              style={{
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-color)',
                color: 'var(--text-primary)',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.02)',
              }}/>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.03)',
            }}>
            <ClaySearch size={20} />
          </button>

          <button onClick={() => setDark(!dark)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: dark ? 'linear-gradient(145deg, #fbbf24, #f59e0b)' : 'linear-gradient(145deg, #6366f1, #4f46e5)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.15)',
            }}>
            <span className="text-lg">{dark ? '☀️' : '🌙'}</span>
          </button>

          {/* User / Login */}
          <div className="relative">
            {user ? (
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 text-sm font-bold"
                style={{
                  background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                  color: 'white',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(124,58,237,0.3)',
                }}>
                {user.name.charAt(0)}
              </button>
            ) : (
              <button onClick={() => setAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                  color: 'white',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(124,58,237,0.3)',
                }}>
                <span>👤</span>
                <span className="hidden sm:inline">دخول</span>
              </button>
            )}

            {/* User Menu Dropdown */}
            {user && userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                  }}>
                  <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{user.phone}</p>
                  </div>
                  <button onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="w-full px-4 py-3 text-right text-sm font-medium transition-colors hover:bg-white/5"
                    style={{ color: '#f87171' }}>
                    تسجيل الخروج
                  </button>
                </div>
              </>
            )}
          </div>

          <button onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(124,58,237,0.3)',
            }}>
            <ClayCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(145deg, #f87171, #ef4444)',
                  boxShadow: '0 2px 8px rgba(248,113,113,0.4)',
                }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث عن منتجات..."
            className="w-full px-4 py-2.5 rounded-2xl text-sm focus:outline-none transition-all"
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              color: 'var(--text-primary)',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.03)',
            }} autoFocus/>
        </div>
      )}
    </header>
  );
}
