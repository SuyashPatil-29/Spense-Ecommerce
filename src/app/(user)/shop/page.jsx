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
    <div className='my-9 lg:mx-16 mx-auto min-h-screen'>
      {pageProductsArray.map((product) => (
        <ProductDisplay key={product.slug.current} product={product}/>
      ))}

      <ul className='justify-center flex items-center -space-x-px mt-20' aria-label="Page navigation example">
        {currentPage - 1 >= 1 ? (
          <Link href={`/shop?page=${currentPage - 1}`}>
          <li>
            <p className="block px-4 py-3 leading-tight rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Previous</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </p>
          </li>
          </Link>
        ) : (
        <div>
        <li>
            <p className="block px-4 py-3 leading-tight rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Previous</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </p>
          </li>
          </div>
        )}
        {pageNumbers.map((number) => (
          <Link href={`/shop?page=${number}`} key={number} className={currentPage === number ? "bg-white" : null}>
          <li>
            <p className={currentPage === number ? "px-4 py-3 leading-tight bg-gray-200 border-gray-700 text-gray-800 hover:bg-gray-700 hover:text-white" : "px-4 py-3 leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"}>{number}</p>
          </li>
          </Link>
            ))}
        {currentPage + 1 <= totalPages ? (
          <Link href={`/shop?page=${currentPage + 1}`}>
          <li>
            <p className="block px-4 py-3 leading-tight rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Next</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </p>
          </li>
          </Link>
        ) : (
          <div>
          <li>
            <p className="block px-4 py-3 leading-tight rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Next</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </p>
          </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Shop;
