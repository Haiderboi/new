"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

type CategoryFilter = "all" | "electronics" | "fashion";

const subcategories = {
  electronics: ["Headphones", "Table Lamps", "Portable Fans"],
  fashion: ["Lockets", "Bangles"],
} as const;

const fallbackProducts: Product[] = [
  { id: "el-1", name: "Wave Pro Headphones", price: 7800, emoji: "🎧", category: "electronics", subcategory: subcategories.electronics[0] },
  { id: "el-2", name: "Aura Table Lamp", price: 3200, emoji: "💡", category: "electronics", subcategory: subcategories.electronics[1] },
  { id: "el-3", name: "Mini Chill Fan", price: 2600, emoji: "🪭", category: "electronics", subcategory: subcategories.electronics[2] },
  { id: "fa-1", name: "Moon Locket", price: 1900, emoji: "📿", category: "fashion", subcategory: subcategories.fashion[0] },
  { id: "fa-2", name: "Classic Bangles", price: 2400, emoji: "💫", category: "fashion", subcategory: subcategories.fashion[1] },
];

const categoryMap = [
  {
    key: "electronics",
    label: "Electronics",
    subcategories: subcategories.electronics,
  },
  {
    key: "fashion",
    label: "Fashion",
    subcategories: subcategories.fashion,
  },
] as const;

interface ProductGridProps {
  activeCategory: CategoryFilter;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ activeCategory, searchQuery, onAddToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id,name,price,emoji,category,subcategory")
        .order("category")
        .order("subcategory");

      if (!error && data && data.length > 0) {
        setProducts(data as Product[]);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatch = activeCategory === "all" || product.category === activeCategory;
        const searchMatch =
          !normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.subcategory.toLowerCase().includes(normalizedSearch);

        return categoryMatch && searchMatch;
      }),
    [activeCategory, normalizedSearch, products],
  );

  if (loading) {
    return <p className={styles.emptyState}>Loading products...</p>;
  }

  if (filteredProducts.length === 0) {
    return <p className={styles.emptyState}>No products found for this filter.</p>;
  }

  return (
    <section className={styles.wrapper}>
      {categoryMap
        .filter((category) => activeCategory === "all" || activeCategory === category.key)
        .map((category) => (
          <div className={styles.categoryBlock} key={category.key}>
            <h2 className={styles.categoryTitle}>{category.label}</h2>

            {category.subcategories.map((subcategory) => {
              const normalizedSubcategory = subcategory.toLowerCase();
              const sectionItems = filteredProducts.filter(
                (product) =>
                  product.category === category.key &&
                  product.subcategory.toLowerCase() === normalizedSubcategory,
              );

              if (sectionItems.length === 0) {
                return null;
              }

              return (
                <div className={styles.subcategoryBlock} key={`${category.key}-${subcategory}`}>
                  <h3 className={styles.subcategoryTitle}>{subcategory}</h3>
                  <div className={styles.grid}>
                    {sectionItems.map((product) => (
                      <ProductCard key={product.id} onAddToCart={onAddToCart} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </section>
  );
}
