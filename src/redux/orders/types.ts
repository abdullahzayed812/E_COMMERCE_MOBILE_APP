interface Address {
  [index: string]: string | number;
}
interface Calculated {
  [index: string]: string | number;
}

interface Product {
  id: number;
  image: string;
  offered: number;
  selling: number;
  title: string;
}

export interface OrderedProduct {
  product: Product;
  product_id: number;
  quantity: number;
  selling: number;
  shipping_price: number;
  bundle_offer: number;
  tax_price: string;
}

export interface OrderDetails {
  address: Address;
  calculated: Calculated;
  ordered_products: OrderedProduct[];
  created: string;
  currency: string;
  id: number;
  order: string;
  order_method: number;
  payment_done: number;
  status: number;
  total_amount: string;
  updated_at: string;
  user_token: string;
}

export interface InitialState {
  loading: boolean;
  orders: OrderDetails[];
}
