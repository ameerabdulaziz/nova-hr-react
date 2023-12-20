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

function WorkKnowledgePopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedKnowledge,
    setSelectedKnowledge,
  } = props;

  const [formInfo, setFormInfo] = useState({
    description: '',
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedKnowledge) {
      setFormInfo({
        description: selectedKnowledge?.description || '',
        id: selectedKnowledge?.id || null,
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

  const onKnowledgePopupClose = () => {
    setIsOpen(false);
    setSelectedKnowledge(null);
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
          selectedKnowledge
            ? messages.editKnowledge
            : messages.addKnowledge
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
              label={intl.formatMessage(messages.knowledge)}
              fullWidth
              variant='outlined'
              multiline
              rows={1}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onKnowledgePopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WorkKnowledgePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedKnowledge: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedKnowledge: PropTypes.object,
};

export default injectIntl(WorkKnowledgePopup);
