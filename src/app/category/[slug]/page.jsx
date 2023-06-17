"use client"
import { groq } from 'next-sanity';
import React, { useEffect, useState } from 'react';
import { client } from '../../../../LIB/client';
import ProductDisplay from '../../components/ProductDisplay';

const productsQuery = groq`
  *[_type == "vendor"].products[]
`;

const categoryQuery = groq`
*[_type == "category"]
`;

const CategoryPage = ({ params }) => {
  const [productArray, setProductArray] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await client.fetch(productsQuery);
      setProductArray(productsData);
    }
    fetchProducts();
    async function fetchCategory() {
      const categoryData = await client.fetch(categoryQuery);
      setCategory(categoryData);
    }
    fetchCategory()
  }, []);

  useEffect(() => {
    const filteredProducts = [];

    const fetchCategory = async (product) => {
      const categoryRef = { _type: 'reference', _ref: product.category._ref };

      try {
        const category = await client.getDocument(categoryRef._ref);

        if (
          product.category._ref === category._id &&
          category.name.trim().toLowerCase() === params.slug.trim().toLowerCase()
        ) {
          filteredProducts.push(product);
        }
      } catch (error) {
        console.error('Error retrieving category:', error);
      }
    };

    Promise.all(productArray.map(fetchCategory)).then(() => {
      setProducts(filteredProducts);
    });

  }, [params.slug, productArray]);

  if(!products.length) return (
    <div className='text-white text-3xl'>
      <h1>Loading...</h1>
    </div>
  )

  return (
    <div>
      {products.map((product) => {
        return <ProductDisplay product={product} key={product.slug.current} />;
      })}
    </div>
  );
};

export default CategoryPage;
