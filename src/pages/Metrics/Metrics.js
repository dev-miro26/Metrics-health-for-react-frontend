import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "../../hooks/use-selection";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { MetricsTable } from "../../sections/metrics/metrics-table";
import { MetricsSearch } from "../../sections/metrics/metrics-search";
import { usePopover } from "../../hooks/use-popover";
import {
  fieldTypes,
  chartTypes,
  statuses,
  timings,
} from "../../sections/metrics/metrics-dialog-title";
import { MetricsDialog } from "../../sections/metrics/metrics-dialog";
import {
  apiAddMetric,
  apiUpdateMetric,
  apiGetMetricsByUserId,
} from "../../actions/metrics";
import { apiLogout } from "../../actions/auth";

const useMetricsIds = (metrics) => {
  return useMemo(() => {
    return metrics.map((metric) => metric._id);
  }, [metrics]);
};

const Metrics = ({
  metrics: { metrics },
  apiAddMetric,
  apiGetMetricsByUserId,
  apiUpdateMetric,
  apiLogout,
}) => {
  const metricsIds = useMetricsIds(metrics);
  const metricsSelection = useSelection(metricsIds);
  const metricsPopover = usePopover();
  const [deletedId, setDeletedId] = React.useState("");
  const [search, setSearch] = React.useState("");

  const initialValues = {
    _id: "",
    name: "",
    description: "",
    fieldType: fieldTypes[0].value,
    prefix: "",
    postfix: "",
    chartType: chartTypes[0].value,
    status: statuses[0].value,
    order: "",
    timing: timings[0].value,
  };
  const [editedMetric, setEditedMetric] = React.useState({ ...initialValues });

  useEffect(() => {
    apiGetMetricsByUserId();
  }, [apiGetMetricsByUserId]);
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
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Metrics</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={(e) => {
                    metricsPopover.handleOpen();
                    setDeletedId("");
                    setEditedMetric(initialValues);
                  }}
                  ref={metricsPopover.anchorRef}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <MetricsSearch search={search} setSearch={setSearch} />
            <MetricsTable
              metrics={
                search === ""
                  ? metrics
                  : metrics.filter((metric) => metric.name.includes(search))
              }
              onDeselectAll={metricsSelection.handleDeselectAll}
              onDeselectOne={metricsSelection.handleDeselectOne}
              onSelectAll={metricsSelection.handleSelectAll}
              onSelectOne={metricsSelection.handleSelectOne}
              selected={metricsSelection.selected}
              setDeletedId={setDeletedId}
              deletedId={deletedId}
              setEditedMetric={setEditedMetric}
              openMetricModal={metricsPopover.handleOpen}
            />
          </Stack>
        </Container>
      </Box>
      <MetricsDialog
        open={metricsPopover.open}
        onClose={metricsPopover.handleClose}
        onAddMetric={apiAddMetric}
        onUpdateMetric={apiUpdateMetric}
        initialValues={editedMetric._id ? editedMetric : initialValues}
        editedMetric={editedMetric}
        fieldTypes={fieldTypes}
        chartTypes={chartTypes}
        statuses={statuses}
        timings={timings}
      />
    </DashboardLayout>
  );
};

Metrics.propTypes = {
  apiAddMetric: PropTypes.func.isRequired,
  apiGetMetricsByUserId: PropTypes.func.isRequired,
  apiUpdateMetric: PropTypes.func.isRequired,
  apiLogout: PropTypes.func.isRequired,
  metrics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metrics: state.metrics,
});

export default connect(mapStateToProps, {
  apiAddMetric,
  apiGetMetricsByUserId,
  apiUpdateMetric,
  apiLogout,
})(Metrics);
