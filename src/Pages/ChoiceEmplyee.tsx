import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Buttonmy } from '../componets/Buttonmy'
import React, { useState } from 'react'
import { useLocation } from 'react-router'


import Chageui from '../componets/Chegeui'
import { Navigate, useNavigate } from 'react-router';



export const ChoiceEmplyee = () => {

    document.title = "Employee"

    const Navigation = useNavigate();


    const [idp, setidp] = useState('')

    const [empname,setempname] = useState('');

    const location = useLocation();

    const emparr = location.state;

    const emplist = emparr.profile.employees

    
    console.log(idp)

    return (
        <React.Fragment>
            <Chageui>

                <Typography sx={{
                    color: '#6F6F6F',
                    textAlign: 'center',
                    fontSize: '25px',
                    my: '20px'
                }}>
                    Choose Employee
                </Typography>


                <Grid sx={{ px: '150px', height: '90dvh', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {
                        emplist.map((val) => (

                            <Box id={val.id} onClick={() => {

                                setidp(val.id);
                                setempname(val.name)

                            }

                            } sx={{ border: '3px solid #BBB0A4', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px', cursor: 'pointer', alignItems: 'center', }}>

                                <Box sx={{ display: 'flex', gap: '20px', }}>

                                    <img src={emparr.image_base_url + val.image} style={{
                                        width: '40px',
                                        height: '40px', borderRadius: '50%', objectFit: 'cover',
                                        display: val.image == null && 'none',
                                    }} alt="" width={40} />

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 'bold', color: '#707070' }}>
                                            {val.name}
                                        </Typography>
                                    </Box>
                                </Box>


                                <img src="./Images/Untitled.png" alt="" style={{ width: '20px', height: '17px', opacity: idp == val.id ? 1 : 0 }} />



                            </Box>


                        ))
                    }


                </Grid>


                <Stack sx={{
                    display: 'flex',
                    justifyItems: 'center',
                    my: '20px'

                }} >

                    <Buttonmy onclicfun={() => {

                        Navigation('/Passcode', { state: {emparr,empname,idp}})

                    }} disabile={idp ? false : true} text={'Next'} width={'20%'} bgcolor={idp ? '#A2907C' : '#CCCCCC'} />



                </Stack>

            </Chageui>


        </React.Fragment>
    )
}
