import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
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
import { deleteMetricById } from "../../actions/metrics";
import { useDispatch } from "react-redux";
const statusMap = {
  active: "success",
  inactive: "warning",
  fixed: "error",
};

export const MetricsTable = (props) => {
  const {
    metrics,
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = [],
    selectedMetric,
    setSelectedMetric,
  } = props;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const selectedSome = selected.length > 0 && selected.length < metrics.length;
  const selectedAll = metrics.length > 0 && selected.length === metrics.length;

  const onOK = () => {
    console.log(selectedMetric);
    // selectedMetric && deleteMetric(selectedMetric);
    selectedMetric && dispatch(deleteMetricById(selectedMetric));
    setOpenDialog(false);
  };
  const onCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
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
              {metrics.map((metric, index) => {
                const isSelected = selected.includes(metric._id);

                return (
                  <TableRow hover key={metric._id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(metric._id);
                          } else {
                            onDeselectOne?.(metric._id);
                          }
                        }}
                      />
                    </TableCell>
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
                        <IconButton>
                          <SvgIcon fontSize="small" color="primary">
                            <PencilIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="delete">
                        <IconButton
                          onClick={(e) => {
                            setSelectedMetric(metric._id);
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
