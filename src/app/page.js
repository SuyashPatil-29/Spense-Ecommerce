"use client"

import React from 'react'
import "./styles/globals.css"
import { Product, Footer, HeroBanner, Cart, Navbar, FooterBanner, ComponentLayout } from './components'
import { client } from '../../LIB/client'
import { groq } from 'next-sanity';
const query = `*[_type == "BestProducts"]`;

const bannerQuery = groq`
*[_type == "banner"]{
...,
}
`;

export default async function HomePage (){
  const bestProducts = await client.fetch(query);
  const bannerData = await client.fetch(bannerQuery);

  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading flex-row justify-center items-center">
    <h1 className="my-4 text-5xl text-white opacity-75 font-bold leading-tight text-center">
      Best<span> </span>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
          Selling<span> </span>
        </span>
      Products
    </h1>
    <p class="leading-norma text-[rgb(122,133,234)] md:text-2xl mb-8 text-center">
            The best of Spense Store
    </p>
    </div>

        <div>
          <div className="products-container">
            {bestProducts.map((product) => {
              return <Product key={product.slug.current} product={product} />
            })}
          </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}
