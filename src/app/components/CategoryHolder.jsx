import Link from 'next/link'
import React from 'react'

function CategoryHolder({category}) {
    const slug = category.name.toLowerCase().replace(/ /g, '-')
  return (
    <Link href={`/category/${slug}`} className='bg-gray-200 text-center p-2 bg-opacity-30 rounded-3xl text-white cursor-pointer hover:bg-opacity-50 hover:scale-110 transition-all duration-300 ease-in-out'>{category.name}</Link>
  )
}

export default CategoryHolder