import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Buttonmy } from '../componets/Buttonmy'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { Navigate, useNavigate } from 'react-router';


import Chageui from '../componets/Chegeui'
import { ToastContainer, toast } from 'react-toastify';


export const ChoiceDept = () => {

    const location = useLocation();

    const [idp, setidp] = useState('');

    const [selectvalue, setselectvalue] = useState('');

    const Navigate = useNavigate()

    const [EmpArr,setEMpArr] = useState({})



    console.log(location.state.data)


    const departArr = location.state.data

    console.log(EmpArr)





    document.title = "Department"
    return (
        <React.Fragment>

            <Chageui>

                <Typography sx={{
                    color: '#6F6F6F',
                    textAlign: 'center',
                    fontSize: '25px',
                    my: '20px'
                }}>
                    Choose Department
                </Typography>


                <Grid sx={{ px: '150px', height: '90dvh', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {
                        departArr && (
                            departArr.map((val, i) => (

                                <Box id={val.profile.id} onClick={() => {

                                    setidp(val.profile.id);
                                    !val.is_active && toast.error('This store is inactive')

                                    setEMpArr(val)

                                  

                                   

                                }

                                } key={val.access_token} sx={{ backgroundColor: !val.is_active && 'rgb(240, 240, 240)', border: '3px solid #BBB0A4', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px', cursor: val.is_active ? 'pointer' : 'not-allowed', alignItems: 'center', opacity: val.is_active ? 1 : 0.5 }}>

                                    <Box sx={{ display: 'flex', gap: '20px', }}>

                                        <img src={val.image_base_url + val.profile.image} style={{
                                            width: '40px',
                                            height: '40px', borderRadius: '50%', objectFit: 'cover'
                                        }} alt="" width={40} />


                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontWeight: 'bold', color: '#707070' }}>
                                                {val.profile.name}
                                            </Typography>
                                            <Typography>
                                                {val.profile.email}
                                            </Typography>
                                        </Box>
                                    </Box>


                                    <img src="./Images/Untitled.png" alt="" style={{ width: '20px', height: '17px', opacity: idp == val.profile.id && val.is_active ? 1 : 0 }} />



                                </Box>

                               




                            )



                            )

                        )
                    }







                </Grid>


                <Stack sx={{
                    display: 'flex',
                    justifyItems: 'center',
                    my: '20px'

                }} >

                    <Buttonmy onclicfun={() => {

                        Navigate('/Employee', { state: EmpArr })

                    }} disabile={idp ? false : true} text={'Next'} width={'20%'} bgcolor={idp ? '#A2907C' : '#CCCCCC'} />



                </Stack>

            </Chageui>
            <ToastContainer />

        </React.Fragment>
    )
}
