const url = import.meta.env.VITE_API_URL + "/cart";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

const manejarRespuesta = async (response) => {
  try {
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, message: data.message || "Error en la petición" };
    }
    return data;
  } catch (error) {
    return { ok: false, message: "Error de conexión con el servidor" };
  }
};

export const cartService = {
  getCart: async () => {
    const response = await fetch(url, {
      headers: getHeaders(),
      credentials: "include",
    });
    return await manejarRespuesta(response);
  },

  addToCart: async (productoId, cantidad) => {
    const response = await fetch(`${url}/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productoId, cantidad }),
      credentials: "include",
    });
    return await manejarRespuesta(response);
  },

  updateItem: async (productoId, cantidad) => {
    const response = await fetch(`${url}/${productoId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ cantidad }),
      credentials: "include",
    });
    return await manejarRespuesta(response);
  },

  removeItem: async (productoId) => {
    const response = await fetch(`${url}/${productoId}`, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await manejarRespuesta(response);
  },

  clearCart: async () => {
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
    });
    return await manejarRespuesta(response);
  },
};
