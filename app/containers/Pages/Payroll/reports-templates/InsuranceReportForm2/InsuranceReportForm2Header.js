import {
  Box, Grid, Stack, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import nationalInsuranceLogo from '../assets/national-social-insurance-logo.png';

function InsuranceReportForm2Header(props) {
  const { organizationId, organizationName } = props;

  return (
    <>
      <Grid
        container
        justifyContent='space-between'
        sx={{
          borderBottom: '1.5px solid black',
          pb: 1,
          mb: 1,
        }}
      >
        <Grid item xs={4}>
          <Typography fontWeight='bold' mb={1}>
            الهيئة القومية للتأمين الاجتماعي
          </Typography>
          <Typography>منطقة /</Typography>
          <Typography>مكتب /</Typography>
        </Grid>

        <Grid item xs={3}>
          <Box textAlign='center'>
            <img
              alt='الهيئة القومية للتأمين الاجتماعي'
              src={nationalInsuranceLogo}
              width={80}
            />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Typography>
            نموذج رقم (٩) قرار وزاري رقم (..) لسنة &nbsp; &nbsp; &nbsp; ٢٠
          </Typography>
          <Stack direction='row' alignItems='center' gap={2} mt={1}>
            <Typography>رقم المنشأة</Typography>
            <Typography
              sx={{
                border: '2px solid black',
                p: '3px 20px',
              }}
            >
              {organizationId}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={7}>
          <Typography fontWeight='bold' textAlign='center'>
            طلب أشتراك منشأة
          </Typography>
          <Typography fontWeight='bold' textAlign='center'>
            أو اخطار تعديل المؤمن عليهم و أجورهم في &nbsp; &nbsp; / &nbsp;
            &nbsp; / &nbsp; &nbsp; ٢٠
          </Typography>
        </Grid>
      </Grid>
      <Grid container mt={1} justifyContent='space-between'>
        <Grid item xs={4}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography>أسم المنشأة : </Typography>
            <Typography fontWeight='bold'>{organizationName}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Typography> المالك / المدير المسئول : ---------</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography> الشكل القانوني للمنشأة : ---------</Typography>
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item xs={3}>
          <Typography> عنوان المنشأة : ---------</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> الشياخة / القرية : ---------</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> القسم / المركز : --------- </Typography>
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item xs={3}>
          <Typography> نسبة تأمين المرض : --------- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> تاريخ بدأ النسبة : -- / -- / -- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> نسبة تأمين الاصابة : --------- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> تاريخ بدأ النسبة : -- / -- / -- </Typography>
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item xs={3}>
          <Typography> تاريخ التوقف / الاستمرار : -- / -- / -- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> سبب التوقف : --------- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography> بدأ النشاط : --------- </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>رقم التسجيل الضريبي للمنشأة : --- / --- / ---</Typography>
        </Grid>
      </Grid>
    </>
  );
}

InsuranceReportForm2Header.propTypes = {
  organizationId: PropTypes.number.isRequired,
  organizationName: PropTypes.string.isRequired,
};

InsuranceReportForm2Header.defaultProps = {
  organizationId: '',
  organizationName: '',
};

export default InsuranceReportForm2Header;
