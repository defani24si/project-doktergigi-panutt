import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return <ErrorPage code={400} description="Permintaan tidak valid. Periksa kembali input kamu." />;
}
