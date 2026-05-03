import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return <ErrorPage code={401} description="Kamu harus login untuk mengakses halaman ini." />;
}
