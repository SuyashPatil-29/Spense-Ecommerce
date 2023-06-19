"use client"
import Link from 'next/link';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import "../styles/globals.css";
import { useStateContext } from '../../../context/StateContext';

import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  
  return (
    <div className='flex justify-between ml-2'>
      <Link href="/">
        <span className="text-xl font-bold tracking-tight lg:text-4xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">SpenseStore</span>
      </Link>
      <div className='flex items-center justify-between lg:gap-x-14 md:gap-x-10 gap-x-3 lg:mr-6 md:mr-4 mr-2'>
      <Link href="/shop" className="relative text-white text-2xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">Shop</Link>

        <Link href="/vendors" className="relative text-white text-2xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">Store</Link>
        <button type='button' className='cart-icon' onClick={()=>{setShowCart(true)}}>
          <AiOutlineShopping />
          <span className='cart-item-qty bottom-4 relative'>{totalQuantities.toString()}</span>
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
