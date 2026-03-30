const url = import.meta.env.VITE_API_URL + "/auth";

export const apiUser = {
  get: async (limite = 5, desde = 0) => {
    try {
      const res = await fetch(`${url}?limite=${limite}&desde=${desde}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  updateProfile: async (datosAEnviar) => {
    try {
      const res = await fetch(`${url}/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(datosAEnviar),
      });
      return await res.json();
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  addAdmin: async (email) => {
    try {
      const res = await fetch(`${url}/admin`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  delAdmin: async (id) => {
    try {
      const res = await fetch(`${url}/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      return await res.json();
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },
};
