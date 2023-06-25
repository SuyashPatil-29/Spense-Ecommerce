import Link from 'next/link'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import Image from 'next/image'
import "../styles/globals.css"

const Product = ({product :{image, productName, slug, price}}) => {
  return (
    <Link href={`/shop/${slug.current}`} className='lg:min-w-fit lg:min-h-fit md:min-w-fit md:min-h-fit h-[150px] w-[150px]'>
        <div className='product-card'>
            <Image className='product-image bg-white bg-opacity-40' src={urlFor(image && image[0]).url()} width={250} height={250} alt={productName} />
            <p className='product-name whitespace-normal'>{productName}</p>
            <p className='text-white'>Rs {price}</p>
        </div></Link>
  )
}

export default Product