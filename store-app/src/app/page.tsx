'use client';

import { StoreProvider } from '@/lib/store-context';
import StoreContent from '@/components/store/StoreContent';

export default function Home() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
