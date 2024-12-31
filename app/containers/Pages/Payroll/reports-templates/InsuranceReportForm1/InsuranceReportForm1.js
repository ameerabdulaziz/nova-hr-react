import {
    Box, 
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import React from 'react';
  import { injectIntl } from 'react-intl';
  import { formateDate, toArabicDigits } from '../../helpers';
  import payrollMessages from '../../messages';
//   import InsuranceReportForm2Footer from '../InsuranceReportForm2/InsuranceReportForm2Footer';
  import InsuranceReportForm1Header from '../InsuranceReportForm1/InsuranceReportForm1Header';
//   import InsuranceReportForm2Table from '../InsuranceReportForm2/InsuranceReportForm2Table';
  
  
  const ROWS_PER_PAGE = 10;
  
  function InsuranceReportForm1(props) {
  
    return (
      Array.from({
            length: Math.ceil(props.rows.length / ROWS_PER_PAGE) || 1,
          }).map((_, index) => (
            <Box
              key={index}
              sx={{
                pageBreakBefore: 'always',
                p: 4,
              }}
            >
              <InsuranceReportForm1Header
                organizationId={toArabicDigits(props.organizationId)}
                organizationName={toArabicDigits(props.organizationName)}
              />
  
              {/* <InsuranceReportForm2Table
                rows={props.rows.slice(
                  index * ROWS_PER_PAGE,
                  index * ROWS_PER_PAGE + ROWS_PER_PAGE
                )}
              />
  
              <InsuranceReportForm2Footer
                totalSalary={toArabicDigits(props.totalSalary)}
                totalEmployee={toArabicDigits(props.rows.length)}
              /> */}
            </Box>
      ))
    );
  }
  
//   InsuranceReportForm1.propTypes = {
//     intl: PropTypes.object.isRequired,
//     rows: PropTypes.array.isRequired,
//     organizationName: PropTypes.string.isRequired,
//     totalSalary: PropTypes.number.isRequired,
//     organizationId: PropTypes.number.isRequired,
//   };
  
//   InsuranceReportForm1.defaultProps = {
//     rows: [],
//   };
  
  export default injectIntl(InsuranceReportForm1);
  