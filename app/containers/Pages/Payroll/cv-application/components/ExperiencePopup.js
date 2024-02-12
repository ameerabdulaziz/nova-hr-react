import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';

function ExperiencePopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedWorkExperience,
    setSelectedWorkExperience,
  } = props;

  const [formInfo, setFormInfo] = useState({
    jobName: '',
    departmentName: '',
    companyName: '',
    fromDate: null,
    toDate: null,
    leaveReason: '',
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedWorkExperience) {
      setFormInfo({
        jobName: selectedWorkExperience?.jobName || '',
        departmentName: selectedWorkExperience?.departmentName || '',
        companyName: selectedWorkExperience?.companyName || '',
        fromDate: selectedWorkExperience?.fromDate || null,
        toDate: selectedWorkExperience?.toDate || null,
        leaveReason: selectedWorkExperience?.leaveReason || '',
        id: selectedWorkExperience?.id || null,
      });
    } else {
      setFormInfo({
        jobName: '',
        departmentName: '',
        companyName: '',
        fromDate: null,
        toDate: null,
        leaveReason: '',
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

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onExperiencePopupClose = () => {
    setIsOpen(false);
    setSelectedWorkExperience(null);
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
          selectedWorkExperience
            ? messages.editExperience
            : messages.addExperience
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              name='jobName'
              value={formInfo.jobName}
              onChange={onInputChange}
              label={intl.formatMessage(messages.jobTitle)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              name='departmentName'
              value={formInfo.departmentName}
              onChange={onInputChange}
              label={intl.formatMessage(messages.department)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              name='companyName'
              value={formInfo.companyName}
              onChange={onInputChange}
              label={intl.formatMessage(messages.workPlace)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              name='leaveReason'
              value={formInfo.leaveReason}
              onChange={onInputChange}
              label={intl.formatMessage(messages.leaveReason)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={intl.formatMessage(messages.startDate)}
                value={formInfo.fromDate}
                onChange={(date) => onDatePickerChange(date, 'fromDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={intl.formatMessage(messages.endDate)}
                value={formInfo.toDate}
                onChange={(date) => onDatePickerChange(date, 'toDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onExperiencePopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ExperiencePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedWorkExperience: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedWorkExperience: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ExperiencePopup);
