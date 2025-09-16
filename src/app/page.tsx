import ProductGrid from "@/components/ProductGrid";
import SearchFilters from "@/components/SearchFilters";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <main className="md:col-span-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Search Products
          </h1>

          <aside className="md:col-span-1">
            <SearchFilters />
          </aside>

          <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
