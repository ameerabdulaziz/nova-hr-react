import { Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function InsuranceReportForm2Footer(props) {
  const { totalSalary, totalEmployee } = props;

  return (
    <>
      <Grid container mt={1}>
        <Grid item xs={3}>
          <Typography> أقر أنا : ------------------ </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>بصفتي : ------------------ </Typography>
        </Grid>

        <Grid item xs={3}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography> بأن جميع المؤمن عليهم : </Typography>
            <Typography fontWeight='bold'>{(totalEmployee)}</Typography>
            <Typography>عاملا</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid container mt={1}>
        <Grid item xs={3}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography>و أن اجور الشهر الحالي الاساسية : </Typography>
            <Typography fontWeight='bold'>{(totalSalary)}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Typography>
            و ان جميع البيانات الواردة بهذه الاستمارة و ملحقاتها صحيحة &nbsp;
            &nbsp;(الاجر الشامل لحساب أشتراكات التأمين الشامل)
          </Typography>
        </Grid>

        <Grid item xs={12} mb={1}>
          <Typography>
            و أني اتحمل المسئولية القانونية عن صحة البيانات الواردة بهذه
            الاستمارة و في حالة المخالفة تطبق عليها العقوبات المنصوص القانون رقم
            (١٤٨) لسنة ٢٠١٩ مع عدم الاخلال بأي عقوبات أشد واردة في قانون
            العقوبات او اي قانون اخر.
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            صاحب العمل أو المدير المسئول : ------------------------------------
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            روجعت بيانات هذا الطلب علي بيانات المؤمن عليهم ووجدت صحيحة
          </Typography>
        </Grid>
      </Grid>

      <Grid container mt={1}>
        <Grid item xs={4}>
          <Typography> مستلم الاستمارة : ------------------ </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography>
            تمت مراجعة التوقيع بمعرفتي : ------------------
          </Typography>
        </Grid>
      </Grid>

      <Grid container mt={1}>
        <Grid item xs={4}>
          <Typography> اخصائي الاشتراك : ------------------ </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography> سجل أليا : ------------------ </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography> روجع أليا : ------------------ </Typography>
        </Grid>

        <Grid item xs={4} mt={1}>
          <Typography> تحريرا في : -- / -- / -- </Typography>
        </Grid>
      </Grid>
    </>
  );
}

InsuranceReportForm2Footer.propTypes = {
  totalSalary: PropTypes.string.isRequired,
  totalEmployee: PropTypes.string.isRequired,
};

InsuranceReportForm2Footer.defaultProps = {
  totalSalary: '',
  totalEmployee: '',
};

export default InsuranceReportForm2Footer;
