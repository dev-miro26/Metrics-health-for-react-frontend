import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Box,
  Container,
  IconButton,
  SvgIcon,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  TableContainer,
  Paper,
  Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { MetricsSearch } from "../../sections/metrics/metrics-search";
import { apiLogout } from "../../actions/auth";

import { apiGetMetricsAllWagesByUserId } from "../../actions/metrics";
import { useNavigate } from "react-router-dom";

const TotalMetricsValues = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const allWages = useSelector((state) => state.metrics.wages);
  const [startDate, setStartDate] = React.useState();

  const [endDate, setEndDate] = React.useState(moment().format("YYYY-MM-DD"));
  console.log(startDate, endDate);
  React.useEffect(() => {
    dispatch(apiGetMetricsAllWagesByUserId);
  }, []);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const matchingWages = allWages.reduce((acc, wage) => {
    const metric = metrics.find(
      (metric) => metric._id.toString() === wage.metricsId.toString()
    );
    if (metric) {
      const date = moment(wage.createdAt)
        .format("YYYY-MM-DD HH:mm:ss")
        .toLocaleString()
        .slice(0, 10);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({ metric, wage });
    }
    return acc;
  }, {});

  const rows = Object.entries(matchingWages)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, wages]) => ({ date, wages }));
  console.log(rows);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
          <Paper style={{ padding: "8px", marginBottom: "16px" }}>
            <Box>
              <Tooltip title={"back"}>
                <IconButton onClick={(e) => navigate("/")}>
                  <SvgIcon>
                    <ArrowUturnLeftIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6} sm={12} xs={12}>
                <MetricsSearch search={search} setSearch={setSearch} />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Box display={"flex"} justifyContent="flex-end">
                  <Box pr={2}>
                    <TextField
                      id="datetime-local"
                      label="From"
                      type="date"
                      value={startDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="datetime-local"
                      label="To"
                      type="date"
                      value={endDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Date</TableCell>
                    {metrics.map((metric) => (
                      <TableCell key={metric._id}>{metric.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.date}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        {metrics.map((metric) => {
                          const wage = row.wages.find(
                            (w) => w.metric._id === metric._id
                          );
                          return (
                            <TableCell key={metric._id}>
                              {wage ? wage.wage.wage : "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={metrics.length + 1} />
                    </TableRow>
                  )}
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      // component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};
export default TotalMetricsValues;
