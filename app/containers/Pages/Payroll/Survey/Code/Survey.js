import { Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import style from '../../../../../styles/pagesStyle/Survey.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import api from '../api/Survey';
import QuestionScreen from '../components/Survey/QuestionScreen';
import ResultScreen from '../components/Survey/ResultScreen';
import WelcomeScreen from '../components/Survey/WelcomeScreen';

function Survey() {
  const locale = useSelector((state) => state.language.locale);

  const location = useLocation();

  const typeId = location.state?.typeId ?? 0;

  const [isLoading, setIsLoading] = useState(false);

  const [isSurveyEnd, setIsSurveyEnd] = useState(false);
  const [isSurveyStart, setIsSurveyStart] = useState(false);

  const [questionList, setQuestionList] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);

  const [surveyInfo, setSurveyInfo] = useState({
    templateId: null,
    name: '',
    arDescription: '',
    enDescription: '',
    surveyTypeId: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).getByTypeId(1);

      setSurveyInfo({
        ...surveyInfo,
        templateId: response.templateId,
        name: response.name,
        arDescription: response.arDescription,
        enDescription: response.enDescription,
        surveyTypeId: response.surveyTypeId,
      });

      setQuestionList(response.question);

      setQuestionsAnswers(response.question.map(item => ({
        textAnswer: item.textAnswer,
        answerChoiceId: item.answerChoiceId
      })));
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

  const onFormSubmit = (type) => {
    console.log(type);
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

          {isSurveyEnd && isSurveyStart && (
            <ResultScreen
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              onFormSubmit={onFormSubmit}
              setQuestionsAnswers={setQuestionsAnswers}
              onBackToSurveyBtnClick={onBackToSurveyBtnClick}
            />
          )}

          {isSurveyStart && !isSurveyEnd && (
            <QuestionScreen
              surveyInfo={surveyInfo}
              questionsAnswers={questionsAnswers}
              questionList={questionList}
              setQuestionsAnswers={setQuestionsAnswers}
              onFinishSurveyBtnClick={onFinishSurveyBtnClick}
            />
          )}
        </CardContent>
      </Card>
    </PayRollLoader>
  );
}

export default Survey;
