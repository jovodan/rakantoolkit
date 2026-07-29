'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, SortOption, Category, DEFAULT_CATEGORIES } from './types';
import { getSession, logout as authLogout, UserSession } from './auth';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  cartTotal: number;
  cartCount: number;

  category: string;
  setCategory: (c: string) => void;
  typeFilter: 'all' | 'global' | 'region';
  setTypeFilter: (t: 'all' | 'global' | 'region') => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (v: 'grid' | 'list') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  resetFilters: () => void;

  categories: Category[];
  setCategories: (c: Category[]) => void;
  mounted: boolean;

  user: UserSession | null;
  setUser: (u: UserSession | null) => void;
  authOpen: boolean;
  setAuthOpen: (v: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (m: 'login' | 'register') => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'global' | 'region'>('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategoriesState] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [mounted, setMounted] = useState(false);
  const [user, setUserState] = useState<UserSession | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('storeCart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {}
    try {
      const saved = localStorage.getItem('rakan_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) setCategoriesState(parsed);
      }
    } catch {}
    const session = getSession();
    if (session) setUserState(session);
  }, []);

  useEffect(() => {
    localStorage.setItem('storeCart', JSON.stringify(cart));
  }, [cart]);

  const setCategories = useCallback((cats: Category[]) => {
    setCategoriesState(cats);
    localStorage.setItem('rakan_categories', JSON.stringify(cats));
  }, []);

  const setUser = useCallback((u: UserSession | null) => {
    setUserState(u);
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUserState(null);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const exists = prev.some(c => c.id === product.id);
      if (exists) return prev.filter(c => c.id !== product.id);
      return [...prev, { id: product.id, name: product.name, price: product.price, icon: product.icon }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  const resetFilters = useCallback(() => {
    setCategory('all');
    setTypeFilter('all');
    setMaxPrice(500);
    setMinRating(0);
    setSortBy('featured');
    setSearchQuery('');
  }, []);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      cartOpen, setCartOpen, cartTotal, cartCount,
      category, setCategory,
      typeFilter, setTypeFilter,
      maxPrice, setMaxPrice,
      minRating, setMinRating,
      sortBy, setSortBy,
      searchQuery, setSearchQuery,
      viewMode, setViewMode,
      sidebarOpen, setSidebarOpen,
      resetFilters,
      categories, setCategories, mounted,
      user, setUser, authOpen, setAuthOpen, authMode, setAuthMode, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}
