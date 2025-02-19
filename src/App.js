import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
  ReceiptVoucher,
} from "./mainComponent/index";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ Correct

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // Store navigate in a global window object for access outside React
    window.myNavigate = navigate;
  }, [navigate]);

  return (
    <>
      {/* {(isLoggedIn || location.pathname !== "/adminAndCompany") && <Header />} */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<PublicRoute element={Login} />} />
        {/* <Route
          path="/signUpWithGoogle"
          element={<PublicRoute element={SignUpWithGoogle} />}
        /> */}
        <Route
          path="/signUp"
          element={<PublicRoute element={SignUpWithGoogle} />}
        />
        <Route
          path="/adminAndCompany"
          element={<PrivateRoute element={AdminAndCompany} />}
        />
        <>
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route
            path="/customer"
            element={<PrivateRoute element={Customer} />}
          />
          <Route path="/item" element={<PrivateRoute element={Item} />} />
          <Route path="/invoice" element={<PrivateRoute element={Invoice} />} />
          <Route
            path="/recieptVoucher"
            element={<PrivateRoute element={ReceiptVoucher} />}
          />
        </>
      </Routes>
    </>
  );
}

export default App;
