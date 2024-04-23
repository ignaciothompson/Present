import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../db/products.json'; // Import the JSON data

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Find the product object based on the ID
    const foundProduct = productData.flatMap((category) => category.products).find((product) => product.id === parseInt(id, 10));

    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.discountPrice && <p>Discount Price: ${product.discountPrice}</p>}
    </div>
  );
};

export default ProductPage;