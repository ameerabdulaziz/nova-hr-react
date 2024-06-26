import { Card, CardContent } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import style from '../../../../../styles/pagesStyle/Survey.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import api from '../api/ReviewTestData';
import QuestionScreen from '../components/ReviewTest/QuestionScreen';
import WelcomeScreen from '../components/ReviewTest/WelcomeScreen';

function ReviewTest() {
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();

  const trainingId = location.state?.trainingId ?? 0;
  const evaluatedEmployeeId = location.state?.evaluatedEmployeeId ?? null;

  const [isLoading, setIsLoading] = useState(false);

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
    if (trainingId === 0 || !evaluatedEmployeeId) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api(locale).getByTrainingId(
        trainingId,
        evaluatedEmployeeId
      );

      if (response) {
        setTestInfo((prev) => ({
          ...prev,
          id: response.id,
          templateId: response.templateId,
          name: response.name,
          showStyle: response.showStyle,
          arDescription: response.arDescription,
          enDescription: response.enDescription,
        }));

        const answers = response.question.map((item) => ({
          textAnswer: item.textAnswer,
          answerChoiceId: item.answerChoiceId,
          questionTypeId: item.questionTypeId,
          questionId: item.questionId,
          questionGrade: item.questionGrade,
          answerGrade: item.answerGrade,
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

  const onTestReviewFinish = async () => {
    setIsLoading(true);

    try {
      const answers = questionsAnswers.map((item) => ({
        questionId: item.questionId,
        testId: testInfo.id,
        textAnswer: item.textAnswer,
        choiceId: item.answerChoiceId,
        questionGrade: item.questionGrade,
        answerGrade: item.answerGrade,
      }));

      const body = {
        id: testInfo.id,
        isDone: true,
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
          {!isTestStart && (
            <WelcomeScreen
              setIsTestStart={setIsTestStart}
              testInfo={testInfo}
            />
          )}

          {isTestStart && testInfo.templateId !== null && (
            <QuestionScreen
              testInfo={testInfo}
              questionsAnswers={questionsAnswers}
              setQuestionsAnswers={setQuestionsAnswers}
              questionList={questionList}
              isTestDone={isTestDone}
              onTestReviewFinish={onTestReviewFinish}
            />
          )}
        </CardContent>
      </Card>
    </PayRollLoader>
  );
}

export default ReviewTest;
