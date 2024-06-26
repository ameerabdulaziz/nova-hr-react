import { Box, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import examLogo2 from '../../../Assets/Employee-Assessment/info_graphic_1.svg';
import useStyles from '../../../Style';
import messages from '../../messages';
import QuestionStepper from './QuestionStepper';
import QuestionsPanel from './QuestionsPanel';

function QuestionScreen(props) {
  const { classes } = useStyles();

  const {
    intl, surveyInfo, onFinish, questionsAnswers, setQuestionsAnswers, questionList
  } = props;

  const onFinishSurveyBtnClick = () => {
    onFinish();
  };

  return (
    <Grid container>
      {/* Banner */}
      <Grid item xs={12} className={style.gridContainerSty}>
        <Box className={`${style.bannerContainer} ${classes.surveyMainSty}`}>
          <div>
            <img src={examLogo2} alt='examLogo2' />
            {surveyInfo && (
              <div>
                <p>{surveyInfo.name}</p>
              </div>
            )}
          </div>
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={onFinishSurveyBtnClick}
            >
              {intl.formatMessage(messages.finish)}
            </Button>
          </div>
        </Box>
      </Grid>

      {surveyInfo.showStyle === 1 && (
        <QuestionStepper
          questionList={questionList}
          questionsAnswers={questionsAnswers}
          setQuestionsAnswers={setQuestionsAnswers}
          onFinish={onFinish}
        />
      )}

      {
        surveyInfo.showStyle === 2 && (
          <QuestionsPanel
            questionList={questionList}
            questionsAnswers={questionsAnswers}
            setQuestionsAnswers={setQuestionsAnswers}
            onFinish={onFinish}
          />
        )
      }
    </Grid>
  );
}

QuestionScreen.propTypes = {
  intl: PropTypes.object.isRequired,
  surveyInfo: PropTypes.object.isRequired,
  onFinish: PropTypes.func.isRequired,
  questionsAnswers: PropTypes.array.isRequired,
  setQuestionsAnswers: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
};

export default injectIntl(QuestionScreen);
