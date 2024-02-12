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
import messages from '../../messages';

function WorkDescriptionPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedDescription,
    setSelectedDescription,
  } = props;

  const [formInfo, setFormInfo] = useState({
    description: '',
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedDescription) {
      setFormInfo({
        description: selectedDescription?.description || '',
        id: selectedDescription?.id || null,
      });
    } else {
      setFormInfo({
        description: '',
        id: null,
      });
    }
  }, [isOpen]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onDescriptionPopupClose = () => {
    setIsOpen(false);
    setSelectedDescription(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onSave(formInfo);

    setIsOpen(false);
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
          selectedDescription
            ? messages.editDescription
            : messages.addDescription
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container mt={0} spacing={1}>
          <Grid item xs={12}>
            <TextField
              name='description'
              value={formInfo.description}
              onChange={onInputChange}
              required
              label={intl.formatMessage(messages.description)}
              fullWidth
              variant='outlined'
              multiline
              rows={1}
              autoComplete='off'
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onDescriptionPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WorkDescriptionPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedDescription: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedDescription: PropTypes.object,
};

export default injectIntl(WorkDescriptionPopup);
