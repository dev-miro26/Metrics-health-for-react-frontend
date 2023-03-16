import React, { lazy, Suspense } from "react";
import { styled } from "@mui/material/styles";

const ApexChart = lazy(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => null,
});

export const Chart = styled(ApexChart)``;
