/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.Workflow';

export default defineMessages({
  
  noteConfirmation: {
    id: `${scope}.noteConfirmation`,
    defaultMessage: 'noteConfirmation',
  },
  documentName: {
    id: `${scope}.documentName`,
    defaultMessage: 'documentName',
  },
  documentType: {
    id: `${scope}.documentType`,
    defaultMessage: 'documentType',
  },
  approval: {
    id: `${scope}.approval`,
    defaultMessage: 'approval',
  },
  level: {
    id: `${scope}.level`,
    defaultMessage: 'level',
  },
  step  : {
    id: `${scope}.step`,
    defaultMessage: 'step',
  },
  nextStep  : {
    id: `${scope}.nextStep`,
    defaultMessage: 'nextStep',
  },
  actionType: {
    id: `${scope}.actionType`,
    defaultMessage: 'actionType',
  },
  workFlowCreateTitle:{
    id: `${scope}.workFlowCreateTitle`,
    defaultMessage: 'workFlowCreateTitle',
  },
  workFlowUpdateTitle:{
    id: `${scope}.workFlowUpdateTitle`,
    defaultMessage: 'workFlowUpdateTitle',
  }
  
});
