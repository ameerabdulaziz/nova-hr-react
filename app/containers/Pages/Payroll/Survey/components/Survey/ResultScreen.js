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
import messages from '../../messages';

function ResultScreen(props) {
  const {
    isSaveLock,
    intl,
    onFormSubmit,
    onBackToSurveyBtnClick,
    questionsAnswers,
    questionList,
  } = props;

  const { classes } = useStyles();

  const uncompletedQuestionsList = useMemo(
    () => questionsAnswers.filter((question) => !question.answer),
    [questionsAnswers]
  );

  const answerPercent = useMemo(
    () => (questionList.length === 0
      ? 0
      : (questionsAnswers.length * 100) / questionList.length),
    [questionsAnswers, questionList]
  );

  return (
    <div className={`${style.resultContainerSty} ${classes.containerSty}`}>
      <div className={`${classes.surveyMainSty}`}>
        <img src={finishLogo} alt='finishLogo' />
        <h1>{intl.formatMessage(messages.thankYouForCompleteTheSurvey)}</h1>
      </div>

      <div>
        <Typography>
          {intl.formatMessage(messages.completedQuestions)}
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
          <p className={classes.textSty}>
            {intl.formatMessage(
              messages.thereAreQuestionsThatYouDidNotAnswerWhichAre
            )}
						( {uncompletedQuestionsList.toString()} ).
          </p>
        )}
      </div>

      <Grid container justifyContent='center' spacing={3}>
        {uncompletedQuestionsList.length !== 0 && (
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={onBackToSurveyBtnClick}
            >
              {intl.formatMessage(messages.backToSurvey)}
            </Button>
          </Grid>
        )}

        <Grid item>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            onClick={() => onFormSubmit('save')}
            disabled={isSaveLock}
          >
            {intl.formatMessage(payrollMessages.save)}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            color='primary'
            onClick={() => onFormSubmit('submit')}
            disabled={uncompletedQuestionsList.length !== 0}
          >
            {intl.formatMessage(messages.submit)}
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
  onBackToSurveyBtnClick: PropTypes.func.isRequired,
  isSaveLock: PropTypes.bool.isRequired,
};

export default injectIntl(ResultScreen);
