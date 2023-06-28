// Login.jsx
"use client"
import React from 'react';
import db, { auth, provider } from '../../../../LIB/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { push } = useRouter();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      const userId = user.uid;

      const userDocRef = db.collection('users').doc(userId);
      const doc = await userDocRef.get();

      if (!doc.exists) {
        // Create a new document for the user if it doesn't exist
        await userDocRef.set({ coins: 0 });
      }

      push('/');
    } catch (error) {
      console.log('Error signing in:', error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  return (
    <div className="h-[80vh] grid bg-black relative pt-28">
      <div className="flex flex-col justify-center items-center">
        <div className="flex lg:flex-row md:flex-row flex-col justify-center items-center">
          <span className="my-4 text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">WELCOME&nbsp;</span>
          <span className="my-4 text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left lg:pb-0 md:pb-0 pb-3">TO&nbsp;</span>
          <span className="font-bold text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 uppercase">SpenseStore</span>
        </div>
        <div className="flex flex-col my-6 justify-around items-center">
          <p className="text-[rgb(124,134,227)] text-base md:text-2xl mb-8 text-center md:text-left">
            Login to your account to start shopping
          </p>
          <p className="text-[rgb(124,134,227)] -mt-4 text-base md:text-2xl mb-4 text-center md:text-left">
            Or view as guest to explore.
          </p>
        </div>
        <button
          className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out min-w-[250px] text-center"
          type="button"
          onClick={signIn}
        >
          Log in using Google
        </button>
        <Link
          href="/admin/desk/vendor"
          className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-6 min-w-[250px] text-center"
        >
          Log In As Vendor/Admin
        </Link>
      </div>
    </div>
  );
};

export default Login;
