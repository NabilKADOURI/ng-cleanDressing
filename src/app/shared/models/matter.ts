import { ApiResponse } from "./api";
import { ProductInterface } from "./product";

export interface MatterInterface extends ApiResponse {
  id: number;
  name: string;
  price: number;
  products: ProductInterface ;   
      
};


