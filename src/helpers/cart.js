const API_URL = "http://localhost:4500/api/cart";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

export const cartService = {
  getCart: async () => {
    const res = await fetch(API_URL, {
      headers: getHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    return data.cart || data;
  },

  addToCart: async (productoId, cantidad) => {
    const res = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productoId, cantidad }),
      credentials: "include",
    });
    return await res.json();
  },

  updateItem: async (productoId, cantidad) => {
    const res = await fetch(`${API_URL}/${productoId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ cantidad }),
      credentials: "include",
    });
    return await res.json();
  },

  removeItem: async (productoId) => {
    const res = await fetch(`${API_URL}/${productoId}`, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await res.json();
  },

  clearCart: async () => {
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await res.json();
  },
};
