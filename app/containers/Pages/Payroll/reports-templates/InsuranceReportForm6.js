import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Acknowledgement from './InsuranceReportForm6/InsuranceReportForm6Acknowledgement';
import Header from './InsuranceReportForm6/InsuranceReportForm6Header';
import Instructions from './InsuranceReportForm6/InsuranceReportForm6Instructions';
import InsuredApproval from './InsuranceReportForm6/InsuranceReportForm6InsuredApproval';
import InsuredInfo from './InsuranceReportForm6/InsuranceReportForm6InsuredInfo';
import InsuredResidenceInfo from './InsuranceReportForm6/InsuranceReportForm6InsuredResidenceInfo';
import ManagerApproval from './InsuranceReportForm6/InsuranceReportForm6ManagerApproval';

function InsuranceReportForm6(props) {
  const { employee } = props;

  return (
    <Box sx={{ p: 4, pageBreakBefore: 'always' }}>
      <Header employee={employee} />

      <InsuredInfo employee={employee} />

      <InsuredResidenceInfo />

      <InsuredApproval />

      <ManagerApproval />

      <Box sx={{ pageBreakBefore: 'always' }} />

      <Instructions />

      <Acknowledgement employee={employee} />
    </Box>
  );
}

InsuranceReportForm6.propTypes = {
  employee: PropTypes.object.isRequired,
};

export default InsuranceReportForm6;
