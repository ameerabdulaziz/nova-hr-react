import { Card, CardContent } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import style from '../../../../../styles/pagesStyle/Survey.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import api from '../api/TestData';
import QuestionScreen from '../components/Test/QuestionScreen';
import ResultScreen from '../components/Test/ResultScreen';
import WelcomeScreen from '../components/Test/WelcomeScreen';

function Test() {
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();

  const trainingId = location.state?.trainingId ?? 0;

  const [isLoading, setIsLoading] = useState(false);

  const [isTestEnd, setIsTestEnd] = useState(false);
  const [isTestStart, setIsTestStart] = useState(false);
  const [isTestDone, setIsTestDone] = useState(false);

  const [questionList, setQuestionList] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  const [testInfo, setTestInfo] = useState({
    id: 0,
    templateId: null,
    name: '',
    showStyle: null,
    arDescription: '',
    enDescription: '',
  });

  const fetchNeededData = async () => {
    if (trainingId === 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api(locale).getByTrainingId(trainingId);

      if (response) {
        setTestInfo(prev => ({
          ...prev,
          id: response.id,
          templateId: response.templateId,
          name: response.name,
          showStyle: response.showStyle,
          arDescription: response.arDescription,
          enDescription: response.enDescription,
        }));

        const answers = response.question.map(item => ({
          textAnswer: item.textAnswer,
          answerChoiceId: item.answerChoiceId,
          questionTypeId: item.questionTypeId,
          questionId: item.questionId,
        }));

        setQuestionList(response.question);

        setQuestionsAnswers(answers);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFinishTestBtnClick = () => {
    setIsTestEnd(true);
  };

  const onBackToTestBtnClick = () => {
    setIsTestEnd(false);
    setIsTestStart(true);
  };

  const onFormSubmit = async (type) => {
    setIsLoading(true);

    try {
      const answers = questionsAnswers.map(item => ({
        questionId: item.questionId,
        testId: testInfo.id,
        textAnswer: item.textAnswer,
        choiceId: item.answerChoiceId,
      }));

      const body = {
        id: testInfo.id,
        isDone: type === 'submit',
        templateId: testInfo.templateId,
        trTestDetails: answers,
      };

      await api(locale).save(body);

      setIsTestDone(true);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Card>
        <CardContent className={style.surveyCardContentSty}>
          {!isTestStart && !isTestEnd && (
            <WelcomeScreen
              setIsTestStart={setIsTestStart}
              testInfo={testInfo}
            />
          )}

          {isTestEnd && isTestStart && testInfo.templateId !== null && (
            <ResultScreen
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              isSurveyDone={isTestDone}
              onFormSubmit={onFormSubmit}
              setQuestionsAnswers={setQuestionsAnswers}
              onBackToSurveyBtnClick={onBackToTestBtnClick}
            />
          )}

          {isTestStart && !isTestEnd && testInfo.templateId !== null && (
            <QuestionScreen
              testInfo={testInfo}
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              setQuestionsAnswers={setQuestionsAnswers}
              onFinish={onFinishTestBtnClick}
            />
          )}
        </CardContent>
      </Card>
    </PayRollLoader>
  );
}

export default Test;
