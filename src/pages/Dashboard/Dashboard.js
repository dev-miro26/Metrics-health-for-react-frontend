import React from "react";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { apiLogout } from "../../actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Unstable_Grid2 as Grid,
  ListItemIcon,
  SvgIcon,
  Avatar,
} from "@mui/material";
import { ClockIcon } from "@heroicons/react/24/solid";
import { OverviewLatestMetricsValue } from "../../sections/overview/overview-latest-metrics-value";
import { ToDoCard } from "../../sections/dashboard/to-do-card";
import {
  apiGetMetricsByUserId,
  apiGetMetricsAllWagesByUserId,
  apiGetMetricsTodayWagesByUserId,
  apiGetMetricsLastestWagesByUserId,
} from "../../actions/metrics";
import ToDoDialog from "../../sections/dashboard/to-do-dialog";
import ToDoForBloodPressure from "../../sections/dashboard/to-do-dialog-for-bloodPressure";
import { apiGetGroupsByUserId } from "../../actions/group";

import OneLineChart from "./OneLineChart";
import BloodChart from "./BloodPressureChart";
const Dashboard = ({ apiLogout }) => {
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const todayMetrics =
    metrics && metrics.filter((metric) => metric.timing === "daily");
  const todayWages = useSelector((state) => state.metrics.todayWages);
  const lastestWages = useSelector((state) => state.metrics.lastestWages);
  const allWages = useSelector((state) => state.metrics.wages);
  const [selectedMetric, setSelectedMetric] = React.useState({
    _id: "",
    fieldType: "",
  });
  const groups = useSelector((state) => state.group.groups);
  const [showChartWages, setShowChartWages] = React.useState([]);
  const [chartMetric, setChartMetric] = React.useState({});
  const [selectedShowChatMetric, setSelectedShowChatMetric] =
    React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [openBlood, setOpenBlood] = React.useState(false);

  React.useEffect(() => {
    dispatch(apiGetMetricsByUserId());
    dispatch(apiGetMetricsAllWagesByUserId());
    dispatch(apiGetMetricsTodayWagesByUserId());
    dispatch(apiGetMetricsLastestWagesByUserId());
    dispatch(apiGetGroupsByUserId());
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    setShowChartWages(
      allWages.filter((wage) => wage.metricsId === selectedShowChatMetric)
    );
    setChartMetric(metrics.filter((m) => m._id === selectedShowChatMetric)[0]);
  }, [selectedShowChatMetric, allWages]); //eslint-disable-line
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
                      ?.map((wage) => wage.metricsId)
                      ?.includes(metric._id)
                )
                ?.map((metric, index) => (
                  <Grid xs={12} sm={6} lg={3} key={index}>
                    <ToDoCard
                      sx={{ height: "100%" }}
                      metric={metric}
                      setSelectedMetric={setSelectedMetric}
                      setOpenModal={setOpenModal}
                      setOpenBlood={setOpenBlood}
                    />
                  </Grid>
                ))}
            <Grid item md={12} sm={12} style={{ display: "flex" }}>
              <Grid item md={4} sm={6}>
                <Paper>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      flexGrow: 1,
                      maxWidth: 400,
                      overflowY: "auto",
                    }}
                  >
                    {groups?.map((group, index) => (
                      <TreeItem
                        key={`group-${index + 1}`}
                        nodeId={`group-${index + 1}`}
                        label={
                          <List>
                            <ListItem>
                              <ListItemText primary={group.name} />
                            </ListItem>
                          </List>
                        }
                      >
                        {group?.contents?.map((metric, index) => (
                          <TreeItem
                            key={`metric-${index + 1}`}
                            nodeId={`metric-${index + 1}`}
                            label={
                              <List>
                                <ListItem
                                  onClick={() =>
                                    setSelectedShowChatMetric(metric)
                                  }
                                >
                                  <ListItemIcon>
                                    <Avatar
                                      sx={{
                                        backgroundColor: "success.main",
                                        height: 24,
                                        width: 24,
                                      }}
                                    >
                                      <SvgIcon>
                                        <ClockIcon />
                                      </SvgIcon>
                                    </Avatar>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      metrics.filter((m) => m._id === metric)[0]
                                        ?.name
                                    }
                                  />
                                </ListItem>
                              </List>
                            }
                          ></TreeItem>
                        ))}
                      </TreeItem>
                    ))}
                  </TreeView>
                </Paper>
              </Grid>
              <Grid item md={8} sm={9}>
                {chartMetric?.fieldType == "number" ? (
                  <OneLineChart
                    data={showChartWages}
                    selectedShowChatMetric={selectedShowChatMetric}
                  />
                ) : null}
                {chartMetric?.fieldType == "bloodPressure" ? (
                  <BloodChart
                    data={showChartWages}
                    selectedShowChatMetric={selectedShowChatMetric}
                  />
                ) : null}
              </Grid>
            </Grid>
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

      <ToDoDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedMetric({ _id: "", fieldType: "" });
        }}
        selectedMetric={selectedMetric}
      />
      <ToDoForBloodPressure
        open={openBlood}
        onClose={() => {
          setOpenBlood(false);
          setSelectedMetric({ _id: "", fieldType: "" });
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
