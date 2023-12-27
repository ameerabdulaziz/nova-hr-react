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
import useStyles from '../../../Style';
import messages from '../../messages';

function EmploymentPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedEmployee,
    activityList,
    setSelectedEmployee,
  } = props;

  const { classes } = useStyles();

  const [formInfo, setFormInfo] = useState({
    developmentActivities: null,
    id: null,
    areasToImprove: '',
    targetPerformance: '',
    otherDevelopmentActivities: '',
    resources: '',
    dateForCompletion: null,
  });

  useEffect(() => {
    if (isOpen && selectedEmployee) {
      setFormInfo({
        areasToImprove: selectedEmployee?.areasToImprove || '',
        targetPerformance: selectedEmployee?.targetPerformance || '',
        resources: selectedEmployee?.resources || '',
        otherDevelopmentActivities:
          selectedEmployee?.otherDevelopmentActivities || '',
        developmentActivities: selectedEmployee?.developmentActivities || null,
        id: selectedEmployee?.id || null,
        dateForCompletion: selectedEmployee?.dateForCompletion || null,
      });
    } else {
      setFormInfo({
        id: null,
        developmentActivities: null,
        areasToImprove: '',
        targetPerformance: '',
        otherDevelopmentActivities: '',
        dateForCompletion: null,
        resources: '',
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
    setSelectedEmployee(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    onSave(formInfo);

    setIsOpen(false);
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
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
          width: '700px',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(
          selectedEmployee ? messages.editEmployee : messages.addEmployee
        )}
      </DialogTitle>

      <DialogContent>
        <Grid container mt={0} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='areasToImprove'
              value={formInfo.areasToImprove}
              onChange={onInputChange}
              required
              label={intl.formatMessage(messages.areaToImprove)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name='targetPerformance'
              value={formInfo.targetPerformance}
              onChange={onInputChange}
              required
              label={intl.formatMessage(messages.targetOfPerformance)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name='resources'
              value={formInfo.resources}
              onChange={onInputChange}
              required
              label={intl.formatMessage(messages.resources)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={intl.formatMessage(messages.dateForCompletion)}
                value={formInfo.dateForCompletion}
                onChange={(date) => onDatePickerChange(date, 'dateForCompletion')
                }
                className={classes.field}
                renderInput={(params) => (
                  <TextField required {...params} variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={activityList}
              value={
                activityList.find(
                  (item) => item.id === formInfo.developmentActivities
                ) ?? null
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : '')}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(_, value) => onAutoCompleteChange(value, 'developmentActivities')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={intl.formatMessage(messages.developmentActivity)}
                />
              )}
            />
          </Grid>

          {formInfo.developmentActivities === 5 && (
            <Grid item xs={12} md={6}>
              <TextField
                name='otherDevelopmentActivities'
                value={formInfo.otherDevelopmentActivities}
                onChange={onInputChange}
                required
                label={intl.formatMessage(messages.otherPleaseSpecify)}
                fullWidth
                variant='outlined'
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmploymentPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedEmployee: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  activityList: PropTypes.array.isRequired,
  selectedEmployee: PropTypes.object,
};

export default injectIntl(EmploymentPopup);
