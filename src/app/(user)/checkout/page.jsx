"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useStateContext } from '../../../../context/StateContext.js';
import urlFor from '../../../../LIB/urlFor';
import Link from 'next/link.js';
import { groq } from 'next-sanity';
import { client } from '../../../../LIB/client.js';

const discountQuery= groq`
*[_type == "banner"].discount
`

const Page = () => {
  const { cartItems, qty, totalPrice } = useStateContext();
  const [discount, setDiscount] = useState([])

  useEffect(() => {
    const fetchDiscount = async () => {
      const discountData = await client.fetch(discountQuery);
      setDiscount(discountData);
    }
    fetchDiscount();
  },[])

  const discountedPrice = Math.floor(totalPrice - (totalPrice * discount[0] / 100));

  // Check if discountedPrice is NaN
  const formattedDiscountedPrice = isNaN(discountedPrice) ? 'N/A' : Math.floor(discountedPrice);


  return (
    <div className=' bg-white bg-opacity-40 py-14 lg:mx-10 my-10 rounded-2xl'>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 gap-6">
        <div className="px-4 pt-8 border-2 border-black relative">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-900">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border-black border-2 px-2 py-4 sm:px-6">
          {cartItems.map((item) => {
            return(
                <Link href={`/shop/${item.slug.current}`} key={item.slug.current} className="flex flex-col rounded-lg bg-white bg-opacity-30 space-y-5 sm:flex-row hover:scale-105 transition-all duration-300">
              <Image
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={urlFor(item.image[0]).url()}
                alt=""
                height={96}
                width={112}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item.productName}</span>
                <div>
                    {discount[0] ? (
                    <div className='flex gap-6 float-right'>
                      <p className="line-through text-red-500"><span className='font-semibold text-lg'>{item.price}</span></p>
                      <p className="font-semibold text-lg">{Math.floor(item.price - (item.price*discount[0]/100))}</p>
                    </div>
                    ) : (
                      <p className="font-semibold text-lg float-right">{item.price}</p>
                    )
                    }
                    <span className='float-left text-white'>Qty : {item.addedQuantity}</span>
                </div>
                <p className="text-lg font-bold">Total Price: Rs {Math.floor((item.price-(item.price*discount[0]/100))*item.addedQuantity)}</p>
              </div>
            </Link>
            )
          })}
            
          </div>

          

          <div className="flex justify-end mt-8 absolute bottom-2 right-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Pay
            </button>
          </div>
        </div>
        <div className=" p-8 border-2 border-black">
          <div className="flex flex-col rounded-lg p-4">
            <p className="text-lg font-medium">Order Summary</p>
            <div className="mt-4 flex justify-between">
              <p className="text-white text-lg">Subtotal</p>
              <p className="font-semibold text-lg">{formattedDiscountedPrice}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-white text-lg">Card Discount</p>
              <p className="font-semibold text-lg">0</p>
            </div>
            <div className="border-t border-black mt-4 pt-4 flex justify-between">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-bold">{formattedDiscountedPrice}</p>
            </div>
          </div>
        <p className="mt-8 text-lg font-medium">Select Card</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" id="radio_1" type="radio" name="radio" checked onChange={()=>{}}/>
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-slate-200"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                {/* <img className="w-14 object-contain" src="/images/naorr.                .png" alt="Shipping Method 1" /> */}
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
                {/* <img className="w-14 object-contain" src="/images/naorr.png" alt="Shipping Method 2" /> */}
                <div className="ml-4">
                  <p className="font-semibold">Express Shipping</p>
                  <p className="text-gray-400">$12.99</p>
                </div>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

