import { Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { formateDate } from '../../../../../helpers';

function PDFTimeStamp() {

  // Get app locale
  const locale = useSelector((state) => state.language.locale);

  // Sign-in user
  const user = useSelector((state) => state.authReducer.user);

    // Today's formatted date
    const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss') ?? '';

  return (
    <Stack mb={1} style={{marginBottom:"0px"}}>
      <Typography variant='subtitle2' sx={{ fontSize: '7px' }} color='gray'>
        {today}
      </Typography>

      <Typography variant='subtitle2' sx={{ fontSize: '7px' }} color='gray'>
        {locale === 'en' ? user?.enName : user?.arName}
      </Typography>
    </Stack>
  );
}

export default PDFTimeStamp;
