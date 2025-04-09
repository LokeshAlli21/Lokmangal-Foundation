import env from '../../env/env';
import { toast } from "react-toastify";

class AuthService {
  constructor() {
    this.baseUrl = env.backendUrl;
  }

  // Register User
  async createAccount({ email, password, name, phone }) {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Custom error messages based on response
        if (data.message.includes("Email is already registered")) {
          toast.error("📧 This email is already registered. Try logging in!");
        } else if (data.message.includes("Phone number is already registered")) {
          toast.error("📱 Phone number already exists. Please use another one.");
        } else if (data.message.includes("All fields are required")) {
          toast.warn("⚠️ Please fill in all the required fields.");
        } else if (data.message.includes("Invalid phone number")) {
          toast.warn("📞 Invalid phone number. Enter a valid 10-digit number.");
        } else if (data.message.includes("Invalid email format")) {
          toast.warn("📧 Invalid email format. Please check your email.");
        } else if (data.message.includes("Password must be at least 8 characters")) {
          toast.warn("🔒 Password too short. Minimum 8 characters required.");
        } else {
          toast.error(`🚫 ${data.message || "Registration failed. Try again!"}`);
        }
        throw new Error(data.message || "Registration failed");
      }

      // Success Toast
      toast.success(`🎉 Account created! Welcome, ${name || "User"}!`);
      return data;

    } catch (error) {
      console.error("AuthService CreateAccount Error:", error);
      // Optional: toast.error here if you want to catch unexpected errors
      throw error;
    }
  }

  // Login User
  async login({ email, password }) {
    if (!email) {
      toast.warn("📧 Email is required to login.");
      console.log("Email is not available for login");
      return;
    }
    if (!password) {
      toast.warn("🔒 Password is required to login.");
      console.log("Password is not available for login");
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log("data at login service in auth.js :: data:",data);
      

      if (!response.ok) {
        toast.error("🚫 Invalid credentials. Please try again.");
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("authToken", data.user.token);
      toast.success(`✅ Welcome back! Logged in successfully.`);
      return data;

    } catch (error) {
      console.error("AuthService Login Error:", error);
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.info("ℹ️ You are not logged in. Please log in first.");
        return null;
      }

      const response = await fetch(`${this.baseUrl}/api/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("called 📢 GET /api/auth/user");
      

      if (!response.ok) {
        toast.error("🚫 Unauthorized access. Please log in again.");
        throw new Error("Unauthorized");
      }

      const data = await response.json()
      // console.log('in getcurrentuser: ',data.user);

      return  data.user

    } catch (error) {
      console.error("AuthService GetUser Error:", error);
      return null;
    }
  }

  // Logout User
  async logout() {
    try {
      localStorage.removeItem("authToken");
      toast.info("👋 Logged out successfully.");
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("AuthService Logout Error:", error);
      toast.error("🚫 Error while logging out. Try again.");
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
