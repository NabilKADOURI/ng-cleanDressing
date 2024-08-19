import { ApiResponse } from "./api";
import { ProductInterface } from "./product";

export interface CategoryInterface extends ApiResponse {
  split: any;
  id: number;
  name: string;
  picture:string;
  products: ProductInterface [];
}
