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
import { LocalizationProvider } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import useStyles from '../../../Style';
import messages from '../../messages';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import Payrollmessages from '../../../messages';

function DevelopmentPlanPopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedPlan,
    activityList,
    setSelectedPlan,
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

  const [DateError, setDateError] = useState({});


  useEffect(() => {
    if (isOpen && selectedPlan) {
      setFormInfo({
        areasToImprove: selectedPlan?.areasToImprove || '',
        targetPerformance: selectedPlan?.targetPerformance || '',
        resources: selectedPlan?.resources || '',
        otherDevelopmentActivities:
          selectedPlan?.otherDevelopmentActivities || '',
        developmentActivities: selectedPlan?.developmentActivities || null,
        id: selectedPlan?.id || null,
        dateForCompletion: selectedPlan?.dateForCompletion || null,
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
    setSelectedPlan(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
    }
    else
    {

    onSave(formInfo);

    setIsOpen(false);
    }
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
          selectedPlan ? messages.editDevelopmentPlan : messages.addDevelopmentPlan
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
              autoComplete='off'
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
              autoComplete='off'
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
              autoComplete='off'
            />
          </Grid>

                <Grid item xs={12} md={6}>  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(messages.dateForCompletion)}
                        value={formInfo.dateForCompletion ? dayjs(formInfo.dateForCompletion) : null}
                        className={classes.field}
                        onChange={(date) => {
                          onDatePickerChange(date, 'dateForCompletion')
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`dateForCompletion`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`dateForCompletion`]: false
                            }))
                        }
                      }}
                       slotProps={{
                          textField: {
                              required: true,
                            },
                          }}
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
                autoComplete='off'
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

DevelopmentPlanPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setSelectedPlan: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  activityList: PropTypes.array.isRequired,
  selectedPlan: PropTypes.object,
};

export default injectIntl(DevelopmentPlanPopup);
