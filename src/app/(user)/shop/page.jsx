"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../../../../LIB/client';
import ProductDisplay from '../../components/ProductDisplay';
import Link from 'next/link';

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

function Shop({searchParams}) {
  const [productArray, setProductArray] = useState([]);
  const [pageProductsArray, setPageProductsArray] = useState([]);

  const totalItems = productArray.length;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage =  1;

  if(Number(searchParams.page)>=1){
    currentPage = Number(searchParams.page);
  }
    
  let offset = (currentPage - 1) * itemsPerPage;
  let limit = itemsPerPage;

  const query = `*[_type == "vendor"].products[] | order(createdAt asc)[${offset}...${(offset + limit)}]`
  const productsQuery = `*[_type == "vendor"].products[] | order(createdAt asc)`
  

  useEffect(() => {
    async function fetchPageProducts() {
      const pageProductsData = await client.fetch(query);
      setPageProductsArray(pageProductsData);
    }
    fetchPageProducts();

    async function fetchProducts() {
      const productsData = await client.fetch(productsQuery);
      setProductArray(productsData);
    }
    fetchPageProducts();
    fetchProducts();
  }, [query, productsQuery]);

  let pageNumbers = [];

  for(let i=1 ; i<totalPages +1; i++){
    if(i<1) continue;
    if(i>totalPages) break;
    pageNumbers.push(i);
  }

  return (
    <div className='my-9 lg:mx-16 mx-auto'>
      {pageProductsArray.map((product) => (
        <ProductDisplay key={product.slug.current} product={product}/>
      ))}

      <div className='flex justify-center mt-10'>
        {currentPage - 1 >= 1 && (
          <Link href={`/shop?page=${currentPage - 1}`}>
            <p className='border-2 border-black py-2 px-2'>{"<<"}</p>
          </Link>
        )}
        {pageNumbers.map((number) => (
          <Link href={`/shop?page=${number}`} key={number} className={`border-2 border-black py-2 px-2 ${searchParams.page === number ? "bg-white text-black" : null}`}>
            {number}
          </Link>
            ))}
        {currentPage + 1 <= totalPages && (
          <Link href={`/shop?page=${currentPage + 1}`}>
                <p className='border-2 border-black py-2 px-2'>{">>"}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Shop;
