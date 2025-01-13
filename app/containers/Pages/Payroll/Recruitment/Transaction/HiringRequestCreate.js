import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import SalaryElements from '../../Component/SalaryElements';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/HiringRequestData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function HiringRequestCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [applicantsList, setApplicantsList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [assignList, setAssignList] = useState([]);
  const [salaryElementsList, setSalaryElementsList] = useState([]);
  const [selectedSalaryList, setSelectedSalaryList] = useState([]);
  const [setting, setSetting] = useState({
    canSave: true,
    makeJobOffer: true,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    hiringRequestDate: new Date(),
    candidateName: '',
    startDate: new Date(),
    JobApplicarionId: null,
    RecHiringReqAssignEmployee: [],
    reportTo: null,
    positionId: null,
    departmentId: null,
    salary: '',
    contractDuration: '',
    benefits: '',
    tools: '',
    comments: '',
  });

  const [DateError, setDateError] = useState({});

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const formData = {
      ...formInfo,
      hiringRequestDate: formateDate(formInfo.hiringRequestDate),
      startDate: formateDate(formInfo.startDate),
    };

    formData.RecHiringRequestSalaryElement = selectedSalaryList.map((item) => ({
      ...item,
      id: 0,
      hiringRequestId: id,
    }));

    formData.RecHiringReqAssignEmployee = formData.RecHiringReqAssignEmployee.map((item) => ({
      id: 0,
      hiringRequestId: id,
      employeeId: item.id,
    }));

    setIsLoading(true);

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.HiringRequest.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const elements = await GeneralListApis(locale).GetElementList(0, 0, '', 1);
      setSalaryElementsList(elements);

      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);

      const reports = await GeneralListApis(locale).GetTechLevelList();
      setReportList(reports);

      const jobs = await GeneralListApis(locale).GetJobList();
      setPositionList(jobs);

      const applicant = await api(locale).GetApplicantList(id === 0);
      setApplicantsList(applicant);

      const assign = await GeneralListApis(locale).GetMgrSuperEmpList();
      setAssignList(assign);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo({
          ...dataApi,
          RecHiringReqAssignEmployee: dataApi.hiringReqAssignEmployee.map(
            (item) => ({
              ...item,
              id: item.employeeId,
              name: item.employeeName,
            })
          ),
        });

        setSelectedSalaryList(
          dataApi.salaryelement.map((item) => ({ ...item, id: item.elementId }))
        );

        setSetting({
          canSave: dataApi.canSave,
          makeJobOffer: dataApi.makeJobOffer,
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
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

  const onCancelBtnClick = () => {
    history.push(SITEMAP.recruitment.HiringRequest.route);
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={applicantsList}
                value={
                  applicantsList.find(
                    (item) => item.id === formInfo.JobApplicarionId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'JobApplicarionId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.applicantName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.candidateName}
                label={intl.formatMessage(messages.applicantName)}
                name='candidateName'
                required
                onChange={onInputChange}
                className={classes.field}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(payrollMessages.date)}
                  value={formInfo.hiringRequestDate ? dayjs(formInfo.hiringRequestDate) : null}
                  className={classes.field}
                  onChange={(date) => onDatePickerChange(date, 'hiringRequestDate')
                  }
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        hiringRequestDate: true
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        hiringRequestDate: false
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

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={reportList}
                value={
                  reportList.find((item) => item.id === formInfo.reportTo)
                  ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'reportTo')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.reportingTo)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={positionList}
                value={
                  positionList.find(
                    (item) => item.id === formInfo.positionId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'positionId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.position)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={departmentList}
                value={
                  departmentList.find(
                    (item) => item.id === formInfo.departmentId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'departmentId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.department)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.startDate)}
                  value={formInfo.startDate ? dayjs(formInfo.startDate) : null}
                  className={classes.field}
                  onChange={(date) => onDatePickerChange(date, 'startDate')}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        startDate: true
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        startDate: false
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

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.contractDuration}
                label={intl.formatMessage(messages.contractDuration)}
                name='contractDuration'
                required
                onChange={onNumericInputChange}
                className={classes.field}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.salary}
                label={intl.formatMessage(messages.salaryInGross)}
                name='salary'
                required
                onChange={onNumericInputChange}
                className={classes.field}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={assignList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                value={formInfo.RecHiringReqAssignEmployee}
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
                  setFormInfo((prev) => ({
                    ...prev,
                    RecHiringReqAssignEmployee: value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.assignTo)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='benefits'
                value={formInfo.benefits}
                onChange={onInputChange}
                required
                label={intl.formatMessage(messages.benefits)}
                className={classes.field}
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='tools'
                value={formInfo.tools}
                onChange={onInputChange}
                required
                label={intl.formatMessage(messages.tools)}
                className={classes.field}
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name='comments'
                value={formInfo.comments}
                onChange={onInputChange}
                label={intl.formatMessage(messages.comments)}
                className={classes.field}
                variant='outlined'
                required
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <SalaryElements
                  dataList={selectedSalaryList}
                  setDataList={setSelectedSalaryList}
                  salaryElementsList={salaryElementsList}
                />
              </Grid>
            </Grid>

            {formInfo.RecHiringReqAssignEmployee.some(
              (item) => item.statusName !== null
            ) && id !== 0 && (
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.employeeName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.status)}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formInfo.RecHiringReqAssignEmployee.map(
                          (row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                {row.employeeName}
                              </TableCell>
                              <TableCell>{row.statusName}</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                    disabled={id !== 0 ? !setting.canSave : false}
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>
                </Grid>

                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
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

HiringRequestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(HiringRequestCreate);
