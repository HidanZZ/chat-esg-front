import axios from "axios";

// Create an instance of axios with default configuration
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // API URL from env
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiClient;
