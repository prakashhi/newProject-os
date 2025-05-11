import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { data, useLocation } from "react-router";
import { Buttonmy } from "../componets/Buttonmy";
import CircularProgress from "@mui/material/CircularProgress";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";

import Boxui from "../componets/Boxui";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import axios from "axios";

export const SetnesPassword = () => {
  document.title = "Reset Password";

  const [eyeshow, seteyeshow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.data.token == null) {
      navigate("/ForgotPassword");
    }
  }, []);

  const forgotschema = Yup.object().shape({
    confirm: Yup.string().required("Password is required"),

    password: Yup.string()
      .oneOf([Yup.ref("confirm"), null], "Passwords must match")
      .required("Password is required"),
  });

  const Passshow = () => {
    seteyeshow(!eyeshow);
  };

  const [loading, setloading] = useState(false);

  return (
    <React.Fragment>
      <Boxui heightbox={"550px"} forgotid={1}>
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
              onClick={() => navigate("/Verify")}
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
              Create new password
            </Typography>
          </Box>

          <Box
            sx={{
              my: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#736251",
                textAlign: "center",
              }}
            >
              Your new password must be different
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#736251",
                textAlign: "center",
              }}
            >
              from previously used passwords
            </Typography>
          </Box>

          <Formik
            initialValues={{
              confirm: "",
              password: "",
            }}
            validationSchema={forgotschema}
            onSubmit={async (values, actions) => {
              const { password } = values;

              console.log({
                token: location.state.data.token,
                password: password,
              });

              setloading(true);
              console.log(values);

              try {
                setloading(true);

                let res = await axios.post(
                  "https://api.fiind.app//api/v1/store/auth/resetPassword",
                  {"password":password}
                );
                
                if(res.data)
                {
                  toast.sucess("400: Store not found");
                  navigate('/')
                }
                
                console.log(res)

              } catch (error) {
                toast.error("400: Store not found");

                console.log(error);
              } finally {
                setloading(false);
              }
            }}
          >
            {(props) => {
              return (
                <form onSubmit={props.handleSubmit}>
                  <Box
                    sx={{
                      p: "20px",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <img src="./Images/Lock.png" width={20} height={20} />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontSize: "15px",
                          color: "#6F6F6F",
                        }}
                      >
                        New password
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        gap: "10px",
                        alignItems: "center",
                        borderRadius: "20px",
                        border: "2px solid #d9d9d9",
                      }}
                    >
                      <TextField
                        sx={{
                          my: "1px",
                          border: "none",
                          width: { lg: "90%", xs: "86%" },
                          ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              p: "10px",
                            },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        id="outlined-basic"
                        onChange={props.handleChange}
                        value={props.values.confirm}
                        placeholder=" New password"
                        name="confirm"
                        variant="outlined"
                        type={eyeshow ? "text" : "Password"}
                      />

                      {eyeshow ? (
                        <VisibilityIcon
                          style={{ cursor: "pointer", color: "#6C6C6C" }}
                          onClick={Passshow}
                        />
                      ) : (
                        <VisibilityOffIcon
                          style={{ cursor: "pointer", color: "#6C6C6C" }}
                          onClick={Passshow}
                        />
                      )}
                    </Box>
                    {props.errors.confirm && (
                      <Typography
                        id="feedback"
                        style={{ color: "red", fontSize: "0.75rem" }}
                      >
                        {props.errors.confirm}
                      </Typography>
                    )}

                    <Box
                      sx={{ display: "flex", gap: "10px", marginTop: "30px" }}
                    >
                      <img src="./Images/Lock.png" width={20} height={20} />
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontSize: "15px",
                          color: "#6F6F6F",
                        }}
                      >
                        Confirm password
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        gap: "10px",
                        alignItems: "center",
                        borderRadius: "20px",
                        border: "2px solid #d9d9d9",
                      }}
                    >
                      <TextField
                        sx={{
                          my: "1px",
                          ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              p: "10px",
                            },
                          border: "none",
                          width: { lg: "90%", xs: "86%" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        id="outlined-basic"
                        onChange={props.handleChange}
                        value={props.values.password}
                        placeholder="Confirm password"
                        name="password"
                        variant="outlined"
                        type={eyeshow ? "text" : "Password"}
                      />

                      {eyeshow ? (
                        <VisibilityIcon
                          style={{ cursor: "pointer", color: "#6C6C6C" }}
                          onClick={Passshow}
                        />
                      ) : (
                        <VisibilityOffIcon
                          style={{ cursor: "pointer", color: "#6C6C6C" }}
                          onClick={Passshow}
                        />
                      )}
                    </Box>
                    {props.errors.password && (
                      <Typography
                        id="feedback"
                        style={{ color: "red", fontSize: "0.75rem" }}
                      >
                        {props.errors.password}
                      </Typography>
                    )}
                  </Box>

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
              );
            }}
          </Formik>
        </Stack>
      </Boxui>
    </React.Fragment>
  );
};
