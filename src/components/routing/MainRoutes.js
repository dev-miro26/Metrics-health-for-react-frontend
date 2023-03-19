import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/auth/Login.js";
import Register from "../../pages/auth/Register.js";
import Dashboard from "../../pages/Dashboard";
import Metrics from "../../pages/Metrics/Metrics";
import NotFound from "../../pages/NotFound.js";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/auth/login" element={<Login></Login>}></Route>
      <Route path="/auth/register" element={<Register></Register>}></Route>
      <Route path="/metrics" element={<PrivateRoute component={Metrics} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
