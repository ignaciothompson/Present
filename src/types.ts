export interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    discountPrice?: number;
  }
  
  export interface CategoryData {
    category: string;
    products: Product[];
  }