const url = "http://localhost:4500/api/payment";

export const pagarMercadoPago = async (datos) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datos),
    });

    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
};
