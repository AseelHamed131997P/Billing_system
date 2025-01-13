import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "../hooks"; // Assuming useSelector is used for state management

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // If the user is logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to="/main" replace />;
  }

  return <Element {...rest} />;
};

export default PublicRoute;
