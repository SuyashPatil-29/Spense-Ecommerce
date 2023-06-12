import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import "../globals.css"

const HeroBanner = ({heroBanner}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1 >{heroBanner.largeText1}</h1>
        <Image src={urlFor(heroBanner.image).url()} alt='headphones' className='hero-banner-image' width={500} height={500}/>

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button" className=" shadow-2xl shadow-black hover:opacity-80">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner