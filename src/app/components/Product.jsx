import Link from 'next/link'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import Image from 'next/image'

const Product = ({product :{image, productName, slug, price, quantity}}) => {
  return (
    <Link href={`/shop/${slug.current}`}>
        <div className='product-card'>
            <Image className='product-image' src={urlFor(image && image[0]).url()} width={250} height={250} alt={productName} />
            <p className='product-name'>{productName}</p>
            <p className='product-quantity'>Quantity remaining: {quantity}</p>
            <p className='product-price'>Rs {price}</p>
        </div></Link>
  )
}

export default Product