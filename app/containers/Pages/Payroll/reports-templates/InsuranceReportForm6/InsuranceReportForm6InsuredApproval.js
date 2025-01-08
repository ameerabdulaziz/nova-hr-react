import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import BlackDivider from './components/InsuranceReportForm6Divider';

function InsuranceReportForm6InsuredApproval() {
  return (
    <>
      <BlackDivider label='إقــرار المؤمن عليه والمدير المسئول' />

      <Typography fontWeight='bold'>
        أقــر أن البيانات بعالية صحيحة وأن المؤمن عليه تسلم صورة من هذا الإخطار.
      </Typography>

      <Grid container>
        <Grid item xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'> توقيع المؤمن عليه </Typography>

            <Typography fontWeight='bold'>
              .............................
            </Typography>

            <Stack direction='row' alignItems='center' gap={1}>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'>٢٠</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'> توقيع المدير المسئول </Typography>

            <Typography fontWeight='bold'>
              .............................
            </Typography>

            <Stack direction='row' alignItems='center' gap={1}>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'>٢٠</Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={6}></Grid>
        <Grid xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'>
              تم مطابقة التوقيع بمعرفتي/
            </Typography>

            <Typography fontWeight='bold'>
              .............................
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default InsuranceReportForm6InsuredApproval;
