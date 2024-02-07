import {
  Backdrop, Box, CircularProgress, useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function PayRollLoader(props) {
  const { isLoading, children } = props;

  const { palette } = useTheme();

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
    </Box>
  );
}

PayRollLoader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default PayRollLoader;
