import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cartService } from "../helpers/cart";
import { UserContext } from "./UserContext";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartLoading, setCartLoading] = useState(true);
  const totalItems =
    cart.items.reduce((acc, item) => acc + item.cantidad, 0) || 0;
  const debounceTimer = useRef(null);
  const { user, authLoading } = useContext(UserContext);
  const { showToast } = useToast();

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
    try {
      const updatedCart = await cartService.addToCart(productoId, cantidad);
      setCart(updatedCart);

      showToast("Producto añadido al carrito", "success");
    } catch (error) {
      console.error("Error al añadir producto", error);
      showToast("No se pudo añadir el producto", "danger");
    }
  };

  const updateQuantity = async (productoId, cantidad) => {
    if (cantidad <= 0) return removeItem(productoId);

    const previousCart = { ...cart };

    setCart((prev) => {
      const nuevosItems = prev.items.map((item) => {
        if (item.producto._id === productoId) {
          return { ...item, cantidad };
        }
        return item;
      });

      return {
        ...prev,
        items: nuevosItems,
        total: nuevosItems.reduce(
          (acc, i) => acc + i.precioUnitario * i.cantidad,
          0,
        ),
      };
    });

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        const updatedData = await cartService.updateItem(productoId, cantidad);
        setCart(updatedData);
      } catch (error) {
        console.warn("Fallo en la actualización:", error.message);
        setCart(previousCart);
        showToast(error.message, "danger");
      }
    }, 800);
  };

  const removeItem = async (productoId) => {
    const updatedCart = await cartService.removeItem(productoId);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ items: [], total: 0 });

      showToast("El carrito se ha vaciado", "success");
    } catch (error) {
      console.error("Error al vaciar el carrito", error);
      showToast("Hubo un problema al vaciar el carrito", "danger");
    }
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
