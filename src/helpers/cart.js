const url = import.meta.env.VITE_API_URL + "/cart";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

export const cartService = {
  getCart: async () => {
    const res = await fetch(url, {
      headers: getHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    return data.cart || data;
  },

  addToCart: async (productoId, cantidad) => {
    const res = await fetch(`${url}/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productoId, cantidad }),
      credentials: "include",
    });
    return await res.json();
  },

  updateItem: async (productoId, cantidad) => {
    const res = await fetch(`${url}/${productoId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ cantidad }),
      credentials: "include",
    });
    return await res.json();
  },

  removeItem: async (productoId) => {
    const res = await fetch(`${url}/${productoId}`, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await res.json();
  },

  clearCart: async () => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await res.json();
  },
};

export const getCart = async () => {
  try {
    const resp = await fetch(url, {
      credentials: "include",
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const vaciarCarritoApi = async () => {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
};

export const actualizarCantidadApi = async (productoId, cantidad) => {
  try {
    const resp = await fetch(`${url}/${productoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productoId, cantidad }),
    });
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
};

export const eliminarItemApi = async (productoId) => {
  try {
    const resp = await fetch(`${url}/${productoId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await resp.json();
  } catch (error) {
    console.log(error);
  }
};
