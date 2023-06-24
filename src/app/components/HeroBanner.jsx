import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import "../styles/globals.css"

const HeroBanner = ({heroBanner}) => {
  return (
    <div className="p-[100px] sm:p-[40px] rounded-[15px] h-[500px] leading-tight w-full bg-slate-300 bg-opacity-40 flex-row relative mx-auto">
      <div className='flex justify-around items-center lg:gap-0 md:gap-0 gap-8'>
      <div className='max-w-1/2'>
        <p className="text-xl text-black">{heroBanner.smallText}</p>
        <h1 className='lg:text-[4rem] md:text-[4rem] text-[2rem] mt-[4px] font-semibold text-black'>{heroBanner.midText}</h1>
        <p className=' text-white lg:text-9xl md:text-9xl text-5xl lg:-ml-5 md:-ml-5 uppercase'>{heroBanner.largeText1}</p>
      </div>
        <Image src={urlFor(heroBanner.image).url()} alt='headphones' className={`lg:block transform max-w-1/2 -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-12`} width={450} height={450} priority/>
      </div>
        <div>
          <Link href={`/shop`} className='absolute lg:bottom-7 md:bottom-7 bottom-32 lg:left-36 left-6'>
            <button type="button" className="rounded-[15px] px-8 py-3 bg-red-600 text-white border-none mt-40 text-base font-medium cursor-pointer z-50 shadow-2xl shadow-black hover:opacity-80 hover:scale-110 transition duration-300 ease-in-out">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <p className='text-white'>Description</p>
            <p className='text-white'>{heroBanner.desc}</p>
          </div>
        </div>
    </div>
  )
}

export default HeroBanner