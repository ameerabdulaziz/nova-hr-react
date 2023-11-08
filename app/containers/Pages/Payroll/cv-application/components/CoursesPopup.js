import {
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
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../messages';

function CoursesPopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, selectedCourse
  } = props;

  const [formInfo, setFormInfo] = useState({
    title: '',
    endDate: null,
  });

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onCoursesPopupClose = () => {
    setIsOpen(false);
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
          selectedCourse ? messages.editCourse : messages.addCourse
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              name='title'
              value={formInfo.title}
              onChange={onInputChange}
              label={intl.formatMessage(messages.courseTitle)}
              fullWidth
              variant='outlined'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={intl.formatMessage(messages.endDate)}
                value={formInfo.endDate}
                onChange={(date) => onDatePickerChange(date, 'endDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='outlined' />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCoursesPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CoursesPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedCourse: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CoursesPopup);
