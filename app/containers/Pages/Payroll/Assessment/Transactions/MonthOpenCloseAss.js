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
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import api from '../api/MonthOpenCloseAssData';
import EmployeePopup from '../components/MonthOpenCloseAss/EmployeePopup';
import messages from '../messages';

function MonthOpenCloseAss(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);

  const title = localStorage.getItem('MenuName');

  const [organizationList, setOrganizationList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    id: 0,
    organizationId: branchId,
    monthId: null,
    yearId: null,
    employeeId: null,

    employeeClosed: false,
    openDate: '',
    closedMonth: false,
    openUserId: null,
    closeDate: null,
    closeUserId: null,
    notAllowOpen: null,
    skipJobHandling: null,
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetBranchList();
      setOrganizationList(organizations);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      if (branchId) {
        const response = await api(locale).GetOpenMonth(branchId);

        setFormInfo((prev) => ({
          ...prev,
          yearId: response.yearId,
          monthId: response.monthId,
          closedMonth: Boolean(response.closedMonth),
          employeeClosed: Boolean(response.employeeClosed),
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onOrganizationAutoCompleteChange = async (value) => {
    setIsLoading(true);

    try {
      if (value !== null) {
        const response = await api(locale).GetOpenMonth(value.id);

        setFormInfo((prev) => ({
          ...prev,
          yearId: response.yearId,
          monthId: response.monthId,
          closedMonth: Boolean(response.closedMonth),
          employeeClosed: Boolean(response.employeeClosed),
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }

    setFormInfo((prev) => ({
      ...prev,
      organizationId: value !== null ? value.id : null,
    }));
  };

  const onEmployeePopupSave = async () => {
    setIsLoading(true);

    try {
      await api(locale).OpenMonth(formInfo);
      setFormInfo((prev) => ({ ...prev, closedMonth: false }));
      toast.success(intl.formatMessage(messages.monthOpenedSuccessfully));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormInputs = () => {
    if (!formInfo.monthId || !formInfo.yearId || !formInfo.organizationId) {
      toast.error(
        intl.formatMessage(messages.monthAndYearAndOrganizationAreRequired)
      );

      return false;
    }

    return true;
  };

  const onOpenMonthBtnClick = async () => {
    const isValid = validateFormInputs();

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const employees = await api(locale).GetEmployeeTemplateChange(formInfo.monthId);

      setEmployeeList(employees.map(item => ({ ...item, isSelect: false })));

      if (employees.length > 0) {
        setIsPopupOpen(true);
      } else {
        onEmployeePopupSave();
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onCloseMonthBtnClick = async () => {
    const isValid = validateFormInputs();

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      await api(locale).CloseMonth(formInfo);
      setFormInfo((prev) => ({ ...prev, closedMonth: true }));
      toast.success(intl.formatMessage(messages.monthClosedSuccessfully));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onEmpAssessmentBtnClick = async () => {
    const isValid = validateFormInputs();

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const body = {
      organizationId: formInfo.organizationId,
      yearId: formInfo.yearId,
      monthId: formInfo.monthId,
    };

    try {
      await api(locale).EmpAssessment(body);
      toast.success(
        intl.formatMessage(
          formInfo.employeeClosed
            ? messages.employeeAssessmentEnabledSuccessfully
            : messages.employeeAssessmentStoppedSuccessfully
        )
      );
      setFormInfo((prev) => ({
        ...prev,
        employeeClosed: !prev.employeeClosed,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <EmployeePopup
        employeeList={employeeList}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        onSave={onEmployeePopupSave}
      />

      <Grid container spacing={2} direction='row'>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>{title}</Typography>

              <Grid container spacing={3} mt={0} direction='row'>
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
                    onChange={(_, value) => onOrganizationAutoCompleteChange(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label={intl.formatMessage(messages.organization)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={monthList}
                    value={getAutoCompleteValue(monthList, formInfo.monthId)}
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    disabled={!formInfo.closedMonth}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        disabled={!formInfo.closedMonth}
                        label={intl.formatMessage(messages.month)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={yearList}
                    value={getAutoCompleteValue(yearList, formInfo.yearId)}
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    disabled={!formInfo.closedMonth}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'yearId')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        disabled={!formInfo.closedMonth}
                        label={intl.formatMessage(messages.year)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction='row' gap={2}>
                    <Button
                      variant='contained'
                      disabled={!formInfo.closedMonth}
                      color='secondary'
                      onClick={onOpenMonthBtnClick}
                    >
                      <FormattedMessage {...messages.openMonth} />
                    </Button>

                    <Button
                      variant='contained'
                      disabled={formInfo.closedMonth}
                      color='error'
                      onClick={onCloseMonthBtnClick}
                    >
                      <FormattedMessage {...messages.closeMonth} />
                    </Button>

                    <Button
                      variant='contained'
                      disabled={formInfo.closedMonth}
                      color='warning'
                      onClick={onEmpAssessmentBtnClick}
                    >
                      {intl.formatMessage(
                        formInfo.employeeClosed
                          ? messages.enableEmployeeSelfAssessment
                          : messages.stopEmployeeSelfAssessment
                      )}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>
                {intl.formatMessage(messages.openAssessmentToEditFor)}
              </Typography>

              <Grid container mt={0} spacing={3}>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={employeeList}
                    value={getAutoCompleteValue(
                      employeeList,
                      formInfo.employeeId
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id
                    }
                    getOptionLabel={(option) => (option ? option.name : '')}
                    renderOption={(propsOption, option) => (
                      <li {...propsOption} key={option.id}>
                        {option.name}
                      </li>
                    )}
                    onChange={(_, value) => onAutoCompleteChange(value, 'employeeId')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label={intl.formatMessage(messages.employeeName)}
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <Button variant='contained' color='primary'>
                    <FormattedMessage {...messages.reset} />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Typography variant='h6'>
                {intl.formatMessage(messages.resetPeerAppraisalSetting)}
              </Typography>

              <Typography variant='body1' mt={3} color='gray'>
                {intl.formatMessage(
                  messages.thisActionWillResetPeerAppraisalForAllEmployeeInCurrentMonth
                )}
              </Typography>

              <Grid container mt={0} spacing={3}>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    <FormattedMessage {...messages.reset} />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </PayRollLoader>
  );
}

MonthOpenCloseAss.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(MonthOpenCloseAss);
