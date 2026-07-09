import axios from "axios";

const api = axios.create({
  baseURL: "https://react-login-bca2.onrender.com/api/auth",
});

export const signupUser = (userData) => {
  return api.post("/signup", userData);
};

export const loginUser = (userData) => {
  return api.post("/login", userData);
};

export const getCurrentUser = (token) => {
  return api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;