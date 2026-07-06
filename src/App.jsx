import { Routes, Route, Navigate } from "react-router-dom";
import { ClinicProvider } from "./context/ClinicContext";
import React, { Suspense } from "react";

// Admin pages
const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const JanjiTemu = React.lazy(() => import("./pages/main/JanjiTemu"));
const Pasien = React.lazy(() => import("./pages/main/Pasien"));
const PasienDetail = React.lazy(() => import("./pages/main/PasienDetail"));
const Dokter = React.lazy(() => import("./pages/main/Dokter"));
const DokterDetail = React.lazy(() => import("./pages/main/DokterDetail"));
const NotFound = React.lazy(() => import("./pages/main/NotFound"));
const Error400 = React.lazy(() => import("./pages/main/Error400"));
const Error401 = React.lazy(() => import("./pages/main/Error401"));
const Error403 = React.lazy(() => import("./pages/main/Error403"));
const CobaFiturXYZ = React.lazy(() => import("./pages/main/CobaFiturXYZ"));
const Diskon = React.lazy(() => import("./pages/main/Diskon"));
const ServiceAutomation = React.lazy(() => import("./pages/main/ServiceAutomation"));
const KlaimReward = React.lazy(() => import("./pages/main/KlaimReward"));
const Feedback = React.lazy(() => import("./pages/main/Feedback"));
const Transaksi = React.lazy(() => import("./pages/main/Transaksi"));
const CatatanKesehatan = React.lazy(() => import("./pages/main/CatatanKesehatan"));

// Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));

// Auth pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Guest pages (bebas akses, tidak perlu login)
const LandingPage = React.lazy(() => import("./pages/guest/LandingPage"));
const LayananDokter = React.lazy(() => import("./pages/guest/LayananDokter"));
const BookingGuest = React.lazy(() => import("./pages/guest/BookingGuest"));

// Member pages (harus login sebagai member)
const MemberPage        = React.lazy(() => import("./pages/guest/MemberPage"));
const MemberDashboard   = React.lazy(() => import("./pages/member/MemberDashboard"));
const MemberTransaksi   = React.lazy(() => import("./pages/member/MemberTransaksi"));
const MemberKesehatan   = React.lazy(() => import("./pages/member/MemberKesehatan"));
const MemberLoyalty     = React.lazy(() => import("./pages/member/MemberLoyalty"));
const MemberBooking     = React.lazy(() => import("./pages/member/MemberBooking"));
const MemberFeedback    = React.lazy(() => import("./pages/member/MemberFeedback"));
const TestDatabase = React.lazy(() => import("./pages/TestDatabase"));

const Loading = React.lazy(() => import("./components/Loading"));

function App() {
  return (
    <ClinicProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* ── GUEST (bebas akses) ── */}
          <Route element={<GuestLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/guest" element={<LandingPage />} />
            <Route path="/guest/layanan" element={<LayananDokter />} />
            <Route path="/guest/booking" element={<BookingGuest />} />
          </Route>

          {/* ── MEMBER (harus login) ── */}
          <Route element={<MemberLayout />}>
            <Route path="/member" element={<Navigate to="/member/dashboard" replace />} />
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/transaksi" element={<MemberTransaksi />} />
            <Route path="/member/kesehatan" element={<MemberKesehatan />} />
            <Route path="/member/loyalty"   element={<MemberLoyalty />} />
            <Route path="/member/booking"   element={<MemberBooking />} />
            <Route path="/member/feedback"  element={<MemberFeedback />} />
          </Route>

          {/* ── AUTH ── */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* ── TEST DATABASE ── */}
          <Route path="/test-database" element={<TestDatabase />} />

          {/* ── ADMIN (harus login sebagai admin) ── */}
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/janji-temu" element={<JanjiTemu />} />
            <Route path="/pasien" element={<Pasien />} />
            <Route path="/pasien/:id" element={<PasienDetail />} />
            <Route path="/dokter" element={<Dokter />} />
            <Route path="/dokter/:id" element={<DokterDetail />} />
            <Route path="/CobaFiturXYZ" element={<CobaFiturXYZ />} />
            <Route path="/diskon" element={<Diskon />} />
            <Route path="/service-automation" element={<ServiceAutomation />} />
            <Route path="/klaim-reward" element={<KlaimReward />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/transaksi" element={<Transaksi />} />
            <Route path="/catatan-kesehatan" element={<CatatanKesehatan />} />
            <Route path="/error/400" element={<Error400 />} />
            <Route path="/error/401" element={<Error401 />} />
            <Route path="/error/403" element={<Error403 />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </ClinicProvider>
  );
}

export default App;
