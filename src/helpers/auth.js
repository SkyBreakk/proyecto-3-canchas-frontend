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