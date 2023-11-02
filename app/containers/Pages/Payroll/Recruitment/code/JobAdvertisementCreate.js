import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { EditTable } from '../../../../Tables/demos';
import PayRollLoader from '../../Component/PayRollLoader';
import SaveButton from '../../Component/SaveButton';
import useStyles from '../../Style';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/JobAdvertisementData';
import messages from '../messages';

function JobAdvertisementCreate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const dataTable = useSelector((state) => state.crudTableDemo.dataTable);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [jobList, setJobList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    JobId: '',
    ExpireDate: new Date(),
    JobAdvertisementCode: '',
    JobDescription: '',
    Experiance: '',
    OrganizationId: '',
  });

  const formateDate = (date) => (date ? format(new Date(date), 'yyyy-MM-dd') : null);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (dataTable.length === 0) {
      toast.error(intl.formatMessage(messages.enterDetailsData));
    } else {
      const formData = { ...formInfo };

      formData.ExpireDate = formateDate(formData.ExpireDate);

      setIsLoading(true);

      try {
        await api(locale).save(formData);
        toast.success(notif.saved);
        history.push('/app/Pages/Recruitment/JobAdvertisement');
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);
      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(prev=>({
          ...prev,
          Experiance: dataApi.experiance,
          ExpireDate: dataApi.expireDate,
          JobId: dataApi.job,
          JobAdvertisementCode: dataApi.jobAdvertisementCode,
          JobDescription: dataApi.jobDescription,
          OrganizationId: dataApi.OrganizationId,
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
      JobId: value !== null ? value.id : null,
      JobAdvertisementCode: value !== null ? value.id : null,
    }));
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
      name: 'requirements',
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

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' desc='' title={title}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={jobList}
                value={
                  jobList.find((item) => item.id === formInfo.JobId) ?? null
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
                name='JobAdvertisementCode'
                onChange={onInputChange}
                value={formInfo.JobAdvertisementCode}
                label={intl.formatMessage(messages.jobCode)}
                className={classes.field}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={intl.formatMessage(messages.expireDate)}
                  value={formInfo.ExpireDate}
                  onChange={(date) => onDatePickerChange(date, 'ExpireDate')}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField required {...params} variant='outlined' />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='Experiance'
                value={formInfo.Experiance}
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.experience)}
                className={classes.field}
                variant='outlined'
                required
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={organizationList}
                value={
                  organizationList.find(
                    (item) => item.id === formInfo.OrganizationId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => onAutoCompleteChange(value, 'OrganizationId')
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
                name='JobDescription'
                value={formInfo.JobDescription}
                onChange={onInputChange}
                label={intl.formatMessage(messages.description)}
                className={classes.field}
                variant='outlined'
                required
                multiline
                rows={1}
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
          title=''
          // API={tableData(locale, id)}
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
