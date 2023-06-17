import Link from 'next/link'
import React from 'react'

function CategoryHolder({category}) {
    const slug = category.name.toLowerCase().replace(/ /g, '-')
  return (
    <Link href={`/category/${slug}`} className='text-center hover:bg-gray-200 p-3 hover:text-black font-semibold text-white cursor-pointer hover:bg-opacity-50 hover:scale-105 transition-all duration-200 ease-in-out'>{category.name.toUpperCase()}</Link>
  )
}

export default CategoryHolder