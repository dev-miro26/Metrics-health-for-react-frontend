import React from "react";
import PropTypes from "prop-types";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../sections/overview/overview-budget";
import { OverviewLatestOrders } from "../sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "../sections/overview/overview-latest-products";
// import { OverviewSales } from "../sections/overview/overview-sales";
import { OverviewTasksProgress } from "../sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "../sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "../sections/overview/overview-total-profit";
// import { OverviewTraffic } from "../sections/overview/overview-traffic";

const now = new Date();

const Dashboard = ({ logout }) => {
  console.log("-----------");
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
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="75Kg"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="120/t"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="160/s" />
            </Grid>
            {/* <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={["Desktop", "Tablet", "Phone"]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Blood pressure",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Running",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Pushups",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: "f69f88012978187a6c12897f",
                    ref: "Exercise49",
                    amount: 30.5,
                    customer: {
                      name: "sdfsdfsdfsdf",
                    },
                    createdAt: 1555016400000,
                    status: "inactive",
                  },
                  {
                    id: "9eaa1c7dd4433f413c308ce2",
                    ref: "Exercise48",
                    amount: 25.1,
                    customer: {
                      name: "fsdfdsfsdf",
                    },
                    createdAt: 1555016400000,
                    status: "active",
                  },
                  {
                    id: "01a5230c811bd04996ce7c13",
                    ref: "Exercise47",
                    amount: 10.99,
                    customer: {
                      name: "fsdfdsfsdf",
                    },
                    createdAt: 1554930000000,
                    status: "fixed",
                  },
                  {
                    id: "1f4e1bd0a87cea23cdb83d18",
                    ref: "Exercise46",
                    amount: 96.43,
                    customer: {
                      name: "dfdsfdsfdsf",
                    },
                    createdAt: 1554757200000,
                    status: "inactive",
                  },
                  {
                    id: "9f974f239d29ede969367103",
                    ref: "Exercise45",
                    amount: 32.54,
                    customer: {
                      name: "sdfdsfdsf",
                    },
                    createdAt: 1554670800000,
                    status: "active",
                  },
                  {
                    id: "ffc83c1560ec2f66a1c05596",
                    ref: "Exercise44",
                    amount: 16.76,
                    customer: {
                      name: "fsdfdsf",
                    },
                    createdAt: 1554670800000,
                    status: "active",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Dashboard);
