import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1">
          Here is our {" "}
          <a
            href="https://github.com/Lukapeng77/Orbital2024"
            target="_blank"
          >
            Repository
          </a>
            ! Feel free to visit!
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
