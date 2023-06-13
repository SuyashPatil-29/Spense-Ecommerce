"use client"
import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import "../styles/globals.css"

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/" class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            Spense<span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">Store</span></Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => {}}>
        <AiOutlineShopping />
        <span className='cart-item-qty bottom-4 relative'>0</span>
      </button>
    </div>
  )
}

export default Navbar