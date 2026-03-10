const BASE_URL = "http://localhost:4000";

export const api = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/students`);
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};