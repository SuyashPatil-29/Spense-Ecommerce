"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { GiTwoCoins } from 'react-icons/gi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import db, { auth } from '../../../LIB/firebase';
import { useRouter } from 'next/navigation';
import { useStateContext } from '../../../context/StateContext';
import Cart from './Cart';
import HeaderMenu from './HeaderMenu';

const Navbar = () => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    isGuest,
    setIsGuest
  } = useStateContext();
  const [user] = useAuthState(auth);
  const userId = user ? user.uid : null;
  const [
    userData,
    loading,
    error
  ] = useDocument(userId && db.collection('users').doc(userId));
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (user && !loading && !error && userData === null) {
      // Create a new document for the user if it doesn't exist
      db.collection('users')
        .doc(userId)
        .set({ coins: 0 });
    }
  }, [user, loading, error, userData, userId]);

  const [showTooltip, setShowTooltip] = useState(false);

  const coins = userData?.data()?.coins || 0;

  const handleViewAsGuest = () => {
    setIsGuest((prevIsGuest) => !prevIsGuest); // Toggle isGuest value
    if (isGuest) {
      push('/login');
    } else {
      push('/');
    }
  };

  const handleLogout = async () => {
    setIsGuest(false);
    try {
      await auth.signOut();
      push('/login');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <div className='relative'>
      <div className={`flex justify-between fixed w-full z-[99999] bg-transparent top-3 ml-2`}>
        {user || isGuest ? (
          <Link href='/'>
            <span className='font-bold tracking-tight lg:text-4xl md:text-3xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500'>
              SpenseStore
            </span>
          </Link>
        ) : (
          <div>
            <span className='font-bold tracking-tight lg:text-4xl md:text-3xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500'>
              SpenseStore
            </span>
          </div>
        )}

        <div className='items-center justify-end lg:mr-16 md:mr-16 mr-9 lg:gap-x-10 md:gap-x-10 flex'>
        <div className='items-center justify-between lg:gap-x-10 md:gap-x-10 lg:flex md:flex hidden'>
          {user ? (
            <div
              className='relative cursor-pointer'
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className='flex items-center gap-x-2'>
                <span className='text-xl text-white'>{coins}</span>
                <GiTwoCoins className='coin-icon text-yellow-400' />
              </div>
              {showTooltip && (
                <div className='absolute lg:block md:block hidden  top-full left-1/2 transform -translate-x-1/2 bg-black p-3 text-white rounded whitespace-nowrap'>
                  Use these coins while checking out to avail extra discount.
                </div>
              )}
            </div>
          ) : null}

          {user || isGuest ? (
            <div className='flex justify-between lg:gap-x-12 md:gap-x-10 gap-x-3'>
              <Link
                href='/shop?page=1'
                className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}
              >
                Shop
              </Link>
              <Link
                href='/vendors'
                className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}
              >
                Store
              </Link>
            </div>
          ) : null}

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleViewAsGuest}
                className={`relative lg:text-xl md:text-xl uppercase text-xl transition duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 text-white after:bg-white after:w-0 after:transition-all hover:after:w-full`}
              >
                {isGuest ? 'Login' : 'View as Guest'}
              </button>
            )}
          </div>
        </div>
        {user && (
            <div className="relative lg:ml-0 md:ml-0 ml-28">
              <button
                type="button"
                className="cart-icon"
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <AiOutlineShopping />
                <span className="cart-item-qty bottom-4 relative">
                  {totalQuantities.toString()}
                </span>
              </button>
              {showCart && <Cart />}
            </div>
          )}
        </div>
        <button className='lg:hidden md:hidden block mr-12' onClick={toggleMenu}>
          <span className='sr-only'>Menu</span>
          <svg
            className={`h-6 w-6 text-black dark:text-white`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>
      {open && <HeaderMenu />}
    </div>
  );
};

export default Navbar;
