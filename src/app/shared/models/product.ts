import { ApiResponse } from "./api";


export interface ProductInterface extends ApiResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  picture: string;
  category: string;
  matter: string;
}