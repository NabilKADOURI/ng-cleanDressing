import { ApiResponse } from "./api";
import { OrderInterface } from "./order";

export interface IUserInterface {
  email:string;
  password:string;
 }

 export interface UserInterface extends ApiResponse {
  id: number;
  role:string;
  name:string;
  firstName:string;
  email:string;
  phone:string;
  adress:string;
  picture : string;
  orders:OrderInterface[];
 }