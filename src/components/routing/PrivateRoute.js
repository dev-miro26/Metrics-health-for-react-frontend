import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

const PrivateRoute = ({
  component: Component,
  // auth: { isAuthenticated, loading },
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // if (loading) return <OlsLoader />;
  if (isAuthenticated) return <Component />;
  console.log(isAuthenticated);

  return <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
