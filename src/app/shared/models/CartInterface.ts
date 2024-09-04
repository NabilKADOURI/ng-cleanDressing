
import { MatterInterface } from "./matter";
import { ProductInterface } from "./product";
import { SolutionInterface } from "./solution";

export interface CartInterface  {
  id:string;
  service: SolutionInterface ;
  product: ProductInterface ;
  matter: MatterInterface ;
  quantity: number;
  totalPrice: number;
  depositDate: string;
}



