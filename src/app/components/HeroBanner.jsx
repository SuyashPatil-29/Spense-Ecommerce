import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import "../styles/globals.css"

const HeroBanner = ({heroBanner}) => {
  return (
    <div className="hero-banner-container bg-slate-300 bg-opacity-40">
      <div className=''>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1 >{heroBanner.largeText1}</h1>
        <Image src={urlFor(heroBanner.image).url()} alt='headphones' className={`hero-banner-image lg:block md:block hidden transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-12`} width={500} height={500}/>
        <div>
          <Link href={`/shop`}>
            <button type="button" className=" shadow-2xl shadow-black hover:opacity-80 hover:scale-110 transition duration-300 ease-in-out">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5 className='text-white'>Description</h5>
            <p className='text-white'>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner