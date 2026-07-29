import { CartItem } from './types';
import { ContactType } from './auth';

export type OrderStatus = 'pending' | 'completed' | 'refunded';

export interface Order {
  id: string;
  number: number;
  items: CartItem[];
  total: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  userContactType: ContactType;
  userId: string;
  status: OrderStatus;
  createdAt: number;
}

const ORDERS_KEY = 'rakan_orders';
const COUNTER_KEY = 'rakan_order_counter';

function getNextNumber(): number {
  if (typeof window === 'undefined') return 1;
  const raw = localStorage.getItem(COUNTER_KEY);
  const num = raw ? parseInt(raw) : 0;
  const next = num + 1;
  localStorage.setItem(COUNTER_KEY, next.toString());
  return next;
}

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrder(items: CartItem[], total: number, user: { id: string; phone: string; email: string; contactType: ContactType; name: string }): Order {
  const orders = getOrders();
  const order: Order = {
    id: 'ord_' + Date.now().toString(36),
    number: getNextNumber(),
    items,
    total,
    userName: user.name,
    userPhone: user.phone,
    userEmail: user.email,
    userContactType: user.contactType,
    userId: user.id,
    status: 'pending',
    createdAt: Date.now(),
  };
  orders.push(order);
  saveOrders(orders);
  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders();
  const updated = orders.map(o => o.id === id ? { ...o, status } : o);
  saveOrders(updated);
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter(o => o.id !== id);
  saveOrders(orders);
}

export function getOrderStats(orders: Order[]) {
  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    refunded: orders.filter(o => o.status === 'refunded').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0),
  };
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
