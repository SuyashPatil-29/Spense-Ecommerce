import Link from 'next/link'
import React from 'react'
import urlFor from "../../../LIB/urlFor"
import Image from 'next/image'
import "../styles/globals.css"

const BestProductsDisplay = ({product :{image, productName, slug, price}}) => {
  return (
    <Link href={`/shop/${slug.current}`} className='min-w-fit min-h-fit'>
        <div className='product-card'>
            <Image className='product-image bg-white bg-opacity-40' src={urlFor(image && image[0]).url()} width={250} height={250} alt={productName} />
            <p className='product-name'>{productName}</p>
            <p className='text-white'>Rs {price}</p>
        </div></Link>
  )
}

export default BestProductsDisplay