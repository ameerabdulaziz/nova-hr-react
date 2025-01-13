import { Button, Grid, TextField } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import tableMessage from '../../../../../components/Tables/messages';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/RecHrTestData';
import SITEMAP from '../../../../App/routes/sitemap';

function RecHrTestCreate(props) {
  const { intl } = props;

  const history = useHistory();
  const location = useLocation();

  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    id,
    arName: '',
    enName: '',
    arDesc: '',
    enDesc: '',
    finalGrad: '',
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      if (id !== 0) {
        const dataApi = await api().GetById(id);
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
      await api().save(formInfo);

      toast.success(notif.saved);
      history.push(SITEMAP.recruitment.RecHrTest.route);
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
    history.push(SITEMAP.recruitment.RecHrTest.route);
  };

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
                name='finalGrad'
                value={formInfo.finalGrad}
                required
                onChange={onNumericInputChange}
                label={intl.formatMessage(tableMessage.finalGrad)}
                fullWidth
                variant='outlined'
                autoComplete='off'
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

RecHrTestCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecHrTestCreate);
