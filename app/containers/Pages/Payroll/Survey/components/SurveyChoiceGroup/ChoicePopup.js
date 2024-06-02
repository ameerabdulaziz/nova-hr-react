import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function ChoicePopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, selectedChoice, setSelectedChoice
  } = props;

  const [formInfo, setFormInfo] = useState({
    id: null,
    arName: '',
    enName: '',
  });

  useEffect(() => {
    if (isOpen && selectedChoice) {
      setFormInfo({
        arName: selectedChoice?.arName || '',
        enName: selectedChoice?.enName || '',
        id: selectedChoice?.id || null,
      });
    } else {
      setFormInfo({
        id: null,
        arName: '',
        enName: '',
      });
    }
  }, [isOpen]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onPopupClose = () => {
    setIsOpen(false);
    setSelectedChoice(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    onSave(formInfo);
  };

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '500px',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(
          selectedChoice ? messages.editChoice : messages.addChoice
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container mt={0} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='enName'
              value={formInfo.enName}
              onChange={onInputChange}
              required
              label={intl.formatMessage(payrollMessages.enName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name='arName'
              value={formInfo.arName}
              onChange={onInputChange}
              required
              label={intl.formatMessage(payrollMessages.arName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(payrollMessages.close)}
        </Button>

        <Button type='submit' variant='contained'>
          {intl.formatMessage(payrollMessages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChoicePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedChoice: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedChoice: PropTypes.object,
};

export default injectIntl(ChoicePopup);
