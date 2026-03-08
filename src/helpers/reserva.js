const url = "http://localhost:4500/api/reserva/";

export const checkDisponibilidad = async (params, id) => {
  try {
    const resp = await fetch(url + "check/" + id, {
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
