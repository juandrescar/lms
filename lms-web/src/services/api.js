import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor para adjuntar token automáticamente
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("user");
    let token = null;
    if (stored) {
        const user = JSON.parse(stored);
        token = user.token;
        console.log(token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;