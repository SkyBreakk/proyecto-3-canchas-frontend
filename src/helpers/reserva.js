const url = "http://localhost:4500/api/reserva";

export const apiReserva = {
  get: async (limite = 5, desde = 0) => {
    const resp = await fetch(`${url}/all?limite=${limite}&desde=${desde}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return await resp.json();
  },

  post: async (datosReserva) => {
    const resp = await fetch(`${url}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datosReserva),
    });
    return await resp.json();
  },

  delete: async (id) => {
    const resp = await fetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return await resp.json();
  },

  getMisReservas: async () => {
    const resp = await fetch(`${url}/mis-reservas`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return await resp.json();
  },

  updatePago: async (id, datosPago) => {
    const resp = await fetch(`${url}/${id}/pago`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datosPago),
    });
    return await resp.json();
  },
};

export const checkDisponibilidad = async (params, canchaID) => {
  try {
    const resp = await fetch(`${url}/check/${canchaID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return await resp.json();
  } catch (error) {
    console.error("Error checking availability", error);
    return { ok: false };
  }
};
