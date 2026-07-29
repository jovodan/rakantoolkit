import { getCategories } from './types';

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function getStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
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
