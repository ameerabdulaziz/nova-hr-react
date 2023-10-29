import { Print } from '@mui/icons-material';
import {
  Box, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useReactToPrint } from 'react-to-print';
import payrollMessages from '../messages';
import InsuranceReportForm2Footer from './InsuranceReportForm2/InsuranceReportForm2Footer';
import InsuranceReportForm2Header from './InsuranceReportForm2/InsuranceReportForm2Header';
import InsuranceReportForm2Table from './InsuranceReportForm2/InsuranceReportForm2Table';
import { toArabicDigits } from './assets/helper';

const dummyData = {
  organizationId: 183118,
  organizationName: 'ديناميك',
  totalEmployee: 236,
  totalSalary: 45569,
  rows: [
    {
      insuranceNumber: 9956,
      employeeName: 'محمد تيسير',
      nationalId: 858245855001,
      subscriptionDate: '1999-11-13 10:42:12',
      insuranceSubscriptionFee: 602,
      totalSalary: 331,
      id: '3130dfa9-77fa-4d98-a466-57p57088217b',
    },
    {
      insuranceNumber: 385,
      employeeName: 'Willard Stealy',
      nationalId: 6970,
      subscriptionDate: '2008-01-23 23:15:46',
      insuranceSubscriptionFee: 54,
      totalSalary: 400,
      id: '37fa0527-422f-4444-b2b2-76ee4e45fcf9',
    },
    {
      insuranceNumber: 8603,
      employeeName: 'Valeria Opie',
      nationalId: 9017,
      subscriptionDate: '2007-11-06 21:30:06',
      insuranceSubscriptionFee: 258,
      totalSalary: 828,
      id: '557d0daf-a5ee-445b-8e17-a84fcc2d1f3f',
    },
    {
      insuranceNumber: 1254,
      employeeName: 'Elna Brugger',
      nationalId: 2593,
      subscriptionDate: '2017-03-04 04:24:16',
      insuranceSubscriptionFee: 306,
      totalSalary: 711,
      id: '7afb0cdd-ae08-4290-b68a-eg68cf011a994',
    },
    {
      insuranceNumber: 1254,
      employeeName: 'Elna Brucgger',
      nationalId: 2593,
      subscriptionDate: '2017-03-04 04:24:16',
      insuranceSubscriptionFee: 306,
      totalSalary: 711,
      id: '7afb0cdd-ae08-4290-b68a-e68cf011a994',
    },
    {
      insuranceNumber: 3055,
      employeeName: 'Anne-corinne Edgson',
      nationalId: 2113,
      subscriptionDate: '2020-02-18 08:01:29',
      insuranceSubscriptionFee: 581,
      totalSalary: 866,
      id: 'e37832c9-e851-4b5b-ac7c-846449247df1',
    },
    {
      insuranceNumber: 3130,
      employeeName: 'Dud Stirley',
      nationalId: 7354,
      subscriptionDate: '2001-08-25 18:16:03',
      insuranceSubscriptionFee: 381,
      totalSalary: 533,
      id: '3d6f20c1-1415-463d-8ced-12aa5fa9a64a',
    },
    {
      insuranceNumber: 4383,
      employeeName: 'Sheppard Ewbank',
      nationalId: 6220,
      subscriptionDate: '2004-09-29 18:32:22',
      insuranceSubscriptionFee: 774,
      totalSalary: 12,
      id: 'c02f538c-1403-40f0-9f15-20065fd0e726',
    },
    {
      insuranceNumber: 2558,
      employeeName: 'Aguie Lansdowne',
      nationalId: 6401,
      subscriptionDate: '2022-10-26 17:12:35',
      insuranceSubscriptionFee: 0,
      totalSalary: 231,
      id: 'c70b76ca-0bc3-4399-ac21-c4edeb4a694b',
    },
    {
      insuranceNumber: 3495,
      employeeName: 'Welch Rowswell',
      nationalId: 7019,
      subscriptionDate: '2002-10-08 16:39:09',
      insuranceSubscriptionFee: 67,
      totalSalary: 597,
      id: '355507b7-1b60-415f-b3c2-b68e87b7e77b',
    },
    {
      insuranceNumber: 204,
      employeeName: 'Isaiah Wessel',
      nationalId: 6890,
      subscriptionDate: '2028-11-24 21:53:31',
      insuranceSubscriptionFee: 52,
      totalSalary: 186,
      id: 'd1d67611-30e9-4a65-b5ae-a60ca0789e43',
    },
    {
      insuranceNumber: 3342,
      employeeName: "Finlay O'Hagirtie",
      nationalId: 276,
      subscriptionDate: '2006-12-22 22:10:46',
      insuranceSubscriptionFee: 907,
      totalSalary: 677,
      id: '5b1bcc24-2900-475a-b967-340bc242b0c4',
    },
    {
      insuranceNumber: 1779,
      employeeName: 'Raimundo Mordey',
      nationalId: 4430,
      subscriptionDate: '2027-10-03 07:47:33',
      insuranceSubscriptionFee: 228,
      totalSalary: 909,
      id: 'cad96279-92d1-4ad1-a39b-48129e37b5f6',
    },
    {
      insuranceNumber: 5381,
      employeeName: 'Karmen Foat',
      nationalId: 390,
      subscriptionDate: '2024-02-13 03:06:31',
      insuranceSubscriptionFee: 832,
      totalSalary: 474,
      id: 'bef3b64a-f5a6-46ac-901a-534292f965cb',
    },
    {
      insuranceNumber: 5594,
      employeeName: 'Quintana Sausman',
      nationalId: 7497,
      subscriptionDate: '2005-12-22 05:06:05',
      insuranceSubscriptionFee: 990,
      totalSalary: 108,
      id: '091a3ad3-7e27-40df-91ec-8dc776772ecf',
    },
    {
      insuranceNumber: 1975,
      employeeName: 'Marie-ann Trenholme',
      nationalId: 4279,
      subscriptionDate: '2018-10-31 01:56:17',
      insuranceSubscriptionFee: 465,
      totalSalary: 258,
      id: 'fb455b5a-65bd-4494-8f64-c1cfaff30865',
    },
    {
      insuranceNumber: 3063,
      employeeName: 'Kerby Peacham',
      nationalId: 4678,
      subscriptionDate: '2010-09-04 09:53:38',
      insuranceSubscriptionFee: 20,
      totalSalary: 464,
      id: '00286451-e258-496f-a0a5-e593cfdb7533',
    },
    {
      insuranceNumber: 361,
      employeeName: 'Jean Swadden',
      nationalId: 3306,
      subscriptionDate: '2018-12-17 14:56:49',
      insuranceSubscriptionFee: 421,
      totalSalary: 845,
      id: '5d507cdb-bf86-42bd-b292-bb1e50f1575d',
    },
    {
      insuranceNumber: 1087,
      employeeName: 'Willette Goodlatt',
      nationalId: 5678,
      subscriptionDate: '2026-01-04 15:07:01',
      insuranceSubscriptionFee: 872,
      totalSalary: 320,
      id: '74560180-62e0-4d70-8c5e-0abe01f23158',
    },
    {
      insuranceNumber: 3866,
      employeeName: 'Esdras Senn',
      nationalId: 977,
      subscriptionDate: '2011-08-24 22:44:58',
      insuranceSubscriptionFee: 501,
      totalSalary: 442,
      id: 'ebfaabf5-ed05-4519-b0ed-595ec2cb9ac0',
    },
    {
      insuranceNumber: 4546,
      employeeName: 'Maureene Speck',
      nationalId: 8776,
      subscriptionDate: '2005-01-02 04:26:22',
      insuranceSubscriptionFee: 464,
      totalSalary: 522,
      id: 'd8aa849d-a912-4823-8ca9-3ba9922c062a',
    },
  ],
};

