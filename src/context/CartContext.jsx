import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // -----------------------------
  // 1️⃣ Current user state
  // -----------------------------
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  // -----------------------------
  // 2️⃣ Cart & Wishlist state
  // -----------------------------
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // -----------------------------
  // 3️⃣ Load cart & wishlist when currentUser changes
  // -----------------------------
  useEffect(() => {
    if (currentUser) {
      const key = currentUser.email;
      const savedCart = JSON.parse(localStorage.getItem(`cart_${key}`)) || [];
      const savedWishlist =
        JSON.parse(localStorage.getItem(`wishlist_${key}`)) || [];
      setCartItems(savedCart);
      setWishlist(savedWishlist);
    } else {
      setCartItems([]);
      setWishlist([]);
    }
  }, [currentUser]);

  // -----------------------------
  // 4️⃣ Save cart & wishlist whenever they change
  // -----------------------------
  useEffect(() => {
    if (currentUser) {
      const key = currentUser.email;
      localStorage.setItem(`cart_${key}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  useEffect(() => {
    if (currentUser) {
      const key = currentUser.email;
      localStorage.setItem(`wishlist_${key}`, JSON.stringify(wishlist));
    }
  }, [wishlist, currentUser]);

  // -----------------------------
  // 5️⃣ Cart functions
  // -----------------------------
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // -----------------------------
  // 6️⃣ Wishlist functions
  // -----------------------------
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // -----------------------------
  // 7️⃣ Cart total
  // -----------------------------
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // -----------------------------
  // 8️⃣ Logout function
  // -----------------------------
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCartItems([]);
    setWishlist([]);
  };

  return (
    <CartContext.Provider
      value={{
        currentUser,
        setCurrentUser, // required to update user on login
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
