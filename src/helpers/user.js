const url = import.meta.env.VITE_API_URL + "/auth";

export const apiUser = {
  get: async (limite = 5, desde = 0) => {
    const res = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return await res.json();
  },

  updateProfile: async (datosAEnviar) => {
    const res = await fetch(`${url}/update-profile`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datosAEnviar),
    });
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return await res.json();
  },
};
