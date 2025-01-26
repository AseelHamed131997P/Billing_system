import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./componentsRoutes/index";
import {
  AdminAndCompany,
  Customer,
  Item,
  Home,
  Login,
  SignUpWithGoogle,
  Header,
  Invoice,
} from "./mainComponent/index";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Store navigate in a global window object for access outside React
    window.myNavigate = navigate;
  }, [navigate]);
  return (
    <>
      <Header />
      <Invoice />
      {/* <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/home" element={<PublicRoute element={Home} />} />
        <Route
          path="/signUpWithGoogle"
          element={<PublicRoute element={SignUpWithGoogle} />}
        />

        <Route
          path="/adminAndCompany"
          element={<PublicRoute element={AdminAndCompany} />}
        />
        <Route path="/customer" element={<PublicRoute element={Customer} />} />
        <Route path="/item" element={<PublicRoute element={Item} />} />
      </Routes> */}
    </>
  );
}

export default App;
