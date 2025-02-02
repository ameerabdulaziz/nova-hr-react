import {
    Backdrop, Box, CircularProgress, Grid, useTheme
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import React from 'react';


 function PayRollLoaderInForms(props) {
    
    const { isLoading, children } = props;
    const { palette } = useTheme();
    

  return (<>

       <Grid container spacing={3} >
        <Grid item md={0.5}>
        </Grid>
      <Grid item  md={11}>
      <Box
        
        sx={{
          zIndex: 100,
          position: 'relative',
          marginTop: 3
        }}
      >
        <Backdrop
          sx={{
            color: 'primary.main',
            zIndex: 10,
            position: 'absolute',
            backgroundColor:
              palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.69)',
          }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
  
        {children}
      </Box></Grid>
      <Grid item md={0.5}>
      </Grid>
      </Grid>

    </>)
}

PayRollLoaderInForms.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default PayRollLoaderInForms
