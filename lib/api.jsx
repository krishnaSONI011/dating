import axios from "axios";

// Must match auth storage key (store/slices/authSlice.js AUTH_STORAGE_KEY)
const AUTH_STORAGE_KEY = "auth";

const api = axios.create({
  baseURL:
    process.env.SERVER_URL ||
    "https://irisinformatics.net/dating",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const { token } = JSON.parse(stored);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (_) {}
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          window.location.href = "/login";
        }
      }

      if (status === 403) {
        // Access denied – handle if needed (e.g. toast)
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { AUTH_STORAGE_KEY };
