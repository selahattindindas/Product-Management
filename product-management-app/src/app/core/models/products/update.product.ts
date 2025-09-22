export interface UpdateProduct{
  id: number;
  name: string;    
  description?: string;  
  price: number;   
  categoryId: string;
  colorIds: number[]; 
}