import DevicesIcon from '@mui/icons-material/Devices';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import style from '../../../../../../styles/pagesStyle/ResignReqTrxSty.scss';
import styles from "../../../../../../styles/styles.scss";
import PayRollLoader from '../../../Component/PayRollLoader';
import useStyles from '../../../Style';
import GeneralListApis from '../../../api/GeneralListApis';
import { formateDate, getFormData } from '../../../helpers';
import payrollMessages from '../../../messages';
import api from '../../api/ResignReqTrxData';
import messages from '../../messages';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SITEMAP from '../../../../../App/routes/sitemap';

function ResignReqTrxCreate(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');
  const history = useHistory();
  const location = useLocation();
  const id = location.state?.id ?? 0;
  const locale = useSelector((state) => state.language.locale);
  const { classes } = useStyles();
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userInfo, setUserInfo] = useState({
    id: '',
    employeeCode: '',
    name: '',
    address: null,
    hiringDate: '',
    workEmail: '',
    telPhone: '',
    mobile: '',
    jobName: '',
    organizationName: '',
    photo: '',
    reportToName: '',
    socialStatusName: '',
    employeeJobKpi: [],
    jobDescription: []
  });




  const [formInfo, setFormInfo] = useState({
    id,
    date: new Date(),
    resignReasonId: null,
    notes: '',
    lworkingDay: new Date(),
    mob: '',
    telNumber: '',
    emailAddress: '',
    employeeAddress: '',
    employeeCustodyList: [],
  });

  console.log(userInfo);

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
    'svg+xml',
  ];

  const [resignReasonsList, setResignReasonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateError, setDateError] = useState({});

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);

      const formData = {
        ...formInfo,
        date: formateDate(formInfo.date),
        lworkingDay: formateDate(formInfo.lworkingDay),
        employeeCustodyList: null,
        employeeId: userInfo.id,
        uploadedFile: uploadedFile,
      };

      await api(locale).save(getFormData(formData));

      toast.success(notif.saved);
      history.push(SITEMAP.humanResources.ResignReqTrx.route);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  function oncancel() {
    history.push(SITEMAP.humanResources.ResignReqTrx.route);
  }

  async function fetchData() {
    setIsLoading(true);

    try {
      const reason = await GeneralListApis(locale).GetResignReasonList();
      setResignReasonsList(reason);

      const info = await api(locale).getUserInfo();
      setUserInfo(info);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        setFormInfo(dataApi);
        setUserInfo(dataApi)
      } else {
        setFormInfo((prev) => ({
          ...prev,
          employeeAddress: info.address ?? '',
          mob: info.mobile ?? '',
        }));
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;



  const uploadFileFun = (e) => {
    // check if uploaded file is larger than 1MB
    if (e.target.files[0]) {
      if (e.target.files[0].size < 10000000) {
        if (validImageTypes.includes(e.target.files[0].type)) {
          setUploadedFileType(e.target.files[0].type);
        } else if (validPDFTypes.includes(e.target.files[0].type)) {
          setUploadedFileType(e.target.files[0].type);
        }

        setUploadedFile(e.target.files[0]);
      } else {        
        toast.error(intl.formatMessage(payrollMessages.uploadFileErrorMes));
      }
    }
  };


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} mt={0} >
            <Grid item xs={12} md={6} lg={4} xl={2.5}>
              <TextField
                value={userInfo.name}
                label={intl.formatMessage(messages.employeeName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
                sx={{
                  "& .mui-style-ltr-d5rqto-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000", // Label color when focused in shrink mode
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={2.5} >
              <TextField
                value={userInfo.jobName}
                label={intl.formatMessage(messages.job)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
                sx={{
                  "& .mui-style-ltr-d5rqto-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000", // Label color when focused in shrink mode
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={2.5}>
              <TextField
                value={userInfo.organizationName}
                label={intl.formatMessage(messages.department)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
                sx={{
                  "& .mui-style-ltr-d5rqto-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000", // Label color when focused in shrink mode
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={3} xl={1.5}>
              <TextField
                value={formateDate(userInfo.hiringDate)}
                label={intl.formatMessage(messages.hiringDate)}
                fullWidth
                variant='outlined'
                autoComplete='off'
                disabled
                sx={{
                  "& .mui-style-ltr-d5rqto-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000", // Label color when focused in shrink mode
                  },
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={3} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.resignationDate)}
                  value={formInfo.date ? dayjs(formInfo.date) : null}
                  className={classes.field}
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        date: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        date: false,
                      }));
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

            <Grid item xs={6} md={3} lg={3} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className={classes.field}
                  label={intl.formatMessage(messages.lastWorkingDay)}
                  value={
                    formInfo.lworkingDay ? dayjs(formInfo.lworkingDay) : null
                  }
                  onChange={(date) => {
                    setFormInfo((prevFilters) => ({
                      ...prevFilters,
                      lworkingDay: date,
                    }));
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        lworkingDay: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        lworkingDay: false,
                      }));
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

            <Grid item xs={12} md={4.5} lg={3} xl={2.5}>
              <TextField
                name='mob'
                value={formInfo.mob}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.mobileNumber)}
                fullWidth
                variant='outlined'
                required
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4.5} lg={3} xl={2.5}>
              <TextField
                name='telNumber'
                value={userInfo.telPhone}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.homeNumber)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} xl={2.5}>
              <TextField
                name='emailAddress'
                type='email'
                value={userInfo.workEmail}
                onChange={onInputChange}
                label={intl.formatMessage(messages.personalEmail)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6} xl={4.5}>
              <Autocomplete
                options={resignReasonsList}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'resignReasonId')
                }
                value={getAutoCompleteValue(
                  resignReasonsList,
                  formInfo.resignReasonId
                )}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    {...params}
                    required
                    label={intl.formatMessage(messages.resignReasonName)}
                  />
                )}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <TextField
                name='employeeAddress'
                multiline
                rows={1}
                value={formInfo.employeeAddress}
                onChange={onInputChange}
                label={intl.formatMessage(messages.address)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <TextField
                name='notes'
                multiline
                rows={1}
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.notes)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            {formInfo.employeeCustodyList.length > 0 && (
              <Grid item xs={12}>
                <Card
                  className={`${classes.card} ${style.cardContainer}`}
                  sx={{ mt: '0!important' }}
                >
                  <CardContent>
                    <Typography variant='h5' mb={3}>
                      {intl.formatMessage(messages.custodies)}
                    </Typography>

                    <Grid container spacing={3}>
                      {formInfo.employeeCustodyList.map((item, index) => (
                        <Grid item xs={12} md={3} lg={3} key={index}>
                          <div className={style.custodiesContainer}>
                            <DevicesIcon className={classes.textSty} />
                            <span>{item}</span>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item>
                  <Button variant='contained' type='submit'>
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={oncancel}
                  >
                    {intl.formatMessage(payrollMessages.cancel)}
                  </Button>
                </Grid>

                <Grid item >
              <Button
                variant="contained"
                color="secondary"
                component="label"
                startIcon={<AttachFileIcon/>}
              >
                <FormattedMessage {...payrollMessages.Upload} />
                <input
                  type="file"
                  name="file"
                  className={`custom-file-input ${styles.uploadBtnSty}`}
                  id="inputGroupFile"
                  onChange={(e) => {
                    uploadFileFun(e);
                  }}
                  accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml, application/pdf, .pdf"
                />
              </Button>
            </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}
ResignReqTrxCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ResignReqTrxCreate);
