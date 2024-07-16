import { ApiResponse } from "./api";

export interface MatterInterface extends ApiResponse {
  id: number;
  name: string;
  price: number;
  Product: string[];
}