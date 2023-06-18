"use client"
import React, { useRef } from 'react';
import { Toast } from 'react-hot-toast';
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import urlFor from '../../../LIB/urlFor';
import { TiDeleteOutline } from 'react-icons/ti';

const Cart = () => {
  const cartRef = useRef();
  const { showCart, setShowCart, cartItems, totalPrice, totalQuantities, toggleCartItemQuanitity, onRemove } = useStateContext();


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className=' lg:w-[700px] md:w-[550px] w-[350px] relative float-right h-screen py-[40px] px-[10px] bg-white'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} className='mx-auto' />
            <h3>Your cart is empty</h3>
            <Link href='/shop'>
              <button type='button' className='btn' onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              return (
                <div className='product' key={index}>
                  <Image
                    src={urlFor(item.image[0]).url()}
                    className='cart-product-image'
                    alt='Product Image'
                    width={180}
                    height={150}
                  />
                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5>{item.productName}</h5>
                      <h4>Rs {item.price}</h4>
                    </div>
                    <div className='flex bottom'>
                      <div className='flex justify-between w-full my-6 max-w-[55%]'>
                        <p className='quantity-desc flex items-center justify-between'>
                          <span className='minus mx-auto' onClick={() => toggleCartItemQuanitity(item._key, 'dec')}>
                            <AiOutlineMinus />
                          </span>
                          <span className='num'>{item.addedQuantity}</span>
                          <span className='plus mx-auto' onClick={() => toggleCartItemQuanitity(item._key, 'inc')}>
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type='button'
                        className=' text-red-600 text-4xl lg:mr-10 md:mr-10 mr-4'
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>Rs {totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type='button' className='btn' onClick={() => setShowCart(false)}>
                  Pay Now
                </button>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
