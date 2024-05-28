import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { EditTable } from '../../../../Tables/demos';
import AlertPopup from '../../Component/AlertPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api, { tableData } from '../api/JobAdvertisementData';
import messages from '../messages';

function JobAdvertisementCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const dataTable = useSelector((state) => state.crudTableDemo.dataTable);
  const id = location.state?.id ?? 0;

  const employmentComments = location.state?.employmentComments ?? '';
  const employmentId = location.state?.employmentId ?? 0;

  const title = localStorage.getItem('MenuName');

  const [dateError, setDateError] = useState({});
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState('');

  const [formInfo, setFormInfo] = useState({
    id,

    jobId: '',
    expireDate: null,
    jobAdvertisementCode: '',
    jobDescription: '',
    experiance: '',
    organizationId: '',
    recJobRequirement: [],

    employmentComments,
    employmentId,
  });

  const save = async () => {
    setIsLoading(true);

    const formData = {
      ...formInfo,
      expireDate: formateDate(formInfo.expireDate),
    };

    formData.recJobRequirement = dataTable.map((item) => ({
      description: item.description,
      jobAdvertisementId: id,
      id: item.index,
    }));

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push('/app/Pages/Recruitment/JobAdvertisement');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    setIsLoading(true);

    try {
      const response = await api(locale).CheckManPower(
        formInfo.organizationId,
        formInfo.jobId
      );
      if (response) {
        setOpenParentPopup(true);
        setIsLoading(false);
        setConfirmMessage(response);
      } else {
        save();
      }
    } catch (error) {
      //
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const jobs = await api(locale).GetJobList();
      setJobList(jobs);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo((prev) => ({
          ...prev,
          experiance: dataApi.experiance,
          expireDate: dataApi.expireDate,
          jobId: dataApi.jobId,
          jobAdvertisementCode: dataApi.jobAdvertisementCode,
          jobDescription: dataApi.jobDescription,
          recJobRequirement: dataApi.recJobRequirement,
          organizationId: dataApi.organizationId,
        }));
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

  const onJobAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      jobId: value !== null ? value.id : null,
      jobAdvertisementCode: value !== null ? value.id : null,
    }));

    if (id === 0 && value !== null) {
      setFormInfo((prev) => ({
        ...prev,
        jobDescription: value?.jobDescription.join('\n'),
      }));
    }
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Recruitment/JobAdvertisement');
  };

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'description',
      label: 'requirements',
      type: 'text',
      initialValue: '',
      width: 'auto',
      hidden: false,
    },

    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={confirmMessage}
        callFun={save}
      />

      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' desc='' title={title}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={jobList}
                value={
                  jobList.find((item) => item.id === formInfo.jobId) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onJobAutoCompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.jobName)}
                  />
                )}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='jobAdvertisementCode'
                onChange={onInputChange}
                value={formInfo.jobAdvertisementCode}
                label={intl.formatMessage(messages.jobCode)}
                className={classes.field}
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.expireDate)}
                  value={
                    formInfo.expireDate ? dayjs(formInfo.expireDate) : null
                  }
                  sx={{ width: '100%' }}
                  onChange={(date) => onDatePickerChange(date, 'expireDate')}
                  onError={(error) => {
                    setDateError((prevState) => ({
                      ...prevState,
                      expireDate: error !== null,
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

            <Grid item xs={12} md={4}>
              <TextField
                name='experiance'
                value={formInfo.experiance}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.experience)}
                className={classes.field}
                variant='outlined'
                required
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={organizationList}
                value={
                  organizationList.find(
                    (item) => item.id === formInfo.organizationId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'organizationId')
                }
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={intl.formatMessage(messages.organization)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name='jobDescription'
                value={formInfo.jobDescription}
                onChange={onInputChange}
                label={intl.formatMessage(messages.description)}
                className={classes.field}
                variant='outlined'
                required
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <SaveButton Id={id} processing={isLoading} />
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
        </PapperBlock>

        <EditTable
          anchorTable={anchorTable}
          title={`${id}/${formInfo.jobId || 0}/${locale}`}
          API={tableData(`${id}/${formInfo.jobId || 0}/${locale}`)}
          IsNotSave={true}
        />
      </form>
    </PayRollLoader>
  );
}

JobAdvertisementCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobAdvertisementCreate);
