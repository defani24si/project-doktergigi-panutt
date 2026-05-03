import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return <ErrorPage code={401} description="Kamu tidak memiliki izin akses. Silakan login terlebih dahulu." />;
}