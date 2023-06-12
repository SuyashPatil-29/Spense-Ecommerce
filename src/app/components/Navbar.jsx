"use client"
import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/" className='text-3xl text-purple-400'>Spense Store</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => {}}>
        <AiOutlineShopping />
        <span className='cart-item-qty bottom-4 relative'>0</span>
      </button>
    </div>
  )
}

export default Navbar