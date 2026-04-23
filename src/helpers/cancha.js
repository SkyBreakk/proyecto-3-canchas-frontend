const url = import.meta.env.VITE_API_URL + "/cancha";

export const apiCancha = {
  get: (limit, offset) =>
    fetch(`${url}?limite=${limit}&desde=${offset}`, {
      credentials: "include",
    }).then((response) => response.json()),

  create: (data) =>
    fetch(`${url}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => response.json()),

  update: (data) =>
    fetch(`${url}/update/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => response.json()),

  delete: (id) =>
    fetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((response) => response.json()),
};
