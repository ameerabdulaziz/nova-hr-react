import {
  Box, Button, CircularProgress, Grid, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import finishLogo from '../../../Assets/Employee-Assessment/tht1.png';
import payrollMessages from '../../../messages';
import useStyles from '../../../Style';
import surveyMessages from '../../../Survey/messages';
import messages from '../../messages';

function ResultScreen(props) {
  const {
    intl,
    onFormSubmit,
    onBackToSurveyBtnClick,
    questionsAnswers,
    questionList,
    isSurveyDone,
  } = props;

  const { classes } = useStyles();

  const uncompletedQuestionsList = useMemo(() => {
    const filterAlgorithm = (question) => {
      if (question.questionTypeId === 1) {
        return question.textAnswer === '';
      }

      return question.answerChoiceId === null;
    };

    return questionsAnswers
      .map((item, index) => ({ ...item, index: index + 1 }))
      .filter(filterAlgorithm);
  }, [questionsAnswers]);

  const answerPercent = useMemo(() => {
    if (questionList.length === 0) {
      return 0;
    }

    const uncompletedQuestionNumber = questionList.length - uncompletedQuestionsList.length;

    return Math.round((uncompletedQuestionNumber * 100) / questionList.length);
  }, [uncompletedQuestionsList, questionList]);

  return (
    <div className={`${style.resultContainerSty} ${classes.containerSty}`}>
      <div className={`${classes.surveyMainSty}`}>
        <img src={finishLogo} alt='finishLogo' />
        <h1>{intl.formatMessage(surveyMessages.thankYouForCompleteTheSurvey)}</h1>
      </div>

      <div>
        <Typography>
          {intl.formatMessage(surveyMessages.completedQuestions)}
        </Typography>

        <Box>
          <CircularProgress variant='determinate' value={100} />

          <CircularProgress
            variant='determinate'
            style={{ transform: 'scaleX(-1) rotate(-90deg' }}
            value={answerPercent}
          />

          <Typography position='absolute' className={`${classes.textSty}`}>
            {answerPercent}%
          </Typography>
        </Box>

        {uncompletedQuestionsList.length !== 0 && (
          <>
            <p className={classes.textSty}>
              {intl.formatMessage(
                surveyMessages.thereAreQuestionsThatYouDidNotAnswerWhichAre
              )}
            </p>

            <p className={classes.textSty}>
              ( {uncompletedQuestionsList.map((item) => item.index).toString()}{' '}
              ).
            </p>
          </>
        )}
      </div>

      <Grid container justifyContent='center' spacing={2}>
        <Grid item>
          <Button
            variant='outlined'
            color='secondary'
            disabled={isSurveyDone}
            onClick={onBackToSurveyBtnClick}
          >
            {intl.formatMessage(messages.backToTest)}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            disabled={isSurveyDone}
            onClick={() => onFormSubmit('save')}
          >
            {intl.formatMessage(payrollMessages.save)}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            color='primary'
            onClick={() => onFormSubmit('submit')}
            disabled={uncompletedQuestionsList.length !== 0 || isSurveyDone}
          >
            {intl.formatMessage(surveyMessages.submit)}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

ResultScreen.propTypes = {
  intl: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  questionsAnswers: PropTypes.array.isRequired,
  questionList: PropTypes.array.isRequired,
  isSurveyDone: PropTypes.bool.isRequired,
  onBackToSurveyBtnClick: PropTypes.func.isRequired,
};

export default injectIntl(ResultScreen);
