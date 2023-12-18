import {
  Autocomplete,
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

function WorkSkillPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedSkill,
    levelList,
    setSelectedSkill,
  } = props;

  const [formInfo, setFormInfo] = useState({
    description: '',
    levelId: null,
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedSkill) {
      setFormInfo({
        description: selectedSkill?.description || '',
        levelId: selectedSkill?.levelId || null,
        id: selectedSkill?.id || null,
      });
    } else {
      setFormInfo({
        description: '',
        id: null,
        levelId: null,
      });
    }
  }, [isOpen]);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onSkillPopupClose = () => {
    setIsOpen(false);
    setSelectedSkill(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onSave(formInfo);

    setIsOpen(false);
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
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
          selectedSkill ? messages.editSkill : messages.addSkill
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container mt={0} spacing={1}>
          <Grid item xs={12} lg={6}>
            <TextField
              name='description'
              value={formInfo.description}
              onChange={onInputChange}
              required
              label={intl.formatMessage(messages.skill)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Autocomplete
              options={levelList}
              value={
                levelList.find((item) => item.id === formInfo.levelId) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'levelId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.level)}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onSkillPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

WorkSkillPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedSkill: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  levelList: PropTypes.array.isRequired,
  selectedSkill: PropTypes.object,
};

export default injectIntl(WorkSkillPopup);
