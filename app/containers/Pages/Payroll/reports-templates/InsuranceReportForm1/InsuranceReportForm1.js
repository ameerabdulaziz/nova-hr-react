import {
    Box, 
  } from '@mui/material';
  import React from 'react';
  import { injectIntl } from 'react-intl';
  import payrollMessages from '../../messages';
  import InsuranceReportForm1Template from './InsuranceReportForm1Template';
import { useSelector } from 'react-redux';
  

  
  function InsuranceReportForm1({data}) {
  
        const locale = useSelector((state) => state.language.locale);
    return (
      <>
        {data.map((item,index)=>{

           return <Box
                  key={index}

                  sx={{
                    fontSize:"14px",
                    height:"0px",
                    visibility:"hidden",
                    direction: 'ltr',
                    ...(locale === 'en' ? { textAlign: 'right', direction: 'rtl', } : {}),
                    '@media print': {
                      height:"100%",
                      visibility:"visible",
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
  