"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../../../../../LIB/client';
import ProductDisplay from '../../../components/ProductDisplay';

const query = `*[_type == "vendor"]`;

function Vendor({params}) {
  const [vendorArray, setVendorArray] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchVendors() {
      const productsData = await client.fetch(query);
      setVendorArray(productsData);
    }
    fetchVendors();
    vendorArray.map((vendor) => {
        if(vendor.name === decodeURIComponent(params.slug)){
            setProducts(vendor.products)
        }})
  }, [params.slug, vendorArray]);

  return (
    <div className='my-9 lg:mx-16 mx-auto'>
        <h1 className='text-3xl font-semibold text-white mt-5 mb-14'>Best of {decodeURIComponent(params.slug)}</h1>
        {products.map((product) => (
            <ProductDisplay key={product.slug.current} product={product} />
        ))
        }
    </div>
  );
}

export default Vendor;
