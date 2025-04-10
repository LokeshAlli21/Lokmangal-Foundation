import env from '../../env/env';
import { toast } from "react-toastify";

class DatabaseService {
  constructor() {
    this.baseUrl = env.backendUrl;
  }

  // ✅ Utility to get token
  getAuthHeaders() {
    const token = localStorage.getItem('authToken'); // adjust if you store token differently
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // ✅ Utility to handle responses globally
  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  }

  // ✅ Get all profiles // withot login ///////////////////////////////////////////////////////////////////////////////////////
  // ✅ Get all profiles (No Auth) with optional filters
  async getAllProfiles(filters = {}) {
    try {
      const query = new URLSearchParams();

      // Build query string only for non-empty values
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });

      const response = await fetch(
        `${this.baseUrl}/api/no-auth/profiles?${query.toString()}`
      );

      const data = await this.handleResponse(response);
      toast.success("✅ Profiles loaded successfully!");
      return data;

    } catch (error) {
      toast.error(`🚨 Failed to load profiles: ${error.message}`);
      throw error;
    }
  }


  // ✅ Get profile by user ID (Relationship route)
  async getProfileByUserId(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}/profile`, {
        headers: this.getAuthHeaders(),
      });
      const data = await this.handleResponse(response);
      toast.success("✅ Profile loaded successfully!");
      return data;
    } catch (error) {
      toast.error(`❌ Failed to load profile: ${error.message}`);
      throw error;
    }
  }

  // ✅ Create profile for specific user (Relationship route)
  async createProfileForUser(userId, profileData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}/profile`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await this.handleResponse(response);
      toast.success("✅ Profile created successfully!");
      return data;
    } catch (error) {
      toast.error(`❌ Failed to create profile: ${error.message}`);
      throw error;
    }
  }

  // ✅ Create new profile
  async createProfile(profileData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/profiles`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await this.handleResponse(response);
      toast.success("✅ New profile created!");
      return data;
    } catch (error) {
      toast.error(`❌ Failed to create profile: ${error.message}`);
      throw error;
    }
  }

  // ✅ Update profile by profile ID
  async updateProfile(profileId, profileData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/profiles/${profileId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      const data = await this.handleResponse(response);
      toast.success("✅ Profile updated successfully!");
      return data;
    } catch (error) {
      toast.error(`❌ Failed to update profile: ${error.message}`);
      throw error;
    }
  }

  // ✅ Delete profile by profile ID
  async deleteProfile(profileId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/profiles/${profileId}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });
      const data = await this.handleResponse(response);
      toast.success("🗑️ Profile deleted successfully!");
      return data;
    } catch (error) {
      toast.error(`❌ Failed to delete profile: ${error.message}`);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;