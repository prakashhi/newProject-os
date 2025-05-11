import React from 'react'
import { Button, Box } from '@mui/material'

export const Buttonmy = ({ text,width,bgcolor,disabile,onclicfun }) => {
    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                <Button  onClick={onclicfun} disabled={disabile} type="submit" sx={{
                    backgroundColor: bgcolor,
                    borderRadius: '20px',
                    padding: '8px',
                    color: 'white',
                    width:{ 
                        xl:width,
                        xs:'90%'
                    },

                    '&:hover': {
                        backgroundColor: '#9C968B',
                      },
                    textTransform : "none",

                    alignContent: 'center'
                }}>{text}</Button>
            </Box>
        </React.Fragment>
    )
}
