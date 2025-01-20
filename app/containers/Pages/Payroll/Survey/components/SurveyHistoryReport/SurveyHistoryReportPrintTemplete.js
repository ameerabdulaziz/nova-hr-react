import React from "react";
import { useSelector } from 'react-redux';
import SurveyTemplatePrint from '../../../Training/components/EmployeeTrainingReport/SurveyTemplatePrint';
import {
    Box,
    Stack,
    Typography,
  } from '@mui/material';


const SurveyHistoryReportPrintTemplete = ({
        surveyInfo,
        surveyQuestionsAnswers,
        surveyGroupedQuestion,
        printSurveyRef
    }) => {


      const company = useSelector((state) => state.authReducer.companyInfo);

    return (
        <Box
            ref={printSurveyRef}
            sx={{
            height:"0px",
            visibility:"hidden",
            pageBreakBefore: 'always',
            direction: 'ltr',
            '@media print': {
                height:"100%",
                visibility:"visible",
            },
            'p.MuiTypography-root, .MuiTableCell-root': {
                fontSize: '10px',
                color: '#000',
            },
            '@page': {
                margin: 4,
            },
            svg: {
                fontSize: '0.7rem',
            },
            }}
        >
            <Stack
                spacing={2}
                mx={4}
                mt={4}
                mb={2}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
            <div>
                <img src={company?.logo} alt='' height={45} />
            </div>

                <Typography>{surveyInfo?.name}</Typography>
            </Stack>

            <SurveyTemplatePrint
                groupedQuestion={surveyGroupedQuestion}
                questionsAnswers={surveyQuestionsAnswers}
            />
      </Box>
    )
}


export default SurveyHistoryReportPrintTemplete;