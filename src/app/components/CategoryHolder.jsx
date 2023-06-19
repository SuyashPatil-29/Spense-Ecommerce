import Link from 'next/link'
import React from 'react'

function CategoryHolder({category}) {
    const slug = category.name.toLowerCase().replace(/ /g, '-')
  return (
    <Link href={`/category/${slug}`} className='text-center hover:bg-gray-200 p-2 hover:text-black font-semibold text-white cursor-pointer hover:bg-opacity-50 hover:scale-105 transition-all duration-200 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-white after:w-0 after:transition-all hover:after:w-full'>{category.name.toUpperCase()}</Link>
  )
}

export default CategoryHolder