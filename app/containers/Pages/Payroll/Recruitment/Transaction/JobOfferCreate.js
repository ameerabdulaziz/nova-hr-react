import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import PayRollLoader from '../../Component/PayRollLoader';
import SalaryElements from '../../Component/SalaryElements';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/JobOfferData';
import messages from '../messages';

import 'react-quill/dist/quill.snow.css';
import SITEMAP from '../../../../App/routes/sitemap';

function JobOfferCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const company = useSelector((state) => state.authReducer.companyInfo);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [applicantsList, setApplicantsList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [contractTypeList, setContractTypeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [salaryStructureList, setSalaryStructureList] = useState([]);
  const [salaryElementsList, setSalaryElementsList] = useState([]);
  const [selectedSalaryList, setSelectedSalaryList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [printContent, setPrintContent] = useState('');
  const documentTitle = 'Job Offer ' + formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const [DateError, setDateError] = useState({});

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    documentTitle,
    onBeforeGetContent: () => {
      setIsLoading(true);
    },
    onAfterPrint: () => {
      setIsLoading(false);
    },
    onPrintError: () => {
      setIsLoading(false);
    },
  });

  const [formInfo, setFormInfo] = useState({
    id,
    jobId: null,
    candidateName: '',
    departmentId: '',
    jobOfferDate: new Date(),
    startDate: new Date(),
    reportTo: '',
    commession: '',
    grossSalary: '',
    notes: '',
    hiringRequestId: null,
    contractTypeId: null,
    salaryStructureId: null,
  });

  const onPrintClick = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).print(id);
      setPrintContent(response);

      // TODO: Mohammed-Taysser - refactor it
      setTimeout(() => {
        printJS();
      }, 1);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const formData = {
      ...formInfo,
      jobOfferDate: formateDate(formInfo.jobOfferDate),
      startDate: formateDate(formInfo.startDate),
    };

    formData.recJobOfferDetails = selectedSalaryList.map((item) => ({
      ...item,
      id: 0,
      hiringRequestId: id,
    }));

    setIsLoading(true);

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.JobOffer.route);
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
      setJobList(jobs);

      const salary = await GeneralListApis(locale).GetSalaryStructureList();
      setSalaryStructureList(salary);

      const contracts = await GeneralListApis(locale).GetContractTypeList();
      setContractTypeList(contracts);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo(dataApi);

        setSelectedSalaryList(
          dataApi.recJobOfferDetails.map((item) => ({
            ...item,
            id: item.elementId,
          }))
        );

        const applicant = await api(locale).GetApplicantList(
          dataApi.hiringRequestId ?? ''
        );
        setApplicantsList(applicant);
      } else {
        const applicant = await api(locale).GetApplicantList();
        setApplicantsList(applicant);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchApplicantInfo() {
    setIsLoading(true);

    try {
      const dataApi = (
        await api(locale).GetbyApplicant(formInfo.hiringRequestId)
      )[0];

      const payload = {
        grossSalary: dataApi.grossSalary,
        jobId: dataApi.jobId,
        candidateName: dataApi.candidateName,
        departmentId: dataApi.departmentId,
        reportTo: dataApi.reportTo,
        commession: dataApi.varsalary ?? '',
        jobOfferDate: dataApi.trxDate,
        notes: dataApi.comments,
      };

      setFormInfo({ ...formInfo, ...payload });

      setSelectedSalaryList(
        dataApi.recJobOfferDetails.map((item) => ({
          ...item,
          id: item.elementId,
        }))
      );
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSalaryElements() {
    setIsLoading(true);

    try {
      const dataApi = await api(locale).GetSalatyElement({
        salary: formInfo.grossSalary,
        status: formInfo.salaryStructureId,
      });

      setSelectedSalaryList(
        dataApi.map((item) => ({
          ...item,
          id: item.elementId,
        }))
      );
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  useEffect(() => {
    if (formInfo.hiringRequestId && id === 0) {
      fetchApplicantInfo();
    }
  }, [formInfo.hiringRequestId]);

  useEffect(() => {
    if (formInfo.salaryStructureId && formInfo.grossSalary && id === 0) {
      fetchSalaryElements();
    }
  }, [formInfo.salaryStructureId]);

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
    history.push(SITEMAP.recruitment.JobOffer.route);
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
            <Grid item xs={12} md={6} lg={3} xl={3.5}>
              <Autocomplete
                options={applicantsList}
                value={
                  applicantsList.find(
                    (item) => item.id === formInfo.hiringRequestId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                disabled={id !== 0}
                onChange={(_, value) => onAutoCompleteChange(value, 'hiringRequestId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    disabled={id !== 0}
                    label={intl.formatMessage(messages.applicantName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3} xl={3.5}>
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

            <Grid item xs={12} md={3} lg={2} xl={1.5}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.offerDate)}
                  value={formInfo.jobOfferDate ? dayjs(formInfo.jobOfferDate) : null}
                  className={classes.field}
                  onChange={(date) => onDatePickerChange(date, 'jobOfferDate')}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        jobOfferDate: true
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        jobOfferDate: false
                      }));
                    }
                  }}
                  slotProps={{
                    textField: {
                      required: true
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>            

            <Grid item xs={12} md={9} lg={4} xl={3.5}>
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

            <Grid item xs={12} md={6} lg={3.8} xl={3.5}>
              <Autocomplete
                options={contractTypeList}
                value={
                  contractTypeList.find(
                    (item) => item.id === formInfo.contractTypeId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'contractTypeId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.contractType)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3.7} xl={3.5}>
              <Autocomplete
                options={jobList}
                value={
                  jobList.find((item) => item.id === formInfo.jobId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'jobId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.jobName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3} lg={2} xl={1.5}>

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
                      required: true
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item  xs={12} md={5} lg={3.7} xl={3.5}>
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

            <Grid item  xs={12} md={4} lg={2.5} xl={1.7}>
              <TextField
                value={formInfo.grossSalary}
                label={intl.formatMessage(messages.salaryInGross)}
                name='grossSalary'
                required
                onChange={onNumericInputChange}
                className={classes.field}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4} lg={2.5} xl={1.7}>
              <TextField
                name='commession'
                value={formInfo.commession}
                onChange={onInputChange}
                label={intl.formatMessage(messages.commession)}
                className={classes.field}
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4} lg={2.5} xl={1.7}>
              <Autocomplete
                options={salaryStructureList}
                value={
                  salaryStructureList.find(
                    (item) => item.id === formInfo.salaryStructureId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'salaryStructureId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.salaryStructure)}
                  />
                )}
              />
            </Grid>



            <Grid item xs={12}>
              <TextField
                name='notes'
                value={formInfo.notes}
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.notes)}
                className={classes.field}
                variant='outlined'
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

            <Grid item xs={12}>
              <Grid container spacing={3}>
                {id !== 0 && (
                  <Grid item xs={12} md={1}>
                    <Button
                      onClick={onPrintClick}
                      color='primary'
                      variant='outlined'
                    >
                      <FormattedMessage {...payrollMessages.Print} />
                    </Button>

                    <Box
                      ref={printDivRef}
                      sx={{
                        visibility: "hidden",
                        height: "0px",
                        '@media print': {
                          height: "100%",
                          visibility: "visible",
                          direction: "rtl",
                        },
                        px: 2,
                        py: 4,
                      }}
                    >
                      <Stack spacing={2} px={2}>
                        <div>
                          <img src={company?.logo} alt='' height={45} />
                        </div>
                      </Stack>

                      <div className='ql-snow'>
                        <div className='ql-editor'>{parse(printContent)}</div>
                      </div>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
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

JobOfferCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOfferCreate);
