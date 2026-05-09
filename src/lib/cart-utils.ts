import type { CartItem, Product } from "@/types";

export function upsertCartItem(cart: CartItem[], product: Product): CartItem[] {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      emoji: product.emoji,
    },
  ];
}

export function removeCartItem(cart: CartItem[], id: string): CartItem[] {
  return cart.filter((item) => item.id !== id);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function createWhatsAppMessage(cart: CartItem[], total: number): string {
  const items = cart
    .map(
      (item) =>
        `- ${item.name} (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}`,
    )
    .join("\n");

  return `*New Order from Acme Store*\n\n*Items:*\n${items}\n\n*Total:* Rs. ${total}`;
}
