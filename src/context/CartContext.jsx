import { useEffect, createContext, useState } from "react";
import {
  getCart,
  vaciarCarritoApi,
  actualizarCantidadApi,
  eliminarItemApi,
} from "../helpers/cart";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    getCart()
      .then((data) => {
        if (data && data.cart && data.cart.items) {
          setCartItems(data.cart.items);
          setTotal(data.cart.total || 0);
        } else {
          setCartItems([]);
          setTotal(0);
        }
      })
      .catch((error) => {
        console.log("Error al traer el carrito:", error);
        setCartItems([]);
        setTotal(0);
      });
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = async (itemId) => {
    const data = await eliminarItemApi(itemId);
    if (data) {
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    }
  };

  const restarCantidad = async (itemId) => {
    const item = cartItems.find(
      (i) => (i.producto._id || i.producto.id) === itemId,
    );
    if (!item) return;

    if (item.cantidad > 1) {
      const nuevaCantidad = item.cantidad - 1;
      const data = await actualizarCantidadApi(itemId, nuevaCantidad);

      if (data) {
        setCartItems(data.items || []);
        setTotal(data.total || 0);
      }
    } else {
      await removeFromCart(itemId);
    }
  };

  const clearCart = async () => {
    const data = await vaciarCarritoApi();
    if (data) {
      setCartItems([]);
      setTotal(0);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        restarCantidad,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
