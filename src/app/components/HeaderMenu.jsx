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

const HeaderMenu = () => {
  const { isGuest, setIsGuest } = useStateContext();
  const [user] = useAuthState(auth);
  const userId = user ? user.uid : null;
  const [userData, loading, error] = useDocument(userId && db.collection('users').doc(userId));
  const { push } = useRouter();

  useEffect(() => {
    if (user && !loading && !error && userData === null) {
      // Create a new document for the user if it doesn't exist
      db.collection('users')
        .doc(userId)
        .set({ coins: 0 });
    }
  }, [user, loading, error, userData, userId]);


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
    <div className="menu bg-gray-800 w-[90vw] rounded-box absolue mt-10 -mb-8 gap-3">
        {user ? (
            <div className="flex items-center">
              <span className="text-xl text-white">{coins}</span>
              <GiTwoCoins className="coin-icon text-yellow-400" />
            </div>
        ) : null}
        <hr className="w-full border-b-2 border-pink-500"/>

        {user || isGuest ? (
          <div className="flex flex-col gap-3">
            <Link
              href="/shop?page=1"
              className={`relative lg:text-xl md:text-xl uppercase text-xl text-white`}
            >
              Shop
            </Link>
            <hr className="w-full border-b-2 border-pink-500"/>
            <Link
              href="/vendors"
              className={`relative lg:text-xl md:text-xl uppercase text-xl text-white`}
            >
              Store
            </Link>
          </div>
        ) : null}
        <hr className="w-full border-b-2 border-pink-500"/>
        
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className={`relative lg:text-xl md:text-xl uppercase text-xl text-white`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleViewAsGuest}
              className={`relative lg:text-xl md:text-xl uppercase text-xl text-white`}
            >
              {isGuest ? 'Login' : 'View as Guest'}
            </button>
          )}
        </div>
    </div>
  );
};

export default HeaderMenu;
