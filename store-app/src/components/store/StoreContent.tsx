'use client';

import { useMemo } from 'react';
import { useStore } from '@/lib/store-context';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';
import CategoryTabs from './CategoryTabs';
import Header from './Header';

export default function StoreContent() {
  const {
    category, typeFilter, maxPrice, minRating, sortBy, setSortBy,
    searchQuery, viewMode, setViewMode, setSidebarOpen,
  } = useStore();

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    switch (sortBy) {
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => b.ratingCount - a.ratingCount);
    }
    return result;
  }, [category, typeFilter, maxPrice, minRating, sortBy, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header />
      <main className="max-w-[1400px] mx-auto px-4 pb-16 pt-6">
        <div className="mb-6"><CategoryTabs /></div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                border: '2px solid var(--border-color)',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.03)',
              }}>
              <span className="text-base">🎛️</span> الفلاتر
            </button>
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{filtered.length} منتج</span>
          </div>
          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 rounded-2xl text-sm font-medium focus:outline-none appearance-none cursor-pointer transition-all hover:scale-105"
              style={{
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-color)',
                color: 'var(--text-secondary)',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05)',
              }}>
              <option value="featured">الأكثر شعبية</option>
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر: من الأقل</option>
              <option value="price-high">السعر: من الأعلى</option>
              <option value="rating">أعلى تقييم</option>
              <option value="discount">أكبر خصم</option>
            </select>
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-2xl"
              style={{ background: 'var(--bg-surface)', border: '2px solid var(--border-color)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05)' }}>
              {(['grid', 'list'] as const).map(mode => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                  style={viewMode === mode ? {
                    background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                    color: 'white',
                    boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(124,58,237,0.2)',
                  } : { color: 'var(--text-muted)' }}>
                  {mode === 'grid' ? '▦' : '☰'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex gap-6">
          <FilterSidebar />
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{
                  background: 'var(--bg-surface)',
                  border: '3px solid var(--border-color)',
                  boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.05)',
                }}>
                  <span className="text-5xl opacity-20">📦</span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>لا توجد منتجات مطابقة</p>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                : 'flex flex-col gap-4'}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <CartSidebar />
      <AuthModal />
    </div>
  );
}
