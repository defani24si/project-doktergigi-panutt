-- =====================================================
-- TABEL SERVICE AUTOMATION
-- =====================================================
-- Jalankan di SQL Editor Supabase

CREATE TABLE IF NOT EXISTS public.service_automation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'WhatsApp' CHECK (channel IN ('WhatsApp', 'Email')),
  trigger_event TEXT NOT NULL,
  pesan TEXT NOT NULL,
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Tidak Aktif')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE service_automation ENABLE ROW LEVEL SECURITY;

-- Policy allow all (development)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_automation' AND policyname = 'service_automation_all') THEN
    CREATE POLICY "service_automation_all" ON service_automation FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Data sample
INSERT INTO service_automation (nama, channel, trigger_event, pesan, status) VALUES
('Reminder Janji Temu', 'WhatsApp', 'H-1 sebelum janji temu', 'Halo {nama_pasien}, mengingatkan janji temu Anda besok pada pukul {jam} dengan {dokter}. Harap datang tepat waktu. 😊', 'Aktif'),
('Ucapan Selamat Datang', 'Email', 'Pasien baru terdaftar', 'Selamat datang di Panutt Dental Clinic, {nama_pasien}! Kami siap memberikan pelayanan terbaik untuk kesehatan gigi Anda.', 'Aktif'),
('Follow-up Setelah Perawatan', 'WhatsApp', 'H+1 setelah selesai', 'Halo {nama_pasien}, bagaimana kondisi setelah perawatan kemarin? Jika ada keluhan, jangan ragu menghubungi kami.', 'Tidak Aktif')
ON CONFLICT DO NOTHING;

-- Check
SELECT * FROM service_automation ORDER BY created_at DESC;
