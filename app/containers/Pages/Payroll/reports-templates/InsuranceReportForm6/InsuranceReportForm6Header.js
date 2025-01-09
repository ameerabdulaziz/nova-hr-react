import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import BoxInput from './components/InsuranceReportForm6BoxInput';

function InsuranceReportForm2Header(props) {
  const { globalReportInfo } = props;

  return (
    <>
      <Grid container justifyContent='space-between'>
        <Grid item xs={6}>
          <Typography fontWeight='bold'>
            الهيئة القومية للتأمين الاجتماعي
          </Typography>

          <Typography fontWeight='bold'>
            صندوق العاملين ب ..................
          </Typography>

          <Typography fontWeight='bold'>منطقة : ..................</Typography>

          <Typography fontWeight='bold'>مكتب : ..................</Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography fontWeight='bold'>
            نموذج رقم (٦) قرار وزاري رقم (٥٥٤) لسنة ٢٠٠٧
          </Typography>

          <Stack direction='row' alignItems='center' gap={5} mt={1}>
            <Typography fontWeight='bold'>وحدة : ..................</Typography>

            <BoxInput count={2} />
          </Stack>
        </Grid>
      </Grid>

      <Grid container justifyContent='center'>
        <Grid item>
          <Typography
            fontWeight='bold'
            variant='subtitle1'
            style={{ borderBottom: '1px solid #000' }}
            textAlign='center'
          >
            إخطار بإنتهاء اشتراك مؤمن عليه
          </Typography>
        </Grid>
      </Grid>

      <Grid container gap={5} mt={2}>
        <Grid item>
          <Stack direction='row' alignItems='center' gap={3}>
            <Typography fontWeight='bold'>رقـــم المنشــأة</Typography>

            <BoxInput
              count={8}
              value={globalReportInfo.insuranceOrganization?.id}
            />
          </Stack>
        </Grid>

        <Grid item>
          <Typography fontWeight='bold'>
            مسمـــى : {globalReportInfo.insuranceOrganization?.name}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

InsuranceReportForm2Header.propTypes = {
  globalReportInfo: PropTypes.object.isRequired,
};

export default InsuranceReportForm2Header;
