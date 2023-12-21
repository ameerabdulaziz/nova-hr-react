import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/AsTemplateData';
import messages from '../messages';

function AsTemplateCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const Title = localStorage.getItem('MenuName');

  const [jobList, setJobList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    templateName: '',
    arTemplateName: '',
    months: [],
    jobs: [],
    probationPeriod: false,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobsList();
      setJobList(jobs);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        setFormInfo(dataApi);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Assessment/AsTemplate');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Assessment/AsTemplate');
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={Title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={3}>
              <TextField
                name='templateName'
                value={formInfo.templateName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.templateName)}
                fullWidth
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                name='arTemplateName'
                value={formInfo.arTemplateName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(messages.arTemplateName)}
                fullWidth
                variant='outlined'
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={0} direction='row'>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={monthList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                value={formInfo.months}
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
                onChange={(_, value) => onAutoCompleteChange(value, 'months')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.months)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={jobList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === 'ar' ? style.AutocompleteMulStyAR : null
                }`}
                value={formInfo.jobs}
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
                onChange={(_, value) => onAutoCompleteChange(value, 'jobs')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.jobs)}
                  />
                )}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.probationPeriod}
                    onChange={onCheckboxChange}
                    name='arabic'
                  />
                }
                label={intl.formatMessage(messages.probationPeriodTemplate)}
              />
            </Grid>
          </Grid>

          <Stack direction='row' mt={3} gap={2}>
            <Button
              variant='contained'
              type='submit'
              size='medium'
              color='secondary'
            >
              <FormattedMessage {...payrollMessages.save} />
            </Button>

            <Button
              variant='contained'
              size='medium'
              color='primary'
              onClick={onCancelBtnClick}
            >
              <FormattedMessage {...payrollMessages.cancel} />
            </Button>
          </Stack>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

AsTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsTemplateCreate);
