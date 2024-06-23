import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { uuid } from '../../../helpers';
import payrollMessages from '../../../messages';
import surveyMessages from '../../../Survey/messages';
import messages from '../../messages';
import AnswerList from './AnswerList';

function CreateAndEditQuestionPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    selectedQuestion,
    setSelectedQuestion,
    setFormInfo,
    formInfo,
    questionTypesList,
  } = props;

  const [questionInfo, setQuestionInfo] = useState({
    questionId: '0',
    arName: '',
    enName: '',
    questionTypeId: null,
    isNew: false,
    grade: '',
    choiceList: [],
  });

  const resetQuestionInfo = () => {
    setQuestionInfo({
      arName: '',
      questionId: '0',
      enName: '',
      questionTypeId: null,
      isNew: false,
      grade: '',
      choiceList: [],
    });
  };

  useEffect(() => {
    if (isOpen && selectedQuestion) {
      setQuestionInfo(selectedQuestion);
    } else {
      resetQuestionInfo();
    }
  }, [isOpen]);

  const onInputChange = (evt) => {
    setQuestionInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedQuestion(null);
  };

  const onQuestionTypesAutoCompleteChange = (value) => {
    setQuestionInfo((prev) => ({
      ...prev,
      questionTypeId: value !== null ? value.id : null,
    }));

    if (value) {
      if (
        (value.id === 2 || value.id === 3)
        && questionInfo.choiceList.length === 0
      ) {
        const clonedAnswers = [];

        clonedAnswers.push({
          id: uuid(),
          enName: '',
          arName: '',
          isNew: true,
          isCorrect: true,
        });

        setQuestionInfo((prev) => ({ ...prev, choiceList: clonedAnswers }));
      }
    }
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const questionListCloned = [...formInfo.questionList];

    const questionType = questionTypesList.find(
      (item) => item.id === questionInfo.questionTypeId
    )?.name;

    const question = {
      ...questionInfo,
      questionType,
    };

    if (selectedQuestion) {
      const indexToUpdate = questionListCloned.findIndex(
        (item) => item.questionId === selectedQuestion.questionId
      );
      if (indexToUpdate !== -1) {
        questionListCloned[indexToUpdate] = question;
      }
    } else {
      question.questionId = uuid();
      question.isNew = true;

      questionListCloned.push(question);
    }

    setFormInfo((prev) => ({
      ...prev,
      questionList: questionListCloned,
    }));

    closePopup();
  };

  const onNumericInputChange = (evt) => {
    setQuestionInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const onAddChoiceBtnClick = () => {
    const clonedAnswers = [...questionInfo.choiceList];

    clonedAnswers.push({
      id: uuid(),
      enName: '',
      arName: '',
      isNew: true,
      isCorrect: false,
    });

    setQuestionInfo((prev) => ({ ...prev, choiceList: clonedAnswers }));
  };

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '60vw',
          maxWidth: '60vw',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(
          selectedQuestion
            ? surveyMessages.editQuestion
            : surveyMessages.addQuestion
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container mt={0} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='enName'
              value={questionInfo.enName}
              onChange={onInputChange}
              required
              label={intl.formatMessage(payrollMessages.enName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='arName'
              value={questionInfo.arName}
              onChange={onInputChange}
              required
              label={intl.formatMessage(payrollMessages.arName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              name='grade'
              onChange={onNumericInputChange}
              value={questionInfo.grade}
              label={intl.formatMessage(messages.grade)}
              variant='outlined'
              fullWidth
              required
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Autocomplete
              options={questionTypesList}
              value={getAutoCompleteValue(
                questionTypesList,
                questionInfo.questionTypeId
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onQuestionTypesAutoCompleteChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(surveyMessages.questionType)}
                />
              )}
            />
          </Grid>

          {(questionInfo.questionTypeId === 2
            || questionInfo.questionTypeId === 3) && (
            <Grid item xs={12}>
              <Button variant='contained' onClick={onAddChoiceBtnClick}>
                {intl.formatMessage(surveyMessages.addChoice)}
              </Button>
            </Grid>
          )}
        </Grid>

        {(questionInfo.questionTypeId === 2
          || questionInfo.questionTypeId === 3) && (
          <AnswerList
            questionInfo={questionInfo}
            setQuestionInfo={setQuestionInfo}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopup}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>

        <Button type='submit' variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateAndEditQuestionPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.object,
  questionTypesList: PropTypes.array.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  formInfo: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditQuestionPopup);
