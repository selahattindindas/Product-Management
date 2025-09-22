export interface CreateProduct{
  name: string;    
  description?: string;  
  price: number;   
  categoryId: string;
  colorIds: number[];    
}