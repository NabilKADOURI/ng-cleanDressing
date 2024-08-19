import { ApiResponse } from "./api";
import { CategoryInterface } from "./category";
import { MatterInterface } from "./matter";

export interface ProductInterface extends ApiResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  category: string;      
  matter: string ;       
       
}


