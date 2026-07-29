'use client';

import { useStore } from '@/lib/store-context';
import { ClayClose, ClayTrash } from '@/components/icons/clay';
import { createOrder } from '@/lib/orders';

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal, cartCount, user, setAuthOpen, clearCart } = useStore();

  function handleCheckout() {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const order = createOrder(cart, cartTotal, user);
    clearCart();
    setCartOpen(false);
    alert(`تم استلام طلبك رقم #${order.number} بنجاح! شكراً ${user.name}`);
  }

  return (
    <>
      {cartOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setCartOpen(false)} />}

      <div className="fixed top-0 left-0 h-full w-[360px] max-w-[90vw] z-50 flex flex-col transition-transform duration-500 ease-out"
        style={{
          background: 'var(--bg-secondary)',
          borderRight: '3px solid var(--border-color)',
          transform: cartOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: cartOpen ? '8px 0 32px rgba(0,0,0,0.15)' : 'none',
        }}>

        {/* Header */}
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '2px solid var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
              boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 4px 12px rgba(124,58,237,0.3)',
            }}>
              <span className="text-lg">🛒</span>
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>سلة المشتريات</h2>
              {cartCount > 0 && (
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  {cartCount} منتجات
                </span>
              )}
            </div>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05)',
            }}>
            <ClayClose size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-color)',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.03)',
              }}>
                <span className="text-4xl opacity-30">🛒</span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>سلتك فارغة</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                background: 'var(--bg-surface)',
                border: '2px solid var(--border-color)',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.03)',
              }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{
                background: 'linear-gradient(145deg, #a78bfa, #7c3aed)',
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3), 0 2px 8px rgba(124,58,237,0.2)',
              }}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                <p className="text-sm font-bold" style={{ color: 'var(--accent-purple)' }}>${item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(248,113,113,0.1)',
                  border: '1.5px solid rgba(248,113,113,0.2)',
                }}>
                <ClayTrash size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartCount > 0 && (
          <div className="p-5 space-y-4" style={{ borderTop: '2px solid var(--border-color)' }}>
            <div className="flex justify-between items-center">
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>المجموع</span>
              <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.15), 0 8px 24px rgba(124,58,237,0.3)',
              }}>
              {user ? 'إتمام الشراء' : 'تسجيل الدخول لإتمام الشراء'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
