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
      if (data.ok && data.cart) {
        setCart(data.cart);
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (error) {
      showToast("No se pudo obtener el carrito.", "warning");
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
    const data = await cartService.addToCart(productoId, cantidad);
    if (data.ok) {
      setCart(data.cart);
      showToast(data.message, "success");
    } else {
      showToast(data.message, "danger");
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
      const data = await cartService.updateItem(productoId, cantidad);
      if (data.ok) {
        setCart(data.cart);
      } else {
        setCart(previousCart);
        showToast(error.message, "danger");
      }
    }, 800);
  };

  const removeItem = async (productoId) => {
    const data = await cartService.removeItem(productoId);
    if (data.ok) {
      setCart(data.cart);
    } else {
      showToast(data.message, "danger");
    }
  };

  const clearCart = async () => {
    const data = await cartService.clearCart();
    if (data.ok) {
      setCart({ items: [], total: 0 });
      showToast("El carrito se ha vaciado", "success");
    } else {
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
