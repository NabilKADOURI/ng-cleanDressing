export interface OrderInterface {
  id?:string;
  userOrder:string;
  date: string; 
  status: string; 
  totalPrice: number; 
  items: string []; 
}
export interface ItemInterface {
  id?: string;
  orders: string;
  serviceItem: string | number;
  productItem: string | number;
  matterItem: string | number;
  quantity: number;
  totalPrice: number;
}

