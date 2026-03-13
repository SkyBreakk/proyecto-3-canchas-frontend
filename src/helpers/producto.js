const url = "http://localhost:4500/api/product";

const apiFetch = async (endpoint, method = "GET", body = null) => {
  try {
    const config = {
      method,
      headers: { "Content-type": "application/json" },
      credentials: "include",
    };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${url}${endpoint}`, config);
    const resultado = await response.json();

    if (!response.ok)
      throw new Error(resultado.message || `Error: ${response.status}`);
    return { ok: true, ...resultado };
  } catch (error) {
    console.error(error);
    return { ok: false, message: error.message };
  }
};

export const obtenerProductos = (limite, inicio) =>
  apiFetch(`?limite=${limite}&desde=${inicio}`);

export const crearProducto = (newProducto) =>
  apiFetch("/", "POST", newProducto);

export const actualizarProducto = (producto) =>
  apiFetch(`/${producto._id}`, "PUT", producto);

export const borrarProducto = (id) => apiFetch(`/${id}`, "DELETE");
