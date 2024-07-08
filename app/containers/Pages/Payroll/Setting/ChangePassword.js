import { Button, Grid, TextField } from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import PayRollLoader from '../Component/PayRollLoader';
import payrollMessages from '../messages';
import api from './api/ChangePasswordData';
import messages from './messages';

function ChangePassword(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(false);

  const [formInfo, setFormInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (formInfo.newPassword !== formInfo.confirmPassword) {
      toast.error(intl.formatMessage(messages.passwordNotMatch));
      return;
    }

    try {
      setIsLoading(true);

      const body = {
        employeeId: 0,
        oldPassword: formInfo.oldPassword,
        newPassword: formInfo.newPassword,
      };

      await api().ChangeUserPassword(body);

      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={pageTitle} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name='oldPassword'
                    value={formInfo.oldPassword}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.oldPassword)}
                    required
                    fullWidth
                    variant='outlined'
                    type='password'
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name='newPassword'
                    value={formInfo.newPassword}
                    onChange={onInputChange}
                    inputProps={{ minLength: 6 }}
                    label={intl.formatMessage(messages.newPassword)}
                    required
                    fullWidth
                    variant='outlined'
                    type='password'
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name='confirmPassword'
                    value={formInfo.confirmPassword}
                    inputProps={{ minLength: 6 }}
                    onChange={onInputChange}
                    label={intl.formatMessage(messages.confirmPassword)}
                    required
                    fullWidth
                    variant='outlined'
                    type='password'
                    autoComplete='off'
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Button variant='contained' type='submit' color='primary'>
                        {intl.formatMessage(payrollMessages.save)}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoader>
  );
}

ChangePassword.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ChangePassword);
