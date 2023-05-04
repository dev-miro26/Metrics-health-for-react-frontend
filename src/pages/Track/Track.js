import React from "react";
import moment from "moment";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  SvgIcon,
  Tooltip,
  IconButton,
  Grid,
  TextField,
  TableBody,
  TablePagination,
} from "@mui/material";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { MetricsSearch } from "../../sections/metrics/metrics-search";
import ConfirmDialog from "../../components/ConfirmModal";

import { apiLogout } from "../../actions/auth";
import {
  apiDeleteMetricWageById,
  apiGetMetricsAllWagesByUserId,
} from "../../actions/metrics";
import EditWageDialog from "./EditTrackDialog";
import EditTrackDialogForBlood from "./EditTrackDialogForBlood";
const Track = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metrics = useSelector((state) => state.metrics.metrics);
  const allWages = useSelector((state) => state.metrics.wages);
  const [search, setSearch] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deletedWageId, setDeletedWageId] = React.useState("");
  const [editedMetricWage, setEditedMetricWage] = React.useState({});
  const [openEditMetricWageDialog, setOpenEditMetricWageDialog] =
    React.useState(false);
  const [
    openEditMetricWageDialogForBlood,
    setOpenEditMetricWageDialogForBlood,
  ] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [matchingWages, setMatchingWages] = React.useState([]);
  React.useEffect(() => {
    const matchingWages = allWages?.reduce((acc, wage) => {
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
    setMatchingWages(matchingWages);
  }, [allWages]); //eslint-disable-line
 
  const onOK = () => {
    dispatch(apiDeleteMetricWageById(deletedWageId));
    setOpenDialog(false);
  };
  const onCancel = () => {
    setOpenDialog(false);
  };
  React.useEffect(() => {
    const rows1 = Object.entries(matchingWages)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, wages]) => ({ date, wages }));
    setRows(rows1);
  }, [matchingWages]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);
  const [startDate, setStartDate] = React.useState("");
  const [currentRows, setCurrentRows] = React.useState(rows);

  const [endDate, setEndDate] = React.useState(moment().format("YYYY-MM-DD"));
  React.useEffect(() => {
    dispatch(apiGetMetricsAllWagesByUserId);
    // eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    const start = startDate.valueOf();
    const end = endDate.valueOf();
    const findWages = (rows) => {
      let newRows = [];
      let date = [];

      rows.forEach((item) => {
        item.wages.forEach((wageItem) => {
          if (wageItem.wage.wage.includes(search)) {
            !date.includes(item.date) && newRows.push(item);
            !date.includes(item.date) && date.push(item.date);
          }
        });
      });

      return newRows;
    };
    setCurrentRows(
      findWages(rows).filter(
        (row) => start <= row.date.valueOf() && end >= row.date.valueOf()
      )
    );
  }, [search, startDate, endDate, rows, allWages]); //eslint-disable-line
  return (
    <DashboardLayout onAction={apiLogout}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 4,
        }}
      >
       
        <Grid container spacing={2} sx={{ pb: 2 }}>
          <Grid item md={6} sm={12} xs={12}>
            <Box
              display={"flex"}
              sx={{
                justifyContent: { sm: "space-between", xs: "space-between" },
              }}
            >
              <Tooltip title={"back"}>
                <IconButton onClick={(e) => navigate("/")}>
                  <SvgIcon>
                    <ArrowLeftIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
              <MetricsSearch
                search={search}
                setSearch={setSearch}
                sx={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Box
              display={"flex"}
              sx={{
                justifyContent: { sm: "space-between", xs: "space-between" },
              }}
            >
              <TextField
                id="datetime-local"
                label="From"
                type="date"
                value={startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                sx={{ pr: { xs: "1rem", sm: "2rem" } }}
              />

              <TextField
                fullWidth
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
          </Grid>
        </Grid>
        <Table sx={{ mt: 2, width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: { xs: "12px" },
                  textAlign: "center",
                  width: "10%",
                  wordBreak: "break-all",
                }}
              >
                No
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: "12px" },
                  textAlign: "center",
                  width: "10%",
                  wordBreak: "break-all",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: "12px" },
                  textAlign: "center",
                  width: "20%",
                  wordBreak: "break-all",
                }}
              >
                Metrics Name
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: "12px" },
                  textAlign: "center",
                  width: "40%",
                  wordBreak: "break-all",
                }}
              >
                Metrics Value
              </TableCell>
              <TableCell
                sx={{
                  padding: { xs: "12px" },
                  textAlign: "center",
                  width: "20%",
                }}
              >
                actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) =>
                row?.wages?.map((item, ind) =>
                  ind === 0 ? (
                    <TableRow key={item?.wage?._id}>
                      <TableCell
                        rowSpan={row?.wages?.length}
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        rowSpan={row?.wages?.length}
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {row?.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {
                          metrics?.filter(
                            (metric) => metric._id === item?.wage?.metricsId
                          )[0]?.name
                        }
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {item?.wage?.wage}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        <Tooltip title="edit">
                          <IconButton
                            onClick={async () => {
                              try {
                                await setEditedMetricWage(item?.wage);
                                const type = metrics.filter(
                                  (m) => m._id === item?.wage?.metricsId
                                )[0]?.fieldType;
                                if (type === "bloodPressure") {
                                  await setOpenEditMetricWageDialog(false);

                                  await setOpenEditMetricWageDialogForBlood(
                                    true
                                  );
                                } else {
                                  setOpenEditMetricWageDialogForBlood(false);
                                  setOpenEditMetricWageDialog(true);
                                }
                              } catch (err) {}
                            }}
                          >
                            <SvgIcon fontSize="small" color="primary">
                              <PencilIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={(e) => {
                              setDeletedWageId(item?.wage?._id);
                              setOpenDialog(true);
                            }}
                          >
                            <SvgIcon fontSize="small">
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={item?.wage?._id}>
                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {
                          metrics?.filter(
                            (metric) => metric._id === item?.wage?.metricsId
                          )[0]?.name
                        }
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        {item?.wage?.wage}
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: { xs: "4px" },
                          textAlign: "center",
                          wordBreak: "break-all",
                        }}
                      >
                        <Tooltip title="edit">
                          <IconButton
                            onClick={async () => {
                              try {
                                await setEditedMetricWage(item?.wage);
                                const type = metrics.filter(
                                  (m) => m._id === item?.wage?.metricsId
                                )[0]?.fieldType;
                                if (type === "bloodPressure") {
                                  await setOpenEditMetricWageDialog(false);

                                  await setOpenEditMetricWageDialogForBlood(
                                    true
                                  );
                                } else {
                                  setOpenEditMetricWageDialogForBlood(false);
                                  setOpenEditMetricWageDialog(true);
                                }
                              } catch (err) {}
                            }}
                          >
                            <SvgIcon fontSize="small" color="primary">
                              <PencilIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton
                            onClick={(e) => {
                              setDeletedWageId(item?.wage?._id);
                              setOpenDialog(true);
                            }}
                          >
                            <SvgIcon fontSize="small">
                              <TrashIcon />
                            </SvgIcon>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={metrics?.length + 1} />
              </TableRow>
            )}
            <TableRow style={{ borderBottom: "none" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                // component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ borderBottom: "none" }}
              />
            </TableRow>
          </TableBody>
        </Table>
        <ConfirmDialog
          onOK={onOK}
          openDialog={openDialog}
          onCancel={onCancel}
          title="Confirm"
          content="Are you sure you want to delete this metric value?"
        />
        {openEditMetricWageDialog ? (
          <EditWageDialog
            openEditMetricWageDialog={openEditMetricWageDialog}
            onClose={(e) => setOpenEditMetricWageDialog(false)}
            editedMetricWage={editedMetricWage}
          />
        ) : null}
        {openEditMetricWageDialogForBlood ? (
          <EditTrackDialogForBlood
            openEditMetricWageDialogForBlood={openEditMetricWageDialogForBlood}
            onClose={(e) => setOpenEditMetricWageDialogForBlood(false)}
            editedMetricWage={editedMetricWage}
          />
        ) : null}
      </Box>
    </DashboardLayout>
  );
};

export default Track;
