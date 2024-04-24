import React, { useState, useEffect } from 'react';
// import Discounts from '../../components/discounts/discounts';
import Filters from '../../components/filters/filters.tsx';
import Products from '../../components/products/products.tsx';
import apiData from '../../db/API.json'; // Assuming API.json is properly imported
import './homepage.css'


const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
  interface APIProduct {
    id: number;
    name: string;
    version: string;
    photoPath: string | null;
    enabled: boolean;
    order: number;
    products: Product[];
  }

    // Group products by category for the filters using category id
    const categories: APIProduct[] = apiData.map(item => ({
      id: item.id,
      category: item.name,
      products: item.products
    }));

    useEffect(() => {
      const products: Product[] = apiData.flatMap((item: APIProduct) => item.products); // Added type annotation for item
      setFilteredProducts(products);
    }, [apiData, setFilteredProducts])

    useEffect(() => {
      if (selectedCategory !== '') {
        const categoryData: APIProduct | undefined = apiData.find(item => item.name === selectedCategory ); // Added type annotation for categoryData
        if (categoryData) {
          setFilteredProducts(categoryData.products);
        } else {
          setFilteredProducts([]);
        }
      } else {
        const products: Product[] = apiData.flatMap((item: APIProduct) => item.products); // Added type annotation for item
        setFilteredProducts(products);
      }
    }, [selectedCategory, apiData, setFilteredProducts])  
  return (
    <div>
      {/* <Discounts products={discounts} /> */}
      <div>
        <form id="searchForm">
          <input id="searchBar" type="text" placeholder="Busqueda" />
          <button id="searchBtn">
            <img src="/images/search.svg" alt="search" />
          </button>
        </form>
      </div>
      <div id='mainDisplay'>
        <Filters
          categories={categories.map(({ category }) => category)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Homepage;
