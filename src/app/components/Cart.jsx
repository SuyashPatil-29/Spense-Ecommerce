"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Toast, toast } from 'react-hot-toast';
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import urlFor from '../../../LIB/urlFor';
import { TiDeleteOutline } from 'react-icons/ti';
import { groq } from 'next-sanity';
import { client } from '../../../LIB/client';

const discountQuery = groq`
*[_type == "banner"].discount
`;

const Cart = () => {
  const cartRef = useRef();
  const { showCart, setShowCart, cartItems, totalPrice, totalQuantities, toggleCartItemQuanitity, onRemove } = useStateContext();
  const [discount, setDiscount] = useState([]);

  useEffect(() => {
    const fetchDiscount = async () => {
      const discountData = await client.fetch(discountQuery);
      setDiscount(discountData);
    };

    fetchDiscount();
  }, []);

  const handleQuantityChange = (itemKey, action) => {
    const item = cartItems.find((item) => item._key === itemKey);
    const currentQuantity = item.addedQuantity;
    const updatedQuantity = action === 'inc' ? currentQuantity + 1 : currentQuantity - 1;

    if (updatedQuantity > item.quantity) {
      // Display an alert if the updated quantity is more than the available quantity
      toast.error('Items exceed available quantity');
      return;
    }

    toggleCartItemQuanitity(itemKey, action);
  };

  return (
    <div className='cart-wrapper overflow-x-hidden overflow-y-auto' ref={cartRef}>
      <div className=' lg:w-[700px] md:w-[550px] w-[325px] relative max-h-screen min-h-screen float-right mx-0 lg:py-[40px] md:py-[40px] px-[10px] bg-slate-900'>
        <button type='button' className='cart-heading text-white' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading text-white'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart text-white place-content-center'>
            <AiOutlineShopping size={150} className='mx-auto mt-40' />
            <h3 className='text-white mt-3'>Your cart is empty</h3>
            <Link href='/shop'>
              <button
                type='button'
                className='hover:bg-red-500 text-white mt-10 lg:w-[450px] md:w-[400px] w-[250px] bg-red-600 py-4 rounded-2xl hover:scale-105 mx-auto text-xl font-semibold'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              const handleRemove = () => {
                onRemove(item);
              };

              const handleDecrease = () => {
                handleQuantityChange(item._key, 'dec');
              };

              const handleIncrease = () => {
                handleQuantityChange(item._key, 'inc');
              };

              return (
                <div className='product bg-white bg-opacity-20 rounded-2xl text-white mx-2 my-3 max-h-[250px]' key={index}>
                  <Image src={urlFor(item.image[0]).url()} className='cart-product-image' alt='Product Image' width={180} height={150} />
                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5 className='text-white'>{item.productName}</h5>
                      <p className='text-white whitespace-nowrap'>Rs {Math.floor(item.price - (item.price * discount[0]) / 100) * item.addedQuantity}</p>
                    </div>
                    <div className='flex bottom justify-between'>
                      <div className='flex justify-between w-full my-6 lg:max-w-[55%] md:max-w-[55%] max-w-[85%] lg:ml-0 md:ml-0 -ml-16'>
                        <p className='quantity-desc flex items-center justify-between'>
                          <span className='minus mx-auto' onClick={handleDecrease}>
                            <AiOutlineMinus />
                          </span>
                          <span className='num text-white'>{item.addedQuantity}</span>
                          <span className='plus mx-auto' onClick={handleIncrease}>
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button type='button' className='text-red-600 text-4xl lg:mr-10 md:mr-10 mr-4' onClick={handleRemove}>
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className='bg-slate-900 absolute bottom-0 right-[1px] py-8 px-[35px] w-full'>
            <div className='flex justify-between items-center my-auto text-xl text-white mb-3'>
              <h3>Subtotal:</h3>
              <h3>Rs {Math.floor(totalPrice - (totalPrice * discount[0]) / 100)}</h3>
            </div>
            <div className='btn-container'>
              <Link href='/checkout'>
                <button
                  type='button'
                  className='hover:bg-red-500 text-white lg:w-[450px] md:w-[400px] w-[250px] bg-red-600 py-4 rounded-2xl hover:scale-105 mt-2 text-xl font-semibold'
                  onClick={() => setShowCart(false)}
                >
                  Pay Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
