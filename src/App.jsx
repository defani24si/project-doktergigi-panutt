import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pertemuan-5/pages/main/Dashboard";

import React, { Suspense, useState } from "react";
// import Loading from "./components/Loading";
// import Orders from "./pertemuan-5/pages/main/Orders";
// import Header from "./pertemuan-5/components/Header";
// import Customers from "./pertemuan-5/pages/main/Customers";
// import NotFound from "./pertemuan-5/pages/main/NotFound";
// import Error400 from "./pertemuan-5/pages/main/Error400";
// import Error401 from "./pertemuan-5/pages/main/Error401";
// import Error403 from "./pertemuan-5/pages/main/Error403";
// import { MainLayout } from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Header = React.lazy(() => import("./components/Header"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const NotFound = React.lazy(() => import("./pages/main/NotFound"));
const Error400 = React.lazy(() => import("./pages/main/Error400"));
const Error401 = React.lazy(() => import("./pages/main/Error401"));
const Error403 = React.lazy(() => import("./pages/main/Error403"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/error/400" element={<Error400 />} />
          <Route path="/error/401" element={<Error401 />} />
          <Route path="/error/403" element={<Error403 />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
