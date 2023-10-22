import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import VacationBalancePopup from '../../Component/VacationBalance';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import Payrollmessages from '../../messages';
import api from '../api/LeaveTrxData';
import messages from '../messages';

function LeaveTrxCreate(props) {
  const { intl } = props;
  const validPDFTypes = ['application/pdf', '.pdf', 'pdf'];
  const validImageTypes = [
    'image/jpg',
    'jpg',
    'image/jpeg',
    'jpeg',
    'image/png',
    'png',
    'image/apng',
    'apng',
    'image/webp',
    'webp',
    'image/svg+xml',
    'svg+xml'
  ];
  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const history = useHistory();

  const [vacationsList, setVacationsList] = useState([]);
  const [alternativeEmployeeList, setAlternativeEmployeeList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: '',
    employeeName: '',
    hiringDate: null,
    job: '',
    organization: '',
    HasAlternativeEmp: false,

    vacDayChange: null,
    vacDocPath: null,
    replaceDate: null,
    alternativeTask: null,

    trxDate: null,
    fromDate: null,
    toDate: null,
    daysCount: '',
    dayDeducedBy: '',
    tel: '',
    attachment: null,
    vacReson: '',
    address: '',
    notes: '',
    exemptEntryRec: false,
    exemptLeaveRec: false,
    alternativeStaff: null,
    vacCode: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const vacationResponse = await api(locale).GetVacationType();
      setVacationsList(vacationResponse);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo({
          ...dataApi,
          vacation: {
            id: dataApi.vacCode,
            name: dataApi.vacationName
          }
        });
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const GetAlternativeEmployee = async () => {
    if (formInfo.employeeId) {
      try {
        setIsLoading(true);
        const alternativeEmployeeResponse = await GeneralListApis(
          locale
        ).GetAlternativeEmployeeList(formInfo.employeeId);
        setAlternativeEmployeeList(alternativeEmployeeResponse);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateDaysCount = () => {
    if (formInfo.toDate && formInfo.fromDate) {
      const obj = {
        toDate: formInfo.toDate,
        fromDate: formInfo.fromDate,
        daysCount: formInfo.daysCount,
      };

      if (formInfo.vacCode === 5) {
        obj.toDate = formInfo.fromDate;
        obj.daysCount = 0.5;
      } else {
        const dateDiffTo = new Date(formInfo.toDate).getTime();
        const dateDiffFrom = new Date(formInfo.fromDate).getTime();

        const timeDiff = dateDiffTo - dateDiffFrom;

        const daysCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        obj.daysCount = timeDiff >= 0 ? daysCount + 1 : 0;
      }

      setFormInfo((prev) => ({ ...prev, ...obj }));
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    GetAlternativeEmployee();
  }, [formInfo.employeeId]);

  useEffect(() => {
    calculateDaysCount();
  }, [formInfo.toDate, formInfo.fromDate]);

  const formateDate = (date) => format(new Date(date), 'yyyy-MM-dd');

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    let errors = {};

    const formData = { ...formInfo };

    if (formInfo.vacCode !== 5) {
      if (formInfo.fromDate && formInfo.toDate) {
        const isFromDateLessThanToDate = new Date(formInfo.fromDate) <= new Date(formInfo.toDate);

        if (isFromDateLessThanToDate) {
          const { date, ...reset } = errors;

          errors = reset;
        } else {
          errors.date = 'fromDate must be less than toDate';
        }
      }
    }

    if (formInfo.vacCode === 5) {
      if (formInfo.attachment) {
        const { attachment, ...reset } = errors;

        errors = reset;
      } else {
        errors.attachment = 'Attachment Is Required';
      }
    }

    if (Object.keys(errors).length === 0) {
      formData.trxDate = formateDate(formData.trxDate);
      formData.fromDate = formateDate(formData.fromDate);
      formData.toDate = formateDate(formData.toDate);

      setProcessing(true);
      setIsLoading(true);

      try {
        const {
          hiringDate, employeeName, job, organization, dayDeducedBy, ...reset
        } = formData;
        await api(locale).save(reset);

        toast.success(notif.saved);
        history.push('/app/Pages/vac/LeaveTrx');
      } catch (error) {
        //
      } finally {
        setProcessing(false);
        setIsLoading(false);
      }
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
          vacCode: value.id,
          toDate: prev.fromDate,
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          vacCode: value.id,
          toDate: null,
          daysCount: '',
        }));
      }
    } else {
      setFormInfo((prev) => ({
        ...prev,
        vacCode: null,
        toDate: null,
        daysCount: '',
      }));
    }
  };

  const onAttachmentPopupClose = () => {
    setIsAttachmentPopupOpen(false);
  };

  const onAttachmentPopupBtnClick = () => {
    setIsAttachmentPopupOpen(true);
  };

  const getAttachmentType = () => {
    // documentUrl
    if (formInfo.attachment && typeof formInfo.attachment === 'string') {
      return formInfo.attachment?.split('.').pop().toLowerCase().trim();
    }

    if (formInfo.attachment instanceof File) {
      return formInfo.attachment.type;
    }

    return 'pdf';
  };

  return (
    <PayRollLoader isLoading={isLoading}>
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
                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(Payrollmessages.date)}
                          value={formInfo.trxDate}
                          onChange={(date) => {
                            setFormInfo((prevFilters) => ({
                              ...prevFilters,
                              trxDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField {...params} variant='outlined' required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        spacing={1}
                      >
                        <Autocomplete
                          value={
                            vacationsList.find(
                              (vac) => vac.id === formInfo.vacCode
                            ) ?? null
                          }
                          options={vacationsList}
                          getOptionLabel={(option) => option.name ?? ''}
                          isOptionEqualToValue={(option, value) => option.id === value.id
                          }
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
                              required
                              {...params}
                              name='vacation'
                              label={intl.formatMessage(messages.vacationType)}
                            />
                          )}
                        />

                        <VacationBalancePopup employeeId={formInfo.employeeId} />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        options={alternativeEmployeeList}
                        value={
                          alternativeEmployeeList.find(
                            (alt) => alt.id === formInfo.alternativeStaff
                          ) ?? null
                        }
                        isOptionEqualToValue={(option, value) => option.id === value.id
                        }
                        getOptionLabel={(option) => (option ? option.name : '')}
                        onChange={(_, value) => {
                          setFormInfo((prev) => ({
                            ...prev,
                            alternativeStaff: value !== null ? value.id : null,
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant='outlined'
                            required={formInfo.HasAlternativeEmp}
                            {...params}
                            label={intl.formatMessage(
                              messages.alternativeEmployee
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Stack direction='row' alignItems='center' gap={3} >
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

                        {formInfo.attachment && <Button variant='outlined' component='span' onClick={onAttachmentPopupBtnClick} >
                          <FormattedMessage {...Payrollmessages.preview} />
                        </Button>
                        }
                      </Stack>

                      <FileViewerPopup
                        handleClose={onAttachmentPopupClose}
                        open={isAttachmentPopupOpen}
                        uploadedFileType={getAttachmentType()}
                        uploadedFile={formInfo.attachment}
                        validImageTypes={validImageTypes}
                        validPDFTypes={validPDFTypes}
                      />
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
                          value={formInfo.fromDate}
                          maxDate={
                            formInfo.vacCode !== 5 ? formInfo.toDate : null
                          }
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              fromDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label={intl.formatMessage(messages.todate)}
                          value={formInfo.toDate}
                          disabled={formInfo.vacCode === 5}
                          onChange={(date) => {
                            setFormInfo((prev) => ({
                              ...prev,
                              toDate: date,
                            }));
                          }}
                          className={classes.field}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='outlined'
                              required
                            />
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
                        disabled
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
                    <Grid item xs={12} md={6}>
                      <TextField
                        name='tel'
                        value={formInfo.tel}
                        onChange={onNumericInputChange}
                        label={intl.formatMessage(messages.telNumber)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='address'
                        value={formInfo.address}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.address)}
                        className={classes.field}
                        variant='outlined'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='vacReson'
                        value={formInfo.vacReson}
                        onChange={onInputChange}
                        label={intl.formatMessage(messages.leaveReason)}
                        className={classes.field}
                        variant='outlined'
                        multiline
                        rows={3}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        name='notes'
                        value={formInfo.notes}
                        onChange={onInputChange}
                        label={intl.formatMessage(Payrollmessages.notes)}
                        className={classes.field}
                        variant='outlined'
                        multiline
                        rows={3}
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
    </PayRollLoader>
  );
}

export default injectIntl(LeaveTrxCreate);
