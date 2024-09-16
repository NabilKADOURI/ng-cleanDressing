import { ApiResponse } from "./api";


export interface ProductInterface extends ApiResponse {
  categoryId: number;
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  category: string;      
  matter: string ;       
       
}


