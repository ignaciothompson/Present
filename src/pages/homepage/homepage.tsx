import React, { useState, useEffect } from 'react';
import './homepage.css';
import Discounts from '../../components/discounts/discounts';
import discountsData from '../../db/discounts.json';
import data from '../../db/products.json';
import Filters from '../../components/filters/filters.tsx';
import Products from '../../components/products/products.tsx';
import { Product, CategoryData } from '../../types.ts';


const Homepage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  useEffect(() => {
    setDiscounts(discountsData);
  }, []);

  useEffect(() => {
    setCategoriesData(data.map(item => ({ category: item.category, products: item.products })));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryData = categoriesData.find((categoryData) => categoryData.category === selectedCategory);
      if (categoryData) {
        setFilteredProducts(categoryData.products);
      } else {
        setFilteredProducts([]);
      }
    } else {
      setFilteredProducts(categoriesData.flatMap((categoryData) => categoryData.products));
    }
  }, [selectedCategory, categoriesData]);

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
          categories={categoriesData.map(({ category }) => category)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Homepage;