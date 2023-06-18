"use client"

import React, {createContext, useContext, useState, useEffect} from "react";
import {toast} from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(0);
    let foundProduct;
    let index;

    const onAdd = (product, addedQuantity) => {
      console.log(cartItems);
      const checkProductInCart = cartItems.find((item) => item._key === product._key);
    
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * addedQuantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + addedQuantity);
      setCartItems((prevCartItems) => {
        if (checkProductInCart) {
          const updatedCartItems = prevCartItems.map((cartProduct) => {
            if (cartProduct._key === product._key) {
              return {
                ...cartProduct,
                addedQuantity: cartProduct.addedQuantity + addedQuantity,
              };
            }
            return cartProduct;
          });
          return updatedCartItems;
        } else {
          return [...prevCartItems, { ...product, addedQuantity }];
        }
      });
      toast.success(`${addedQuantity} ${product.productName} added to the cart.`);
    };
    
    const toggleCartItemQuanitity = (_key, value) => {
      console.log(foundProduct);
      foundProduct = cartItems.find((item) => item._key === _key)
      index = cartItems.findIndex((product) => product._key === _key);
  
      if(value === 'inc') {
        if(foundProduct.addedQuantity < foundProduct.quantity) {
          setCartItems(cartItems.map((item) => item._key === _key ? { ...foundProduct, addedQuantity: foundProduct.addedQuantity + 1 } : item));
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        }
        else alert('Maximum quantity reached!')
      }
      else if(value === 'dec') {
        if (foundProduct.addedQuantity > 1) {
          setCartItems(cartItems.map((item) => item._key === _key ? { ...foundProduct, addedQuantity: foundProduct.addedQuantity - 1 } : item));
          setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        }
      }
    }
    
     
      const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 0) return 0;
         
          return prevQty - 1;
        });
      }

    return (
        <Context.Provider 
        value={
            {
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                setQty,
                toggleCartItemQuanitity,
            }
        }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);