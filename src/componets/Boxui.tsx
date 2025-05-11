import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

const Boxui = ({ children, heightbox, forgotid }) => {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          backgroundColor: "#BBB0A4",
          display: "flex",
          justifyContent: "center",

          height: {
            xl: "100vw",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            marginTop: { xl: "100px", xs: "50px" },
          }}
        >
          <img src="./Images/findlogo.png" alt="" width={70} />
        </Box>

        <Box
          sx={{
            width: {
              xl: "600px",
              xs: "340px",
            },
            height: forgotid == 1 ? heightbox : "480px",
            my: {
              xl: "15%",
              xs: "40%",
            },

            flexDirection: "column",
            backgroundColor: "white",
            boxShadow: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",

            borderRadius: "20px",
          }}
        >
          {children}
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Boxui;
