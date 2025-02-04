import {
  Autocomplete, Button, Grid, TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import GeneralListApis from '../../api/GeneralListApis';
import AlertPopup from '../../Component/AlertPopup';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmployeeFunctionsData';
import EmployeeList from '../components/EmployeeFunctions/EmployeeList';
import messages from '../messages';

function EmployeeFunctions(props) {
  const { intl } = props;

  const pageTitle = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);

  const [employeeList, setEmployeeList] = useState([]);
  const [functionsList, setFunctionsList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFunctionsRequestPopupOpen, setIsFunctionsRequestPopupOpen] =		useState(false);

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

      const employeesResponse = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeesResponse);
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

    const mappedEmployees = employees.map((item) => item.id);

    setIsLoading(true);

    const submitter = evt.nativeEvent.submitter.name;

    try {
      if (submitter === 'save') {
        await api(locale).save(mappedEmployees, formInfo);
        toast.success(notif.saved);
      } else if (submitter === 'get') {
        const employeesResponse = await api(locale).getList(formInfo);

        setEmployees(
          employeesResponse.map((item) => ({
            id: item.employeeId,
            name: item.employeeName,
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

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const onAddBtnClick = async () => {
    if (!selectedEmployee) {
      toast.error(intl.formatMessage(messages.pleaseSelectEmployeeFirst));
      return;
    }

    if (!formInfo.functionId) {
      toast.error(intl.formatMessage(messages.pleaseSelectFunctionFirst));
      return;
    }

    if (!formInfo.organizationId) {
      toast.error(intl.formatMessage(messages.pleaseSelectOrganizationFirst));
      return;
    }

    const employee = employees.find((item) => item.id === selectedEmployee.id);

    if (employee) {
      toast.error(intl.formatMessage(messages.youAlreadySelectedThisEmployee));
      return;
    }

    setIsLoading(true);

    try {
      const isQualified = await api(locale).isQualifiedEmployee({
        employeeId: selectedEmployee.id,
        functionId: formInfo.functionId,
      });

      if (isQualified) {
        setEmployees((prev) => [...prev, selectedEmployee]);
        setSelectedEmployee(null);
      } else {
        setIsFunctionsRequestPopupOpen(true);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onQualificationRequestConfirm = async () => {
    const payload = {
      id: 0,
      requestDate: formateDate(new Date()),
      functionId: formInfo.functionId,
      employeeId: selectedEmployee.id,
      organizationId: formInfo.organizationId,
    };

    setIsLoading(true);

    try {
      await api(locale).saveEmployeeFunctionsRequest(payload);
      toast.success(intl.formatMessage(messages.functionsRequestSentSuccessfully));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <AlertPopup
        handleClose={() => {
          setIsFunctionsRequestPopupOpen(false);
        }}
        open={isFunctionsRequestPopupOpen}
        messageData={intl.formatMessage(
          messages.employeeIsNotQualifiedMakeRequest
        )}
        callFun={onQualificationRequestConfirm}
      />

      <PapperBlock whiteBg icon='border_color' desc='' title={pageTitle}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={4} xl={3}>
              <Autocomplete
                options={functionsList}
                value={getAutoCompleteValue(functionsList, formInfo.functionId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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

            <Grid item xs={12} md={5} lg={4} xl={3}>
              <Autocomplete
                options={organizationList}
                value={getAutoCompleteValue(
                  organizationList,
                  formInfo.organizationId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    label={intl.formatMessage(payrollMessages.organizationName)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                name='get'
              >
                {intl.formatMessage(messages.getEmployees)}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                name='save'
                type='submit'
              >
                {intl.formatMessage(payrollMessages.save)}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3} alignItems='center'>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={employeeList}
                    value={getAutoCompleteValue(
                      employeeList,
                      selectedEmployee?.id
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => {
                      setSelectedEmployee(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={intl.formatMessage(payrollMessages.employeeName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={onAddBtnClick}
                  >
                    {intl.formatMessage(payrollMessages.add)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <EmployeeList setEmployees={setEmployees} employees={employees} />
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

EmployeeFunctions.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeFunctions);
