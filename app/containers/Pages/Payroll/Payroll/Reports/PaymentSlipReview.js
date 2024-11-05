import React from "react";
import {
    Box,
    Stack
  } from '@mui/material';
  import DecryptUrl from "../../Component/DecryptUrl";
  import { useSelector } from 'react-redux';
  import PaymentReportItem from '../components/PaymentSlip/PaymentReportItem';
  import style from '../../../../../styles/styles.scss'


const PaymentSlipReview = () => {

    const empid = DecryptUrl();
    const company = useSelector((state) => state.authReducer.companyInfo);

    return (
            <Box
                sx={{
                px: 4,
                pt: 4,
                'p.MuiTypography-root, .MuiTableCell-root': {
                    fontSize: '7px',
                    color: '#000',
                },
                }}
                className={style.PaymentSlipReviewContainer}
            >
                
                <Stack spacing={2} mb={2}>
                <div>
                    <img src={company?.logo} alt='' height={45} />
                </div>
                </Stack>

                {empid?.paymentSlipReport.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                    pageBreakInside: 'avoid',
                    }}
                >
                    <PaymentReportItem item={item} formInfo={empid?.itemFormInfo} />
                </Box>
                ))}
            </Box>
    )
}



export default PaymentSlipReview;