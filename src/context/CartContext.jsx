import React, { createContext, useContext, useEffect, useState } from "react";
import { cartService } from "../helpers/cart";
import { UserContext } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartLoading, setCartLoading] = useState(true);
  const totalItems =
    cart.items.reduce((acc, item) => acc + item.cantidad, 0) || 0;
  const { user, authLoading } = useContext(UserContext);

  const fetchCart = async () => {
    try {
      const data = await cartService.getCart();
      if (data && data.items) {
        setCart(data);
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (error) {
      console.warn("Usuario no autenticado o error de conexión");
      setCart({ items: [], total: 0 });
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchCart();
      } else {
        setCart({ items: [], total: 0 });
        setCartLoading(false);
      }
    }
  }, [user, authLoading]);

  const addItem = async (productoId, cantidad) => {
    const updatedCart = await cartService.addToCart(productoId, cantidad);
    setCart(updatedCart);
  };

  const updateQuantity = async (productoId, cantidad) => {
    const updatedCart = await cartService.updateItem(productoId, cantidad);
    setCart(updatedCart);
  };

  const removeItem = async (productoId) => {
    const updatedCart = await cartService.removeItem(productoId);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    await cartService.clearCart();
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        totalItems,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
