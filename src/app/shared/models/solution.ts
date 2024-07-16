import { ApiResponse } from "./api";

export interface SolutionInterface extends ApiResponse {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
}