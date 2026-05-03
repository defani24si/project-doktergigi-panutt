import React from "react";
import "./custom.css";

const ProfilePicture = () => (
  <div className="profile-picture">👤</div>
);

const FullName = () => (
  <div className="name">
    <h1>Defani Zahra Afikah</h1>
    <p>Mahasiswa Sistem Informasi</p>
  </div>
);

const StudentInfo = () => (
  <div className="info">
    <p>NIM: 2457301030</p>
  </div>
);

const Address = () => (
  <div className="info">
    <p>Alamat: Jalan Rowosari</p>
  </div>
);

const TentangSaya = () => (
  <div className="tentang">
    <h3>Tentang Saya</h3>
    <p>
      Saya adalah mahasiswa Sistem Informasi yang tertarik pada pengembangan web,
      khususnya di bidang frontend menggunakan React JS.
    </p>
  </div>
);

const Contact = () => (
  <div className="contact">
    <p>Email: defani24i@mahasisw.pcr.ac.id</p>
  </div>
);

export default function BiodataDiri() {
  return (
    <div className="card">
      <ProfilePicture />
      <FullName />
      <StudentInfo />
      <Address />
      <TentangSaya />
      <Contact />
    </div>
  );
}