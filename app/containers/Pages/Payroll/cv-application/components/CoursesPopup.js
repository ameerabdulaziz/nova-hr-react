import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../messages';
import messages from '../messages';

function CoursesPopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, selectedCourse, setSelectedCourse
  } = props;

  const [dateError, setDateError] = useState({});
  const [formInfo, setFormInfo] = useState({
    courseName: '',
    endDate: null,
    id: null,
  });

  useEffect(() => {
    if (isOpen && selectedCourse) {
      setFormInfo({
        courseName: selectedCourse?.courseName || '',
        endDate: selectedCourse?.endDate || null,
        id: selectedCourse?.id || null,
      });
    } else {
      setFormInfo({
        courseName: '',
        endDate: null,
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

  const onCoursesPopupClose = () => {
    setIsOpen(false);
    setSelectedCourse(null);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

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
              name='courseName'
              value={formInfo.courseName}
              onChange={onInputChange}
              label={intl.formatMessage(messages.courseTitle)}
              fullWidth
              required
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(messages.endDate)}
                value={formInfo.endDate ? dayjs(formInfo.endDate) : null}
                sx={{ width: '100%' }}
                onChange={(date) => onDatePickerChange(date, 'endDate')}
                onError={(error) => {
                  setDateError((prevState) => ({
                    ...prevState,
                    endDate: error !== null,
                  }));
                }}
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
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
  setSelectedCourse: PropTypes.func.isRequired,
  selectedCourse: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CoursesPopup);
