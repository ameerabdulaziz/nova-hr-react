import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function EmployeeExistFeedback(props) {
  const {
    intl, isOpen, onConfirm, onClose
  } = props;

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '500px',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(messages.actions)}</DialogTitle>

      <DialogContent>
        <Typography>
          {intl.formatMessage(
            messages.employeeAlreadyExistWhatActionYouWant
          )}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage(payrollMessages.cancel)}
        </Button>

        <Button onClick={onConfirm} variant='contained'>
          {intl.formatMessage(messages.fillInputs)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmployeeExistFeedback.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default injectIntl(EmployeeExistFeedback);
