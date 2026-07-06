import { createContext } from "react";

// File ini hanya berisi Context object (non-komponen)
// Dipisah ke .js agar tidak konflik dengan HMR Vite
export const ClinicContext = createContext();
