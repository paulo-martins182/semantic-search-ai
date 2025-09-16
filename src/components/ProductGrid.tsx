"use client";
import { Product } from "@/types/product_types";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "next/navigation";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  console.log("Search Params:", searchParams.get("q"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = searchParams.get("q") || "";
        const response = await fetch(`/api/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  if (!products.length) {
    return <p className="text-gray-500 text-center mt-5">No products found</p>;
  }

  if (loading) {
    return <p className="text-gray-500 text-center mt-5">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
