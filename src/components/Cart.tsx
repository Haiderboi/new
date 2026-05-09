"use client";

import { createWhatsAppMessage } from "@/lib/cart-utils";
import { X, Trash2 } from "lucide-react";
import styles from "./Cart.module.css";
import { useCart } from "./CartContext";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, clearCart, removeFromCart, total } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    const message = createWhatsAppMessage(cart, total);
    const checkoutUrl = `https://wa.me/923000000000?text=${encodeURIComponent(message)}`;

    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    clearCart();
    onClose();
  };

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button aria-label="Close cart" className={styles.iconButton} onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {cart.map((item) => (
                <li className={styles.item} key={item.id}>
                  <div>
                    <p className={styles.name}>
                      {item.emoji} {item.name}
                    </p>
                    <p className={styles.meta}>
                      Qty: {item.quantity} • Rs. {item.price * item.quantity}
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${item.name}`}
                    className={styles.iconButton}
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <p className={styles.total}>Total: Rs. {total}</p>
              <button className={styles.checkoutButton} onClick={handleCheckout} type="button">
                Checkout on WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
