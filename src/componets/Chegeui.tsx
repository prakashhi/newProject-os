import { Grid, Stack } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

const Chegui = ({ children }) => {
  return (
    <React.Fragment>
      <Grid
        sx={{
    
          backgroundColor: "#BBB0A4",
          

          display: "flex",
          justifyContent: "center",

          height: {
            xl: "100vw",
            xs: "100dvh",
            sm:'100dvh'
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            marginTop: { xl: "100px", xs: "50px" },
            px: {
              sm: "70px",
            },
          }}
        >
          <img src="./Images/findlogo.png" alt="" width={70} />
        </Box>

        <Stack
          sx={{
            width: "1200px",
            height: "800px",
            my: { lg: "240px", xs: "35%" },

            flexDirection: "column",
            backgroundColor: "white",
            boxShadow: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",

            borderRadius: "20px",
            mx: { lg: "0px", xs: "20px" },
          }}
        >
          {children}
        </Stack>
      </Grid>
    </React.Fragment>
  );
};

export default Chegui;
