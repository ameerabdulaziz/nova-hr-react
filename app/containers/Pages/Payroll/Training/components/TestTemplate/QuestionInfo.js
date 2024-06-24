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
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import surveyMessages from '../../../Survey/messages';
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
  } = props;

  const [isCreateQuestionPopupOpen, setIsCreateQuestionPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [isChooseQuestionPopupOpen, setIsChooseQuestionPopupOpen] = useState(false);

  const onQuestionCreatePopupBtnClick = async () => {
    setIsCreateQuestionPopupOpen(true);
  };

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
      />

      <ChooseQuestionPopup
        isOpen={isChooseQuestionPopupOpen}
        setIsOpen={setIsChooseQuestionPopupOpen}
        setFormInfo={setFormInfo}
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
                {intl.formatMessage(surveyMessages.questionInfo)}
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
                    {intl.formatMessage(surveyMessages.addQuestions)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={onQuestionCreatePopupBtnClick}
                    color='primary'
                  >
                    {intl.formatMessage(surveyMessages.createQuestion)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {formInfo.questionList.length > 0 ? (
            <QuestionList
              onQuestionEdit={onQuestionEditBtnClick}
              onQuestionRemove={onQuestionRemove}
              formInfo={formInfo}
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
                  {intl.formatMessage(surveyMessages.noQuestions)}
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
};

export default injectIntl(QuestionInfo);
