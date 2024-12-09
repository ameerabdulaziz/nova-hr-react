import React, {useState, useEffect} from "react";
import {
    Box,
    Stack,
    Grid,
    Typography
  } from '@mui/material';
  import { useSelector } from 'react-redux';
  import PaymentReportItem from '../components/PaymentSlipTotal/PaymentReportItem';
  import style from '../../../../../styles/styles.scss'
  import messages from '../messages';
  import { injectIntl } from 'react-intl';


const PaymentSlipReview = (props) => {

    const [sessionData, setSessionData] = useState([]);
    const company = useSelector((state) => state.authReducer.companyInfo);
    const { intl } = props;


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
          className={style.PaymentSlipTotalContainer}
      >
         <Stack spacing={2} mb={2}>
            <div>
                <img src={company?.logo} alt='' height={45} />
            </div>
          </Stack>

         <Grid
          container
          alignItems='center'
          sx={{ borderBottom: '2px solid #333', pb: 1 }}
          >
            <Grid item xs={5}>
              <Typography fontWeight='bold' variant='subtitle1'>
                {intl.formatMessage(messages.paymentSlip)}
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography fontWeight='bold'>
                {sessionData?.itemFormInfo?.monthName} &nbsp; / &nbsp; {sessionData?.itemFormInfo?.yearName}
              </Typography>
            </Grid>
        </Grid>

        {sessionData.length !== 0 && (

            sessionData?.paymentSlipTotalReport.map((item, index) => (
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



export default injectIntl(PaymentSlipReview);