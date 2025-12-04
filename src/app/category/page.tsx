import { Suspense } from 'react';
import CategoryMenu from './CategoryMenu';

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>}>
      <CategoryMenu />
    </Suspense>
  );
}