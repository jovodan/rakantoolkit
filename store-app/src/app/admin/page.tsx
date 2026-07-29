'use client';

import { StoreProvider } from '@/lib/store-context';
import AdminContent from '@/components/store/AdminContent';

export default function AdminPage() {
  return (
    <StoreProvider>
      <AdminContent />
    </StoreProvider>
  );
}
