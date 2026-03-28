const url = import.meta.env.VITE_API_URL + "/reserva";

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

export const getHorariosDisponibles = async (fecha, canchaID) => {
  try {
    const resp = await fetch(`${url}/horarios/${canchaID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fecha }),
    });

    const result = await resp.json();

    if (result.ok) {
      const horarios = Array.isArray(result.horarios)
        ? result.horarios.map((h) =>
            typeof h === "string" ? h : h.hora || h.horaStr,
          )
        : [];

      return { ok: true, horarios };
    }

    return { ok: false, horarios: [] };
  } catch (error) {
    console.error("Error getting available hours", error);
    return { ok: false, horarios: [] };
  }
};

export const contactoReserva = async (data) => {
  try {
    const response = await fetch(`${url}/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error en la servidor");
    }

    return result;
  } catch (error) {
    console.error("Error en el helper contactoReserva:", error);
    throw error;
  }
};
