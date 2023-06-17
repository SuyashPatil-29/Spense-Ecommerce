import React from 'react'
import { client } from '../../../LIB/client'
import { groq } from 'next-sanity';
import VendorDisplay from '../components/VendorDisplay';

const vendorsQuery = groq`
  *[_type == "vendor"]
  `

async function VendorsPage() {
    const vendors = await client.fetch(vendorsQuery)
  return (
    <div className='flex gap-6 justify-center items-center'>
        {vendors.map((vendor)=>{
            return <VendorDisplay key={vendor._id} vendor={vendor} />
        })}
    </div>
  )
}

export default VendorsPage