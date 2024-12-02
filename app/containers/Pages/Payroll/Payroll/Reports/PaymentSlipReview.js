import React, {useState, useEffect} from "react";
import {
    Box,
    Stack
  } from '@mui/material';
  import { useSelector } from 'react-redux';
  import PaymentReportItem from '../components/PaymentSlip/PaymentReportItem';
  import style from '../../../../../styles/styles.scss'


const PaymentSlipReview = () => {

    const [sessionData, setSessionData] = useState([]);
    const company = useSelector((state) => state.authReducer.companyInfo);


    useEffect(()=>{

        if(sessionData.length === 0)
        {
          setSessionData(JSON.parse(sessionStorage.getItem("Review")))
        }


      },[JSON.parse(sessionStorage.getItem("Review"))])

    return (
            <Box
                sx={{
                px: 4,
                pt: 4,
                'p.MuiTypography-root, .MuiTableCell-root': {
                    fontSize: '12px',
                    color: '#000',
                },
                }}
                className={style.PaymentSlipReviewContainer}
            >

            {sessionData.length !== 0 && (

                    <Stack spacing={2} mb={2}>
                    <div>
                        <img src={company?.logo} alt='' height={45} />
                    </div>
                    </Stack>,


                sessionData?.paymentSlipReport.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                        pageBreakInside: 'avoid',
                        }}
                    >
                        <PaymentReportItem item={item} formInfo={sessionData?.itemFormInfo} />
                    </Box>
                    ))
                )}
            
            </Box>
    )
}



export default PaymentSlipReview;