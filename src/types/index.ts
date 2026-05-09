export type Category = "electronics" | "fashion";

export interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: Category;
  subcategory: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}
