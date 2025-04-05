class AuthService {
    constructor() {
        this.baseUrl = "http://localhost:5000";
    }

    async createAccount({ email, password, name }) {
        try {
            const response = await fetch(`${this.baseUrl}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Registration failed:", data.message);
                throw new Error(data.message || "Registration failed");
            }

            console.log("Registration success:", data);
            return this.login({ email, password });
        } catch (error) {
            console.error("AuthService CreateAccount Error:", error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await fetch(`${this.baseUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Login failed:", data.message);
                throw new Error(data.message || "Invalid credentials");
            }

            localStorage.setItem("authToken", data.token);
            console.log("Login success:", data);
            return data;
        } catch (error) {
            console.error("AuthService Login Error:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) return null;

            const response = await fetch(`${this.baseUrl}/api/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("GetCurrentUser failed:", data.message);
                throw new Error(data.message || "Unauthorized");
            }

            console.log("Current user data:", data);
            return data;
        } catch (error) {
            console.error("AuthService GetCurrentUser Error:", error.message);
            return null;
        }
    }

    async logout() {
        try {
            localStorage.removeItem("authToken");
            console.log("User logged out successfully");
            return { message: "Logged out successfully" };
        } catch (error) {
            console.error("AuthService Logout Error:", error.message);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
