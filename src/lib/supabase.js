import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug log untuk check environment variables
console.log('🔍 Checking Supabase Config...');
console.log('URL:', supabaseUrl || '❌ NOT SET');
console.log('Key:', supabaseAnonKey ? (supabaseAnonKey === 'your-anon-key-here' ? '❌ MASIH DEFAULT!' : '✅ SET') : '❌ NOT SET');

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here') {
  console.error('❌ SUPABASE CREDENTIALS BELUM DI-SET!');
  console.error('📝 Langkah perbaikan:');
  console.error('1. Buka file .env.local');
  console.error('2. Ganti VITE_SUPABASE_ANON_KEY dengan key dari Supabase Dashboard');
  console.error('3. Restart server: npm run dev');
  alert('⚠️ Supabase belum dikonfigurasi! Check console untuk instruksi.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper untuk get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Helper untuk get user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};
