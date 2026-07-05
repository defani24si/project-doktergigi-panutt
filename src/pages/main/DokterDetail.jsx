import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/useClinic";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaStethoscope,
  FaClipboardList,
  FaIdBadge,
} from "react-icons/fa";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import { janjiTemuService } from "../../services/supabaseService";

const STATUS_BADGE = {
  Aktif: "success",
  "Tidak Aktif": "danger",
};

export default function DokterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useClinic();
  const dokter = doctors.find((d) => d.id === id);

  // Riwayat pasien dari tabel janji_temu yang sudah Selesai
  const [riwayat, setRiwayat] = useState([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(true);

  useEffect(() => {
    if (!dokter) return;
    janjiTemuService.getAll()
      .then((data) => {
        // Filter janji yang ditangani dokter ini dan statusnya Selesai
        const filtered = data.filter(
          (j) => (j.dokterNama === dokter.nama || j.dokter_nama === dokter.nama) && j.status === "Selesai"
        );
        setRiwayat(filtered);
      })
      .catch((err) => console.error("Gagal load riwayat:", err))
      .finally(() => setLoadingRiwayat(false));
  }, [dokter?.nama]);

  if (!dokter) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <FaUserMd className="text-5xl" />
        <p className="text-lg font-medium">Dokter tidak ditemukan.</p>
        <Button type="primary" icon={<FaArrowLeft />} onClick={() => navigate("/dokter")}>
          Kembali ke Daftar Dokter
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Detail Dokter" breadcrumb={["Dokter", dokter.nama]}>
        <Button type="outline" icon={<FaArrowLeft />} onClick={() => navigate("/dokter")}>
          Kembali
        </Button>
      </PageHeader>

      {/* Profile Card */}
      <Card className="mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-4xl font-bold flex-shrink-0">
          <Avatar name={dokter.nama} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{dokter.nama}</h2>
            <Badge type={STATUS_BADGE[dokter.status] || "secondary"}>{dokter.status}</Badge>
          </div>
          <p className="text-sm text-gray-400">Spesialis {dokter.spesialis} • ID: {dokter.id}</p>
        </div>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaIdBadge />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">ID Dokter</p>
              <p className="text-sm font-semibold text-gray-800">{dokter.id}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaStethoscope />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Spesialis</p>
              <p className="text-sm font-semibold text-gray-800">{dokter.spesialis}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaPhone />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Nomor HP</p>
              <p className="text-sm font-semibold text-gray-800">{dokter.noHp || "-"}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Email</p>
              <p className="text-sm font-semibold text-gray-800">{dokter.email || "-"}</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Jadwal Praktik</p>
              <p className="text-sm font-semibold text-gray-800">{dokter.jadwal || "-"}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Riwayat Pasien */}
      <Card>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaClipboardList className="text-teal-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Pasien Ditangani</h3>
          <span className="ml-auto text-xs bg-teal-50 text-teal-600 font-semibold px-2 py-0.5 rounded-full">
            {riwayat.length} pasien
          </span>
        </div>

        {loadingRiwayat ? (
          <p className="text-sm text-gray-400">Memuat data...</p>
        ) : riwayat.length > 0 ? (
          <Table headers={["No", "Tanggal", "Nama Pasien", "Layanan", "Keluhan", "Status"]}>
            {riwayat.map((item, i) => (
              <tr key={item.id || item.uuid} className="hover:bg-teal-50/30 transition text-sm">
                <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{item.tanggal}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={item.pasienNama || item.pasien_nama} />
                    <span className="font-semibold text-gray-800 text-xs">
                      {item.pasienNama || item.pasien_nama}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">{item.layanan}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">
                  {item.keluhan || "-"}
                </td>
                <td className="px-4 py-3">
                  <Badge type="success">{item.status}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <p className="text-sm text-gray-400">Belum ada riwayat pasien yang ditangani.</p>
        )}
      </Card>
    </div>
  );
}
