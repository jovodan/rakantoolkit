'use client';

import { useStore } from '@/lib/store-context';
import { products } from '@/lib/products';
import { ClayClose, ClayFilter } from '@/components/icons/clay';

function getCategoryCount(catId: string, cats: { id: string }[]): number {
  if (catId === 'all') return products.length;
  return products.filter(p => p.category === catId).length;
}

export default function FilterSidebar() {
  const {
    category, setCategory, typeFilter, setTypeFilter,
    maxPrice, setMaxPrice, minRating, setMinRating,
    sidebarOpen, setSidebarOpen, resetFilters, categories, mounted,
  } = useStore();
  const cats = mounted ? categories : [];

  const btnStyle = (active: boolean, color: string) => active ? {
    background: `linear-gradient(145deg, ${color}, ${color}dd)`,
    color: 'white',
    boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px ${color}35`,
    border: '2px solid transparent',
  } : {
    background: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
    border: '2px solid var(--border-color)',
    boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05)',
  };

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`
        fixed lg:sticky top-0 right-0 lg:right-auto h-full lg:h-auto
        w-[280px] lg:w-[260px] z-50 lg:z-auto overflow-y-auto
        lg:rounded-3xl p-5 transition-transform duration-500 ease-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `} style={{
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-color)',
        boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.06)',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(145deg, #818cf8, #6366f1)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(99,102,241,0.2)',
            }}>
              <ClayFilter size={16} />
            </div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>الفلاتر</h3>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--bg-surface)', border: '1.5px solid var(--border-color)' }}>
            <ClayClose size={14} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>الأقسام</h4>
          <div className="space-y-1.5">
            <button onClick={() => { setCategory('all'); setSidebarOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={btnStyle(category === 'all', '#7c3aed')}>
              <span>🌐</span>
              <span className="flex-1 text-right">الكل</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-lg" style={{
                background: category === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-primary)',
              }}>{getCategoryCount('all', cats)}</span>
            </button>
            {cats.map(cat => (
              <button key={cat.id} onClick={() => { setCategory(cat.id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={btnStyle(category === cat.id, '#7c3aed')}>
                <span>{cat.icon}</span>
                <span className="flex-1 text-right">{cat.nameAr}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-lg" style={{
                  background: category === cat.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-primary)',
                }}>{getCategoryCount(cat.id, cats)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>النوع</h4>
          <div className="flex gap-2">
            {([
              { id: 'all', label: 'الكل' },
              { id: 'global', label: 'عالمي' },
              { id: 'region', label: 'منطقة' },
            ] as const).map(t => (
              <button key={t.id} onClick={() => setTypeFilter(t.id)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={btnStyle(typeFilter === t.id, '#06b6d4')}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>السعر الأقصى</h4>
          <div className="px-1">
            <input type="range" min={0} max={500} value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))} className="w-full" />
            <div className="text-sm font-bold mt-1" style={{ color: 'var(--accent-cyan)' }}>${maxPrice}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--text-muted)' }}>أقل تقييم</h4>
          <div className="space-y-1.5">
            {[0, 4, 4.5].map(r => (
              <button key={r} onClick={() => setMinRating(r)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                style={btnStyle(minRating === r, '#f59e0b')}>
                <span className="text-xs">{'★'.repeat(r > 0 ? Math.floor(r) : 5)}</span>
                <span>{r === 0 ? 'الكل' : `${r}+`}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button onClick={resetFilters}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
          style={{
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            border: '2px solid var(--border-color)',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05)',
          }}>
          إعادة ضبط الفلاتر
        </button>
      </aside>
    </>
  );
}
