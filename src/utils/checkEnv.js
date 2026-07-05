// Utility untuk check environment variables
export const checkSupabaseEnv = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.group('🔍 Supabase Environment Check');
  console.log('URL:', url || '❌ NOT SET');
  console.log('Key:', key ? (key === 'your-anon-key-here' ? '❌ NOT CHANGED (masih default)' : '✅ SET') : '❌ NOT SET');
  
  if (!url || !key || key === 'your-anon-key-here') {
    console.error('❌ Supabase credentials belum di-set dengan benar!');
    console.log('📝 Cara fix:');
    console.log('1. Buka .env.local');
    console.log('2. Ganti VITE_SUPABASE_ANON_KEY dengan key dari Supabase Dashboard');
    console.log('3. Restart server: npm run dev');
  } else {
    console.log('✅ Supabase credentials OK');
  }
  console.groupEnd();

  return { url, key, isValid: !!(url && key && key !== 'your-anon-key-here') };
};
