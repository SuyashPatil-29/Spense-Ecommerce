import React from 'react'
import urlFor from '../../../LIB/urlFor'
import Image from 'next/image'
import Link from 'next/link'

const FooterBanner = ({footerBanner : {discount, largeText1, largeText2, saleTime, smallText, midText, desc, buttonText, image}}) => {
  return (
    <div className='footer-banner-container bg-[#f02d34] bg-opacity-20'>
    <div className='banner-desc'>
        <div className='left'>
            <p>{discount}</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
        </div>
        <div className='right'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <Link href={`/product`}>
                <button className=' shadow-2xl shadow-black hover:opacity-80 hover:scale-110 transition duration-300 ease-in-out' type='button'>{buttonText}</button>
            </Link>
            <Image src={urlFor(image).url()} width={500} height={500} className='footer-banner-image' alt='footerBanner' />
        </div>
    </div>
</div>
  )
}

export default FooterBanner