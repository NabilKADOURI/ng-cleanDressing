import { ApiResponse } from "./api";

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
  orders:string [];
 }