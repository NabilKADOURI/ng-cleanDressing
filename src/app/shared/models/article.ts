import { ApiResponse } from "./api";

export interface ArticleInterface extends ApiResponse {

  id:number;
  title:string;
  subtitle:string;
  picture:string;
  description: string;
  dateCreate: string;

}