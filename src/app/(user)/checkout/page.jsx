"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from "react-hot-toast";
import { useStateContext } from '../../../../context/StateContext.js';
import urlFor from '../../../../LIB/urlFor';
import Link from 'next/link.js';
import { groq } from 'next-sanity';
import CardDiscountComponent from "../../components/CardDiscountComponent.jsx"
import { client } from '../../../../LIB/client.js';
import db, {auth } from "../../../../LIB/firebase.js"
import { useRouter } from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth';

const discountQuery= groq`
*[_type == "banner"].discount
`

const cardsQuery = groq`
*[_type == "cards"]{
  cardName,
  discount
}
`




const Page = () => {
  const { cartItems, totalPrice, cardDiscount, paidPrice, setPaidPrice } = useStateContext();
  
  const [discount, setDiscount] = useState([])
  const [cards, setCards] = useState([])
  const [user] = useAuthState(auth);
  const {push} = useRouter();


  // Add the new order to the "orders" collection in Firebase
  const paymentSuccess = () => {
    if(cartItems.length === 0) {
      toast.error("No items in cart!");
      return;
    }
    if(user === null) {
      toast.error("Please login to continue!");
      return;
    }

    const items = cartItems.map(item => ({
      name: item.productName,
      quantity: item.addedQuantity,
    }));
  
    db.collection("orders").add({
      user: user.displayName,
      items: items,
      price: paidPrice
    });
    push("/success")
  };

  useEffect(() => {
    const fetchDiscount = async () => {
      const discountData = await client.fetch(discountQuery);
      setDiscount(discountData);
    }
    fetchDiscount();

    const fetchCard = async () =>{
      const cardData = await client.fetch(cardsQuery);
      setCards(cardData);
    }
    fetchCard();
  },[])

  const discountedPrice = Math.floor(totalPrice - (totalPrice * discount[0] / 100));

  // Check if discountedPrice is NaN
  const formattedDiscountedPrice = isNaN(discountedPrice) ? 'N/A' : Math.floor(discountedPrice);

  const cardDiscountPrice = Math.floor(formattedDiscountedPrice * cardDiscount / 100);
  const formattedCardDiscountPrice = isNaN(cardDiscountPrice) ? 'N/A' : Math.floor(cardDiscountPrice);
  setPaidPrice(formattedDiscountedPrice - formattedCardDiscountPrice)

  return (
    <div className=' bg-white bg-opacity-40 py-14 lg:mx-10 my-10 rounded-2xl border-2 border-black'>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 gap-6">
        <div className="px-4 pt-8  rounded-2xl">
          <p className="text-xl font-medium text-black">Order Summary</p>
          <p className="text-gray-900">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-2xl border-black border-2 px-2 py-4 sm:px-6">
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
                <span className="font-semibold text-black">{item.productName}</span>
                <div>
                    {discount[0] ? (
                    <div className='flex gap-6 float-right'>
                      <p className="line-through text-red-500"><span className='font-semibold text-lg'>Rs {item.price}</span></p>
                      <p className="font-semibold text-black text-lg">Rs {Math.floor(item.price - (item.price*discount[0]/100))}</p>
                    </div>
                    ) : (
                      <p className="font-semibold text-black text-lg float-right">Rs {item.price}</p>
                    )
                    }
                    <span className='float-left text-black'>Qty : {item.addedQuantity}</span>
                </div>
                <p className="text-lg font-bold text-black">Total Price: Rs {Math.floor((item.price-(item.price*discount[0]/100))*item.addedQuantity)}</p>
              </div>
            </Link>
            )
          })}
            
          </div>

        </div>
        <div className=" p-8 rounded-2xl">
          <div className="flex flex-col rounded-lg">
            <p className="text-xl font-medium text-black">Cart Summary</p>
            <div className="mt-4 flex justify-between">
              <p className="text-white text-lg">Subtotal</p>
              <p className="text-lg text-black font-semibold">Rs {formattedDiscountedPrice}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-white text-lg">Card Discount</p>
              <p className="font-semibold text-black text-lg">- Rs {formattedCardDiscountPrice}</p>
            </div>
            <div className="border-t border-black mt-4 pt-4 flex justify-between">
              <p className="text-lg text-black font-medium">Total</p>
              {cardDiscount && cartItems.length > 0 ? (
                <div className='flex gap-6'>
                  <p className="font-bold text-lg text-black line-through">Rs {formattedDiscountedPrice}</p>
                  <p className="font-bold text-black text-lg">Rs {(formattedDiscountedPrice - formattedCardDiscountPrice)}</p>
                </div>
              ) :
              <p className="font-bold text-lg text-black">Rs {formattedDiscountedPrice}</p>
              }
            </div>
          </div>
        <p className="mt-8 text-lg font-medium text-black">Pay With A Card To Avail Exciting Offers</p>
          <form className="mt-5 grid gap-6">
            {cards.map((card, index) => {
              return(
                <CardDiscountComponent key={index} index={index} card={card} />
              )
            })}
          </form>
          <div className="flex justify-end mt-8 bottom-3 right-[135px]">
            <button onClick={paymentSuccess} className="bg-blue-500 w-full place-content-center hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;