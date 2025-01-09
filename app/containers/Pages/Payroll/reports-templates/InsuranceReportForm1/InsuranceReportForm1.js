import {
    Box, 
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import React from 'react';
  import { injectIntl } from 'react-intl';
  import { formateDate, toArabicDigits } from '../../helpers';
  import payrollMessages from '../../messages';
//   import InsuranceReportForm2Footer from '../InsuranceReportForm2/InsuranceReportForm2Footer';
  import InsuranceReportForm1Template from './InsuranceReportForm1Template';
//   import InsuranceReportForm2Table from '../InsuranceReportForm2/InsuranceReportForm2Table';
import { useSelector } from 'react-redux';
  
  // const ROWS_PER_PAGE = 10;
  
  function InsuranceReportForm1({data}) {
  
        const locale = useSelector((state) => state.language.locale);
    return (
      <>
        {data.map((item,index)=>{
          // console.log("item =", item);
          
           return <Box
                  key={index}

                  sx={{
                    fontSize:"14px",
                    // pageBreakBefore: 'always',
                    // height:"0px",
                    // visibility:"hidden",
                    direction: 'ltr',
                    ...(locale === 'en' ? { textAlign: 'right', direction: 'rtl', } : {}),
                    '@media print': {
                    //   height:"100%",
                    //   visibility:"visible",
                    },
                    'p.MuiTypography-root, .MuiTableCell-root': {
                      fontSize: '10px',
                    },
                  }}
                >
                    <InsuranceReportForm1Template
                      data={item}
                    />
                </Box>
            })}
      </>
    );
  }
  
  
  export default injectIntl(InsuranceReportForm1);
  