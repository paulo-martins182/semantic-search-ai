import ProductGrid from "@/components/ProductGrid";
import SearchFilters from "@/components/SearchFilters";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url(/bg-icons.jpeg)] bg-contain bg-repeat bg-center opacity-5 -z-10" />

      <div className="w-full bg-orange-400 p-2 mb-4">
        <p className="text-gray-100 text-center">AI-Powered Product Search</p>
      </div>

      <header className="my-10 text-center">
        <h1 className="text-3xl font-bold mb-6 text-center">
          SRCH <span className="text-orange-400 m-0 p-0 ">FOOD</span>
        </h1>
      </header>

      <aside className="">
        <SearchFilters />
      </aside>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}
