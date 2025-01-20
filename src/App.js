import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./componentsRoutes/index";
import {
  AdminAndCompany,
  Home,
  Login,
  SignUpWithGoogle,
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
    <Routes>
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
    </Routes>
  );
}

export default App;
