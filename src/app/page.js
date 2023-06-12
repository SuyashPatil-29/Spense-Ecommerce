"use client"

import React from 'react'
import "./globals.css"
import { Product, Footer, HeroBanner, Cart, Navbar, FooterBanner, ComponentLayout } from './components'
import { client } from '../../LIB/client'
import { groq } from 'next-sanity';

const query = `*[_type == "vendor"]{products}`;

const bannerQuery = groq`
*[_type == "banner"]{
...,
}
`;

export default async function HomePage (){
  const vendors = await client.fetch(query);
  const bannerData = await client.fetch(bannerQuery);

  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>The best of Spense Store</p>
    </div>

        <div className="products-container">
          {vendors.map((vendor) => {
              return (
                <div key={vendor._id} className="products-container">
                  {vendor.products.slice(0, 4).map((product) => {
                    return <Product key={product.slug.current} product={product} />
                  })}
                  </div>
              )})}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}
