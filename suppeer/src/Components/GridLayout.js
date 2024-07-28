import { Grid, Stack } from "@mui/material";
import React from "react";

const GridLayout = (props) => {
  const { left, middle, right } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        {left}
      </Grid>
      <Grid item xs={12} md={6}>
        {middle}
        </Grid>
      <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
        {right}
      </Grid>
    </Grid>
  );
};

export default GridLayout;
