import { ApiListResponse, ApiResponse } from "./api";

export interface CategoryInterface extends ApiResponse {
  id: number;
  name: string;
  picture:string;
  products: string[];
}
