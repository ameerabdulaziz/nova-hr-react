import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete, Box, Button, Grid, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
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
import payrollMessages from '../../messages';
import api from '../api/JobOfferData';
import messages from '../messages';

function JobOfferCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
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

  const [formInfo, setFormInfo] = useState({
    id,
    jobId: null,
    candidateName: '',
    departmentId: '',
    jobOfferDate: null,
    startDate: null,
    reportTo: '',
    commession: '',
    grossSalary: '',
    notes: '',
    hiringRequestId: null,
    contractTypeId: null,
    salaryStructureId: null,
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

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
      history.push('/app/Pages/Recruitment/JobOffer');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const elements = await GeneralListApis(locale).GetElementListByType(1);
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
    if (formInfo.salaryStructureId && id === 0) {
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
    history.push('/app/Pages/Recruitment/JobOffer');
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
            <Grid item xs={12} md={3}>
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

            <Grid item xs={12} md={3}>
              <TextField
                value={formInfo.candidateName}
                label={intl.formatMessage(messages.applicantName)}
                name='candidateName'
                required
                onChange={onInputChange}
                className={classes.field}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.offerDate)}
                  value={formInfo.jobOfferDate}
                  onChange={(date) => onDatePickerChange(date, 'jobOfferDate')}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
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

            <Grid item xs={12} md={3}>
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

            <Grid item xs={12} md={3}>
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

            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.startDate)}
                  value={formInfo.startDate}
                  onChange={(date) => onDatePickerChange(date, 'startDate')}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={3}>
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

            <Grid item xs={12} md={3}>
              <TextField
                value={formInfo.grossSalary}
                label={intl.formatMessage(messages.salaryInGross)}
                name='grossSalary'
                required
                onChange={onNumericInputChange}
                className={classes.field}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='commession'
                value={formInfo.commession}
                onChange={onInputChange}
                required
                label={intl.formatMessage(messages.commession)}
                className={classes.field}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12} md={3}>
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
                    required
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
                <Grid item xs={12} md={1}>
                  <PrintJS
                    body={'<div contenteditable="true" translate="no" class="ProseMirror" tabindex="0" spellcheck="false"><h2 style="text-align: center">Welcome to Circle rich text editor 💯</h2><p><code>Editor</code> focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. Supports all of its features:</p><ul><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></p></li><li><p>Headings (h1-h6)</p></li><li><p>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</p></li><li><p>Ordered and bullet lists</p></li><li><p>Text align (left, center, justify, right)</p></li><li><p>Words &amp; characters counter</p></li><li><p>Horizontal line &amp; Line break &amp; Blockquote</p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="text-aurora no-underline hover:underline text-aurora no-underline hover:underline text-aurora no-underline hover:underline" href="https://mantine-lime.vercel.app/">Link</a> &amp; Unlink text.</p></li><li><p>Emoji picker 😀</p></li><li><p><span style="font-family: Tajawal, sans-serif;text-align: right">يدعم اللغة العربية</span></p></li></ul><p><br><br class="ProseMirror-trailingBreak"></p><p>With the Typography extension, The editor understands &gt;&gt; what you mean &lt;&lt; and adds correct characters to your text — it\'s like a "typography nerd" on your side.</p><p>Try it out and type <code>(c)</code>, <code>-&gt;</code>, <code>&gt;&gt;</code>, <code>1/2</code>, <code>!=</code>, <code>--</code> or <code>1x1</code> here:</p><p><br><br class="ProseMirror-trailingBreak"></p></div>'}
                  />
                </Grid>
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

const PrintJS = injectIntl((props) => {
  const { body = '' } = props;

  const [isLoading, setIsLoading] = useState(false);
  const documentTitle =		'Job Offer ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle,
  });

  const onPrintClick = async () => {
    printJS();
  };

  return (
    <>
      <LoadingButton
        onClick={onPrintClick}
        color='primary'
        loading={isLoading}
        variant='outlined'
      >
        <FormattedMessage {...payrollMessages.Print} />
      </LoadingButton>

      <Box
        ref={printDivRef}
        sx={{
          display: 'none',
          '@media print': {
            display: 'block',
          },
          p: 4,
          ul: {
            listStyleType: 'disc',
            px: '1rem',
          },
          ol: {
            listStyleType: 'decimal',
            px: '1rem',
          },
          '& > p': {
            mb: '0.3rem',
          },
          code: {
            fontFamily: 'monospace',
            overflowWrap: 'break-word',
            background: 'rgb(241, 241, 241)',
            borderRadius: '3px',
            padding: '1px 3px',
          },
        }}
      >
        {parse(body)}
      </Box>
    </>
  );
});

PrintJS.propTypes = {
  intl: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
};

JobOfferCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobOfferCreate);
