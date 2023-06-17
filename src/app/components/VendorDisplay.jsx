import Image from 'next/image'
import React from 'react'
import urlFor from '../../../LIB/urlFor'
import Link from 'next/link'

function VendorDisplay({vendor}) {
  return (
    
    <Link href={`/vendors/${vendor.name}`} className='cursor-pointer bg-white bg-opacity-30 h-[200px] w-[300px] rounded-lg hover:scale-105 hover:border-white hover:border-4 flex flex-col justify-center items-center'>
        <Image src={urlFor(vendor.mainImage).url()} width={100} height={100} alt={vendor.name} className='mb-2' /> 
        <h1 className='text-2xl text-white font-semibold'>{vendor.name}</h1>
    </Link>
  )
}

export default VendorDisplay