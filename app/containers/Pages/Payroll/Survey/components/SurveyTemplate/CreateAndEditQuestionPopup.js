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
import messages from '../../messages';

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
    questionGroupsList,
    choicesGroupsList,
  } = props;

  const [questionInfo, setQuestionInfo] = useState({
    questionId: '0',
    arName: '',
    enName: '',
    questionTypeId: null,
    questionGroupId: null,
    choiceGroupId: null,
    isNew: false,
  });

  const resetQuestionInfo = () => {
    setQuestionInfo({
      arName: '',
      questionId: '0',
      enName: '',
      questionTypeId: null,
      questionGroupId: null,
      choiceGroupId: null,
      isNew: false,
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

  const onAutoCompleteChange = (value, name) => {
    setQuestionInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const questionListCloned = [...formInfo.questionList];

    const choiceGroupName = choicesGroupsList.find(
      (q) => q.id === questionInfo.choiceGroupId
    )?.name;

    const questionGroupName = questionGroupsList.find(
      (q) => q.id === questionInfo.questionGroupId
    )?.name;

    const question = {
      ...questionInfo,
      questionGroup: questionGroupName,
      choiceGroup: choiceGroupName,
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
          width: '70vw',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(
          selectedQuestion ? messages.editQuestion : messages.addQuestion
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

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={questionTypesList}
              value={
                questionTypesList.find(
                  (item) => item.id === questionInfo.questionTypeId
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'questionTypeId')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.questionType)}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={questionGroupsList}
              value={
                questionGroupsList.find(
                  (item) => item.id === questionInfo.questionGroupId
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'questionGroupId')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.questionGroup)}
                />
              )}
            />
          </Grid>

          {(questionInfo.questionTypeId === 2
            || questionInfo.questionTypeId === 3) && (
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={choicesGroupsList}
                value={
                  choicesGroupsList.find(
                    (item) => item.id === questionInfo.choiceGroupId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'choiceGroupId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={questionInfo.questionTypeId === 2}
                    label={intl.formatMessage(messages.choiceGroup)}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
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
  questionGroupsList: PropTypes.array.isRequired,
  choicesGroupsList: PropTypes.array.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  formInfo: PropTypes.object.isRequired,
};

export default injectIntl(CreateAndEditQuestionPopup);
