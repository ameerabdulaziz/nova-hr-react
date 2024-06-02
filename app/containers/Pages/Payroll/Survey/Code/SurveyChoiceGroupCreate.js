import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/SurveyChoiceGroupData';
import ChoicesInfo from '../components/SurveyChoiceGroup/ChoicesInfo';

function SurveyChoiceGroupCreate(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: '',
    arName: '',
    choiceList: [],
  });

  const fetchNeededData = async () => {
    if (id) {
      setIsLoading(true);

      try {
        const response = await api(locale).getById(id);
        setFormInfo(response);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onSubmitBtnClick = async () => {
    const body = {
      ...formInfo,
      choiceList: formInfo.choiceList.map((item) => ({ ...item, id: 0 })),
    };

    setIsLoading(true);

    try {
      await api(locale).save(body);

      toast.success(notif.saved);
      history.push('/app/Pages/Survey/SurveyChoiceGroup');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Survey/SurveyChoiceGroup');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={3} mt={0} direction='row'>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>{pageTitle}</Typography>

              <Grid container spacing={3} mt={0} direction='row'>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <ChoicesInfo formInfo={formInfo} setFormInfo={setFormInfo} />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Stack direction='row' gap={2}>
                <Button
                  variant='contained'
                  onClick={onSubmitBtnClick}
                  color='secondary'
                >
                  {intl.formatMessage(payrollMessages.save)}
                </Button>

                <Button
                  variant='contained'
                  color='primary'
                  onClick={onCancelBtnClick}
                >
                  {intl.formatMessage(payrollMessages.cancel)}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

SurveyChoiceGroupCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyChoiceGroupCreate);
