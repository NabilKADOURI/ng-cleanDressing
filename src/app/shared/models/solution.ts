import { ApiResponse } from "./api";
import { CategoryInterface } from "./category";

export interface SolutionInterface extends ApiResponse {
  id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
  categories: CategoryInterface;  
       
}
