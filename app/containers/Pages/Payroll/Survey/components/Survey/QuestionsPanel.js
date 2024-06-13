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
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
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

  const onChoiceRadioChange = (evt, index) => {
    const clonedAnswers = [...questionsAnswers];

    clonedAnswers[index] = {
      ...clonedAnswers[index],
      answerChoiceId: evt.target.value,
    };

    setQuestionsAnswers(clonedAnswers);
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={onFormSubmit}>
        <div
          className={`${style.examContainer} ${style.examContainer2AllQue} `}
        >
          <Box sx={{ width: '100%!important' }}>
            {questionList.map((question, index) => (
              <React.Fragment key={question.questionId}>
                <h1>{question.question}</h1>

                {(question.questionTypeId === 2
                  || question.questionTypeId === 3) && (
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
                              onChange={(evt) => onChoiceRadioChange(evt, index)
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                )}

                {(question.questionTypeId === 1
                  || question.questionTypeId === 3) && (
                  <TextareaAutosize
                    color='neutral'
                    minRows={3}
                    placeholder={intl.formatMessage(messages.answer)}
                    onChange={(evt) => onTextAnswerChange(evt, index)}
                    value={questionsAnswers[index].textAnswer}
                    required={question.questionTypeId === 1}
                  />
                )}

                <Box
                  className={style.lineStye}
                  sx={{ my: index === questionList.length - 1 ? 0 : 3 }}
                ></Box>
              </React.Fragment>
            ))}

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
