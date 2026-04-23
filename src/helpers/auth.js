const url = import.meta.env.VITE_API_URL + "/auth/";

const logIn = async (email, password) => {
  try {
    const response = await fetch(url + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login fetch:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
};

export const registerUser = async (data) => {
  try {
    const response = await fetch(url + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al conectar con el servidor",
    };
  }
};

export const verifyEmail = async (data) => {
  try {
    const response = await fetch(url + "verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al verificar el código",
    };
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await fetch(url + "resend-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al conectar con el servidor",
    };
  }
};

const LogOut = async () => {
  const response = await fetch(url + "logout", {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export { logIn, LogOut };
