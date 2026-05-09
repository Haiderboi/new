"use client";

import { useState } from "react";
import Cart from "@/components/Cart";
import { useCart } from "@/components/CartContext";
import Marquee from "@/components/Marquee";
import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";

type CategoryFilter = "all" | "electronics" | "fashion";

export default function Home() {
  const { addToCart, itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navigation
        activeCategory={activeCategory}
        itemCount={itemCount}
        onCartClick={() => setIsCartOpen(true)}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <Marquee />
      <ProductGrid activeCategory={activeCategory} onAddToCart={addToCart} searchQuery={searchQuery} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
