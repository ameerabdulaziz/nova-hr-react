import {
  Autocomplete, Box, Button, Grid, TextField, Stack, Avatar
} from '@mui/material';
import { format } from 'date-fns';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PayRollLoaderInForms from '../Component/PayRollLoaderInForms';
import GeneralListApis from '../api/GeneralListApis';
import payrollMessages from '../messages';
import api from './api/PrintFormData';
import messages from './messages';

function PrintForm(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const company = useSelector((state) => state.authReducer.companyInfo);

  const documentTitle = 'Print Form - ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const [formInfo, setFormInfo] = useState({
    employeeId: null,
    departmentId: null,
    printFormId: null,
    printFormat: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [printFormList, setPrintFormList] = useState([]);

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printDivRef = useRef(null);

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle,
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const department = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(department);

      const printForm = await api(locale).GetForm();
      setPrintFormList(printForm);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const onEmployeeAutoCompleteChange = async (value) => {
    setFormInfo((prev) => ({
      ...prev,
      employeeId: value !== null ? value.id : null,
    }));
  };

  const onDepartmentAutoCompleteChange = async (value) => {
    setIsLoading(true);

    try {
      const response = await GeneralListApis(locale).GetEmployeeList(null, null, null, value !== null ? value.id : null);

      setEmployeeList(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }

    setFormInfo((prev) => ({
      ...prev,
      departmentId: value !== null ? value.id : null,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    try {
      const response = await api(locale).GetPrintForm(formInfo.employeeId, formInfo.printFormId);

      setFormInfo((prev) => ({ ...prev, printFormat: response }));

      setTimeout(() => {
        printJS();
      }, 10);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4} xl={3}>
              <Autocomplete
                options={departmentList}
                value={getAutoCompleteValue(
                  departmentList,
                  formInfo.departmentId
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onDepartmentAutoCompleteChange(value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={intl.formatMessage(messages.department)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={4} xl={3}>
              <Autocomplete
                options={employeeList}
                value={getAutoCompleteValue(employeeList, formInfo.employeeId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onEmployeeAutoCompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.employee)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={4} xl={3}>
              <Autocomplete
                options={printFormList}
                value={getAutoCompleteValue(printFormList, formInfo.printFormId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'printFormId')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.printForm)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={4} xl={3}>
              <Button variant='contained' type='submit'>
                {intl.formatMessage(payrollMessages.Print)}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box
          ref={printDivRef}
          sx={{
            display: 'none',
            direction: 'ltr',
            '@media print': {
              display: 'block',
            },
            p: 4,
          }}
        >
          <Stack spacing={2} mb={2} >
            <div>
              <img src={company?.logo} alt='' height={45} />
            </div>
          </Stack>

          {parse(formInfo.printFormat)}
        </Box>
      </PapperBlock>
    </PayRollLoaderInForms>
  );
}

PrintForm.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PrintForm);
