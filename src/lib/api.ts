import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.error?? "Something went wrong. Please try again.";
        return Promise.reject(new Error(message));
    }
);

export default api;