const url = import.meta.env.VITE_API_URL + "/product";

const apiFetch = async (endpoint, method = "GET", body = null) => {
  try {
    const config = {
      method,
      headers: { "Content-type": "application/json" },
      credentials: "include",
    };
    if (body) config.body = JSON.stringify(body);

    const finalUrl = endpoint
      ? `${url}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`
      : url;

    const response = await fetch(finalUrl, config);
    const data = await response.json();

    if (!data.ok) {
      return {
        ok: false,
        message: data.message || "Error al hacer fetch de productos",
      };
    }

    return data;
  } catch (error) {
    console.error("Error en el Producto Helper:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
};

export const obtenerProductoPorId = (id) => apiFetch(`/${id}`);

export const obtenerProductos = (limite, inicio) =>
  apiFetch(`?limite=${limite}&desde=${inicio}`);

export const crearProducto = (newProducto) => apiFetch("", "POST", newProducto);

export const actualizarProducto = (producto) =>
  apiFetch(`/${producto._id}`, "PUT", producto);

export const borrarProducto = (id) => apiFetch(`/${id}`, "DELETE");
