"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { toast } from "react-hot-toast";
import {runFireworks} from "../../../../LIB/fireworks.js"

const Success = () => {
  useEffect(() => {
    runFireworks();
    const toastId = toast.success("Payment successful");

    const timeout = setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      toast.dismiss(toastId);
    }
  }, []);

  const handleContinueShopping = () => {
    localStorage.clear(); // Clear browser local storage data
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="success">
        <p className="icon text-green-500">
          <BsBagCheckFill />
        </p>
        <h2 className='text-white'>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:patilsuyash892@gmail.com">
            patilsuyash892@gmail.com
          </a>
        </p>
        <Link href="/">
            <button onClick={handleContinueShopping} className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-4 px-4 rounded-xl focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-6 min-w-[250px] text-center">Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success