import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HttpsIcon from '@mui/icons-material/Https';
import { Buttonmy } from '../componets/Buttonmy';
import Link from '@mui/material/Link';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import TextField from '@mui/material/TextField';

import Boxui from '../componets/Boxui';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";

import { Navigate, useNavigate } from 'react-router';

import axios from 'axios';
import { apireq } from '../api/api';





export const Login = () => {

    const [eyeshow, seteyeshow] = useState(false);

    const Navigate = useNavigate()


    const [Phnonumber, setPhnonumber] = useState('')
    const [Password, serpasssword] = useState('')








    const hadleclcick = async (e) => {

        e.preventDefault();

        try {


            let res = await axios.post('https://api.fiind.app/api/v1/store/auth/login', { "country_code": '+45', "phone_number": Phnonumber, "password": Password })


            if (res.data.success == true) {
                Navigate('/Departmemt', { state: res.data })
            }

        } catch (error) {

            toast.error('Login failed. Please try again.')

            console.log(error)

        }

    }




    const Passshow = () => {
        seteyeshow(!eyeshow)

    }


    document.title = "Find Admin panel"
    return (
        <React.Fragment>

            <Boxui>

                <Box sx={{
                    padding: '30px',
                }}>

                    <form style={{ display: 'flex', flexDirection: 'column', }} >


                        <Typography variant="h6" gutterBottom sx={{
                            fontSize: '25px',
                            color: '#6F6F6F',

                            textAlign: 'center',
                            marginBottom: '30px'
                        }}>
                            Log in
                        </Typography>


                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <img src='./Images/Untitled.jpeg' width={20} height={20} />
                            <Typography variant="h6" gutterBottom sx={{
                                fontSize: '17px',
                                color: '#6F6F6F',

                            }}>
                                Enter phone number
                            </Typography>
                        </Box>








                        <Box sx={{ display: 'flex', justifyItems: 'center', gap: '10px', alignItems: 'center', borderRadius: '20px', px: '10px', backgroundColor: '#F5F5F5', border: '2px solid #C8C0B7' }}>

                            <Typography >+45</Typography>
                            <TextField sx={{
                                my: '1px',
                                border: 'none',
                                width: '100%',
                                '.css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                                    p: '10px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            }} id="outlined-basic" type="Phone"

                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (!isNaN(val)) {
                                        setPhnonumber(val)
                                    }

                                }}
                                inputProps={{ maxLength: 8 }}


                                value={Phnonumber}
                                placeholder='00 00 00 00'

                                name="phone_number" variant="outlined" />
                        </Box>





                        <Box sx={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '30px',

                        }}>
                            <img src='./Images/Lock.png' width={20} height={20} />
                            <Typography variant="h6" gutterBottom sx={{
                                fontSize: '17px',
                                color: '#6F6F6F',


                            }}>
                                Password
                            </Typography>
                        </Box>


                        <Box sx={{ display: 'flex', justifyItems: 'center', gap: '10px', alignItems: 'center', borderRadius: '20px', px: '10px', backgroundColor: '#F5F5F5', border: '2px solid #C8C0B7' }}>


                            <TextField sx={{


                                border: 'none',
                                borderStyle: 'none',
                                width: '100%',
                                py: '0px',
                                '.css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                                    p: '10px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            }} id="outlined-basic"  type={eyeshow ? 'text' : "Password"}

                                onChange={(e) =>


                                    serpasssword(e.target.value)

                                }


                                value={Password}
                                placeholder='Password'

                                name="password" variant="outlined" />

                            {
                                eyeshow ? (<VisibilityIcon style={{ cursor: 'pointer', color: '#6C6C6C' }} onClick={Passshow} />) : (<VisibilityOffIcon style={{ cursor: 'pointer', color: '#6C6C6C' }} onClick={Passshow} />)
                            }


                        </Box>




                        <Buttonmy onclicfun={hadleclcick} text={'Log in'} width={'40%'} bgcolor={'#BBB0A4'} />

                    </form>
                </Box>




                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/ForgotPassword" sx={{ color: '#6F6F6F', textAlign: 'center', pb: '5px', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' }}>
                        Forgot Password
                    </Link>
                </Box>



            </Boxui>

            <ToastContainer />




        </React.Fragment>
    )
}

