"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../../../LIB/client';
import ProductDisplay from '../components/ProductDisplay';

const query = `*[_type == "vendor"].products[]`;

function Shop() {
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await client.fetch(query);
      setProductArray(productsData);
    }
    fetchProducts();
  }, []);

  return (
    <div className='my-9 mx-16'>
      {productArray.map((product) => (
        <ProductDisplay key={product._id} product={product}/>
      ))}
    </div>
  );
}

export default Shop;
