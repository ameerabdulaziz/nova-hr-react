import { Help } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import EmployeeData from '../../Component/EmployeeData';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import Payrollmessages from '../../messages';
import messages from '../messages';

function LeaveTrxCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const history = useHistory();

  const [vacationsList, setVacationsList] = useState([]);
  const [alternativeEmployeeList, setAlternativeEmployeeList] = useState([]);

  const [processing, setprocessing] = useState(false);
  const [formInfo, setFormInfo] = useState({
    employeeId: '',
    employeeName: '',
    hiringDate: null,
    job: '',
    organization: '',

    date: null,
    FromDate: null,
    ToDate: null,
    daysCount: '',
    dayDeducedBy: '',
    telNumber: '',
    attachment: null,
    leaveReason: '',
    address: '',
    notes: '',
    exemptEntryRec: false,
    exemptLeaveRec: false,
    AltEmployeeId: '',
    vacation: {},
  });

  const fetchNeededData = async () => {
    try {
      const vacationResponse = await GeneralListApis(locale).GetVacList();
      setVacationsList(vacationResponse);
    } catch (err) {
      toast.error(JSON.stringify(err.response.data));
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    if (formInfo.ToDate && formInfo.FromDate) {
      const obj = {
        ToDate: formInfo.ToDate,
        FromDate: formInfo.FromDate,
        daysCount: formInfo.daysCount,
      };

      if (formInfo.vacation?.id === 5) {
        obj.ToDate = formInfo.FromDate;
        obj.daysCount = 0.5;
      } else {
        const dateDiffTo = new Date(formInfo.ToDate).getTime();
        const dateDiffFrom = new Date(formInfo.FromDate).getTime();

        const timeDiff = dateDiffTo - dateDiffFrom;

        const daysCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        obj.daysCount = timeDiff > 0 ? daysCount + 1 : 0;
      }

      setFormInfo((prev) => ({ ...prev, ...obj }));
    }
  }, [formInfo.ToDate, formInfo.FromDate]);

  const formateDate = (date) => format(new Date(date), 'yyyy-MM-dd');

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    let errors = {};

    const formData = { ...formInfo };

    if (formInfo.vacation.id !== 5) {
      if (formInfo.FromDate && formInfo.ToDate) {
        const isFromDateLessThanToDate = new Date(formInfo.FromDate) < new Date(formInfo.ToDate);

        if (isFromDateLessThanToDate) {
          const { date, ...reset } = errors;

          errors = reset;
        } else {
          errors.date = 'FromDate must be less than ToDate';
        }
      }
    }

    if (formInfo.vacation.id === 5) {
      if (formInfo.attachment) {
        const { attachment, ...reset } = errors;

        errors = reset;
      } else {
        errors.attachment = 'Attachment Is Required';
      }
    }

    if (Object.keys(errors).length === 0) {
      formData.date = formateDate(formData.date);
      formData.FromDate = formateDate(formData.FromDate);
      formData.ToDate = formateDate(formData.ToDate);
      formData.vacationId = formData.vacation?.id;

      console.log(formData);
    } else {
      Object.keys(errors).forEach((key) => {
        toast.error(JSON.stringify(errors[key]));
      });
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/vac/LeaveTrx');
  };

  const onVacationChange = (_, value) => {
    if (value) {
      if (value.id === 5) {
        setFormInfo((prev) => ({
          ...prev,
          vacation: value,
          ToDate: prev.FromDate,
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          vacation: value,
          daysCount: '',
        }));
      }
    } else {
      setFormInfo((prev) => ({
        ...prev,
        vacation: {},
      }));
    }
  };

  return (
    <>
      <PapperBlock
        whiteBg
        icon='border_color'
        desc=''
        title={
          id === 0
            ? intl.formatMessage(messages.leaveTrxCreateTitle)
            : intl.formatMessage(messages.leaveTrxUpdateTitle)
        }
      >
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.date)}
                          value={formInfo.date}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant='outlined' />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        spacing={1}
                      >
                        <Autocomplete
                          options={vacationsList}
                          getOptionLabel={(option) => option.name}
                          onChange={onVacationChange}
                          sx={{
                            '.MuiInputBase-root': {
                              paddingTop: '8px',
                              paddingBottom: '8px',
                            },
                            width: '100%',
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant='outlined'
                              {...params}
                              name='vacation'
                              label={intl.formatMessage(messages.vacationType)}
                            />
                          )}
                        />
                        <IconButton>
                          <Help />
                        </IconButton>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Autocomplete
                        options={alternativeEmployeeList}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            AltEmployeeId: value.id,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant='outlined'
                            {...params}
                            label={intl.formatMessage(
                              messages.alternativeEmployee
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <div>
                        <input
                          accept='image/*, .pdf, .doc, .docx'
                          id='attachment-button-file'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={(evt) => setFormInfo((prev) => ({
                            ...prev,
                            attachment: evt.target.files?.[0],
                          }))
                          }
                        />
                        <label htmlFor='attachment-button-file'>
                          <Button variant='contained' component='span'>
                            <FormattedMessage {...messages.uploadAttachment} />
                          </Button>
                        </label>
                      </div>
                    </Grid>

                    <Grid item md={3}>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={(evt) => setFormInfo((prev) => ({
                          ...prev,
                          exemptLeaveRec: evt.target.checked,
                        }))
                        }
                        checked={formInfo.exemptLeaveRec}
                        label={intl.formatMessage(messages.exemptLeaveRec)}
                      />
                    </Grid>

                    <Grid item md={3}>
                      <FormControlLabel
                        control={<Checkbox />}
                        onChange={(evt) => setFormInfo((prev) => ({
                          ...prev,
                          exemptEntryRec: evt.target.checked,
                        }))
                        }
                        checked={formInfo.exemptEntryRec}
                        label={intl.formatMessage(messages.exemptEntryRec)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <EmployeeData data={formInfo} setdata={setFormInfo} />
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(messages.fromdate)}
                          value={formInfo.FromDate}
                          maxDate={
                            formInfo.vacation.id !== 5 ? formInfo.ToDate : null
                          }
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              FromDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant='outlined' required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(messages.todate)}
                          value={formInfo.ToDate}
                          disabled={formInfo.vacation.id === 5}
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              ToDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant='outlined' required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='daysCount'
                        value={formInfo.daysCount}
                        disabled
                        label={intl.formatMessage(messages.daysCount)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='dayDeducedBy'
                        value={formInfo.dayDeducedBy}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.dayDeducedBy)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems='flex-start'
                    direction='row'
                  >
                    <Grid item xs={12} md={3}>
                      <TextField
                        name='telNumber'
                        value={formInfo.telNumber}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.telNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='address'
                        value={formInfo.address}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='leaveReason'
                        value={formInfo.leaveReason}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.leaveReason)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        name='notes'
                        value={formInfo.notes}
                        onChange={onInputChange}
                        label={intl.formatMessage(Payrollmessages.notes)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={1}>
              <SaveButton Id={id} processing={processing} />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant='contained'
                size='medium'
                color='primary'
                onClick={onCancelBtnClick}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </>
  );
}

export default injectIntl(LeaveTrxCreate);
