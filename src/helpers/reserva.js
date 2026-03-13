const url = "http://localhost:4500/api/reserva";

const getReservasDisponibles = async (limite, inicio) => {
  try {
    const response = await fetch(`${url}?limite=${limite}&desde=${inicio}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.message || `Error:${response.status}`);
    }

    return {
      ok: true,
      reservas: resultado.reservas,
      total: resultado.total,
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      ok: false,
      message: error.message || "Error de solicitud de reservas",
      reservas: [],
      total: 0,
    };
  }
};

const deleteReserva = async (reservaID) => {
  try {
    const response = await fetch(`${url}/${reservaID}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.message || `Error:${response.status}`);
    }

    return {
      ok: true,
      reserva: resultado.reserva,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error.message || "Error en borrado de reserva",
    };
  }
};

const checkDisponibilidad = async (params, canchaID) => {
  try {
    const resp = await fetch(`${url}/check/${canchaID}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return await resp.json();
  } catch (error) {
    console.error("Error checking availability", error);
    return { ok: false };
  }
};

export { getReservasDisponibles, deleteReserva, checkDisponibilidad };
