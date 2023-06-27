"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import { toast } from "react-hot-toast";

const PaymentsSuccess = () => {
  const {push} = useRouter();

  useEffect(() => {
    const toastId = toast.success((`Payment successful!`));

    const timeout = setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      toast.dismiss(toastId);
    };
  }, []);

  const handleContinueShopping = () => {
    localStorage.clear(); // Clear browser local storage data
    push("/"); // Navigate to home page
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='my-4 text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left'>Thank you for your purchase.</h1>
        <button onClick={handleContinueShopping} className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-6 min-w-[250px] text-center">Continue Shopping</button>
      </div>
    </div>
  );
}

export default PaymentsSuccess;

