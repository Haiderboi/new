"use client";

import { Search, ShoppingCart } from "lucide-react";
import styles from "./Navigation.module.css";

type CategoryFilter = "all" | "electronics" | "fashion";

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  itemCount: number;
  onCartClick: () => void;
}

export default function Navigation({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  itemCount,
  onCartClick,
}: NavigationProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>Acme Store</div>

      <nav className={styles.links}>
        <button
          className={activeCategory === "all" ? styles.activeLink : styles.link}
          onClick={() => onCategoryChange("all")}
          type="button"
        >
          All
        </button>
        <button
          className={activeCategory === "electronics" ? styles.activeLink : styles.link}
          onClick={() => onCategoryChange("electronics")}
          type="button"
        >
          Electronics
        </button>
        <button
          className={activeCategory === "fashion" ? styles.activeLink : styles.link}
          onClick={() => onCategoryChange("fashion")}
          type="button"
        >
          Fashion
        </button>
      </nav>

      <div className={styles.searchWrap}>
        <Search size={16} aria-hidden />
        <input
          aria-label="Search products"
          className={styles.search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          value={searchQuery}
        />
      </div>

      <button aria-label="Open cart" className={styles.cartButton} onClick={onCartClick} type="button">
        <ShoppingCart size={18} />
        {itemCount > 0 ? <span className={styles.badge}>{itemCount}</span> : null}
      </button>
    </header>
  );
}
