import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CirclesLoader from "../loader/CirclesLoader";

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <CirclesLoader />;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
