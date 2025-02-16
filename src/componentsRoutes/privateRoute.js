import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../hooks"; // Assuming useSelector is used for state management

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation(); // Get the current path

  // If the user is logged in, redirect to the home page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // // If logged in and registerCompany is false, redirect to /adminAndCompany
  if (
    isLoggedIn &&
    user?.registerCompany === "false" &&
    location.pathname !== "/adminAndCompany"
  ) {
    return <Navigate to="/adminAndCompany" replace />;
  }

  // If logged in, registerCompany is true, and trying to access /adminAndCompany, redirect to /home
  if (
    isLoggedIn &&
    user?.registerCompany === "true" &&
    location.pathname === "/adminAndCompany"
  ) {
    return <Navigate to="/home" replace />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
