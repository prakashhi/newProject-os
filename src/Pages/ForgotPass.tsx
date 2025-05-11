import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";
import { Buttonmy } from "../componets/Buttonmy";

import Boxui from "../componets/Boxui";
import { Box, Input, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { SellOutlined } from "@mui/icons-material";

const forgotschema = Yup.object().shape({
  phone_number: Yup.number()
    .typeError("Only Didgit allow")

    .required("Please enter mobile number"),
});

export const ForgotPass = () => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  document.title = "Forgot Password";
  return (
    <React.Fragment>
      <Boxui heightbox="320px" forgotid={1}>
        <Stack
          sx={{
            padding: {
              xl: "50px",
              xs: "30px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xl: "140px", xs: "50px" },
              alignItems: "center",
            }}
          >
            <img
              src="./Images/BAck.png"
              alt=""
              onClick={() => navigate("/")}
              width={10}
              height={20}
              style={{ cursor: "pointer" }}
            />
            <Typography
              sx={{
                color: "#6F6F6F",
                fontSize: {
                  xl: "25px",
                  xs: "19px",
                },
                textAlign: "center",
              }}
            >
              Forgot password
            </Typography>
          </Box>
          <Stack
            sx={{
              padding: { xl: "20px" },
              marginTop: { xs: "60px", xl: "10px" },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Formik
                initialValues={{ country_code: "+45", phone_number: "" }}
                validationSchema={forgotschema}
                onSubmit={async (values, actions) => {
                  try {
                    setloading(true);

                    let res = await axios.post(
                      "https://api.fiind.app/api/v1/store/auth/requestOTP",
                      values
                    );

        

                    if (res.data.success == true) {
                      navigate("/Verify", { state: values.phone_number });
                      toast.success("OTP sent successfully");
                    } 
                  } catch (error) {      
                     toast.error("400: Store not found");
                    console.log(error);   
                  } finally {
                    setloading(false);
                  }
                }}
              >
                {(props) => {
                  const { setFieldValue } = props;

                  return (
                    <Box
                      sx={{
                        padding: { xl: "17px" },
                        width: "100%",
                      }}
                    >
                      <form
                        style={{ display: "flex", flexDirection: "column" }}
                        onSubmit={props.handleSubmit}
                      >
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <img
                            src="./Images/Untitled.jpeg"
                            width={20}
                            height={20}
                          />
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontSize: "15px",
                              color: "#727272",
                            }}
                          >
                            Enter phone number
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            justifyItems: "center",
                            gap: "10px",
                            alignItems: "center",
                            borderRadius: "20px",
                            px: "9px",
                            py: "2px",
                            border: "0.5px solid #E2E2E2",
                          }}
                        >
                          <Typography>+45</Typography>
                          <TextField
                            slotProps={{}}
                            sx={{
                              my: "1px",
                              border: "none",
                              width: "100%",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                            id="outlined-basic"
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!isNaN(val)) {
                                setFieldValue("phone_number", val);
                              }
                            }}
                            inputProps={{ maxLength: 8 }}
                            onBlur={props.handleBlur}
                            value={props.values.phone_number}
                            placeholder="00 00 00 00"
                            name="phone_number"
                            variant="outlined"
                          />
                        </Box>

                        {props.errors.phone_number && (
                          <div
                            id="feedback"
                            style={{ color: "red", fontSize: "0.75rem" }}
                          >
                            {props.errors.phone_number}
                          </div>
                        )}

                        <Buttonmy
                          text={
                            loading ? (
                              <CircularProgress
                              size={18}
                                sx={{
                                  color: "white",
                                }}
                              />
                            ) : (
                              "Next"
                            )
                          }
                          width={"48%"}
                          bgcolor={"#BBB0A4"}
                        />
                      </form>
                    </Box>
                  );
                }}
              </Formik>
            </Box>
          </Stack>
        </Stack>
      </Boxui>
    </React.Fragment>
  );
};
