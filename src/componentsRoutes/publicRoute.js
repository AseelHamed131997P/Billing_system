import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Ensure correct import

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // If the user is logged in and signOut is true, redirect to /adminAndCompany
  if (isLoggedIn && user?.registerCompany === "false") {
    return <Navigate to="/adminAndCompany" replace />;
  }

  // If the user is logged in but not signing out, redirect to /home
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, render the public route
  return <Element {...rest} />;
};

export default PublicRoute;
