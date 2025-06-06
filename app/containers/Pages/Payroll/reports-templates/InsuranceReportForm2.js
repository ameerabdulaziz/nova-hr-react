import {
  Box, 
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { formateDate, toArabicDigits } from '../helpers';
import payrollMessages from '../messages';
import InsuranceReportForm2Footer from './InsuranceReportForm2/InsuranceReportForm2Footer';
import InsuranceReportForm2Header from './InsuranceReportForm2/InsuranceReportForm2Header';
import InsuranceReportForm2Table from './InsuranceReportForm2/InsuranceReportForm2Table';


const ROWS_PER_PAGE = 10;

function InsuranceReportForm2(props) {

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
            <InsuranceReportForm2Header
              organizationId={toArabicDigits(props.organizationId)}
              organizationName={toArabicDigits(props.organizationName)}
              rows={props.rows}
            />

            <InsuranceReportForm2Table
              rows={props.rows.slice(
                index * ROWS_PER_PAGE,
                index * ROWS_PER_PAGE + ROWS_PER_PAGE
              )}
            />

            <InsuranceReportForm2Footer
              totalSalary={toArabicDigits(props.totalSalary.toFixed(2))}
              totalEmployee={toArabicDigits(props.rows.length)}
              rows={props.rows}
            />
          </Box>
    ))
  );
}

InsuranceReportForm2.propTypes = {
  intl: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  organizationName: PropTypes.string.isRequired,
  totalSalary: PropTypes.number.isRequired,
  organizationId: PropTypes.number.isRequired,
};

InsuranceReportForm2.defaultProps = {
  rows: [],
};

export default injectIntl(InsuranceReportForm2);
