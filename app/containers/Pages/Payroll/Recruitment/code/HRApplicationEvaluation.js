import { Block, HourglassTop, PendingActions } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DownloadIcon from '@mui/icons-material/Download';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CounterWidget from '../../../../../components/Counter/CounterWidget';
import useWidgetStyles from '../../../../../components/Widget/widget-jss';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { ServerURL } from '../../api/ServerConfig';
import payrollMessages from '../../messages';
import api from '../api/HRApplicationEvaluationData';
import messages from '../messages';

function HRApplicationEvaluation(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const history = useHistory();
  const { classes: widgetClass } = useWidgetStyles();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');
  const workFromList = [
    {
      id: 1,
      name: intl.formatMessage(messages.site),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.home),
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [openedDropdown, setOpenedDropdown] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState([]);

  const [jobAdvList, setJobAdvList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [statusPopupList, setStatusPopupList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [graduationGradList, setGraduationGradList] = useState([]);
  const [technicalEmployeeList, setTechnicalEmployeeList] = useState([]);
  const [managerialLevelList, setManagerialLevelList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    FromDate: null,
    ToDate: null,
    Appliname: '',
    Idcardno: '',
    JobId: null,
    JobAdv: null,
    Status: 0,
    GenderId: null,
    Grauationst: null,
    Workfrom: null,
    Fromage: '',
    Toage: '',
  });

  const [extraData, setExtraData] = useState({
    accepted: 0,
    waiting: 0,
    dataBank: 0,
    rejected: 0,
    offer: 0,
    bList: 0,
    pending: 0,
  });

  const [popupState, setPopupState] = useState({
    appFirstStatus: null,
    reason: '',
    techEmpList: [],
    secStaff: null,
    notTechnicalReview: false,
    databnkjob: null,
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const fetchTableData = async () => {
    setIsLoading(true);

    const formData = { ...formInfo };

    formData.FromDate = formateDate(formInfo.FromDate);
    formData.ToDate = formateDate(formInfo.ToDate);

    try {
      const response = await api(locale).GetList(formData);
      setTableData(response.dataList);
      setExtraData(response.totals);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);

      const gender = await GeneralListApis(locale).GetGenderList();
      setGenderList(gender);

      const grads = await GeneralListApis(locale).GetGradeList();
      setGraduationGradList(grads);

      const popupStatus = await GeneralListApis(
        locale
      ).GetApplicationStatusList();
      setStatusPopupList(popupStatus);

      const managerialLevel = await GeneralListApis(
        locale
      ).GetManagerialLevelList();
      setManagerialLevelList(managerialLevel);

      const techLevel = await GeneralListApis(locale).GetTechLevelList();
      setTechnicalEmployeeList(techLevel);

      const appStatus = await GeneralListApis(locale).GetApplicationStatusList(
        true
      );
      setStatusList(appStatus);

      const jobAdv = await GeneralListApis(locale).GetJobAdvList();
      setJobAdvList(jobAdv);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onDropdownClose = (rowIndex) => setOpenedDropdown((prev) => ({
    ...prev,
    [rowIndex]: null,
  }));

  const onPreviewCVBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;

    history.push('/app/Pages/Recruitment/JobApplicationPreview', {
      id,
    });
  };

  const onUpdateStatusBtnClick = (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;
    setSelectedRowsId([id]);
    setIsPopupOpen(true);
  };

  const onSendRejectMailBtnClick = async (rowIndex) => {
    onDropdownClose(rowIndex);
    const id = tableData[rowIndex]?.id;
    setIsLoading(true);

    try {
      await api(locale).SendRejectionMail(id);
      toast.success(notif.sent);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);

      await fetchTableData();
    }
  };

  const columns = [
    {
      name: 'empName',
      label: intl.formatMessage(messages.applicantName),
      options: {
        filter: true,
      },
    },

    {
      name: 'appDate',
      label: intl.formatMessage(messages.applicantDate),
      options: {
        filter: true,
        customBodyRender: formateDate,
      },
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
      options: {
        filter: true,
      },
    },

    {
      name: 'hrStatus',
      label: intl.formatMessage(messages.hrStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'techStatus',
      label: intl.formatMessage(messages.technicalStatus),
      options: {
        filter: true,
      },
    },

    {
      name: 'secStatus',
      label: intl.formatMessage(messages.managerialStatus),
      options: {
        filter: true,
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          const isMailSend =						(row.appFirstStatus === 2
							|| row.techStatus === 2
							|| row.secStatus === 2)
						&& !row.mailSend;

          return (
            <div>
              <IconButton
                onClick={(evt) => {
                  setOpenedDropdown((prev) => ({
                    ...prev,
                    [tableMeta.rowIndex]: evt.currentTarget,
                  }));
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={openedDropdown[tableMeta.rowIndex]}
                open={Boolean(openedDropdown[tableMeta.rowIndex])}
                onClose={() => onDropdownClose(tableMeta.rowIndex)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => onUpdateStatusBtnClick(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <SystemUpdateAltIcon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText>
                    {intl.formatMessage(messages.updateStatus)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={() => onPreviewCVBtnClick(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <VisibilityIcon fontSize='small' />
                  </ListItemIcon>

                  <ListItemText>
                    {intl.formatMessage(messages.viewApplicationForm)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  component='a'
                  target='_blank'
                  disabled={!row.cVfile}
                  href={ServerURL + 'Doc/CVDoc/' + row.cVfile}
                  onClick={() => onDropdownClose(tableMeta.rowIndex)}
                >
                  <ListItemIcon>
                    <DownloadIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    {intl.formatMessage(messages.downloadCV)}
                  </ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={() => onSendRejectMailBtnClick(tableMeta.rowIndex)}
                  disabled={isMailSend}
                >
                  <ListItemIcon>
                    <UnsubscribeIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    {isMailSend && '(sended) '}
                    {intl.formatMessage(messages.sendRejectMail)}
                  </ListItemText>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const onToolBarIconClick = (rows) => {
    const ids = rows.map((item) => tableData[item.dataIndex]?.id);

    setSelectedRowsId(ids);
    setIsPopupOpen(true);
  };

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    // selectableRows: 'none',
    searchOpen: false,
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
    customToolbarSelect: (selectedRows) => (
      <>
        <IconButton
          sx={{ mx: 2 }}
          onClick={() => onToolBarIconClick(selectedRows.data)}
        >
          <ManageAccountsIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </>
    ),
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchTableData();
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

  const onAutoCompletePopupChange = (value, name) => {
    setPopupState((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
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

  const onPopupClose = () => {
    setIsPopupOpen(false);

    setPopupState({
      appFirstStatus: null,
      reason: '',
      techEmpList: [],
      secStaff: null,
      notTechnicalReview: false,
      databnkjob: null,
    });
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsPopupOpen(false);

    const popupData = { ...popupState, ids: selectedRowsId };

    popupData.techEmpList = popupData.techEmpList.map((item) => item.id);

    if (popupState.appFirstStatus === 1) {
      popupData.reason = '';
    }

    if (popupState.appFirstStatus === 6) {
      popupData.databnkjob = null;
    }

    if (popupState.appFirstStatus !== 1 || popupState.appFirstStatus !== 3) {
      popupData.secStaff = null;
      popupData.techEmpList = null;
    }

    setIsLoading(true);

    try {
      await api(locale).SaveHR(popupData);
      toast.success(notif.updated);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      await fetchTableData();
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Dialog
        open={isPopupOpen}
        onClose={onPopupClose}
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
        <DialogTitle>
          <FormattedMessage {...payrollMessages.Actions} />
        </DialogTitle>

        <DialogContent sx={{ pt: '10px !important' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={statusPopupList}
                value={
                  statusPopupList.find(
                    (item) => item.id === popupState.appFirstStatus
                  ) ?? null
                }
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
                  value={
                    jobList.find((item) => item.id === popupState.databnkjob)
										?? null
                  }
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
                      required
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
                    value={
                      managerialLevelList.find(
                        (item) => item.id === popupState.secStaff
                      ) ?? null
                    }
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
                    className={`${style.AutocompleteMulSty} ${
                      locale === 'ar' ? style.AutocompleteMulStyAR : null
                    }`}
                    value={popupState.techEmpList}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
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
                  className={classes.field}
                  variant='outlined'
                  multiline
                  rows={1}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onPopupClose}>
            <FormattedMessage {...payrollMessages.cancel} />
          </Button>

          <Button type='submit' variant='contained'>
            <FormattedMessage {...messages.confirm} />
          </Button>
        </DialogActions>
      </Dialog>

      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <div className={widgetClass.rootCounterFull}>
          <Grid container spacing={2} mb={2}>
            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.pending}
                duration={3}
                title={intl.formatMessage(messages.pending)}
              >
                <PendingActions
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.accepted}
                duration={3}
                title={intl.formatMessage(messages.accepted)}
              >
                <HowToRegIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.waiting}
                duration={3}
                title={intl.formatMessage(messages.waitingList)}
              >
                <HourglassTop
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.dataBank}
                duration={3}
                title={intl.formatMessage(messages.dataBank)}
              >
                <DocumentScannerIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.offer}
                duration={3}
                title={intl.formatMessage(messages.jobOffer)}
              >
                <SensorOccupiedIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.rejected}
                duration={3}
                title={intl.formatMessage(messages.rejected)}
              >
                <PersonOffIcon
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>

            <Grid item sm={6} md={3}>
              <CounterWidget
                color='secondary-main'
                start={0}
                end={extraData.bList}
                duration={3}
                title={intl.formatMessage(messages.blackList)}
              >
                <Block
                  className={widgetClass.counterIcon}
                  sx={{ fontSize: '60px !important' }}
                />
              </CounterWidget>
            </Grid>
          </Grid>
        </div>

        <form onSubmit={onFormSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={jobAdvList}
                    value={
                      jobAdvList.find((item) => item.id === formInfo.JobAdv)
											?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'JobAdv')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.JobAdv)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name='Appliname'
                    onChange={onInputChange}
                    value={formInfo.Appliname}
                    label={intl.formatMessage(messages.applicantName)}
                    className={classes.field}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name='Idcardno'
                    onChange={onNumericInputChange}
                    value={formInfo.Idcardno}
                    label={intl.formatMessage(messages.idNumber)}
                    className={classes.field}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={statusList}
                    value={
                      statusList.find((item) => item.id === formInfo.Status)
											?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'Status')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.status)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label={intl.formatMessage(payrollMessages.fromdate)}
                      value={formInfo.FromDate}
                      onChange={(date) => onDatePickerChange(date, 'FromDate')}
                      className={classes.field}
                      renderInput={(params) => (
                        <TextField {...params} variant='outlined' />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label={intl.formatMessage(payrollMessages.todate)}
                      value={formInfo.ToDate}
                      onChange={(date) => onDatePickerChange(date, 'ToDate')}
                      className={classes.field}
                      renderInput={(params) => (
                        <TextField {...params} variant='outlined' />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={jobList}
                    value={
                      jobList.find((item) => item.id === formInfo.JobId) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'JobId')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.jobName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={genderList}
                    value={
                      genderList.find(
                        (item) => item.id === formInfo.GenderId
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'GenderId')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.gender)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={workFromList}
                    value={
                      workFromList.find(
                        (item) => item.id === formInfo.Workfrom
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'Workfrom')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.workFrom)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={graduationGradList}
                    value={
                      graduationGradList.find(
                        (item) => item.id === formInfo.Grauationst
                      ) ?? null
                    }
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'Grauationst')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(messages.graduationGrade)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name='Fromage'
                    onChange={onNumericInputChange}
                    value={formInfo.Fromage}
                    label={intl.formatMessage(messages.fromAge)}
                    className={classes.field}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name='Toage'
                    onChange={onNumericInputChange}
                    value={formInfo.Toage}
                    label={intl.formatMessage(messages.toAge)}
                    className={classes.field}
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button variant='contained' color='primary' type='submit'>
                    <FormattedMessage {...payrollMessages.search} />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </PapperBlock>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=''
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

HRApplicationEvaluation.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HRApplicationEvaluation);
