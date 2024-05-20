import React, { useState, useEffect } from 'react';
// import Discounts from '../../components/discounts/discounts';
import Filters from '../../components/filters/filters.tsx';
import Products from '../../components/products/products.tsx';
import apiData from '../../db/API.json'; // Assuming API.json is properly imported
import { Category, Product } from '../../types';
import './homepage.css'


const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    // Group products by category for the filters using category id
    const categories = apiData.map((item: Category) => ({
      id: item.id,
      category: item.name,
      products: item.products
    }));


    useEffect(() => {
      const products: Product[] = apiData.flatMap((item: Category) => item.products); // Added type annotation for item
      setFilteredProducts(products);
    }, [ setFilteredProducts])


    useEffect(() => {
      if (selectedCategory !== '') {
        const categoryData: Category | undefined = apiData.find((item: Category) => item.name === selectedCategory ); // Added type annotation for categoryData
        if (categoryData) {
          setFilteredProducts(categoryData.products);
        } else {
          setFilteredProducts([]);
        }
      } else {
        const products: Product[] = apiData.flatMap((item: Category) => item.products); // Added type annotation for item
        setFilteredProducts(products);
      }
    }, [selectedCategory,  setFilteredProducts]) 

    useEffect(() => {
      const results = filteredProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(results);
    }, [searchTerm, filteredProducts]);

    useEffect(() => {
      if(searchResults.length > 0){
        setShownProducts(searchResults);
      }else{
        setShownProducts(filteredProducts);
      }
    }, [searchResults, filteredProducts]);
    
  return (
    <div>
      <div className='bannerContainer'>
        <img src='/images/baner.png' />
      </div>
      {/* <Discounts products={discounts} /> */}
      <div>
        <form id="searchForm">
          <input 
          id="searchBar" 
          type="text" 
          placeholder="Busqueda" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button id="searchBtn">
            <img src="/images/search.svg" alt="search" />
          </button>
        </form>
      </div>
      <div id='mainDisplay'>
        {isMobile ? (
          <>
            <button className='filterBtn' onClick={() => setFiltersOpen(!filtersOpen)}>
              Filtros
            </button>
            {filtersOpen && (
              <Filters
              categories={categories.map(({ category, products }) => ({ category, products }))}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            )}
          </>
        ) : (
          <Filters
          categories={categories.map(({ category, products }) => ({ category, products }))}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        )}
        <Products products={shownProducts} />
      </div>
    </div>
  );
};

export default Homepage;
