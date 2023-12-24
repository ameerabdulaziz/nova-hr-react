import { Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import style from '../../../../../styles/styles.scss';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/AsTemplateData';
import CompetencyPopup from '../components/AsTemplate/CompetencyPopup';
import StuffPopup from '../components/AsTemplate/StuffPopup';
import messages from '../messages';

function AsTemplateCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const probationPeriodList = [
    {
      id: 1,
      name: intl.formatMessage(messages.true),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.false),
    },
  ];

  const [jobList, setJobList] = useState([]);
  const [competencyList, setCompetencyList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  const [isCompetencyPopupOpen, setIsCompetencyPopupOpen] = useState(false);
  const [isEmployeePopupOpen, setIsEmployeePopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: '',
    arName: '',
    asTemplateMonth: [],
    isPropation: null,
    showStyle: 1,
    exampleRequired: false,
    enDescription: '',
    arDescription: '',

    asTemplateCompetency: [],
    asTemplateEmployee: [],
    asTemplateJob: [],
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const jobs = await GeneralListApis(locale).GetJobsList();
      setJobList(jobs.map(item => ({ id: item.jobId, name: item.name })));

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const competency = await api(locale).GetCompetencyList();
      setCompetencyList(competency);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);
        const mappedData = {
          ...dataApi,
          isPropation: dataApi.isPropation ? 1 : 0,
          asTemplateCompetency: dataApi.asTemplateCompetency.map((item) => ({
            id: item.competencyId,
            name: item.name,
            totalGrade: item.totalGrade,
          })),
          asTemplateMonth: dataApi.asTemplateMonth.map((item) => ({
            id: item.monthId,
            name: item.name,
          })),
          asTemplateEmployee: dataApi.asTemplateEmployee.map((item) => ({
            ...item,
            isSelect: true,
          }))
        };

        setFormInfo(mappedData);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = { ...formInfo };

    formData.isPropation = Boolean(formData.isPropation);

    formData.asTemplateMonth = formData.asTemplateMonth.map((item) => ({
      monthId: item.id,
      name: item.name,
    }));

    formData.asTemplateEmployee = formData.asTemplateEmployee.map((item) => ({
      employeeId: item.employeeId,
      name: item.employeeName,
    }));

    formData.asTemplateCompetency = formData.asTemplateCompetency.map(
      (item) => ({
        competencyId: item.id,
        name: item.name,
        totalGrade: item.totalGrade,
      })
    );

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Assessment/AsTemplate');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);

    const jobsIds = formInfo.asTemplateJob.map((item) => item.id);

    const employeeIds = formInfo.asTemplateEmployee.map((item) => item.employeeId);

    try {
      const dataApi = await api(locale).GetEmployee(
        id,
        jobsIds,
        Boolean(formInfo.isPropation)
      );

      const mappedEmployee = dataApi.map((item) => {
        const isSelect = employeeIds.includes(item.employeeId);
        return { ...item, isSelect };
      });

      setFormInfo(prev => ({ ...prev, asTemplateEmployee: mappedEmployee }));
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }, [formInfo]);

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Assessment/AsTemplate');
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onRadioInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onJobsAutoCompleteChange = (value, name) => {
    if (formInfo.isPropation !== null) {
      setFormInfo((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (formInfo.asTemplateJob.length > 0 && formInfo.isPropation !== null) {
        fetchEmployees();
      }
    } else {
      toast.error(intl.formatMessage(messages.probationPeriodValueIsRequired));
    }
  };

  const onMultiAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCompetencyPopupBtnClick = () => {
    setIsCompetencyPopupOpen(true);
  };

  const onCompetencySave = (items) => {
    setFormInfo((prev) => ({
      ...prev,
      asTemplateCompetency: items,
    }));

    setIsCompetencyPopupOpen(false);
  };

  const onCompetencyRemove = (id) => {
    const clonedItems = [...formInfo.asTemplateCompetency];
    const indexToRemove = clonedItems.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      clonedItems.splice(indexToRemove, 1);
      setFormInfo((prev) => ({
        ...prev,
        asTemplateCompetency: clonedItems,
      }));
    }
  };

  const onEmployeePopupBtnClick = async () => {
    if (formInfo.isPropation !== null) {
      setIsEmployeePopupOpen(true);
    } else {
      toast.error(intl.formatMessage(messages.probationPeriodValueIsRequired));
    }
  };

  const onEmployeeSave = (items) => {
    setFormInfo((prev) => ({
      ...prev,
      asTemplateEmployee: items,
    }));

    setIsEmployeePopupOpen(false);
  };

  const onEmployeeRemove = (index) => {
    const clonedItems = [...formInfo.asTemplateEmployee];

    clonedItems.splice(index, 1);

    setFormInfo((prev) => ({
      ...prev,
      asTemplateEmployee: clonedItems,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <CompetencyPopup
        isOpen={isCompetencyPopupOpen}
        setIsOpen={setIsCompetencyPopupOpen}
        onSave={onCompetencySave}
        selectedCompetency={formInfo.asTemplateCompetency}
        competencyList={competencyList}
      />

      <StuffPopup
        isOpen={isEmployeePopupOpen}
        setIsOpen={setIsEmployeePopupOpen}
        onSave={onEmployeeSave}
        selectedStuff={formInfo.asTemplateEmployee}
        jobList={jobList}
        probationPeriod={Boolean(formInfo.isPropation)}
      />

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={3} mt={0} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.templateInfo)}
                </Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <TextField
                      name='enName'
                      value={formInfo.enName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.templateName)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      name='arName'
                      value={formInfo.arName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.arTemplateName)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={probationPeriodList}
                      value={
                        probationPeriodList.find(
                          (item) => item.id === formInfo.isPropation
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      onChange={(_, value) => onAutoCompleteChange(value, 'isPropation')
                      }
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label={intl.formatMessage(
                            messages.probationPeriodTemplate
                          )}
                        />
                      )}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='enDescription'
                      value={formInfo.enDescription}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.description)}
                      fullWidth
                      variant='outlined'
                      required
                      multiline
                      rows={1}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='arDescription'
                      value={formInfo.arDescription}
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.arDescription)}
                      fullWidth
                      variant='outlined'
                      required
                      multiline
                      rows={1}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      options={jobList}
                      multiple
                      disableCloseOnSelect
                      className={`${style.AutocompleteMulSty} ${
                        locale === 'ar' ? style.AutocompleteMulStyAR : null
                      }`}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      value={formInfo.asTemplateJob}
                      renderOption={(props, option, { selected }) => (
                        <li {...props} >
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      getOptionLabel={(option) => (option ? option.name : '')}
                      onChange={(_, value) => onJobsAutoCompleteChange(value, 'asTemplateJob')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.jobs)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      options={monthList}
                      multiple
                      disableCloseOnSelect
                      className={`${style.AutocompleteMulSty} ${
                        locale === 'ar' ? style.AutocompleteMulStyAR : null
                      }`}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      value={formInfo.asTemplateMonth}
                      renderOption={(props, option, { selected }) => (
                        <li {...props} >
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                            checkedIcon={<CheckBoxIcon fontSize='small' />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      getOptionLabel={(option) => (option ? option.name : '')}
                      onChange={(_, value) => onMultiAutoCompleteChange(value, 'asTemplateMonth')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={intl.formatMessage(messages.months)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControl>
                      <FormLabel>{intl.formatMessage(messages.showStyles)}</FormLabel>
                      <RadioGroup
                        row
                        value={formInfo.showStyle}
                        onChange={onRadioInputChange}
                        name='showStyle'
                      >
                        <FormControlLabel
                          value='1'
                          control={<Radio />}
                          label={intl.formatMessage(messages.oneByOne)}
                        />
                        <FormControlLabel
                          value='2'
                          control={<Radio />}
                          label={intl.formatMessage(messages.list)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.exampleRequired}
                          onChange={onCheckboxChange}
                          name='exampleRequired'
                        />
                      }
                      label={intl.formatMessage(messages.addExample)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
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
                      {intl.formatMessage(messages.competencyInfo)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onCompetencyPopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addOrChangeCompetency)}
                    </Button>
                  </Grid>
                </Grid>

                {formInfo.asTemplateCompetency.length > 0 ? (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.competencyName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.totalGrade)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.actions)}
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {formInfo.asTemplateCompetency.map((competency) => (
                          <TableRow
                            key={competency.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {competency.name}
                            </TableCell>
                            <TableCell>{competency.totalGrade}</TableCell>
                            <TableCell>
                              <IconButton
                                color='error'
                                onClick={() => onCompetencyRemove(competency.id)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <DescriptionIcon
                        sx={{ color: '#a7acb2', fontSize: 30 }}
                      />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noCompetencyFound)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
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
                      {intl.formatMessage(messages.stuffInfo)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onEmployeePopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addOrChangeStuff)}
                    </Button>
                  </Grid>
                </Grid>

                {formInfo.asTemplateEmployee.length > 0 ? (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {intl.formatMessage(messages.departmentName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.jobName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.employeeName)}
                          </TableCell>
                          <TableCell>
                            {intl.formatMessage(messages.actions)}
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {formInfo.asTemplateEmployee.map((employee, index) => (
                          <TableRow
                            key={employee.employeeId}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {employee.organizationName}
                            </TableCell>
                            <TableCell>{employee.jobName}</TableCell>
                            <TableCell>{employee.employeeName}</TableCell>
                            <TableCell>
                              <IconButton
                                color='error'
                                onClick={() => onEmployeeRemove(index)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <PeopleIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noStuffFound)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Stack direction='row' gap={2}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>

                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </PayRollLoader>
  );
}

AsTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsTemplateCreate);
