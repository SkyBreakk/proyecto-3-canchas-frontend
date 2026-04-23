const url = import.meta.env.VITE_API_URL + "/category";

const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    if (body) options.body = JSON.stringify(body);

    const finalUrl = endpoint.startsWith("/")
      ? `${url}${endpoint}`
      : `${url}${endpoint ? "/" + endpoint : ""}`;

    const response = await fetch(finalUrl, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        mensaje: data.mensaje || `Error al hacer fetch de categoria`,
      };
    }
    return data;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    return { ok: false, mensaje: "Error de conexión con el servidor" };
  }
};

export const traerCategoriasPaginado = (limite, inicio) =>
  apiCall(`?limite=${limite}&desde=${inicio}`);

export const crearCategoria = (newCategoria) =>
  apiCall("", "POST", newCategoria);

export const actualizarCategoria = (categoria) =>
  apiCall(`${categoria._id}`, "PUT", categoria);

export const eliminarCategoria = (id) => apiCall(`${id}`, "DELETE");
