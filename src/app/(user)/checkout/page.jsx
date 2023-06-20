"use client"
import React from 'react';
import Image from 'next/image';
import urlFor from '../../../../LIB/urlFor';
import { useStateContext } from '../../../../context/StateContext';

const Page = () => {
  const { cartItems, qty, totalPrice } = useStateContext();
  return (
    <div className=' bg-slate-300 py-14 mx-10 my-10 rounded-2xl'>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border-black border-2 px-2 py-4 sm:px-6">
          {cartItems.map((item) => {
            return(
                <div key={item.slug.current} className="flex flex-col rounded-lg bg-white bg-opacity-40 space-y-5 sm:flex-row">
              <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={urlFor(item.image[0]).url()}
                alt=""
                height={96}
                width={112}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item.productName}</span>
                <div className='flex justify-start gap-20 items-center'>
                    <span className="float-right text-gray-400">Price : Rs {item.price}</span>
                    <span className="float-right text-gray-400">Quantity : Rs {qty}</span>
                </div>
                <p className="text-lg font-bold">Total Price: Rs {item.price*qty}</p>
              </div>
            </div>
            )
          })}
            
          </div>

          <p className="mt-8 text-lg font-medium">Select Card</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-slate-200"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img className="w-14 object-contain" src="/images/naorr.                .png" alt="Shipping Method 1" />
                <div className="ml-4">
                  <p className="font-semibold">Standard Shipping</p>
                  <p className="text-gray-400">$5.99</p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input className="peer hidden" id="radio_2" type="radio" name="radio" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-slate-200"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img className="w-14 object-contain" src="/images/naorr.png" alt="Shipping Method 2" />
                <div className="ml-4">
                  <p className="font-semibold">Express Shipping</p>
                  <p className="text-gray-400">$12.99</p>
                </div>
              </label>
            </div>
          </form>

          <div className="flex justify-end mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Pay
            </button>
          </div>
        </div>
        <div className="bg-slate-200 p-8">
          <div className="flex flex-col bg-slate-200 rounded-lg p-4">
            <p className="text-lg font-medium">Order Summary</p>
            <div className="mt-4 flex justify-between">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">{totalPrice}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-gray-500">Card Discount</p>
              <p className="font-semibold">0</p>
            </div>
            <div className="border-t border-black mt-4 pt-4 flex justify-between">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-bold">{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

