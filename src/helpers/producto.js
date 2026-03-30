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
    const resultado = await response.json();

    if (!response.ok)
      throw new Error(resultado.message || `Error: ${response.status}`);
    return { ok: true, ...resultado };
  } catch (error) {
    console.error(error);
    return { ok: false, message: error.message };
  }
};

export const obtenerProductoPorId = (id) => apiFetch(`/${id}`);

export const obtenerProductos = (limite, inicio) =>
  apiFetch(`?limite=${limite}&desde=${inicio}`);

export const crearProducto = (newProducto) => apiFetch("", "POST", newProducto);

export const actualizarProducto = (producto) =>
  apiFetch(`/${producto._id}`, "PUT", producto);

export const borrarProducto = (id) => apiFetch(`/${id}`, "DELETE");
