"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import "../styles/globals.css";
import { useStateContext } from '../../../context/StateContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cart from './Cart';
import { auth, provider } from "../../../LIB/firebase"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, isGuest, setIsGuest } = useStateContext();
  const [user] = useAuthState(auth);
  const { push } = useRouter();

  const viewAsGuest = (e) => {
    e.preventDefault();
    setIsGuest(true);
    push("/");
  }

  const navigateTo = () => {
    if (isGuest) {
      push("/login");
    } else {
      auth.signOut();
      push("/login");
    }
  }

  return (
    <div className={`flex justify-between fixed w-full z-[99999] bg-transparent top-3 ml-2`}>
      <Link href="/">
        <span className="font-bold tracking-tight lg:text-4xl md:text-3xl text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">SpenseStore</span>
      </Link>
      <div className='flex items-center justify-between lg:gap-x-12 md:gap-x-10 gap-x-3 lg:mr-16 md:mr-16 mr-9'>

        {user ?
          (
            <div className='flex justify-between lg:gap-x-12 md:gap-x-10 gap-x-3'>
              <Link href="/shop?page=1" className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}>Shop</Link>
              <Link href="/vendors" className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}>Store</Link>
            </div>
          )
          :
          null
        }

        <button className={`relative lg:text-xl md:text-2xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}
          onClick={!user ? viewAsGuest : navigateTo}>
          {!user ? (isGuest ? "Login" : "View as Guest") : "Logout"}
        </button>

        {user ? (
          <button type='button' className='cart-icon' onClick={() => { setShowCart(true) }}>
            <AiOutlineShopping />
            <span className='cart-item-qty bottom-4 relative'>{totalQuantities.toString()}</span>
          </button>
        ) : null}

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
