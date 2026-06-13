import axios from 'axios'

const API_URL = "https://mmyvzrocqjfjmahreewr.supabase.co/rest/v1"
const API_KEY = "sb_publishable_CYr8j3XYtohRkk--x3cmjQ_-4Q2mcZJ"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const notesAPI = {
  async fetchNotes() {
    const response = await axios.get(`${API_URL}/notes`, { headers })
    return response.data
  },

  async createNote(data) {
    const response = await axios.post(`${API_URL}/notes`, data, { headers })
    return response.data
  },
}

export const authAPI = {
  // Register — insert user baru ke tabel users
  async register(data) {
    const response = await axios.post(
      `${API_URL}/users`,
      {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      { headers }
    )
    return response.data
  },

  // Login — cek email + password, return data user jika cocok
  async login(email, password) {
    const response = await axios.get(`${API_URL}/users`, {
      headers,
      params: {
        email: `eq.${email}`,
        password: `eq.${password}`,
        select: "*",
      },
    })
    return response.data // array, ambil index [0] di komponen
  },
}
