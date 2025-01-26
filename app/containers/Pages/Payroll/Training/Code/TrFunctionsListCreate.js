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
import NameList from '../../Component/NameList';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/TrFunctionsListData';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TrFunctionsListCreate(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: '',
    arName: '',
  });

  const fetchNeededData = async () => {
    if (id) {
      setIsLoading(true);

      try {
        const response = await api(locale).getById(id);
        setFormInfo(response);

        setCourses(response.courses.map(item=>({...item, isSelected: true})));
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

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const mappedCourses = courses
      .filter((item) => item.isSelected)
      .map((item) => ({ id: item.id, name: item.name }));

    if (mappedCourses.length === 0) {
      toast.error(intl.formatMessage(messages.coursesIsRequired));
      return;
    }

    const body = {
      ...formInfo,
      courses: mappedCourses,
    };

    setIsLoading(true);

    try {
      await api(locale).save(body);

      toast.success(notif.saved);
      history.push(SITEMAP.training.TrFunctionsList.route);
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
    history.push(SITEMAP.training.TrFunctionsList.route);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <Card>
          <CardContent sx={{ p: '16px!important' }}>
            <Grid container spacing={3} direction='row'>
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12}>
                <NameList
                  dataList={courses}
                  setdataList={setCourses}
                  Key='Courses'
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction='row' gap={2}>
                  <Button variant='contained' color='secondary' type='submit'>
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </PayRollLoader>
  );
}

TrFunctionsListCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TrFunctionsListCreate);
