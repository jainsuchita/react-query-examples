import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// get all the users
export const getUsers = () => api.get("/users").then((r) => r.data);

// get one user info
export const getUser = (id) => api.get(`/users/${id}`).then((r) => r.data);

// update user
export const updateUser = ({ id, ...updatedUser }) =>
  api.put(`/users/${id}`, { ...updatedUser, id }).then((r) => r.data);
