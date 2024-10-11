import { ApiResponse } from "./api";
import { UserInterface } from "./IUser";

export interface TestimonialInterface extends ApiResponse {
  id: number;
  title: string;
  description: string;
  star: number;
  visible: boolean;
  user: UserInterface;    
}
