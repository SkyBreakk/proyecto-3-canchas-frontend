const url = "http://localhost:4500/api/category";

const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${url}${endpoint}`, options);
    const resultado = await response.json().catch(() => ({}));

    if (!response.ok)
      throw new Error(
        resultado.message || resultado.msg || `Error: ${response.status}`,
      );
    return { ok: true, ...resultado };
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    return { ok: false, message: error.message };
  }
};

export const traerCategoriasPaginado = (limite, inicio) =>
  apiCall(`?limite=${limite}&desde=${inicio}`);

export const crearCategoria = (newCategoria) =>
  apiCall("/", "POST", newCategoria);

export const actualizarCategoria = (categoria) =>
  apiCall(`/${categoria._id}`, "PUT", categoria);

export const eliminarCategoria = (id) => apiCall(`/${id}`, "DELETE");
