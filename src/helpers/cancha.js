const url = "http://localhost:4500/api/cancha";

export const apiCancha = {
  get: (limit, offset) =>
    fetch(`${url}?limite=${limit}&desde=${offset}`, {
      credentials: "include",
    }).then((r) => r.json()),

  create: (data) =>
    fetch(`${url}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  update: (data) =>
    fetch(`${url}/update/${data._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  delete: (id) =>
    fetch(`${url}/${id}`, { method: "DELETE", credentials: "include" }).then(
      (r) => r.json(),
    ),
};
