import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return <ErrorPage code={403} description="Kamu tidak memiliki izin untuk mengakses halaman ini." />;
}
