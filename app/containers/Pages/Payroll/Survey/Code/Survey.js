import { Card, CardContent } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import style from '../../../../../styles/pagesStyle/Survey.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import api from '../api/SurveyData';
import QuestionScreen from '../components/Survey/QuestionScreen';
import ResultScreen from '../components/Survey/ResultScreen';
import WelcomeScreen from '../components/Survey/WelcomeScreen';

function Survey() {
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();

  const typeId = location.state?.typeId ?? 0;
  const trainingId = location.state?.trainingId ?? 0;
  const trainingEmpId = location.state?.trainingEmpId ?? 0;
  const evaluatedEmployeeId = location.state?.evaluatedEmployeeId ?? null;

  const [isLoading, setIsLoading] = useState(false);

  const [isSurveyEnd, setIsSurveyEnd] = useState(false);
  const [isSurveyStart, setIsSurveyStart] = useState(false);
  const [isSurveyDone, setIsSurveyDone] = useState(false);

  const [questionList, setQuestionList] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  const [surveyInfo, setSurveyInfo] = useState({
    id: 0,
    templateId: null,
    name: '',
    surveyTypeId: null,
    showStyle: null,
    arDescription: '',
    enDescription: '',
  });

  const fetchNeededData = async () => {
    if (typeId === 0 && trainingId === 0) {
      return;
    }

    setIsLoading(true);

    const params = {
      trainingId,
      evaluatedEmpid: evaluatedEmployeeId,
    };

    try {
      const response = await api(locale).getByTypeId(typeId, params);

      if (response) {
        setSurveyInfo(prev => ({
          ...prev,
          id: response.id,
          templateId: response.templateId,
          name: response.name,
          surveyTypeId: response.surveyTypeId,
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

  const onFinishSurveyBtnClick = () => {
    setIsSurveyEnd(true);
  };

  const onBackToSurveyBtnClick = () => {
    setIsSurveyEnd(false);
    setIsSurveyStart(true);
  };

  const onFormSubmit = async (type) => {
    setIsLoading(true);

    try {
      const answers = questionsAnswers.map(item => ({
        questionId: item.questionId,
        surveyHeaderId: surveyInfo.id,
        comment: '',
        textAnswer: item.textAnswer,
        choiceId: item.answerChoiceId,
      }));

      const body = {
        id: surveyInfo.id,
        isDone: type === 'submit',
        templateId: surveyInfo.templateId,
        trainingId,
        evaluatedEmployeeId,
        surveyDetails: answers,
      };

      await api(locale).save(trainingEmpId, body);

      setIsSurveyDone(true);

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
          {!isSurveyStart && !isSurveyEnd && (
            <WelcomeScreen
              setIsSurveyStart={setIsSurveyStart}
              surveyInfo={surveyInfo}
            />
          )}

          {isSurveyEnd && isSurveyStart && surveyInfo.templateId !== null && (
            <ResultScreen
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              isSurveyDone={isSurveyDone}
              onFormSubmit={onFormSubmit}
              setQuestionsAnswers={setQuestionsAnswers}
              onBackToSurveyBtnClick={onBackToSurveyBtnClick}
            />
          )}

          {isSurveyStart && !isSurveyEnd && surveyInfo.templateId !== null && (
            <QuestionScreen
              surveyInfo={surveyInfo}
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              setQuestionsAnswers={setQuestionsAnswers}
              onFinish={onFinishSurveyBtnClick}
            />
          )}
        </CardContent>
      </Card>
    </PayRollLoader>
  );
}

export default Survey;
