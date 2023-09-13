import React from "react";
import { Box, Container, Typography } from "@mui/material";

type Props = {};

const Error = (props: Props) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Error 404!</Typography>
        <Typography>Page not found</Typography>
      </Box>
    </Container>
  );
};

export default Error;
