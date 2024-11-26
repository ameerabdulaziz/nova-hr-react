import { Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PayrollTableContext from '../PayrollTableContext';

function PDFTimeStamp() {
  const payrollTableContext = useContext(PayrollTableContext);

  // Get app locale
  const locale = useSelector((state) => state.language.locale);

  // Sign-in user
  const user = useSelector((state) => state.authReducer.user);

  return (
    <Stack mb={1}>
      <Typography variant='subtitle2' sx={{ fontSize: '10px' }} color='gray'>
        {payrollTableContext.today}
      </Typography>

      <Typography variant='subtitle2' sx={{ fontSize: '10px' }} color='gray'>
        {locale === 'en' ? user?.enName : user?.arName}
      </Typography>
    </Stack>
  );
}

export default PDFTimeStamp;
