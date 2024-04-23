import React, { useState, useEffect } from 'react';
import './homepage.css';
import Discounts from '../../components/discounts/discounts';
import discountsData from '../../db/discounts.json';
import data from '../../db/products.json';
import Filters from '../../components/filters/filters.tsx';
import Products from '../../components/products/products.tsx';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
}

interface CategoryData {
  category: string;
  products: Product[];
}

const Homepage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setDiscounts(discountsData);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = data.find((item) => item.category === selectedCategory);
      if (category) {
        setFilteredProducts(category.products);
      } else {
        setFilteredProducts([]);
      }
    } else {
      setFilteredProducts(data.flatMap((item) => item.products));
    }
  }, [selectedCategory]);

  return (
    <div>
      <Discounts products={discounts} />
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
          categories={data.map(({ category }) => category)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Homepage;