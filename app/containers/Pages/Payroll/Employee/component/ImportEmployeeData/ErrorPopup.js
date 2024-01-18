import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function ErrorPopup(props) {
  const {
    intl, isOpen, setIsOpen, errors, setErrors
  } = props;

  useEffect(() => {
    if (!isOpen) {
      setErrors([]);
    }
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '800px',
          maxWidth: '800px',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(messages.fileErrors)} - {errors.length}</DialogTitle>

      <DialogContent>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {errors.map((error) => (
            <Alert key={error} severity='error'>
              {error}
            </Alert>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopup}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default injectIntl(ErrorPopup);
