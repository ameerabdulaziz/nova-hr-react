import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import style from '../../../../../../styles/styles.scss';
import { getAutoCompleteValue } from '../../../helpers';
import payrollMessages from '../../../messages';
import PayRollLoader from '../../../Component/PayRollLoader';
import useStyles from '../../../Style';
import messages from '../../messages';

function EmployeeStatusDialog(props) {
  const { classes } = useStyles();
  const {
    intl,
    isOpen,
    existEmployeeInfo,
    onPopupFormSubmit,
    onClose,
    isFetchExistEmployeeData,
    technicalEmployeeList,
    statusPopupList,
    managerialLevelList,
    jobList,
  } = props;

  const locale = useSelector((state) => state.language.locale);

  const [popupState, setPopupState] = useState({
    appFirstStatus: null,
    reason: '',
    techEmpList: [],
    secStaff: null,
    notTechnicalReview: false,
    databnkjob: null,
  });

  const onAutoCompletePopupChange = (value, name) => {
    setPopupState((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      component='form'
      onSubmit={onPopupFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '70vw',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(payrollMessages.Actions)}</DialogTitle>

      <DialogContent sx={{ pt: '10px !important' }}>
        <PayRollLoader isLoading={isFetchExistEmployeeData}>
          {existEmployeeInfo && (
            <Card className={classes.card} sx={{ mt: '0!important' }}>
              <CardContent>
                <Typography>
                  {intl.formatMessage(
                    messages.employeeAlreadyExistInEmployeeList
                  )}
                </Typography>
                <Grid container mt={0} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name='employeeCode'
                      value={existEmployeeInfo.employeeCode}
                      label={intl.formatMessage(messages.employeeCode)}
                      fullWidth
                      variant='outlined'
                      disabled
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='employeeName'
                      value={existEmployeeInfo.employeeName}
                      label={intl.formatMessage(messages.employeeName)}
                      fullWidth
                      variant='outlined'
                      disabled
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='jobName'
                      value={existEmployeeInfo.jobName}
                      label={intl.formatMessage(messages.jobName)}
                      fullWidth
                      variant='outlined'
                      disabled
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='department'
                      value={existEmployeeInfo.department}
                      label={intl.formatMessage(messages.department)}
                      fullWidth
                      variant='outlined'
                      disabled
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='status'
                      value={existEmployeeInfo.status}
                      label={intl.formatMessage(messages.status)}
                      fullWidth
                      variant='outlined'
                      disabled
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          <Grid container spacing={2} mt={existEmployeeInfo ? 2 : undefined}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={statusPopupList}
                value={getAutoCompleteValue(
                  statusPopupList,
                  popupState.appFirstStatus
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompletePopupChange(value, 'appFirstStatus')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.status)}
                  />
                )}
              />
            </Grid>

            {popupState.appFirstStatus === 6 && (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={jobList}
                  value={getAutoCompleteValue(jobList, popupState.databnkjob)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompletePopupChange(value, 'databnkjob')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.jobName)}
                    />
                  )}
                />
              </Grid>
            )}

            {(popupState.appFirstStatus === 1
              || popupState.appFirstStatus === 3) && (
              <>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={managerialLevelList}
                    value={getAutoCompleteValue(
                      managerialLevelList,
                      popupState.secStaff
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompletePopupChange(value, 'secStaff')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.managerialLevel)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    options={technicalEmployeeList}
                    multiple
                    disableCloseOnSelect
                    disabled={popupState.notTechnicalReview}
                    className={`${style.AutocompleteMulSty} ${
                      locale === 'ar' ? style.AutocompleteMulStyAR : null
                    }`}
                    value={popupState.techEmpList}
                    renderOption={(optionsProps, option, { selected }) => (
                      <li {...optionsProps}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                          checkedIcon={<CheckBoxIcon fontSize='small' />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    getOptionLabel={(option) => (option ? option.name : '')}
                    onChange={(_, value) => {
                      setPopupState((prev) => ({
                        ...prev,
                        techEmpList: value,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        disabled={popupState.notTechnicalReview}
                        label={intl.formatMessage(messages.technical)}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={popupState.notTechnicalReview}
                    onChange={(evt) => setPopupState((prevFilters) => ({
                      ...prevFilters,
                      notTechnicalReview: evt.target.checked,
                    }))
                    }
                  />
                }
                label={intl.formatMessage(messages.managerNotReviewCV)}
              />
            </Grid>

            {popupState.appFirstStatus !== 1 && (
              <Grid item xs={12} md={12}>
                <TextField
                  name='reason'
                  onChange={onPopupInputChange}
                  value={popupState.reason}
                  label={intl.formatMessage(messages.reason)}
                  fullWidth
                  variant='outlined'
                  multiline
                  rows={1}
                  required
                  autoComplete='off'
                />
              </Grid>
            )}
          </Grid>
        </PayRollLoader>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage(payrollMessages.cancel)}
        </Button>

        <Button type='submit' variant='contained'>
          <FormattedMessage {...messages.confirm} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmployeeStatusDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onPopupFormSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isFetchExistEmployeeData: PropTypes.bool.isRequired,
  existEmployeeInfo: PropTypes.shape({
    employeeName: PropTypes.string.isRequired,
    employeeCode: PropTypes.number.isRequired,
    jobName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }),
  technicalEmployeeList: PropTypes.array.isRequired,
  managerialLevelList: PropTypes.array.isRequired,
  jobList: PropTypes.array.isRequired,
  statusPopupList: PropTypes.array.isRequired,
};

export default injectIntl(EmployeeStatusDialog);
