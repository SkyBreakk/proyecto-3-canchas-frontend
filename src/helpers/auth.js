const url = "http://localhost:4500/api/auth/";

const logIn = async (email, password) => {
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
};

export const registerUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4500/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {

      const errorMessage =
        result.errors?.email?.msg ||
        result.errors?.username?.msg ||
        "Error al registrar usuario";

      return {
        ok: false,
        message: errorMessage,
      };
    }

    return {
      ok: true,
      message: result.message,
      data: result.data,
    };

  } catch (error) {
    return {
      ok: false,
      message: "Error al conectar con el servidor",
    };
  }
};

export const verifyEmail = async (data) => {
  try {
    const response = await fetch("http://localhost:4500/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      ok: response.ok,
      message: result.message,
    };

  } catch (error) {
    return {
      ok: false,
      message: "Error al verificar el código",
    };
  }
};

// const LogOut = async () => {
//   const response = await fetch(url + "logout", {
//     method: "POST",
//     credentials: "include",
//   });
//   const data = await response.json();
//   return data;
// };

// const getPerfil = async () => {
//   const response = await fetch(url + "profile");
//   const data = await response.json();
//   return data;
// };

// export { logIn, getPerfil, LogOut };
export { logIn};