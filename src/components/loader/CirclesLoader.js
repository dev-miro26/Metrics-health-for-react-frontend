import React from "react";
import { Box, Typography } from "@mui/material";

import "./CirclesLoader.scss";

function CirclesLoader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{ width: "100%", height: "100vh" }}
    >
      <div className="circles-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Typography variant="h5" sx={{ mt: 2, color: "#797979" }}>
        Loading ...
      </Typography>
    </Box>
  );
}

export default CirclesLoader;
