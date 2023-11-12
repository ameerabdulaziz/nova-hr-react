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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';

function ExperiencePopup(props) {
  const {
    intl,
    jobList,
    departmentList,
    isOpen,
    setIsOpen,
    onSave,
    selectedWorkExperience,
    setSelectedWorkExperience,
  } = props;

  const [formInfo, setFormInfo] = useState({
    jobId: null,
    departmentId: null,
    companyName: '',
    fromDate: null,
    toDate: null,
    leaveReason: '',
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedWorkExperience) {
      setFormInfo({
        jobId: selectedWorkExperience?.jobId || null,
        departmentId: selectedWorkExperience?.departmentId || null,
        companyName: selectedWorkExperience?.companyName || '',
        fromDate: selectedWorkExperience?.fromDate || null,
        toDate: selectedWorkExperience?.toDate || null,
        leaveReason: selectedWorkExperience?.leaveReason || '',
        id: selectedWorkExperience?.id || null,
      });
    } else {
      setFormInfo({
        jobId: null,
        departmentId: null,
        companyName: '',
        fromDate: null,
        toDate: null,
        leaveReason: '',
        id: null,
      });
    }
  }, [isOpen]);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

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
            <Autocomplete
              options={jobList}
              value={jobList.find((item) => item.id === formInfo.jobId) ?? null}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => onAutoCompleteChange(value, 'jobId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.jobTitle)}
                />
              )}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Autocomplete
              options={departmentList}
              value={
                departmentList.find(
                  (item) => item.id === formInfo.departmentId
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => onAutoCompleteChange(value, 'departmentId')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.department)}
                />
              )}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              name='companyName'
              value={formInfo.companyName}
              onChange={onInputChange}
              label={intl.formatMessage(messages.workPlace)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              name='leaveReason'
              value={formInfo.leaveReason}
              onChange={onInputChange}
              label={intl.formatMessage(messages.leaveReason)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={intl.formatMessage(messages.startDate)}
                value={formInfo.fromDate}
                onChange={(date) => onDatePickerChange(date, 'fromDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='outlined' />
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
                  <TextField {...params} fullWidth variant='outlined' />
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
  jobList: PropTypes.array.isRequired,
  departmentList: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedWorkExperience: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedWorkExperience: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ExperiencePopup);
