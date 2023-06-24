import React from 'react'
import urlFor from '../../../LIB/urlFor'
import Image from 'next/image'
import Link from 'next/link'

const FooterBanner = ({footerBanner : {discount, largeText1, largeText2, saleTime, smallText, midText, desc, buttonText, image}}) => {
  return (
    <div className='lg:py-24 md:py-12 py-12 lg:px-10 md:px-5 rounded-2xl relative lg:h-96 md:h-80 h-60 leading-none text-white w-full mt-32 bg-[#f02d34] bg-opacity-20'>
    <div className='flex justify-between'>
        <div className='max-w-[33.33%]'>
            <p>{discount}% OFF</p>
            <p className=' lg:text-[80px] md:text-[40px] text-[20px] font-black lg:ml-6 md:ml-4'>{largeText1}</p>
            <p>{largeText2}</p>
            <p className='lg:m-5 md:m-5 mt-5 ml-1'>{saleTime}</p>
        </div>
        <div className='max-w-[33.33%]'>
            <Image src={urlFor(image).url()} width={500} height={500} className='absolute lg:left-[25%] lg:-top-[25%] md:-top-[25%] -top-[18%] left-[25%] rounded-2xl lg:h-[500px] lg:w-[500px] md:h-[400px] md:w-[400px] h-[150px] w-[150px]' alt='footerBanner' />
        </div>
        <div className='max-w-[33.33%]'>
            <p className='lg:text-lg md:text-base text-sm'>{smallText}</p>
            <p className=' font-extrabold lg:text-6xl md:text-4xl text-2xl'>{midText}</p>
            <p className='lg:text-lg md:text-base text-sm'>{desc}</p>
            <Link href={`/shop`}>
                <button className=' rounded-2xl py-2 px-4 bg-white text-red-600 border-none lg:mt-10 md:mt-8 mt-6 md:inset-auto md:bottom-auto md:left-auto md:right-auto lg:inset-auto lg:bottom-auto lg:left-auto lg:right-auto absolute left-3 bottom-7 text-base font-semibold cursor-pointer shadow-2xl shadow-black hover:opacity-80 hover:scale-110 transition duration-300 ease-in-out' type='button'>{buttonText}</button>
            </Link>
        </div>
    </div>
</div>
  )
}

export default FooterBanner