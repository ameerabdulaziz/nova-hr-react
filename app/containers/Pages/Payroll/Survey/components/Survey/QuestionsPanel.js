import { Check, RadioButtonUnchecked } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import style from '../../../../../../styles/pagesStyle/Survey.scss';
import useStyles from '../../../Style';
import messages from '../../messages';

function QuestionsPanel(props) {
  const {
    intl,
    questionList,
    setQuestionsAnswers,
    questionsAnswers,
    onFinish,
  } = props;

  const { classes } = useStyles();

  const groupQuestionsByGroup = (questions) => questions.reduce((grouped, question) => {
    const group = question.questionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }

    grouped[group].push(question);
    return grouped;
  }, {});

  const groupedQuestions = useMemo(
    () => groupQuestionsByGroup(questionList),
    [questionList]
  );

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    onFinish();
  };

  const onTextAnswerChange = (evt, index) => {
    const clonedAnswers = [...questionsAnswers];

    clonedAnswers[index] = {
      ...clonedAnswers[index],
      textAnswer: evt.target.value,
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

  return (
    <Grid item xs={12}>
      <form onSubmit={onFormSubmit}>
        <div
          className={`${style.examContainer} ${style.examContainer2AllQue} `}
        >
          <Box sx={{ width: '100%!important' }}>
            {Object.entries(groupedQuestions).map(
              ([group, questions], groupIndex) => (
                <React.Fragment key={group}>
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
                    {group}
                  </Typography>

                  {questions.map((question) => {
                    const questionIndex = questionsAnswers.findIndex(
                      (item) => item.questionId === question.questionId
                    );

                    const isChoiceQuestion = question.questionTypeId === 2
                      || question.questionTypeId === 3;

                    const isAnswerQuestion = question.questionTypeId === 1
                      || question.questionTypeId === 3;

                    return (
                      <React.Fragment key={question.questionId}>
                        <Typography
                          variant='body1'
                          sx={{ fontWeight: 400, fontSize: '1.1rem' }}
                        >
                          {question.question}
                        </Typography>

                        {isChoiceQuestion && (
                          <FormControl style={{ width: '100%' }}>
                            <RadioGroup
                              value={
                                questionsAnswers[questionIndex].answerChoiceId
                              }
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
                                      onChange={(evt) => onChoiceRadioChange(
                                        evt,
                                        question.questionId
                                      )
                                      }
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            </RadioGroup>
                          </FormControl>
                        )}

                        {isAnswerQuestion && (
                          <Box sx={{ my: 2 }}>
                            <TextareaAutosize
                              color='neutral'
                              minRows={3}
                              placeholder={intl.formatMessage(messages.answer)}
                              onChange={(evt) => onTextAnswerChange(evt, questionIndex)
                              }
                              value={questionsAnswers[questionIndex].textAnswer}
                              required={question.questionTypeId === 1}
                            />
                          </Box>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <Box
                    className={style.lineStye}
                    sx={{ my: groupIndex === questionList.length - 1 ? 0 : 3 }}
                  />
                </React.Fragment>
              )
            )}

            <Grid container spacing={2}>
              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  {intl.formatMessage(messages.finish)}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </form>
    </Grid>
  );
}

QuestionsPanel.propTypes = {
  intl: PropTypes.object.isRequired,
  questionList: PropTypes.array.isRequired,
  questionsAnswers: PropTypes.array.isRequired,
  setQuestionsAnswers: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default injectIntl(QuestionsPanel);
