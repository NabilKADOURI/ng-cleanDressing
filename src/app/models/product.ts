import { CategoryInterface } from './category';

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string[];
}

