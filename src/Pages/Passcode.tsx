import React, { useRef, useState, useEffect } from "react";
import Boxui from "../componets/Boxui";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";

import { useLocation } from "react-router";
import { Navigate, useNavigate } from "react-router";

import { Buttonmy } from "../componets/Buttonmy";
import { ToastContainer, toast } from "react-toastify";

export const Passcode = () => {
  const length = 6;
  const [Passkey, setPasskey] = useState(Array(length).fill(""));
  const inputRef = useRef([]);

  const Navigation = useNavigate();

  useEffect(() => { 
    
    inputRef.current[0].focus();
    if(!location.state.idp)
    {
        Navigation('/')
    }
   
  }, []);

  const location = useLocation();

  const emplist = location.state.emparr.profile.employees;
  console.log(location.state)

  const hadlecheck = async () => {
    emplist.map((val, i) => {
      if (val.id == location.state.idp) {
        console.log(val)
        if (val.access_code == Passkey.join("")) {
          Navigation("/Dashboard", { state: emplist });
          localStorage.setItem("empdata",JSON.stringify(val))
        } else {
          toast.error("Invalid passcode.");
        }
      }
    });
  };

  const checkfocus = (e, index) => {
    if (!isNaN(e.target.value)) {
      const newOtp = [...Passkey];
      newOtp[index] = e.target.value;
      setPasskey(newOtp);

      if (e.target.value && index < length - 1) {
        inputRef.current[index + 1].focus();
      }

      if (e.target.value === "" && index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && Passkey[index] == "" && Passkey[index] > 0) {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  return (
    <React.Fragment>
      <Boxui heightbox={"350px"} forgotid={1}>
        <Typography
          sx={{
            color: "#6F6F6F",
            textAlign: "center",
            fontSize: "25px",
            my: "20px",
          }}
        >
          Insert Passcode
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            marginTop: "40px",
            color: "#676767",
          }}
        >
          Enter the six-digit passcode for {location.state.empname}
        </Typography>

        <Grid
          sx={{
            padding: "30px",
            pl: { xl: "90px" },
          }}
          container
          spacing={1}
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
                padding: "1px",
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

        <Buttonmy
          onclicfun={hadlecheck}
          width={"30%"}
          disabile={Passkey[5] ? false : true}
          bgcolor={Passkey[5] ? "#bbb0a4" : "#e0e0e0"}
          text={"Confirm"}
        />
      </Boxui>
    </React.Fragment>
  );
};
