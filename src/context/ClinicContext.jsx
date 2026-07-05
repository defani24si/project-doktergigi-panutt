import React, { createContext, useState, useEffect } from "react";
import { pasienService, dokterService, janjiTemuService } from "../services/supabaseService";

export const ClinicContext = createContext();

export function ClinicProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari Supabase saat component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [pasienData, dokterData, janjiData] = await Promise.all([
        pasienService.getAll(),
        dokterService.getAll(),
        janjiTemuService.getAll()
      ]);
      
      setPatients(pasienData);
      setDoctors(dokterData);
      setAppointments(janjiData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data dari database");
    } finally {
      setLoading(false);
    }
  };

  // Refresh functions
  const refreshPatients = async () => {
    try {
      const data = await pasienService.getAll();
      setPatients(data);
    } catch (err) {
      console.error("Error refreshing patients:", err);
    }
  };

  const refreshDoctors = async () => {
    try {
      const data = await dokterService.getAll();
      setDoctors(data);
    } catch (err) {
      console.error("Error refreshing doctors:", err);
    }
  };

  const refreshAppointments = async () => {
    try {
      const data = await janjiTemuService.getAll();
      setAppointments(data);
    } catch (err) {
      console.error("Error refreshing appointments:", err);
    }
  };

  return (
    <ClinicContext.Provider value={{ 
      patients, 
      setPatients,
      appointments, 
      setAppointments,
      doctors, 
      setDoctors,
      loading,
      error,
      refreshPatients,
      refreshDoctors,
      refreshAppointments,
      fetchAllData
    }}>
      {children}
    </ClinicContext.Provider>
  );
}
