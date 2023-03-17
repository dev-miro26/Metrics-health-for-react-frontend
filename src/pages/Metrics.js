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
import { useSelection } from "../hooks/use-selection";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { MetricsTable } from "../sections/metrics/metrics-table";
import { MetricsSearch } from "../sections/metrics/metrics-search";
import { usePopover } from "../hooks/use-popover";
import { MetricsDialog } from "../sections/metrics/metrics-dialog";
import { addMetrics, getUserMetricsById } from "../actions/metrics";
import { logout } from "../actions/auth";

// const data = [
//   {
//     id: "5e887ac47eed253091be10ca",
//     name: "Weight",
//     description: "sdfsdfsdfsdfsdf",
//     chartType: "line",
//     timing: "daily",
//     status: "active",
//   },
//   {
//     id: "5e887ac47eed253091be10cb",
//     name: "Weight",
//     description: "sdfsdfsdfsdfsdf",
//     chartType: "bar",
//     timing: "daily",
//     status: "inactive",
//   },
//   {
//     id: "5e887ac47eed253091be10cc",
//     name: "Weight",
//     description: "sdfsdfsdfsdfsdf",
//     chartType: "pie",
//     timing: "daily",
//     status: "fixed",
//   },
// ];

const useMetricsIds = (metrics) => {
  return useMemo(() => {
    return metrics.map((metric) => metric._id);
  }, [metrics]);
};

const Metrics = ({
  metrics: { metrics },
  addMetrics,
  getUserMetricsById,
  logout,
}) => {
  const metricsIds = useMetricsIds(metrics);
  const metricsSelection = useSelection(metricsIds);
  const metricsPopover = usePopover();
  const [selectedMetric, setSelectedMetric] = React.useState("");

  useEffect(() => {
    getUserMetricsById();
  }, [getUserMetricsById]);

  return (
    <DashboardLayout onAction={logout}>
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
                  onClick={metricsPopover.handleOpen}
                  ref={metricsPopover.anchorRef}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <MetricsSearch />
            <MetricsTable
              metrics={metrics}
              onDeselectAll={metricsSelection.handleDeselectAll}
              onDeselectOne={metricsSelection.handleDeselectOne}
              onSelectAll={metricsSelection.handleSelectAll}
              onSelectOne={metricsSelection.handleSelectOne}
              selected={metricsSelection.selected}
              setSelectedMetric={setSelectedMetric}
              selectedMetric={selectedMetric}
            />
          </Stack>
        </Container>
      </Box>
      <MetricsDialog
        open={metricsPopover.open}
        onClose={metricsPopover.handleClose}
        onAddMetrics={addMetrics}
      />
    </DashboardLayout>
  );
};

Metrics.propTypes = {
  addMetrics: PropTypes.func.isRequired,
  getUserMetricsById: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  metrics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metrics: state.metrics,
});

export default connect(mapStateToProps, {
  addMetrics,
  getUserMetricsById,
  logout,
})(Metrics);
