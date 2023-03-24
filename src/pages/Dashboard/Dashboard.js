import React from "react";
import PropTypes from "prop-types";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { apiLogout } from "../../actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";

// import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";

import { OverviewLatestOrders } from "../../sections/overview/overview-latest-orders";
import { OverviewLatestMetricsValue } from "../../sections/overview/overview-latest-metrics-value";

import { ToDoCard } from "../../sections/dashboard/to-do-card";
import {
  apiGetMetricsByUserId,
  apiGetMetricsAllWagesByUserId,
  apiGetMetricsTodayWagesByUserId,
  apiGetMetricsLastestWagesByUserId,
} from "../../actions/metrics";
import ToDoDialog from "../../sections/dashboard/to-do-dialog";
// import { OverviewTraffic } from "../sections/overview/overview-traffic";

const Dashboard = ({ apiLogout }) => {
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const todayMetrics =
    metrics && metrics.filter((metric) => metric.timing === "daily");
  const todayWages = useSelector((state) => state.metrics.todayWages);
  const lastestWages = useSelector((state) => state.metrics.lastestWages);
  // console.log(today.getFullYear(), todayWages[0].created_at.getFullYear());
  const [selectedMetric, setSelectedMetric] = React.useState({
    _id: "",
    fieldType: "",
  });
  // const [openDialog, setOpenDialog] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  // const onOK = () => {};
  // const onCancel = () => {
  //   setOpenDialog(false);
  // };
  React.useEffect(() => {
    dispatch(apiGetMetricsByUserId());
    dispatch(apiGetMetricsAllWagesByUserId());
    dispatch(apiGetMetricsTodayWagesByUserId());
    dispatch(apiGetMetricsLastestWagesByUserId());
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardLayout onAction={apiLogout}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {todayMetrics &&
              todayMetrics
                .filter(
                  (metric) =>
                    !todayWages
                      .map((wage) => wage.metricsId)
                      .includes(metric._id)
                )
                ?.map((metric, index) => (
                  <Grid xs={12} sm={6} lg={3} key={index}>
                    <ToDoCard
                      sx={{ height: "100%" }}
                      metric={metric}
                      // setOpenDialog={setOpenDialog}
                      setSelectedMetric={setSelectedMetric}
                      setOpenModal={setOpenModal}
                    />
                  </Grid>
                ))}
            <Box style={{ width: "100%" }}>
              <Grid xs={12} md={6} lg={4}>
                <OverviewLatestMetricsValue
                  lastestWages={lastestWages}
                  sx={{ height: "100%" }}
                  metrics={metrics}
                />
              </Grid>
            </Box>
            <Grid xs={12} md={12} lg={8}></Grid>
          </Grid>
        </Container>
      </Box>
      {/* <ConfirmDialog
        openDialog={openDialog}
        onOK={onOK}
        onCancel={onCancel}
        title="Confirm"
        content="Are you sure want to do this operatioin?"
      /> */}
      <ToDoDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        selectedMetric={selectedMetric}
      />
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  apiLogout: PropTypes.func.isRequired,
};

export default connect(null, { apiLogout })(Dashboard);
