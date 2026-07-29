export type ProductType = 'global' | 'region';

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  platform: string[];
  rating: number;
  ratingCount: number;
  type: ProductType;
  isNew: boolean;
  icon: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  icon: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'games', nameAr: 'ألعاب', nameEn: 'Games', icon: '🎮' },
  { id: 'software', nameAr: 'برامج', nameEn: 'Software', icon: '💻' },
  { id: 'giftcards', nameAr: 'قسائم هدايا', nameEn: 'Gift Cards', icon: '🎁' },
  { id: 'subscriptions', nameAr: 'اشتراكات', nameEn: 'Subscriptions', icon: '🔔' },
  { id: 'courses', nameAr: 'دورات تعليمية', nameEn: 'Courses', icon: '📚' },
  { id: 'os', nameAr: 'أنظمة التشغيل', nameEn: 'Operating Systems', icon: '🖥️' },
];

const CATEGORIES_KEY = 'rakan_categories';

export function getCategories(): Category[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const saved = localStorage.getItem(CATEGORIES_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    } catch {}
  }
  return DEFAULT_CATEGORIES;
}

export function saveCategories(categories: Category[]) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getCategoryName(catId: string): string {
  const cats = getCategories();
  const found = cats.find(c => c.id === catId);
  return found?.nameAr || catId;
}

export function getCategoryIcon(catId: string): string {
  const cats = getCategories();
  const found = cats.find(c => c.id === catId);
  return found?.icon || '📦';
}
