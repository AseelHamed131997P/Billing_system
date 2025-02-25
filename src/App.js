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
  ReturnInvoices,
  TaxCopy,
  Reports,
  Support,
  PrintableComponent,
  CreateInvoice,
  Settings,
  DeliveryInvoices,
  CreateDeliveryInvoice,
  NewReturnInvoice,
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
          <Route
            path="/returnInvoices"
            element={<PrivateRoute element={ReturnInvoices} />}
          />
          <Route path="/taxCopy" element={<PrivateRoute element={TaxCopy} />} />
          <Route path="/reports" element={<PrivateRoute element={Reports} />} />
          <Route path="/support" element={<PrivateRoute element={Support} />} />
          <Route
            path="/print-invoice"
            element={<PrivateRoute element={PrintableComponent} />}
          />
          <Route
            path="/create-invoice"
            element={<PrivateRoute element={CreateInvoice} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={Settings} />}
          />
          <Route
            path="/deliveryInvoices"
            element={<PrivateRoute element={DeliveryInvoices} />}
          />
          <Route
            path="/create-delivery-invoice"
            element={<PrivateRoute element={CreateDeliveryInvoice} />}
          />
          <Route
            path="/new-return-invoice"
            element={<PrivateRoute element={NewReturnInvoice} />}
          />
        </>
      </Routes>
    </>
  );
}

export default App;
