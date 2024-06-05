import { HomeRepairService } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../messages';
import ChooseQuestionPopup from './ChooseQuestionPopup';
import CreateAndEditQuestionPopup from './CreateAndEditQuestionPopup';
import QuestionList from './QuestionList';

function QuestionInfo(props) {
  const {
    intl,
    setFormInfo,
    formInfo,
    questionList,
    questionTypesList,
    questionGroupsList,
    choicesGroupsList,
  } = props;

  const [isCreateQuestionPopupOpen, setIsCreateQuestionPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [isChooseQuestionPopupOpen, setIsChooseQuestionPopupOpen] = useState(false);

  const onQuestionCreatePopupBtnClick = async () => {
    setIsCreateQuestionPopupOpen(true);
  };

  const groupQuestionsByGroup = (questions) => questions.reduce((grouped, question) => {
    const group = question.questionGroup;
    if (!grouped[group]) {
      grouped[group] = [];
    }

    grouped[group].push(question);
    return grouped;
  }, {});

  const groupedQuestions = useMemo(
    () => groupQuestionsByGroup(formInfo.questionList),
    [formInfo.questionList]
  );

  const onQuestionRemove = (id) => {
    const clonedItems = [...formInfo.questionList];

    const indexToRemove = clonedItems.findIndex(
      (item) => item.questionId === id
    );

    if (indexToRemove !== -1) {
      clonedItems.splice(indexToRemove, 1);

      setFormInfo((prev) => ({
        ...prev,
        questionList: clonedItems,
      }));
    }
  };

  const onQuestionEditBtnClick = (question) => {
    setSelectedQuestion(question);
    setIsCreateQuestionPopupOpen(true);
  };

  const onChooseQuestionBtnClick = () => {
    setIsChooseQuestionPopupOpen(true);
  };

  return (
    <>
      <CreateAndEditQuestionPopup
        isOpen={isCreateQuestionPopupOpen}
        setIsOpen={setIsCreateQuestionPopupOpen}
        setFormInfo={setFormInfo}
        formInfo={formInfo}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        questionTypesList={questionTypesList}
        questionGroupsList={questionGroupsList}
        choicesGroupsList={choicesGroupsList}
      />

      <ChooseQuestionPopup
        isOpen={isChooseQuestionPopupOpen}
        setIsOpen={setIsChooseQuestionPopupOpen}
        setFormInfo={setFormInfo}
        formInfo={formInfo}
        questionList={questionList}
      />

      <Card>
        <CardContent sx={{ p: '16px!important' }}>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            mb={3}
          >
            <Grid item>
              <Typography variant='h6'>
                {intl.formatMessage(messages.questionInfo)}
              </Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems='center' spacing={1}>
                <Grid item>
                  <Button
                    variant='contained'
                    onClick={onChooseQuestionBtnClick}
                    color='primary'
                  >
                    {intl.formatMessage(messages.addQuestions)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={onQuestionCreatePopupBtnClick}
                    color='primary'
                  >
                    {intl.formatMessage(messages.createQuestion)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {formInfo.questionList.length > 0 ? (
            <QuestionList
              onQuestionEdit={onQuestionEditBtnClick}
              onQuestionRemove={onQuestionRemove}
              groupedQuestions={groupedQuestions}
            />
          ) : (
            <Stack
              direction='row'
              sx={{ minHeight: 200 }}
              alignItems='center'
              justifyContent='center'
              textAlign='center'
            >
              <Box>
                <HomeRepairService sx={{ color: '#a7acb2', fontSize: 30 }} />
                <Typography color='#a7acb2' variant='body1'>
                  {intl.formatMessage(messages.noQuestions)}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}

QuestionInfo.propTypes = {
  intl: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  questionList: PropTypes.array.isRequired,
  questionTypesList: PropTypes.array.isRequired,
  questionGroupsList: PropTypes.array.isRequired,
  choicesGroupsList: PropTypes.array.isRequired,
};

export default injectIntl(QuestionInfo);
