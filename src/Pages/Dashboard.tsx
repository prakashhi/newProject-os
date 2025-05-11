import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router";






console.log(JSON.parse(localStorage.getItem('empdata')))




export const Dashboard = () => {
    
    const Navigation = useNavigate();

    useEffect(() => {

        if(!JSON.parse(localStorage.getItem('empdata')))
        {
    
            Navigation('/')
        }

    }, []); 



  return (
    <React.Fragment>
        <h1>Dashboard</h1>
    
    </React.Fragment>
  );
};
