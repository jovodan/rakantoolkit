'use client';

import { useState, useEffect, useMemo } from 'react';
import { products as defaultProducts } from '@/lib/products';
import { Product, Category, DEFAULT_CATEGORIES, getCategories, saveCategories } from '@/lib/types';
import { getOrders, updateOrderStatus, deleteOrder, getOrderStats, formatDate, Order, OrderStatus } from '@/lib/orders';
import { Plus, Trash2, Edit3, Package, Search, Check, Tag, ShoppingCart } from 'lucide-react';

const PRODUCTS_KEY = 'rakan_admin_products';

function loadProducts(): Product[] {
  if (typeof window === 'undefined') return defaultProducts;
  const saved = localStorage.getItem(PRODUCTS_KEY);
  if (saved) {
    try { const p = JSON.parse(saved); if (p.length > 0) return p; } catch {}
  }
  return defaultProducts;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function toast(msg: string) {
  const el = document.createElement('div');
  el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-sm shadow-lg';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

export default function AdminContent() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tab, setTab] = useState<'dashboard' | 'products' | 'add' | 'categories' | 'orders'>('dashboard');
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [catForm, setCatForm] = useState({ id: '', nameAr: '', nameEn: '', icon: '📦' });
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');
  const [form, setForm] = useState({
    name: '', category: 'games', price: '', oldPrice: '',
    platform: '', rating: '4.5', ratingCount: '0', icon: '📦',
    type: 'global' as 'global' | 'region', isNew: false, discount: '0',
  });

  useEffect(() => {
    setAllProducts(loadProducts());
    setCategories(getCategories());
    setOrders(getOrders());
  }, []);

  const stats = useMemo(() => {
    const s: Record<string, number> = { total: allProducts.length };
    categories.forEach(c => { s[c.id] = allProducts.filter(p => p.category === c.id).length; });
    return s;
  }, [allProducts, categories]);

  const orderStats = useMemo(() => getOrderStats(orders), [orders]);

  const filtered = useMemo(() => {
    if (!search) return allProducts;
    const q = search.toLowerCase();
    return allProducts.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
  }, [allProducts, search]);

  // ---- Products ----
  function resetForm() {
    setForm({ name: '', category: categories[0]?.id || 'games', price: '', oldPrice: '', platform: '', rating: '4.5', ratingCount: '0', icon: '📦', type: 'global', isNew: false, discount: '0' });
    setEditing(null);
  }

  function handleEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name, category: p.category, price: p.price.toString(), oldPrice: p.oldPrice.toString(),
      platform: p.platform.join(', '), rating: p.rating.toString(), ratingCount: p.ratingCount.toString(),
      icon: p.icon, type: p.type, isNew: p.isNew, discount: p.discount.toString(),
    });
    setTab('add');
  }

  function handleDelete(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    const updated = allProducts.filter(p => p.id !== id);
    setAllProducts(updated); saveProducts(updated);
    toast('تم حذف المنتج');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const product: Product = {
      id: editing?.id || Date.now(), name: form.name, category: form.category,
      price: parseFloat(form.price), oldPrice: parseFloat(form.oldPrice) || parseFloat(form.price),
      discount: parseInt(form.discount) || 0, platform: form.platform.split(',').map(s => s.trim()).filter(Boolean),
      rating: parseFloat(form.rating) || 4.5, ratingCount: parseInt(form.ratingCount) || 0,
      type: form.type, isNew: form.isNew, icon: form.icon || '📦',
    };
    let updated: Product[];
    if (editing) { updated = allProducts.map(p => p.id === editing.id ? product : p); toast('تم تعديل المنتج'); }
    else { updated = [...allProducts, product]; toast('تم إضافة المنتج'); }
    setAllProducts(updated); saveProducts(updated); resetForm(); setTab('products');
  }

  // ---- Categories ----
  function resetCatForm() {
    setCatForm({ id: '', nameAr: '', nameEn: '', icon: '📦' });
    setEditingCat(null);
  }

  function handleCatSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = editingCat ? editingCat.id : catForm.id.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id) { toast('أدخل معرّف الفئة'); return; }
    if (!editingCat && categories.some(c => c.id === id)) { toast('الفئة موجودة بالفعل'); return; }

    const cat: Category = { id, nameAr: catForm.nameAr, nameEn: catForm.nameEn, icon: catForm.icon || '📦' };
    let updated: Category[];
    if (editingCat) {
      updated = categories.map(c => c.id === editingCat.id ? cat : c);
      toast('تم تعديل الفئة');
    } else {
      updated = [...categories, cat];
      toast('تم إضافة الفئة');
    }
    setCategories(updated); saveCategories(updated); resetCatForm();
  }

  function handleCatDelete(id: string) {
    const productCount = allProducts.filter(p => p.category === id).length;
    if (productCount > 0) {
      if (!confirm(`هناك ${productCount} منتج في هذه الفئة. سيتم حذف المنتجات أيضاً. أكمل؟`)) return;
      const updated = allProducts.filter(p => p.category !== id);
      setAllProducts(updated); saveProducts(updated);
    }
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated); saveCategories(updated);
    toast('تم حذف الفئة');
  }

  function handleCatEdit(cat: Category) {
    setEditingCat(cat);
    setCatForm({ id: cat.id, nameAr: cat.nameAr, nameEn: cat.nameEn, icon: cat.icon });
    setTab('categories');
  }

  function moveCategory(index: number, direction: 'up' | 'down') {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= categories.length) return;
    const updated = [...categories];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setCategories(updated);
    saveCategories(updated);
  }

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleDragStart(e: React.DragEvent, index: number) {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }

  function handleDrop(e: React.DragEvent, targetIndex: number) {
    e.preventDefault();
    const sourceIndex = dragIndex;
    if (sourceIndex === null || sourceIndex === targetIndex) { setDragIndex(null); setDragOverIndex(null); return; }
    const updated = [...categories];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setCategories(updated);
    saveCategories(updated);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function switchTab(t: typeof tab) {
    if (t === 'add' && !editing) resetForm();
    if (t === 'categories' && !editingCat) resetCatForm();
    if (t === 'orders') setOrders(getOrders());
    setTab(t);
  }

  function handleOrderStatus(id: string, status: OrderStatus) {
    updateOrderStatus(id, status);
    setOrders(getOrders());
    toast(status === 'completed' ? 'تم تأكيد الطلب' : status === 'refunded' ? 'تم استرجاع الطلب' : 'تم تحديث الطلب');
  }

  function handleOrderDelete(id: string) {
    if (!confirm('هل أنت متأكد من حذف الطلب؟')) return;
    deleteOrder(id);
    setOrders(getOrders());
    toast('تم حذف الطلب');
  }

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return orders;
    return orders.filter(o => o.status === orderFilter);
  }, [orders, orderFilter]);

  const catColors: Record<string, string> = {
    games: 'yellow', software: 'blue', giftcards: 'pink', subscriptions: 'purple', courses: 'emerald',
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto" style={{ background: 'var(--bg-primary)' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1">لوحة التحكم</h1>
        <p className="text-sm text-gray-500">إدارة المنتجات والفئات</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">📦</div>
          <div className="text-xl font-black text-white">{stats.total}</div>
          <div className="text-[11px] text-gray-400">إجمالي</div>
        </div>
        {categories.map(c => {
          const color = catColors[c.id] || 'gray';
          return (
            <div key={c.id} className={`bg-gradient-to-br from-${color}-500/10 to-transparent border border-${color}-500/10 rounded-xl p-3 text-center`}>
              <div className="text-xl mb-1">{c.icon}</div>
              <div className="text-xl font-black text-white">{stats[c.id] || 0}</div>
              <div className="text-[11px] text-gray-400">{c.nameAr}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 mb-6 overflow-x-auto">
        {[
          { id: 'orders' as const, label: 'الطلبات', icon: <ShoppingCart className="w-4 h-4" /> },
          { id: 'products' as const, label: 'المنتجات', icon: <Package className="w-4 h-4" /> },
          { id: 'categories' as const, label: 'الفئات', icon: <Tag className="w-4 h-4" /> },
          { id: 'add' as const, label: editing ? 'تعديل منتج' : 'إضافة منتج', icon: <Plus className="w-4 h-4" /> },
        ].map(t => (
          <button key={t.id} onClick={() => switchTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${tab === t.id ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-white'}`}>
            {t.icon} {t.label}
            {t.id === 'orders' && orderStats.pending > 0 && (
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-amber-500/20 text-amber-400">
                {orderStats.pending}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ===== ORDERS TAB ===== */}
      {tab === 'orders' && (
        <div>
          {/* Order Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
              <div className="text-xl mb-1">📋</div>
              <div className="text-xl font-black text-white">{orderStats.total}</div>
              <div className="text-[11px] text-gray-400">إجمالي</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">⏳</div>
              <div className="text-xl font-black text-amber-400">{orderStats.pending}</div>
              <div className="text-[11px] text-gray-400">قيد التنفيذ</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">✅</div>
              <div className="text-xl font-black text-emerald-400">{orderStats.completed}</div>
              <div className="text-[11px] text-gray-400">منجزة</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">↩️</div>
              <div className="text-xl font-black text-red-400">{orderStats.refunded}</div>
              <div className="text-[11px] text-gray-400">مرتجعة</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">💰</div>
              <div className="text-xl font-black text-purple-400">${orderStats.totalRevenue.toFixed(2)}</div>
              <div className="text-[11px] text-gray-400">الأرباح</div>
            </div>
          </div>

          {/* Order Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {([
              { id: 'all', label: 'الكل', count: orderStats.total },
              { id: 'pending', label: '⏳ قيد التنفيذ', count: orderStats.pending },
              { id: 'completed', label: '✅ منجزة', count: orderStats.completed },
              { id: 'refunded', label: '↩️ مرتجعة', count: orderStats.refunded },
            ] as const).map(f => (
              <button key={f.id} onClick={() => setOrderFilter(f.id)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                style={orderFilter === f.id ? {
                  background: 'linear-gradient(145deg, #c084fc, #7c3aed)',
                  color: 'white',
                } : {
                  background: 'var(--bg-surface)',
                  color: 'var(--text-muted)',
                  border: '1.5px solid var(--border-color)',
                }}>
                {f.label}
                <span className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center"
                  style={{ background: orderFilter === f.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-primary)' }}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-3 opacity-30">📋</div>
                <p className="text-sm">لا توجد طلبات</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredOrders.sort((a, b) => b.createdAt - a.createdAt).map(order => {
                  const statusConfig = {
                    pending: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', label: 'قيد التنفيذ' },
                    completed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'منجزة' },
                    refunded: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', label: 'مرتجعة' },
                  }[order.status];

                  return (
                    <div key={order.id} className="p-4 hover:bg-white/[0.02] transition">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-purple-400">#{order.number}</span>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} ${statusConfig.text}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500">
                          <span>{formatDate(order.createdAt)}</span>
                          <span>·</span>
                          <span>{order.userName}</span>
                          <span>·</span>
                          {order.userContactType === 'phone' && order.userPhone ? (
                            <a href={`https://wa.me/${order.userPhone.replace(/^0/, '966')}`} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition font-medium">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                              {order.userPhone}
                            </a>
                          ) : order.userContactType === 'email' && order.userEmail ? (
                            <a href={`mailto:${order.userEmail}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition font-medium">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                              {order.userEmail}
                            </a>
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-xs text-white font-medium">{item.name}</span>
                            <span className="text-[10px] text-cyan-400 font-bold">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">المجموع: <span className="text-cyan-400">${order.total.toFixed(2)}</span></span>
                        <div className="flex gap-1.5">
                          {order.status === 'pending' && (
                            <>
                              <button onClick={() => handleOrderStatus(order.id, 'completed')}
                                className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition">
                                ✅ تأكيد
                              </button>
                              <button onClick={() => handleOrderStatus(order.id, 'refunded')}
                                className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/15 text-red-400 hover:bg-red-500/25 transition">
                                ↩️ استرجاع
                              </button>
                            </>
                          )}
                          {order.status === 'completed' && (
                            <button onClick={() => handleOrderStatus(order.id, 'refunded')}
                              className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/15 text-red-400 hover:bg-red-500/25 transition">
                              ↩️ استرجاع
                            </button>
                          )}
                          {order.status === 'refunded' && (
                            <button onClick={() => handleOrderStatus(order.id, 'completed')}
                              className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition">
                              ✅ إعادة تأكيد
                            </button>
                          )}
                          <button onClick={() => handleOrderDelete(order.id)}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-red-500/10 text-red-400/60 hover:bg-red-500/20 transition">
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== PRODUCTS TAB ===== */}
      {tab === 'products' && (
        <div>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..."
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition" />
            </div>
            <button onClick={() => switchTab('add')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] transition">
              <Plus className="w-4 h-4" /> منتج جديد
            </button>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500 text-xs uppercase">
                    <th className="text-right p-3">المنتج</th>
                    <th className="text-right p-3">الفئة</th>
                    <th className="text-right p-3">السعر</th>
                    <th className="text-right p-3">التقييم</th>
                    <th className="text-right p-3">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-gray-500">لا توجد منتجات</td></tr>
                  ) : filtered.map(p => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{p.icon}</span>
                          <div>
                            <div className="font-medium text-white text-sm">{p.name}</div>
                            <div className="text-[11px] text-gray-500">{p.platform.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/15 text-purple-400">
                          {categories.find(c => c.id === p.category)?.nameAr || p.category}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-cyan-400">${p.price.toFixed(2)}</td>
                      <td className="p-3 text-amber-400">★ {p.rating}</td>
                      <td className="p-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-blue-500/15 text-blue-400 transition"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== CATEGORIES TAB ===== */}
      {tab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-4">الفئات الحالية ({categories.length})</h3>
            <p className="text-[11px] text-gray-600 mb-3">اسحب وأفلت لإعادة الترتيب</p>
            <div className="space-y-2">
              {categories.length === 0 && <p className="text-gray-500 text-sm text-center py-6">لا توجد فئات</p>}
              {categories.map((cat, index) => (
                <div key={cat.id}
                  draggable
                  onDragStart={e => handleDragStart(e, index)}
                  onDragOver={e => handleDragOver(e, index)}
                  onDrop={e => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-3 border rounded-xl transition-all ${
                    dragOverIndex === index
                      ? 'border-purple-500/60 bg-purple-500/10 scale-[1.02]'
                      : dragIndex === index
                        ? 'border-purple-500/30 bg-purple-500/5 opacity-60 scale-[0.98]'
                        : 'bg-white/[0.02] border-white/5 hover:border-purple-500/20'
                  }`}
                  style={{ cursor: 'grab' }}>
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <span className="text-gray-600 text-[10px] select-none">⋮⋮</span>
                  </div>
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => moveCategory(index, 'up')} disabled={index === 0}
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px] transition disabled:opacity-20 hover:bg-white/10 text-gray-400 hover:text-white">
                      ▲
                    </button>
                    <button onClick={() => moveCategory(index, 'down')} disabled={index === categories.length - 1}
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px] transition disabled:opacity-20 hover:bg-white/10 text-gray-400 hover:text-white">
                      ▼
                    </button>
                  </div>
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{cat.nameAr}</div>
                    <div className="text-[11px] text-gray-500">{cat.nameEn} · {cat.id}</div>
                  </div>
                  <span className="text-xs text-gray-600">{stats[cat.id] || 0} منتج</span>
                  <button onClick={() => handleCatEdit(cat)} className="p-1.5 rounded-lg hover:bg-blue-500/15 text-blue-400 transition"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleCatDelete(cat.id)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-4">{editingCat ? 'تعديل الفئة' : 'إضافة فئة جديدة'}</h3>
            <form onSubmit={handleCatSubmit} className="space-y-4">
              {!editingCat && (
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">معرّف الفئة (إنجليزي) <span className="text-red-400">*</span></label>
                  <input required value={catForm.id} onChange={e => setCatForm({...catForm, id: e.target.value})}
                    placeholder="e.g. music, movies, templates"
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
                  <p className="text-[11px] text-gray-600 mt-1">يُستخدم كمعرّف داخلي. لا يمكن تغييره لاحقاً.</p>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">اسم الفئة (عربي) <span className="text-red-400">*</span></label>
                <input required value={catForm.nameAr} onChange={e => setCatForm({...catForm, nameAr: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">اسم الفئة (إنجليزي) <span className="text-red-400">*</span></label>
                <input required value={catForm.nameEn} onChange={e => setCatForm({...catForm, nameEn: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">الأيقونة (إيموجي)</label>
                <input value={catForm.icon} onChange={e => setCatForm({...catForm, icon: e.target.value})}
                  placeholder="📦" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] transition">
                  <Check className="w-4 h-4" /> {editingCat ? 'حفظ التعديلات' : 'إضافة الفئة'}
                </button>
                {editingCat && (
                  <button type="button" onClick={resetCatForm}
                    className="px-6 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== ADD/EDIT PRODUCT TAB ===== */}
      {tab === 'add' && (
        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 max-w-3xl">
          <h2 className="text-lg font-bold text-white mb-5">{editing ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>

          <div className="mb-5 pb-4 border-b border-white/5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">اسم المنتج <span className="text-red-400">*</span></label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">الأيقونة</label>
                <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" placeholder="📦" />
              </div>
            </div>
          </div>

          <div className="mb-5 pb-4 border-b border-white/5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">السعر والتصنيف</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">السعر ($) <span className="text-red-400">*</span></label>
                <input required type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">السعر القديم ($)</label>
                <input type="number" step="0.01" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">الخصم (%)</label>
                <input type="number" min="0" max="100" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">الفئة</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.nameAr}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">النوع</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value as 'global' | 'region'})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition">
                  <option value="global">عالمي</option>
                  <option value="region">منطقة محددة</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-5 pb-4 border-b border-white/5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">التقييم والحالة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">المنصات (مفصولة بفاصلة)</label>
                <input value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}
                  placeholder="PC, Steam, Mac" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">التقييم</label>
                <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">عدد التقييمات</label>
                <input type="number" min="0" value={form.ratingCount} onChange={e => setForm({...form, ratingCount: e.target.value})}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/50 transition" />
              </div>
            </div>
            <label className="flex items-center gap-2 mt-4 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={e => setForm({...form, isNew: e.target.checked})} className="accent-purple-500 w-4 h-4" />
              منتج جديد
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl text-sm font-bold hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] transition">
              <Check className="w-4 h-4" /> {editing ? 'حفظ التعديلات' : 'إضافة المنتج'}
            </button>
            {editing && (
              <button type="button" onClick={() => { resetForm(); setTab('products'); }}
                className="px-6 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                إلغاء
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
