import { MatterInterface } from "./matter";
import { ProductInterface } from "./product";
import { SolutionInterface } from "./solution";

export interface CartInterface  {
  service: SolutionInterface | null;
  product: ProductInterface| null;
  matter: MatterInterface| null;
  quantity: number;
  totalPrice: number;
}