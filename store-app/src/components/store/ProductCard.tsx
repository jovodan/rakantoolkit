'use client';

import { Product } from '@/lib/types';
import { useStore } from '@/lib/store-context';
import { formatNumber } from '@/lib/helpers';
import { ClayCheck, ClayStar, ClayWin11Pro, ClayWin11Home, ClayWin11LTSC, ClayWin10Pro, ClayWin10Home, ClayWin10LTSC, ClayOperatingSystem } from '@/components/icons/clay';
import { getCategoryIcon } from '@/lib/types';
import React from 'react';

const categoryColors: Record<string, string> = {
  games: '#a78bfa',
  software: '#60a5fa',
  giftcards: '#f472b6',
  subscriptions: '#34d399',
  courses: '#fbbf24',
  os: '#38bdf8',
};

const osProductIcons: Record<number, React.ComponentType<{ size?: number; className?: string }>> = {
  33: ClayWin11Pro,
  34: ClayWin11Home,
  35: ClayWin11LTSC,
  36: ClayWin10Pro,
  37: ClayWin10Home,
  38: ClayWin10LTSC,
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useStore();
  const inCart = cart.some(c => c.id === product.id);
  const catColor = categoryColors[product.category] || '#a78bfa';

  return (
    <div className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
      style={{
        background: 'var(--bg-surface)',
        border: '2px solid var(--border-color)',
        boxShadow: `0 8px 32px ${catColor}15, 0 2px 8px rgba(0,0,0,0.05)`,
      }}>

      {/* Image area */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${catColor}20, ${catColor}08)` }}>

        {/* Clay icon circle */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={product.category === 'os' ? {
            background: 'transparent',
            boxShadow: 'none',
          } : {
            background: `linear-gradient(145deg, ${catColor}, ${catColor}cc)`,
            boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.1), 0 8px 24px ${catColor}40`,
          }}>
          {product.category === 'os' && osProductIcons[product.id]
            ? React.createElement(osProductIcons[product.id], { size: 80 })
            : <span className="text-4xl drop-shadow-lg">{product.icon}</span>
          }
        </div>

        {/* Badges */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, #f87171, #ef4444)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), inset -1px -1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(248,113,113,0.3)',
            }}>
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 right-3 text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, #34d399, #10b981)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), inset -1px -1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(52,211,153,0.3)',
            }}>
            جديد
          </span>
        )}

        {/* Floating particles */}
        <div className="absolute top-4 right-8 w-2 h-2 rounded-full opacity-20" style={{ background: catColor }} />
        <div className="absolute bottom-6 left-12 w-3 h-3 rounded-full opacity-10" style={{ background: catColor }} />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3">
        {/* Category pill */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{
            background: `linear-gradient(145deg, ${catColor}, ${catColor}cc)`,
            boxShadow: `inset 1px 1px 2px rgba(255,255,255,0.4), 0 2px 6px ${catColor}30`,
          }} />
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: catColor }}>
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold leading-tight line-clamp-1" style={{ color: 'var(--text-primary)' }}>
          {product.name}
        </h3>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1.5">
          {product.platform.map(p => (
            <span key={p} className="text-[10px] px-2.5 py-1 rounded-xl font-medium"
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--text-muted)',
                border: '1.5px solid var(--border-color)',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.03)',
              }}>
              {p}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <ClayStar key={i} size={18} filled={i <= Math.floor(product.rating)} />
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{product.rating}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({formatNumber(product.ratingCount)})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-1 pt-3" style={{ borderTop: '1.5px solid var(--border-color)' }}>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice > product.price && (
              <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={inCart
              ? {
                  background: 'linear-gradient(145deg, #34d399, #10b981)',
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.1), 0 4px 12px rgba(52,211,153,0.3)',
                }
              : {
                  background: `linear-gradient(145deg, ${catColor}, ${catColor}cc)`,
                  boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.1), 0 4px 16px ${catColor}35`,
                }
            }
          >
            {inCart ? <ClayCheck size={22} /> : <span className="text-white font-bold text-lg">+</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
