import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CirclesLoader from "../loader/CirclesLoader";
import { setAuthToken } from "../../utils";
import store from "../../store";
import { apiLoadUser } from "../../actions/auth";
import { userLogOut } from "../../store/authSlice";

const Login = React.lazy(() => import("../../pages/auth/Login.js"));
const Register = React.lazy(() => import("../../pages/auth/Register.js"));
const Dashboard = React.lazy(() => import("../../pages/Dashboard/Dashboard"));
const Metrics = React.lazy(() => import("../../pages/Metrics/Metrics"));
const NotFound = React.lazy(() => import("../../pages/NotFound.js"));
const MetricsGroup = React.lazy(() =>
  import("../../pages/MetricsGroup/MetricsGroup")
);
const TotalMetricsValues = React.lazy(() =>
  import("../../pages/TotalMetricsValues/TotalMetricsValues")
);
const Track = React.lazy(() => import("../../pages/Track/Track"));

const MainRoutes = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("smart-metrics-logbook")) {
      setAuthToken(localStorage.getItem("smart-metrics-logbook"));
      store.dispatch(apiLoadUser(navigate));
    } else {
      store.dispatch(userLogOut());
      navigate("api/login");
      localStorage.removeItem("smart-metrics-logbook");
    }
    window.addEventListener("storage", () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Suspense fallback={<CirclesLoader />}>
      <Routes>
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/auth/login" element={<Login></Login>}></Route>
        <Route path="/auth/register" element={<Register></Register>}></Route>
        <Route path="/metrics" element={<PrivateRoute component={Metrics} />} />
        <Route path="/track" element={<PrivateRoute component={Track} />} />
        <Route
          path="metrics/viewallvalues"
          element={<PrivateRoute component={TotalMetricsValues} />}
        />
        <Route
          path="/group"
          element={<PrivateRoute component={MetricsGroup} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default MainRoutes;
