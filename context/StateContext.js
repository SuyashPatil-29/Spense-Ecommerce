"use client"
import { groq } from "next-sanity";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { client } from "../LIB/client";

const Context = createContext();

const discountQuery = groq`
  *[_type == "banner"].discount
`;

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [cardDiscount, setCardDiscount] = useState(0);

  let foundProduct;
  let index;

  
  const onAdd = (product, addedQuantity) => {
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
  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._key === product._key);
    const newCartItems = cartItems.filter((item) => item._key !== product._key);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.addedQuantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.addedQuantity);
    setCartItems(newCartItems);
    toast.success(`${foundProduct.productName} removed from the cart.`);
  };
  
  const toggleCartItemQuanitity = (_key, value) => {
    foundProduct = cartItems.find((item) => item._key === _key);
    index = cartItems.findIndex((product) => product._key === _key);

    if (value === "inc") {
      if (foundProduct.addedQuantity < foundProduct.quantity) {
        setCartItems((cartItems) =>
          cartItems.map((item) =>
          item._key === _key ? { ...foundProduct, addedQuantity: foundProduct.addedQuantity + 1 } : item
          )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      } else {
        alert("Maximum quantity reached!");
      }
    } else if (value === "dec") {
      if (foundProduct.addedQuantity > 1) {
        setCartItems((cartItems) =>
        cartItems.map((item) =>
        item._key === _key ? { ...foundProduct, addedQuantity: foundProduct.addedQuantity - 1 } : item
        )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
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
        onRemove,
        setTotalPrice,
        cardDiscount,
        setCardDiscount
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
