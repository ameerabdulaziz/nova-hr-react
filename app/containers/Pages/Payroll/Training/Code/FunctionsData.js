import { HomeRepairService } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import payrollMessages from '../../messages';
import api from '../api/FunctionsData';
import FunctionsList from '../components/FunctionsData/FunctionsList';
import messages from '../messages';

function FunctionsData(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName') ?? '';

  const locale = useSelector((state) => state.language.locale);

  const [organizationList, setOrganizationList] = useState([]);

  const [functions, setFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    organizationId: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      const employeeResponse = await api(locale).getAllFunctionWithEmployees(
        formInfo
      );
      setFunctions(employeeResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={onFormSubmit}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{pageTitle}</Typography>

                <Grid container spacing={3} mt={0}>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={organizationList}
                      value={getAutoCompleteValue(
                        organizationList,
                        formInfo.organizationId
                      )}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'organizationId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(
                            payrollMessages.organizationName
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction='row' gap={2}>
                      <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                      >
                        {intl.formatMessage(payrollMessages.search)}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Grid
                container
                justifyContent='space-between'
                alignItems='center'
                mb={3}
              >
                <Grid item>
                  <Typography variant='h6'>
                    {intl.formatMessage(messages.functions)}
                  </Typography>
                </Grid>
              </Grid>

              {functions.length > 0 ? (
                <FunctionsList functions={functions} />
              ) : (
                <Stack
                  direction='row'
                  sx={{ minHeight: 200 }}
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                >
                  <Box>
                    <HomeRepairService
                      sx={{ color: '#a7acb2', fontSize: 30 }}
                    />
                    <Typography color='#a7acb2' variant='body1'>
                      {intl.formatMessage(messages.noFunctions)}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PayRollLoaderInForms>
  );
}

FunctionsData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FunctionsData);
