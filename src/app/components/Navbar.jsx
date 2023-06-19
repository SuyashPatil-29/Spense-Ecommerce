"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import "../styles/globals.css";
import { useStateContext } from '../../../context/StateContext';

import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className={`flex justify-between fixed w-full z-[99999] bg-transparent top-3 ml-2`}>
      <Link href="/">
        <span className="text-xl font-bold tracking-tight lg:text-4xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">SpenseStore</span>
      </Link>
      <div className='flex items-center justify-between lg:gap-x-14 md:gap-x-10 gap-x-3 lg:mr-16 md:mr-16 mr-9'>
      <Link href="/shop" className={`relative text-2xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}>Shop</Link>

        <Link href="/vendors" className={`relative text-2xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}>Store</Link>
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
