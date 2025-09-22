import { ProductColor } from "./product-color";

export interface ListProduct{
  id: number; 
  name: string;            
  description?: string;     
  price: number;         
  categoryName: string;        
  productColors?: ProductColor[]; 
  createdAt?: Date;
  updatedAt?: Date;
}