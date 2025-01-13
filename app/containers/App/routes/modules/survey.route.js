import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const SurveyChoiceGroup = loadable(
  () => import('../../../Pages/Payroll/Survey/Code/SurveyChoiceGroup'),
  {
    fallback: <Loading />,
  }
);

const SurveyChoiceGroupCreate = loadable(
  () => import('../../../Pages/Payroll/Survey/Code/SurveyChoiceGroupCreate'),
  {
    fallback: <Loading />,
  }
);

const SurveyTemplate = loadable(
  () => import('../../../Pages/Payroll/Survey/Code/SurveyTemplate'),
  {
    fallback: <Loading />,
  }
);

const SurveyTemplateCreate = loadable(
  () => import('../../../Pages/Payroll/Survey/Code/SurveyTemplateCreate'),
  {
    fallback: <Loading />,
  }
);

const Survey = loadable(
  () => import('../../../Pages/Payroll/Survey/Code/Survey'),
  {
    fallback: <Loading />,
  }
);

const survey = {
  Survey,
  SurveyChoiceGroup,
  SurveyChoiceGroupCreate,
  SurveyTemplate,
  SurveyTemplateCreate,
};

export default survey;
