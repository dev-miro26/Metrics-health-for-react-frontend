import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import { SeverityPill } from "../../components/severity-pill";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import ConfirmDialog from "../../components/ConfirmModal";
import { apiDeleteMetricById } from "../../actions/metrics";
import { useDispatch } from "react-redux";
const statusMap = {
  active: "success",
  inactive: "warning",
  fixed: "error",
};

export const MetricsTable = (props) => {
  const {
    metrics,

    selected = [],
    deletedId,
    setDeletedId,
    setEditedMetric,
    openMetricModal,
  } = props;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);


  const onOK = () => {
    deletedId && dispatch(apiDeleteMetricById(deletedId));
    setDeletedId("");
    setOpenDialog(false);
  };
  const onCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Chart Type</TableCell>
                <TableCell>Timing</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics?.map((metric, index) => {
                const isSelected = selected.includes(metric._id);

                return (
                  <TableRow hover key={metric._id} selected={isSelected}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {metric.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{metric.description}</TableCell>
                    <TableCell>{metric.chartType}</TableCell>
                    <TableCell>{metric.timing}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[metric.status]}>
                        {metric.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="edit">
                        <IconButton
                          onClick={() => {
                            setEditedMetric(metric);
                            openMetricModal();
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
                            setDeletedId(metric._id);
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
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <ConfirmDialog
        onOK={onOK}
        openDialog={openDialog}
        onCancel={onCancel}
        title="Confirm"
        content="Are you sure you want to delete this metric?"
      />
    </Card>
  );
};

MetricsTable.propTypes = {
  metrics: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  selected: PropTypes.array,
};
