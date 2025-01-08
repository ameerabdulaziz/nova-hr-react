import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import BoxInput from './components/InsuranceReportForm6BoxInput';
import BlackDivider from './components/InsuranceReportForm6Divider';

function InsuranceReportForm6InsuredInfo(props) {
  const { employee } = props;

  return (
    <>
      <BlackDivider label='بيانات المؤمن عليه' />

      <Stack direction='row' alignItems='center' gap={5}>
        <Typography fontWeight='bold'>الرقم التأميني : </Typography>

        <BoxInput count={8} value={employee.socialInsuranceID} />
      </Stack>

      <Stack direction='row' alignItems='center' gap={5} my={1}>
        <Typography fontWeight='bold'>الرقم القومي : </Typography>

        <BoxInput count={14} value={employee.identityNumber} />
      </Stack>

      <Typography fontWeight='bold'>الاسم : {employee.employeeName}</Typography>

      <Stack direction='row' alignItems='center' gap={3} my={1}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'>تاريخ انتهاء الاشتراك</Typography>

          <BoxInput count={10} dividers={[2, 5]} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'>سبب انتهاء الاشتراك</Typography>

          <div>..................</div>

          <BoxInput count={1} />
        </Stack>
      </Stack>
    </>
  );
}

InsuranceReportForm6InsuredInfo.propTypes = {
  employee: PropTypes.object.isRequired,
};

export default InsuranceReportForm6InsuredInfo;
