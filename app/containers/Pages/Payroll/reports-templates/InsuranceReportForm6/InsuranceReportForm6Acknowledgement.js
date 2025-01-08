import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import BoxInput from './components/InsuranceReportForm6BoxInput';

function InsuranceReportForm6Acknowledgement(props) {
  const { employee, globalReportInfo } = props;

  return (
    <>
      <Stack direction='row' justifyContent='center'>
        <Typography
          fontWeight='bold'
          variant='subtitle1'
          style={{
            borderBottom: '1px solid black',
          }}
        >
          اقرار
        </Typography>
      </Stack>

      <Grid mt={3} container>
        <Grid item xs={6}>
          <Typography fontWeight='bold'>
            اسم المنشأة : {globalReportInfo.insuranceOrganization?.name}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'>رقمها التأميني : </Typography>

            <BoxInput count={8} value={globalReportInfo.insuranceOrganization?.id} />
          </Stack>
        </Grid>

        <Grid item xs={12} mb={1} mt={0.5}>
          <Typography fontWeight='bold'>
            العنوان :
            ........................................................................
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight='bold'>
            اسم المؤمن عليه : {employee.employeeName}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'>رقمه التأميني : </Typography>

            <BoxInput count={8} value={employee.socialInsuranceID} />
          </Stack>
        </Grid>
      </Grid>

      <Stack direction='row' gap={1} my={1}>
        <Typography fontWeight='bold' style={{ whiteSpace: 'pre' }}>
          ١.
        </Typography>

        <Typography fontWeight='bold'>
          أقر أنا الموقع أدناه بأنني قد قمت بسحب البطاقة العلاجية من المؤمن عليه
          وتم تسليمها لفرع الهيئة العامة للتأمين الصحي المختص. وفي حالة ظهور ما
          يخالف ذلك، أكون مسئولًا بالتضامن مع العامل في مواجهة الهيئة العامة
          للتأمين الصحي عن كافة مصاريف العلاج والرعاية الطبية تعويضًا عن
          الانتفاع بدون وجه حق بمزايا العلاج والرعاية الطبية بعد انتهاء الخدمة.
        </Typography>
      </Stack>

      <Grid
        container
        my={3}
        alignItems='center'
        style={{ textAlign: 'center' }}
      >
        <Grid item xs={6}>
          <Typography fontWeight='bold'>توقيع المؤمن عليه</Typography>

          <Stack direction='row' justifyContent='center' gap={10}>
            <Typography fontWeight='bold'> ( </Typography>
            <Typography fontWeight='bold'> ) </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight='bold'>توقيع صاحب العمل</Typography>

          <Stack direction='row' justifyContent='center' gap={10}>
            <Typography fontWeight='bold'> ( </Typography>
            <Typography fontWeight='bold'> ) </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction='row' gap={1} my={1}>
        <Typography fontWeight='bold' style={{ whiteSpace: 'pre' }}>
          ٢.
        </Typography>

        <Typography fontWeight='bold'>
          أقر أنا الموقع أدناه بأن المؤمن عليه محل هذه الاستمارة قد رفض تسليم
          البطاقة العلاجية، وقمنا بإخطار الهيئة العامة للتأمين الصحي ببيانات
          المؤمن عليه لإيقاف التعامل معه.
        </Typography>
      </Stack>

      <Grid
        container
        mt={3}
        alignItems='center'
        style={{ textAlign: 'center' }}
      >
        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          <Typography fontWeight='bold'>توقيع صاحب العمل</Typography>

          <Stack direction='row' justifyContent='center' gap={10}>
            <Typography fontWeight='bold'> ( </Typography>
            <Typography fontWeight='bold'> ) </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

InsuranceReportForm6Acknowledgement.propTypes = {
  employee: PropTypes.object.isRequired,
  globalReportInfo: PropTypes.object.isRequired,
};

export default InsuranceReportForm6Acknowledgement;
