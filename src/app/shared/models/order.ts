import { CartInterface } from './CartInterface';

export interface OrderInterface {
  date: string;
  status: string;
  totalPrice: number;
  items: CartInterface[];
}
