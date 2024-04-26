interface Category{
    id: number;
    version: null;
    companyId: number;
    name: string;
    photoPath: string;
    enabled: boolean;
    order: number;
    products: Product[];
}

interface Product{
    id: number;
    version: number;
    companyId: number;
    name: string;
    enabled: boolean;
    description: string;
    price: number;
    code: string;
    useGenericDiscount: boolean;
    removed: boolean;
    index: null;
    photoPath: string | null;
    photoLightPath: string | null;
    promotion: boolean;
    lists: string[];
    priceWithDiscount: number;
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  
  interface ProductsProps {
    products: Product[];
  }

  interface Order{
    name: string;
    street: string;
    number: number;
    email: string;
    takeAway: boolean;
    apartmentNumber: string;
    annotation: string;
    cart: Cart[];
    paymentMethod: string;
    firstPurchase: boolean;
  }

  interface Cart{
    product: CartItem[];
    quantity: number;
  }

  export type { Product, CartItem, ProductsProps, Category, Order, Cart };
