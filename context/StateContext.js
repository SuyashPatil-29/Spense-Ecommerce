"use client"
import { groq } from "next-sanity";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { client } from "../LIB/client";

const Context = createContext();

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
      } else {
        onRemove(foundProduct);
      }
    }
  };

  const handleDiscountChange = (discountValue) => {
    setCardDiscount(discountValue);
  };

  useEffect(() => {
    // Load cartItems from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    // Load totalPrice from local storage
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }

    // Load totalQuantities from local storage
    const storedTotalQuantities = localStorage.getItem("totalQuantities");
    if (storedTotalQuantities) {
      setTotalQuantities(parseInt(storedTotalQuantities));
    }

    // Load qty from local storage
    const storedQty = localStorage.getItem("qty");
    if (storedQty) {
      setQty(parseInt(storedQty));
    }

    // Load showCart from local storage
    const storedShowCart = localStorage.getItem("showCart");
    if (storedShowCart) {
      setShowCart(storedShowCart === "true");
    }
  }, []);

  useEffect(() => {
    // Save cartItems to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Save totalPrice to local storage
    localStorage.setItem("totalPrice", totalPrice.toString());

    // Save totalQuantities to local storage
    localStorage.setItem("totalQuantities", totalQuantities.toString());

    // Save qty to local storage
    localStorage.setItem("qty", qty.toString());

    // Save showCart to local storage
    localStorage.setItem("showCart", showCart.toString());
  }, [cartItems, totalPrice, totalQuantities, qty, showCart]);

  const value = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    cardDiscount,
    onAdd,
    onRemove,
    toggleCartItemQuanitity,
    setQty,
    handleDiscountChange,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
