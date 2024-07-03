import { Check, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import payrollMessages from '../../../messages';
import useStyles from '../../../Style';
import messages from '../../messages';

function TestTemplatePrint(props) {
  const { intl, questionList } = props;

  const { classes } = useStyles();

  const totalGrades = useMemo(() => {
    const reducedAnswers = questionList.reduce(
      (prev, item) => {
        const answerGrade = prev.answerGrade
          + (item.answerGrade ? parseInt(item.answerGrade, 10) : 0);

        const questionGrade = prev.questionGrade + parseInt(item.questionGrade, 10);

        return {
          ...prev,
          answerGrade,
          questionGrade,
        };
      },
      { answerGrade: 0, questionGrade: 0 }
    );

    return reducedAnswers;
  }, [questionList]);

  return (
    <>
      <Grid
        container
        justifyContent='space-between'
        sx={{
          borderBottom: '1.5px solid black',
          pb: 1,
          mb: 1,
          mx: 4,
          width: 'auto!important',
        }}
      >
        <Grid item xs={3}>
          <Typography>
            {intl.formatMessage(payrollMessages.name)} : ---------
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            {intl.formatMessage(payrollMessages.job)} : ---------
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography>
            {intl.formatMessage(payrollMessages.date)} : --- / --- / ---
          </Typography>
        </Grid>
      </Grid>

      <div
        className={`${style.examContainer} ${style.examContainer2AllQue} `}
        style={{ marginLeft: '32px', marginRight: '32px' }}
      >
        <Box sx={{ width: '100%!important' }}>
          {questionList.map((question, index) => (
            <React.Fragment key={question.questionId}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 600, mb: 2, fontSize: '17px!important' }}
              >
                {question.question}
              </Typography>

              {(question.questionTypeId === 2
                || question.questionTypeId === 3) && (
                <>
                  <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                      value={questionList[index].answerChoiceId}
                      className={style.radioContainer}
                    >
                      <Grid container spacing={2}>
                        {question.choice.map((choice) => (
                          <Grid
                            item
                            md={6}
                            key={choice.id}
                            sx={{ m: '0!important' }}
                          >
                            <FormControlLabel
                              disabled
                              value={choice.id}
                              control={
                                <Radio
                                  checkedIcon={
                                    <Check
                                      className={`${style.checkedIconeSty} ${classes.surveyMainSty}`}
                                    />
                                  }
                                  icon={
                                    <RadioButtonUnchecked
                                      className={style.iconeSty}
                                    />
                                  }
                                />
                              }
                              label={choice.name}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>

                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 400,
                      color: 'gray',
                      mt: 2,
                      fontSize: '14px!important',
                    }}
                  >
                    {questionList[index].answerGrade} /{' '}
                    {questionList[index].questionGrade}
                  </Typography>
                </>
              )}

              {(question.questionTypeId === 1
                || question.questionTypeId === 3) && (
                <>
                  <Typography
                    variant='body1'
                    color='gray'
                    sx={{ fontWeight: 400, fontSize: '15px!important' }}
                  >
                    {questionList[index].textAnswer}
                  </Typography>

                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 400,
                      color: 'gray',
                      mt: 2,
                      fontSize: '14px!important',
                    }}
                  >
                    {questionList[index].answerGrade} /{' '}
                    {questionList[index].questionGrade}
                  </Typography>
                </>
              )}

              <Box
                className={style.lineStye}
                sx={{ my: index === questionList.length - 1 ? 0 : 3 }}
              />
            </React.Fragment>
          ))}

          <Stack direction='row' mt={2} spacing={1} alignItems='center'>
            <Typography variant='h6' sx={{ fontWeight: 500 }}>
              {intl.formatMessage(messages.totalGrade)} :
            </Typography>

            <Typography variant='h5' sx={{ fontWeight: 500 }}>
              {totalGrades.answerGrade} /
            </Typography>

            <Typography variant='h6' sx={{ fontWeight: 500 }}>
              {totalGrades.questionGrade}
            </Typography>
          </Stack>
        </Box>
      </div>
    </>
  );
}

TestTemplatePrint.propTypes = {
  intl: PropTypes.object.isRequired,
  questionList: PropTypes.array.isRequired,
};

export default injectIntl(TestTemplatePrint);
