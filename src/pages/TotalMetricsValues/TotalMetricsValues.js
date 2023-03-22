import React from "react";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { apiLogout } from "../../actions/auth";
import {
  Box,
  Container,
  IconButton,
  SvgIcon,
  Tooltip,
  Table,
} from "@mui/material";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { MetricsSearch } from "../../sections/metrics/metrics-search";
import { useSelector } from "react-redux";
const TotalMetricsValues = () => {
  const metrics = useSelector((state) => state.metrics.metrics);
  const [search, setSearch] = React.useState("");
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
          <Box>
            <Tooltip title={"back"}>
              <IconButton>
                <SvgIcon>
                  <ArrowUturnLeftIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <MetricsSearch search={search} setSearch={setSearch} />
          </Box>
          <Box>
            <Table style={{ width: "100%" }}></Table>
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};
export default TotalMetricsValues;
