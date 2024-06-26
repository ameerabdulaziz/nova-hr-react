import { Check, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import examLogo2 from '../../../Assets/Employee-Assessment/info_graphic_1.svg';
import useStyles from '../../../Style';
import surveyMessages from '../../../Survey/messages';
import messages from '../../messages';

function QuestionScreen(props) {
  const { classes } = useStyles();

  const {
    intl,
    testInfo,
    onTestReviewFinish,
    questionsAnswers,
    setQuestionsAnswers,
    questionList,
    isTestDone,
  } = props;

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    onTestReviewFinish();
  };

  const onGradeInputChange = (evt, index) => {
    const clonedAnswers = [...questionsAnswers];

    clonedAnswers[index] = {
      ...clonedAnswers[index],
      answerGrade: evt.target.value,
    };

    setQuestionsAnswers(clonedAnswers);
  };

  const onChoiceRadioChange = (evt, questionId) => {
    const clonedAnswers = [...questionsAnswers];

    const questionIndex = clonedAnswers.findIndex(
      (item) => item.questionId === questionId
    );

    if (questionIndex !== -1) {
      clonedAnswers[questionIndex] = {
        ...clonedAnswers[questionIndex],
        answerChoiceId: evt.target.value,
      };

      setQuestionsAnswers(clonedAnswers);
    }
  };

  const totalGrades = useMemo(() => {
    const reducedAnswers = questionsAnswers.reduce(
      (prev, item) => ({
        ...prev,
        answerGrade: prev.answerGrade + parseInt(item.answerGrade, 10),
        questionGrade: prev.questionGrade + parseInt(item.questionGrade, 10),
      }),
      { answerGrade: 0, questionGrade: 0 }
    );

    return reducedAnswers;
  }, [questionsAnswers]);

  const isAnswerGradeBiggerThanQuestionGrade = useCallback(
    (answer) => parseInt(answer.answerGrade, 10) > parseInt(answer.questionGrade, 10),
    [questionsAnswers]
  );

  return (
    <Grid container>
      {/* Banner */}
      <Grid item xs={12} className={style.gridContainerSty}>
        <Box className={`${style.bannerContainer} ${classes.surveyMainSty}`}>
          <div>
            <img src={examLogo2} alt='examLogo2' />
            {testInfo && (
              <div>
                <p>{testInfo.name}</p>
              </div>
            )}
          </div>
          <div></div>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={onFormSubmit}>
          <div
            className={`${style.examContainer} ${style.examContainer2AllQue} `}
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
                          value={questionsAnswers[index].answerChoiceId}
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
                                  onChange={(evt) => onChoiceRadioChange(evt, index)
                                  }
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      </FormControl>

                      <Grid container mt={2}>
                        <Grid item xs={6} md={2}>
                          <TextField
                            name='enName'
                            value={questionsAnswers[index].answerGrade}
                            label={intl.formatMessage(messages.grade)}
                            fullWidth
                            disabled
                            variant='outlined'
                            autoComplete='off'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  {' '}
                                  / {questionsAnswers[index].questionGrade}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {(question.questionTypeId === 1
                    || question.questionTypeId === 3) && (
                    <>
                      <Typography
                        variant='body1'
                        color='gray'
                        sx={{ fontWeight: 400, fontSize: '16px!important' }}
                      >
                        {questionsAnswers[index].textAnswer}
                      </Typography>

                      <Grid container mt={2}>
                        <Grid item xs={4} md={2}>
                          <TextField
                            name='enName'
                            value={questionsAnswers[index].answerGrade}
                            required
                            onChange={(evt) => onGradeInputChange(evt, index)}
                            label={intl.formatMessage(messages.grade)}
                            fullWidth
                            variant='outlined'
                            type='number'
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: questionsAnswers[index].questionGrade,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={isAnswerGradeBiggerThanQuestionGrade(
                              questionsAnswers[index]
                            )}
                            autoComplete='off'
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  {' '}
                                  / {questionsAnswers[index].questionGrade}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
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

                <Typography variant='body1'>
                  {totalGrades.questionGrade}
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isTestDone}
                    type='submit'
                  >
                    {intl.formatMessage(surveyMessages.finish)}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

QuestionScreen.propTypes = {
  intl: PropTypes.object.isRequired,
  testInfo: PropTypes.object.isRequired,
  onTestReviewFinish: PropTypes.func.isRequired,
  questionsAnswers: PropTypes.array.isRequired,
  setQuestionsAnswers: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  isTestDone: PropTypes.bool.isRequired,
};

export default injectIntl(QuestionScreen);
