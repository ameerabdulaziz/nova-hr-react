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
import messages from '../../messages';

function EmployeeCreationFeedback(props) {
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
            messages.employeeCreatedSuccessfullyWhatActionYouWant
          )}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage(messages.continueAddingEmployee)}
        </Button>

        <Button onClick={onConfirm} variant='contained'>
          {intl.formatMessage(messages.backToEmployeeList)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmployeeCreationFeedback.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default injectIntl(EmployeeCreationFeedback);
