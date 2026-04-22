import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.error("Request Error:", error);
            return config;
        }
    },
    (error) => {
        console.error("Request Interceptor Error:", error);
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        try {
            return response;
        } catch (error) {
            console.error("Response Error:", error);
            return Promise.reject(error);
        }
    },
    (error) => {
        try {
            const status = error.response?.status;


            if (status === 401) {
                console.warn("Unauthorized - Logging out");

                localStorage.removeItem("token");


                window.location.href = "/login";
            }


            if (status === 500) {
                console.error("Server error");
            }

            return Promise.reject(error);

        } catch (err) {
            console.error("Response Interceptor Catch Error:", err);
            return Promise.reject(err);
        }
    }
);

export default api;