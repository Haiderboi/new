"use client";

import type { Product } from "@/types";
import { Plus } from "lucide-react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.emoji}>{product.emoji}</div>
      <p className={styles.subcategory}>{product.subcategory}</p>
      <h3 className={styles.name}>{product.name}</h3>
      <div className={styles.footer}>
        <p className={styles.price}>Rs. {product.price}</p>
        <button className={styles.button} onClick={() => onAddToCart(product)} type="button">
          <Plus size={14} /> Add
        </button>
      </div>
    </article>
  );
}
