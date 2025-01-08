import { createContext } from 'react';

const Form6InsuranceContext = createContext({
  insuranceOrganization: null,
  insuranceOffice: null,
});

Form6InsuranceContext.displayName = 'Form 6 Insurance Context';

export { Form6InsuranceContext };
