import { useParams, useNavigate } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext";
import {
  FaArrowLeft,
  FaUserAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaNotesMedical,
  FaVenusMars,
  FaClipboardList,
} from "react-icons/fa";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";

const STATUS_BADGE = {
  Aktif: "success",
  Baru: "primary",
  VIP: "warning",
  "Tidak Aktif": "danger",
};

const STATUS_JANJI = {
  Terjadwal: "primary",
  Selesai: "success",
  Dibatalkan: "danger",
};

export default function PasienDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = useClinic();
  const pasien = patients.find((p) => p.id === id);

  if (!pasien) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
        <FaUserAlt className="text-5xl" />
        <p className="text-lg font-medium">Pasien tidak ditemukan.</p>
        <Button type="primary" icon={<FaArrowLeft />} onClick={() => navigate("/pasien")}>
          Kembali ke Daftar Pasien
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Page Header */}
      <PageHeader title="Detail Pasien" breadcrumb={["Pasien", pasien.nama]}>
        <Button type="outline" icon={<FaArrowLeft />} onClick={() => navigate("/pasien")}>
          Kembali
        </Button>
      </PageHeader>

      {/* Profile Card */}
      <Card className="mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold flex-shrink-0">
          <Avatar name={pasien.nama} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-800">{pasien.nama}</h2>
            <Badge type={STATUS_BADGE[pasien.status] || "secondary"}>{pasien.status}</Badge>
          </div>
          <p className="text-sm text-gray-400">{pasien.umur} Tahun • ID: {pasien.id}</p>
        </div>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaVenusMars />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Jenis Kelamin</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
              </p>
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
              <p className="text-sm font-semibold text-gray-800">{pasien.noHp || "-"}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Tanggal Lahir</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.tanggalLahir
                  ? new Date(pasien.tanggalLahir).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg flex-shrink-0">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Alamat</p>
              <p className="text-sm font-semibold text-gray-800">{pasien.alamat || "-"}</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
              <FaNotesMedical />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Kunjungan Terakhir</p>
              <p className="text-sm font-semibold text-gray-800">
                {pasien.terakhirKunjungan || "-"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Riwayat Medis */}
      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaClipboardList className="text-blue-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Medis</h3>
        </div>
        {pasien.riwayatMedis && pasien.riwayatMedis.length > 0 ? (
          <Table headers={["Tanggal", "Keluhan", "Diagnosis", "Tindakan", "Dokter"]}>
            {pasien.riwayatMedis.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition text-sm">
                <td className="px-4 py-3 text-gray-600">{item.tanggal}</td>
                <td className="px-4 py-3 text-gray-700">{item.keluhan}</td>
                <td className="px-4 py-3 text-gray-700">{item.diagnosis}</td>
                <td className="px-4 py-3 text-gray-700">{item.tindakan}</td>
                <td className="px-4 py-3 text-gray-600">{item.dokter}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <p className="text-sm text-gray-400">Belum ada riwayat medis.</p>
        )}
      </Card>

      {/* Riwayat Janji */}
      <Card>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <FaCalendarAlt className="text-purple-500" />
          <h3 className="text-sm font-bold text-gray-700">Riwayat Janji Temu</h3>
        </div>
        {pasien.riwayatJanji && pasien.riwayatJanji.length > 0 ? (
          <Table headers={["Tanggal", "Jam", "Dokter", "Status"]}>
            {pasien.riwayatJanji.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/30 transition text-sm">
                <td className="px-4 py-3 text-gray-600">{item.tanggal}</td>
                <td className="px-4 py-3 text-gray-600">{item.jam}</td>
                <td className="px-4 py-3 text-gray-700">{item.dokter}</td>
                <td className="px-4 py-3">
                  <Badge type={STATUS_JANJI[item.status] || "secondary"}>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <p className="text-sm text-gray-400">Belum ada riwayat janji temu.</p>
        )}
      </Card>
    </div>
  );
}
