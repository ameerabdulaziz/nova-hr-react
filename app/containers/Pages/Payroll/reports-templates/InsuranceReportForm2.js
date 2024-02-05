import { Print } from '@mui/icons-material';
import {
  Box, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useReactToPrint } from 'react-to-print';
import { formateDate } from '../helpers';
import payrollMessages from '../messages';
import InsuranceReportForm2Footer from './InsuranceReportForm2/InsuranceReportForm2Footer';
import InsuranceReportForm2Header from './InsuranceReportForm2/InsuranceReportForm2Header';
import InsuranceReportForm2Table from './InsuranceReportForm2/InsuranceReportForm2Table';
import { toArabicDigits } from './assets/helper';

const ROWS_PER_PAGE = 10;
const DOCUMENT_TITLE = 'Insurance Report Form 2 - ' + formateDate(new Date(), 'yyyy-MM-dd hh_mm_ss');

function InsuranceReportForm2(props) {
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(false);

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    documentTitle: DOCUMENT_TITLE,
    content: () => printDivRef?.current,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const onPrintClick = async () => {
    printJS();
  };

  return (
    <>
      <Tooltip
        placement='top'
        title={intl.formatMessage(payrollMessages.Print)}
      >
        <IconButton onClick={onPrintClick}>
          {isLoading ? (
            <CircularProgress size={15} />
          ) : (
            <Print sx={{ fontSize: '1.2rem' }} />
          )}
        </IconButton>
      </Tooltip>

      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          direction: 'rtl',
          textAlign: 'right',
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '10px',
          },
        }}
      >
        {Array.from({
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
            />

            <InsuranceReportForm2Table
              rows={props.rows.slice(
                index * ROWS_PER_PAGE,
                index * ROWS_PER_PAGE + ROWS_PER_PAGE
              )}
            />

            <InsuranceReportForm2Footer
              totalSalary={toArabicDigits(props.totalSalary)}
              totalEmployee={toArabicDigits(props.rows.length)}
            />
          </Box>
        ))}
      </Box>
    </>
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
