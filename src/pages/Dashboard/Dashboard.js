import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
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
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
import { apiLogout } from "../../actions/auth";

import OneLineChart from "./OneLineChart";
import BloodChart from "./BloodPressureChart";
import moment from "moment-timezone";
import TableForTextMetrics from "./TableForTextMetrics";
import EveryTimeChart from "./EveryTimeChart";
import GroupChart from "./GroupChart";

const Dashboard = ({ apiLogout }) => {
  const [filterEndDay, setFilterEndDay] = React.useState(
    moment().tz(moment.tz.guess()).startOf("day")
  );
  const [filterStartDay, setFilterStartDay] = React.useState(
    moment().tz(moment.tz.guess()).startOf("day").subtract(1, "week")
  );

  const [everyTimeDate, setEveryTimeDate] = React.useState(
    moment().tz(moment.tz.guess()).startOf("day")
  );

  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const todayMetrics =
    metrics &&
    metrics.filter(
      (metric) => metric.timing === "daily" && metric.status === "active"
    );
  const everyTimeMetrics =
    metrics &&
    metrics.filter(
      (metric) => metric.timing === "everytime" && metric.status === "active"
    );
  const todayWages = useSelector((state) => state.metrics.todayWages);
  const lastestWages = useSelector((state) => state.metrics.lastestWages);
  const allWages = useSelector((state) => state.metrics.wages);
  const [selectedMetric, setSelectedMetric] = React.useState({
    _id: "",
    fieldType: "",
  });
  const [allData, setAllData] = React.useState([]);

  const groups = useSelector((state) => state.group.groups);
  const [showChartWages, setShowChartWages] = React.useState([]);
  const [chartMetric, setChartMetric] = React.useState({});
  const [selectedShowChatMetric, setSelectedShowChatMetric] = React.useState();
  const [activeGroup, setActiveGroup] = React.useState("group-1");
  const [selectedGroup, setSelectedGroup] = React.useState();
  const [showChartMetricType, setShowChartMetricType] = React.useState();
  const [openModal, setOpenModal] = React.useState(false);
  const [openBlood, setOpenBlood] = React.useState(false);

  React.useEffect(() => {
    dispatch(apiGetMetricsByUserId());
    dispatch(apiGetMetricsAllWagesByUserId());
    dispatch(apiGetMetricsTodayWagesByUserId());
    dispatch(apiGetMetricsLastestWagesByUserId());
    dispatch(apiGetGroupsByUserId());

    // eslint-disable-next-line
    setActiveGroup("group-1");
    setSelectedShowChatMetric("");
  }, [dispatch]);
  React.useEffect(() => {
    setSelectedGroup(groups[0]?._id);
  }, [groups]);
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
                  <Grid xs={12} sm={6} lg={4} key={index}>
                    <ToDoCard
                      sx={{ height: "100%" }}
                      metric={metric}
                      setSelectedMetric={setSelectedMetric}
                      setOpenModal={setOpenModal}
                      setOpenBlood={setOpenBlood}
                    />
                  </Grid>
                ))}
            {everyTimeMetrics &&
              everyTimeMetrics?.map((metric, index) => (
                <Grid xs={12} sm={6} lg={4} key={index}>
                  <ToDoCard
                    sx={{ height: "100%" }}
                    metric={metric}
                    setSelectedMetric={setSelectedMetric}
                    setOpenModal={setOpenModal}
                    setOpenBlood={setOpenBlood}
                  />
                </Grid>
              ))}
          </Grid>
          <Paper
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            <Grid container spacing={4}>
              <Grid md={4} lg={3} sm={12} xs={12}>
                <Box sx={{ borderRight: { sm: "solid 1px #e2e2e2" } }}>
                  <p
                    style={{
                      textAlign: "center",
                      p: "2px",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    Group Name
                  </p>
                  <Divider />
                  <TreeView
                    defaultExpanded={["group-1"]}
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      flexGrow: 1,
                      maxHeight: 350,
                      overflowY: "auto",
                    }}
                    // style={{ height: "350px", overflowY: "scroll" }}
                    selected={[
                      selectedShowChatMetric
                        ? selectedShowChatMetric
                        : activeGroup,
                    ]}
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
                        onClick={() => {
                          setSelectedGroup(group._id);
                          setAllData([]);
                          setShowChartMetricType();
                          setSelectedShowChatMetric("");
                          setActiveGroup(`group-${index + 1}`);
                        }}
                        // defaultExpanded={["root"]}
                      >
                        {group?.contents?.map((metric, index) => (
                          <TreeItem
                            key={metric}
                            nodeId={metric}
                            onClick={() => {
                              const mm = metrics.filter(
                                (a) => a._id === metric
                              )[0];
                              setSelectedShowChatMetric(metric);
                              setSelectedGroup("");
                              setShowChartMetricType(mm);
                              setFilterEndDay(moment());
                              setFilterStartDay(moment().subtract(1, "week"));
                            }}
                            label={
                              <List key={metric}>
                                <ListItem
                                // onClick={() => {
                                //   setSelectedShowChatMetric(metric);
                                //   setFilterEndDay(moment());
                                //   setFilterStartDay(
                                //     moment().subtract(1, "week")
                                //   );
                                // }}
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
                </Box>
              </Grid>
              <Grid md={8} lg={9} sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { sm: "flex-end", xs: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {showChartMetricType?.fieldType !== "text" &&
                  showChartMetricType?.timing === "everytime" ? (
                    <Box sx={{ pr: { sm: 2 }, pb: { xs: "8px" } }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="From"
                            value={dayjs(everyTimeDate)}
                            onChange={(newValue) => {
                              setEveryTimeDate(
                                moment(newValue.format("YYYY-MM-DD"))
                              );
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ pr: { sm: 2 }, pb: { xs: "8px" } }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="From"
                              value={dayjs(filterStartDay)}
                              onChange={(newValue) => {
                                setFilterStartDay(
                                  moment(newValue.format("YYYY-MM-DD"))
                                );
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                      <Box sx={{ pb: { xs: "16px" } }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="To"
                              value={dayjs(filterEndDay)}
                              onChange={(newValue) => {
                                setFilterEndDay(
                                  moment(newValue.format("YYYY-MM-DD"))
                                );
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Box>
                    </>
                  )}
                </Box>
                {chartMetric?.timing !== "everytime" &&
                selectedGroup === "" &&
                (chartMetric?.fieldType === "number" ||
                  chartMetric?.fieldType === "5rating" ||
                  chartMetric?.fieldType === "10rating") ? (
                  <OneLineChart
                    data={showChartWages}
                    selectedShowChatMetric={selectedShowChatMetric}
                    filterEndDay={filterEndDay}
                    filterStartDay={filterStartDay}
                  />
                ) : null}
                {chartMetric?.fieldType === "bloodPressure" &&
                selectedGroup === "" &&
                chartMetric?.timing === "daily" ? (
                  <BloodChart
                    data={showChartWages}
                    filterEndDay={filterEndDay}
                    filterStartDay={filterStartDay}
                    selectedShowChatMetric={selectedShowChatMetric}
                  />
                ) : null}

                {selectedGroup === "" && chartMetric?.fieldType === "text" ? (
                  <TableForTextMetrics
                    data={showChartWages}
                    filterEndDay={filterEndDay}
                    filterStartDay={filterStartDay}
                    selectedShowChatMetric={selectedShowChatMetric}
                  />
                ) : null}
                {selectedGroup === "" &&
                chartMetric?.fieldType === "number" &&
                chartMetric?.timing === "everytime" ? (
                  <EveryTimeChart
                    data={showChartWages}
                    everyTimeDate={everyTimeDate}
                    selectedShowChatMetric={selectedShowChatMetric}
                  ></EveryTimeChart>
                ) : null}
                {selectedGroup ? (
                  <GroupChart
                    selectedGroup={selectedGroup}
                    filterEndDay={filterEndDay}
                    filterStartDay={filterStartDay}
                    metrics={metrics}
                    allWages={allWages}
                    setAllData={setAllData}
                    allData={allData}
                  ></GroupChart>
                ) : null}
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={4}>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestMetricsValue
                lastestWages={lastestWages}
                sx={{ height: "100%" }}
                metrics={metrics}
              />
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={12}></Grid>
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
