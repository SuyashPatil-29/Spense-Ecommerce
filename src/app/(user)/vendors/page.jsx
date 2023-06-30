import React from 'react'
import { client } from '../../../../LIB/client'
import { groq } from 'next-sanity';
import VendorDisplay from '../../components/VendorDisplay';

const vendorsQuery = groq`
  *[_type == "vendor"]
  `

async function VendorsPage() {
    const vendors = await client.fetch(vendorsQuery)
  return (
    <div className='lg:flex-row md:flex-row flex flex-col gap-6 justify-center items-center min-h-[80vh] min-w-[90vw]'>
        {vendors.map((vendor)=>{
            return <VendorDisplay key={vendor._id} vendor={vendor} />
        })}
    </div>
  )
}

export default VendorsPage