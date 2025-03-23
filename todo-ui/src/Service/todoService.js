import axios from "axios";
import AuthService from "./AuthService"; // Import authentication service

const BASE_URL = "http://localhost:8081/api/Todo";

// Helper function to get authorization header
const getAuthHeader = () => {
    const token = AuthService.getToken(); // Retrieve token from storage
    console.log("📌 Retrieved Token:", token); // Debugging log
    return token ? { Authorization: `Bearer ${token}` } : {}; // Set Authorization header
};

const TodoService = {
    addTask: async (task) => {
        try {
            return await axios.post(`${BASE_URL}/add`, task, {
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
                },
            });
        } catch (error) {
            console.error("❌ Error adding task:", error);
            throw error;
        }
    },

    getAllTasks: async () => {
        try {
            return await axios.get(`${BASE_URL}/getAll`, {
                headers: getAuthHeader(),
            });
        } catch (error) {
            console.error("❌ Error fetching tasks:", error);
            throw error;
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            console.log(`🔄 Updating task ${id} with data:`, updatedTask);

            const response = await axios.put(`${BASE_URL}/${id}`, updatedTask, {
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
                },
            });

            console.log("✅ Task updated:", response.data);
            return response;
        } catch (error) {
            console.error(`❌ Error updating task ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    deleteTask: async (id) => {
        try {
            return await axios.delete(`${BASE_URL}/${id}`, {
                headers: getAuthHeader(),
            });
        } catch (error) {
            console.error("❌ Error deleting task:", error);
            throw error;
        }
    },
};

export default TodoService;
