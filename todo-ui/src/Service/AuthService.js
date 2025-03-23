import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

const AuthService = {
    register: async (userData) => {
        return await axios.post(`${API_URL}/register`, userData);
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            const token = response.data.accessToken;

            if (token) {
                localStorage.setItem("accessToken", token); // ✅ Store token
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("accessToken"); // ✅ Clear token
        window.location.href = "/login"; // Redirect to login
    },

    getToken: () => {
        return localStorage.getItem("accessToken");
    },

    isAuthenticated: async () => {
        try {
            const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
            return response.data.authenticated;
        } catch (error) {
            return false;
        }
    }
};

export default AuthService;
