const url = "http://localhost:4500/api/cart";

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
