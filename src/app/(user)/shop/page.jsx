"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../../../../LIB/client';
import ProductDisplay from '../../components/ProductDisplay';

const query = `*[_type == "vendor"].products[]`;

export const generateStaticParams = async () => {
  const slugsData = groq`
  *[_type == "vendor"].products[]{
    slug
  }
  `;

  const slugs = await client.fetch(slugsData)
  const slugRoutes = slugs.map((slug) => slug.slug.current)
  return slugRoutes.map(slug => ({ slug }))
}

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
    <div className='my-9 lg:mx-16 mx-auto'>
      {productArray.map((product) => (
        <ProductDisplay key={product.slug.current} product={product}/>
      ))}
    </div>
  );
}

export default Shop;
