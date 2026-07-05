import { useState } from "react";
import { authServiceSimple } from "../services/authServiceSimple";
import { pasienService, dokterService, janjiTemuService, userService } from "../services/supabaseService";

export default function TestDatabase() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async (testName, testFn) => {
    setLoading(true);
    setError(null);
    try {
      const data = await testFn();
      setResult({ testName, success: true, data });
    } catch (err) {
      setError({ testName, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Test Database Connection</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => testConnection("Users", () => userService.getAll())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Users Table
        </button>
        
        <button
          onClick={() => testConnection("Pasien", () => pasienService.getAll())}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Pasien Table
        </button>
        
        <button
          onClick={() => testConnection("Dokter", () => dokterService.getAll())}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Dokter Table
        </button>
        
        <button
          onClick={() => testConnection("Janji Temu", () => janjiTemuService.getAll())}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Test Janji Temu Table
        </button>

        <button
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const user = await authServiceSimple.login("admin@panutt.com", "admin123");
              setResult({ testName: "Login Admin", success: true, data: user });
            } catch (err) {
              setError({ testName: "Login Admin", message: err.message });
            } finally {
              setLoading(false);
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Test Login Admin
        </button>

        <button
          onClick={async () => {
            setLoading(true);
            setError(null);
            try {
              const user = await authServiceSimple.login("panut@gmail.com", "panut123");
              setResult({ testName: "Login Panut", success: true, data: user });
            } catch (err) {
              setError({ testName: "Login Panut", message: err.message });
            } finally {
              setLoading(false);
            }
          }}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Test Login Panut
        </button>
      </div>

      {loading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          Loading...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-bold text-red-700">❌ Error: {error.testName}</h3>
          <p className="text-red-600 text-sm">{error.message}</p>
        </div>
      )}

      {result && (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-700 mb-2">✅ Success: {result.testName}</h3>
          <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-96">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded">
        <h3 className="font-bold mb-2">📝 Instructions:</h3>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Klik button untuk test koneksi ke Supabase</li>
          <li>Jika error "relation does not exist" → SQL belum dijalankan</li>
          <li>Jika error "Invalid API key" → Check .env.local</li>
          <li>Jika success → Database sudah terkoneksi!</li>
        </ol>
      </div>
    </div>
  );
}
