import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import tableMessage from '../../../../../components/Tables/messages';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/RecEvaluationData';
import SITEMAP from '../../../../App/routes/sitemap';

function RecEvaluationCreate(props) {
  const { intl } = props;

  const history = useHistory();
  const location = useLocation();

  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    id,
    arName: '',
    enName: '',
    arDesc: '',
    enDesc: '',
    elJob: null,
    elPercent: '',
    elFinGrad: '',
    isManger: false,
    isHr: false,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobList();
      setJobList(jobs);

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

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api(locale).save(formInfo);

      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.RecEvaluation.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
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
    history.push(SITEMAP.recruitment.RecEvaluation.route);
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} md={4}>
              <TextField
                name='enName'
                value={formInfo.enName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.enName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='arName'
                value={formInfo.arName}
                required
                onChange={onInputChange}
                label={intl.formatMessage(payrollMessages.arName)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='elFinGrad'
                value={formInfo.elFinGrad}
                required
                onChange={onNumericInputChange}
                label={intl.formatMessage(tableMessage.finalGrad)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='elPercent'
                value={formInfo.elPercent}
                required
                onChange={onNumericInputChange}
                label={intl.formatMessage(tableMessage.elPercent)}
                fullWidth
                variant='outlined'
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={jobList}
                value={getAutoCompleteValue(jobList, formInfo.elJob)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                onChange={(_, value) => {
                  setFormInfo((prev) => ({
                    ...prev,
                    elJob: value !== null ? value.id : null,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    variant='outlined'
                    required
                    {...params}
                    label={intl.formatMessage(tableMessage.elJob)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='enDesc'
                value={formInfo.enDesc}
                onChange={onInputChange}
                label={intl.formatMessage(tableMessage.enDesc)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name='arDesc'
                value={formInfo.arDesc}
                onChange={onInputChange}
                label={intl.formatMessage(tableMessage.arDesc)}
                fullWidth
                variant='outlined'
                multiline
                rows={1}
                autoComplete='off'
              />
            </Grid>

            <Grid item md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.isHr}
                    onChange={onCheckboxChange}
                    name='isHr'
                  />
                }
                label={intl.formatMessage(tableMessage.viewHR)}
              />
            </Grid>

            <Grid item md={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.isManger}
                    onChange={onCheckboxChange}
                    name='isManger'
                  />
                }
                label={intl.formatMessage(tableMessage.viewManager)}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant='contained' type='submit' color='primary'>
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={onCancelBtnClick}
                  >
                    {intl.formatMessage(payrollMessages.cancel)}
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

RecEvaluationCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecEvaluationCreate);
