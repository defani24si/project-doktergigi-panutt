import axios from 'axios';

const API_URL = "https://mmyvzrocqjfjmahreewr.supabase.co/rest/v1";
const API_KEY = "sb_publishable_CYr8j3XYtohRkk--x3cmjQ_-4Q2mcZJ";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const authServiceSimple = {
  /**
   * Register user baru ke tabel users
   */
  async register(fullName, email, password, role = 'member') {
    try {
      const response = await axios.post(
        `${API_URL}/users`,
        {
          full_name: fullName,
          email: email,
          password: password,
          role: role,
          total_poin: 0,              // ← default poin 0
          membership_tier: 'Bronze',  // ← default tier Bronze
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw new Error(error.response?.data?.message || 'Registrasi gagal');
    }
  },

  /**
   * Login dengan email dan password
   */
  async login(email, password) {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers,
        params: {
          email: `eq.${email}`,
          password: `eq.${password}`,
          select: "*",
        },
      });

      if (response.data.length === 0) {
        throw new Error('Email atau password salah');
      }

      return response.data[0]; // Return user pertama yang cocok
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login gagal');
    }
  },

  /**
   * Get all users (admin only)
   */
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers,
        params: { select: "*" },
      });
      return response.data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },
};
