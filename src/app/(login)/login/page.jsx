"use client"
import React from 'react'
import { auth, provider } from '../../../../LIB/firebase';
import { useRouter } from "next/navigation"
import Link from 'next/link';




const Login = () => {
    const {push} = useRouter()
    const signIn = (e)=>{
        e.preventDefault();
        
        auth.signInWithPopup(provider)
        .then(()=> push("/"))
        .catch((error)=>alert(error.message))
    }


    return (
        <div className=" h-[80vh] grid bg-black relative">
      <div className='flex flex-col justify-center items-center'>
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            WELCOME TO <span className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">SpenseStore</span> 
        </h1>
          <p className=" text-[rgb(124,134,227)] leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Login to your account to continue or continue as a guest.
          </p>
        <button
          className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out max-w-[200px]"
          type="button"
          onClick={signIn}
        >
          Log in using Google
        </button>
        <Link href="/admin/desk/vendor" className='text-pink-700 underline absolute bottom-2'>Log In As Vendor/Admin</Link>
      </div>
      </div>
    );
  };
  
  export default Login;
  