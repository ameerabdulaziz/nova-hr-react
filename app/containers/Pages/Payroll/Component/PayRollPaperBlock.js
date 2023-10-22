import { Backdrop, Box, CircularProgress } from '@mui/material';
import React from 'react';

function PayRollPaperBlock({ isLoading, children }) {
  return (
    <Box
      sx={{
        zIndex: 100,
        position: 'relative',
      }}
    >
      <Backdrop
        sx={{
          color: 'primary.main',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.69)',
        }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      {children}
    </Box>
  );
}

export default PayRollPaperBlock;
