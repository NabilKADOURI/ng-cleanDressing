import { MatterInterface } from "./matter";
import { ProductInterface } from "./product";
import { SolutionInterface } from "./solution";

export interface OrderInterface {
  id?:string;
  userOrder:string;
  date: string; 
  status?: string; 
  totalPrice: number; 
  items: ProfileInterface[]; 
}
export interface ItemInterface {
  id?: string;
  orders: string;
  serviceItem: string | number;
  productItem: string | number;
  matterItem: string | number;
  quantity: number;
  price: number;
}

export interface ProfileInterface{
  id?: string;
  orders: string;
  serviceItem: SolutionInterface ;
  productItem: ProductInterface ;
  matterItem: MatterInterface ;
  quantity: number;
  price: number;
}