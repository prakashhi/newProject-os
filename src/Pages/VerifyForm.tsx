import React, { useRef, useState, useEffect } from "react";

import {
  Box,
  Button,
  Grid,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Boxui from "../componets/Boxui";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Buttonmy } from "../componets/Buttonmy";

export const VerifyForm = () => {
  const length = 4;

  const navigate = useNavigate();
  const location = useLocation();

  const [Passkey, setPasskey] = useState(Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const [shorest,setrest] =useState(false)
  const inputRef = useRef([]);

  useEffect(() => {
    if(formatTime(timeLeft) == "0:00")
    {
      setrest(true)
    }


    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup when component unmounts or timer ends
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!location.state) {
      navigate("/ForgotPassword");
    }
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const hadlecheck = async () => {
    try {
      let res = await axios.post(
        "https://api.fiind.app/api/v1/store/auth/verifyOTP",
        {
          country_code: "+45",
          phone_number: location.state,
          otp: Passkey.join(""),
        }
      );
      console.log(res.data.data.token);

      if (res.data.success == true) {
        toast.success("OTP verified successfully");
        navigate("/setNew", { state: res.data });
        // localStorage.setItem('token',res.data.data.token)
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong!");
    }
  };

  const checkfocus = (e, index) => {
    if (!isNaN(e.target.value)) {
      const newOtp = [...Passkey];
      newOtp[index] = e.target.value;
      setPasskey(newOtp);
      console.log(Passkey);

      if (e.target.value && index < length - 1) {
        inputRef.current[index + 1].focus();
      }

      if (e.target.value === "" && index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    console.log(index);

    if (e.key === "Backspace" && Passkey[index] == "" && Passkey[index] >= 0) {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const resendotp = async () =>{
   await axios.post('https://api.fiind.app/api/v1/store/auth/requestOTP',{ country_code: "+45", phone_number: location.state })
   setrest(false)
   setTimeLeft(120)
  }

  return (
    <React.Fragment>
      <Boxui heightbox="600px" forgotid={1}>
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
              onClick={() => navigate("/ForgotPassword")}
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
              Verify yourself
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", my: "20px" }}>
            <Button
              sx={{
                backgroundColor: "#F5F5F5",
                borderRadius: "1000px",
                p: "10px",
              }}
            >
              <img src="./Images/verfiimg.png" alt="" width={27} />
            </Button>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            SMS sent
          </Typography>

          <Typography sx={{ textAlign: "center" }}>
            Enter the 4-digit code,
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            which we have sent to
          </Typography>

          <Typography
            sx={{
              color: "#D5CEC7",
              textAlign: "center",
            }}
          >
            +45 {location.state}
          </Typography>

          <Grid
            sx={{
              padding: "30px",
              pl: { xl: "90px" },
            }}
            container
            spacing={2}
          >
            {Passkey.map((val, index) => (
              <TextField
                value={Passkey[index]}
                key={index}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => {
                  checkfocus(e, index);
                }}
                inputRef={(element) => (inputRef.current[index] = element)}
                inputProps={{ maxLength: 1 }}
                sx={{
                  fontSize: "20px",
                  ".css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input": {
                    textAlign: "center",
                  },
                  width: "13%",
                  padding: "10px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },

                  // mx:{xl:'9px'},
                  borderRadius: "10px",
                  border: "0.5px solid #a89d93",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 4px 0px",
                }}
              />
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {

            }
            
            {
              shorest ? (<Button onClick={resendotp} sx={{ width: "30%" }}>RESEND NOW</Button>):(<Button sx={{ width: "30%" }}>{formatTime(timeLeft)}</Button>)
            }

          
          </Box>

          <Buttonmy
            onclicfun={hadlecheck}
            width={"50%"}
            disabile={Passkey[3] ? false : true}
            bgcolor={Passkey[3] ? "#bbb0a4" : "#e0e0e0"}
            text={"Confirm"}
          />
        </Stack>
      </Boxui>
      <ToastContainer />
    </React.Fragment>
  );
};
