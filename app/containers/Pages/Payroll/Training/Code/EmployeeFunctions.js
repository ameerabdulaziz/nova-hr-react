import {
  Autocomplete,
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
import GeneralListApis from '../../api/GeneralListApis';
import NameList from '../../Component/NameList';
import PayRollLoader from '../../Component/PayRollLoader';
import payrollMessages from '../../messages';
import api from '../api/EmployeeFunctionsData';
import messages from '../messages';

function EmployeeFunctions(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [functionsList, setFunctionsList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formInfo, setFormInfo] = useState({
    functionId: null,
    organizationId: null,
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const functions = await GeneralListApis(locale).TrFunctions();
      setFunctionsList(functions);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
    } catch (error) {
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

    const mappedEmployees = employees
      .filter((item) => item.isSelected)
      .map((item) => item.id);

    setIsLoading(true);

    const submitter = evt.nativeEvent.submitter.name;

    try {
      if (submitter === 'save') {
        await api(locale).save(mappedEmployees, formInfo);
        toast.success(notif.saved);
      } else if (submitter === 'get') {
        const employeeList = await api(locale).getList(formInfo);

        setEmployees(
          employeeList.map((item) => ({
            id: item.employeeId,
            name: item.employeeName,
            isSelected: true,
          }))
        );
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
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
                    <Autocomplete
                      options={functionsList}
                      value={
                        functionsList.find(
                          (item) => item.id === formInfo.functionId
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'functionId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.functions)}
                        />
                      )}
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
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <NameList
                  dataList={employees}
                  setdataList={setEmployees}
                  Key='Employee'
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction='row' gap={2}>
                  <Button
                    variant='contained'
                    color='secondary'
                    name='save'
                    type='submit'
                  >
                    {intl.formatMessage(payrollMessages.save)}
                  </Button>

                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    name='get'
                  >
                    {intl.formatMessage(messages.getEmployees)}
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

EmployeeFunctions.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeFunctions);
