import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function PDFHeader() {
  const menuName = localStorage.getItem('MenuName');

  // Company info for employee
  const company = useSelector((state) => state.authReducer.companyInfo);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      mb={2}
    >
      <Typography fontWeight='bold' variant='subtitle1'>
        {menuName}
      </Typography>

      <img src={company?.logo} alt='' height={45} />
    </Stack>
  );
}

export default PDFHeader;
