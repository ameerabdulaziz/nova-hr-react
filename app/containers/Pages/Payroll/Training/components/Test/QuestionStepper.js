import { Check, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import useStyles from '../../../Style';
import surveyMessages from '../../../Survey/messages';

function QuestionStepper(props) {
  const {
    intl,
    questionList,
    setQuestionsAnswers,
    questionsAnswers,
    onFinish,
  } = props;

  const { classes } = useStyles();

  const [questionNumber, setQuestionNumber] = useState(0);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (questionList.length >= questionNumber + 1) {
      if (questionNumber + 1 === questionList.length) {
        onFinish();
      } else {
        setQuestionNumber(questionNumber + 1);
      }
    }
  };

  const selectedQuestion = useMemo(
    () => questionList[questionNumber],
    [questionList, questionNumber]
  );

  const selectedAnswer = useMemo(
    () => questionsAnswers[questionNumber],
    [questionsAnswers, questionNumber]
  );

  const onPreviousBtnClick = () => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const onTextAnswerChange = (evt) => {
    const clonedAnswers = [...questionsAnswers];

    clonedAnswers[questionNumber] = {
      ...clonedAnswers[questionNumber],
      textAnswer: evt.target.value,
    };

    setQuestionsAnswers(clonedAnswers);
  };

  const onChoiceRadioChange = (evt) => {
    const clonedAnswers = [...questionsAnswers];

    clonedAnswers[questionNumber] = {
      ...clonedAnswers[questionNumber],
      answerChoiceId: evt.target.value,
    };

    setQuestionsAnswers(clonedAnswers);
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={onFormSubmit}>
        <div className={`${style.examContainer}`}>
          <div>
            {questionList.length >= questionNumber + 1 && (
              <>
                <LinearProgress
                  variant='determinate'
                  value={((questionNumber + 1) * 100) / questionList.length}
                />

                <p>
                  {questionNumber + 1}/{questionList.length}
                </p>

                <h1>{selectedQuestion.question}</h1>

                {(selectedQuestion.questionTypeId === 2
                  || selectedQuestion.questionTypeId === 3) && (
                  <FormControl style={{ width: '100%' }}>
                    <RadioGroup
                      value={selectedAnswer.answerChoiceId}
                      className={style.radioContainer}
                    >
                      {selectedQuestion.choice.map((choice) => (
                        <FormControlLabel
                          key={choice.id}
                          required
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
                          onChange={onChoiceRadioChange}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}

                {(selectedQuestion.questionTypeId === 1
                  || selectedQuestion.questionTypeId === 3) && (
                  <TextareaAutosize
                    color='neutral'
                    minRows={3}
                    placeholder={intl.formatMessage(surveyMessages.answer)}
                    onChange={onTextAnswerChange}
                    value={selectedAnswer.textAnswer}
                    required={selectedQuestion.questionTypeId === 1}
                  />
                )}
              </>
            )}

            <div className={style.lineStye}></div>

            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={onPreviousBtnClick}
                  disabled={questionNumber === 0}
                >
                  {intl.formatMessage(surveyMessages.previous)}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant='contained'
                  disabled={questionList.length === questionNumber + 1}
                  color='primary'
                  type='submit'
                >
                  {intl.formatMessage(surveyMessages.next)}
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant='contained'
                  disabled={questionList.length !== questionNumber + 1}
                  color='primary'
                  type='submit'
                >
                  {intl.formatMessage(surveyMessages.finish)}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    </Grid>
  );
}

QuestionStepper.propTypes = {
  intl: PropTypes.object.isRequired,
  questionList: PropTypes.array.isRequired,
  questionsAnswers: PropTypes.array.isRequired,
  setQuestionsAnswers: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default injectIntl(QuestionStepper);