const ROWS_PER_PAGE = 10;
const DOCUMENT_TITLE = 'Insurance Report Form 2 - ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

function InsuranceReportForm2(props) {
  const { intl } = props;
  const [isLoading, setIsLoading] = useState(false);

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: DOCUMENT_TITLE,
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
          {isLoading ? <CircularProgress size={15} /> : <Print />}
        </IconButton>
      </Tooltip>

      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          direction: 'rtl',
          textAlign: 'right',
          fontFamily: "'Cairo', 'sans-serif'",
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root': {
            fontSize: '10px',
          },
          '.MuiTypography-root': {
            fontFamily: "'Cairo', 'sans-serif'",
          },
          '.MuiTableCell-root': {
            fontFamily: "'Cairo', 'sans-serif'",
            fontSize: '10px',
          },
        }}
      >
        {Array.from({
          length: Math.ceil(dummyData.rows.length / ROWS_PER_PAGE),
        }).map((_, index) => (
          <Box
            key={index}
            sx={{
              pageBreakBefore: 'always',
              p: 4,
            }}
          >
            <InsuranceReportForm2Header
              organizationId={toArabicDigits(dummyData.organizationId)}
              organizationName={toArabicDigits(dummyData.organizationName)}
            />

            <InsuranceReportForm2Table
              rows={dummyData.rows.slice(
                index * ROWS_PER_PAGE,
                index * ROWS_PER_PAGE + ROWS_PER_PAGE
              )}
            />

            <InsuranceReportForm2Footer
              totalSalary={toArabicDigits(dummyData.totalSalary)}
              totalEmployee={toArabicDigits(dummyData.totalEmployee)}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}

InsuranceReportForm2.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(InsuranceReportForm2);
