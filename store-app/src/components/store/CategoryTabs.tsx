'use client';

import { useStore } from '@/lib/store-context';

export default function CategoryTabs() {
  const { category, setCategory, categories, mounted } = useStore();
  const cats = mounted ? categories : [];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide justify-center">
      <button onClick={() => setCategory('all')}
        className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
        style={category === 'all' ? {
          background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
          color: 'white',
          boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 6px 20px rgba(124,58,237,0.35)',
        } : {
          background: 'var(--bg-surface)',
          color: 'var(--text-secondary)',
          border: '2px solid var(--border-color)',
          boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.03)',
        }}>
        <span className="text-base">🌐</span><span>الكل</span>
      </button>
      {cats.map(cat => (
        <button key={cat.id} onClick={() => setCategory(cat.id)}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95"
          style={category === cat.id ? {
            background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
            color: 'white',
            boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 6px 20px rgba(124,58,237,0.35)',
          } : {
            background: 'var(--bg-surface)',
            color: 'var(--text-secondary)',
            border: '2px solid var(--border-color)',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.03)',
          }}>
          <span className="text-base">{cat.icon}</span><span>{cat.nameAr}</span>
        </button>
      ))}
    </div>
  );
}
