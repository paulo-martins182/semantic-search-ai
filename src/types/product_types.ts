export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  colors: string[];
  features: string[];
  inStock: boolean;
  image: string;
}

export interface CardProductTypes {
  product: Product;
}
