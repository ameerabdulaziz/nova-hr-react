import { Stack, Typography } from '@mui/material';
import React from 'react';
import BoxInput from './components/InsuranceReportForm6BoxInput';
import BlackDivider from './components/InsuranceReportForm6Divider';

function InsuranceReportForm6InsuredResidenceInfo() {
  return (
    <>
      <BlackDivider label='بيانات محل اقامة المؤمن عليه' />

      <Stack direction='row' alignItems='center' gap={2}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'> عقار رقم : </Typography>

          <BoxInput count={4} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1} my={1}>
          <Typography fontWeight='bold'> شارع/حارة : </Typography>

          <Typography fontWeight='bold'>
          ........................................................................
          </Typography>
        </Stack>
      </Stack>

      <Stack direction='row' alignItems='center' gap={1} my={1}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'> شياخة/قرية </Typography>

          <Typography fontWeight='bold'>
            .............................
          </Typography>

          <BoxInput count={2} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'> قسم/مركز </Typography>

          <Typography fontWeight='bold'>
            .............................
          </Typography>

          <BoxInput count={2} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'> محافظة </Typography>

          <Typography fontWeight='bold'>
            .............................
          </Typography>

          <BoxInput count={2} />
        </Stack>
      </Stack>
    </>
  );
}

export default InsuranceReportForm6InsuredResidenceInfo;
