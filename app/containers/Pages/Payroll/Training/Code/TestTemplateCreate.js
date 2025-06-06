import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import GeneralListApis from '../../api/GeneralListApis';
import assessmentMessages from '../../Assessment/messages';
import PayRollLoader from '../../Component/PayRollLoader';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/TestTemplateData';
import EmployeeList from '../components/TestTemplate/EmployeeList';
import QuestionInfo from '../components/TestTemplate/QuestionInfo';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function TestTemplateCreate(props) {
  const { intl } = props;

  const submitBtnRef = useRef(null);

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;
  const trainingId = location.state?.trainingId ?? null;

  const [trainingList, setTrainingList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [questionTypesList, setQuestionTypesList] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [dateError, setDateError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: '',
    arName: '',
    trainingId,
    fromDate: null,
    toDate: null,
    enDescription: '',
    arDescription: '',
    showStyle: '1',

    questionList: [],
  });

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const questionTypes = await GeneralListApis(
        locale
      ).GetSurveyQuestionTypeList();
      setQuestionTypesList(questionTypes);

      const training = await api(locale).getTrainingList(Boolean(id));
      setTrainingList(training);

      const questions = await api(locale).getQuestionList();
      setQuestionList(questions);

      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        setFormInfo(dataApi);

        const mappedEmployees = dataApi.employeeList.map((item) => ({
          id: item.employeeId,
          name: item.employeeName,
        }));

        setEmployees(mappedEmployees);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (Object.values(dateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    const mappedEmployees = employees.map((item) => item.id);

    const questions = formInfo.questionList.map((item) => ({
      id: item.isNew ? 0 : item.questionId,
      questionTypeId: item.questionTypeId,
      enName: item.enName,
      arName: item.arName,
      grade: item.grade,
      trTestChoice: formInfo.trainingId === 1 ? [] : item.choiceList.map((item) => ({
        id: item.isNew ? 0 : item.id,
        isCorrect: item.isCorrect,
        enName: item.enName,
        arName: item.arName,
      })),
    }));

    const formData = {
      id: formInfo.id,

      enName: formInfo.enName,
      arName: formInfo.arName,
      fromDate: formateDate(formInfo.fromDate),
      toDate: formateDate(formInfo.toDate),
      enDescription: formInfo.enDescription,
      arDescription: formInfo.arDescription,
      showStyle: formInfo.showStyle,
      trainingId: formInfo.trainingId,

      questionList: questions,
      employeeList: mappedEmployees,
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push(SITEMAP.training.TestTemplate.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitBtnClick = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.training.TestTemplate.route);
  };

  const onDatePickerChange = (value, name) => {
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onRadioInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onTrainingAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      trainingId: value !== null ? value.id : null,
    }));

    if (value) {
      const mappedEmployees = value.employeeList.map((item) => ({
        id: item.employeeId,
        name: item.employeeName,
      }));

      setEmployees(mappedEmployees);
    }
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form onSubmit={onFormSubmit}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(assessmentMessages.templateInfo)}
                </Typography>

                <Grid container spacing={3} mt={0}>
                  <Grid item xs={12} md={4} lg={4} xl={3} >
                    <TextField
                      name='enName'
                      value={formInfo.enName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(
                        assessmentMessages.templateName
                      )}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4} lg={4} xl={3}>
                    <TextField
                      name='arName'
                      value={formInfo.arName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(
                        assessmentMessages.arTemplateName
                      )}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4} lg={4} xl={3}>
                    <Autocomplete
                      options={trainingList}
                      value={getAutoCompleteValue(
                        trainingList,
                        formInfo.trainingId
                      )}
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onTrainingAutoCompleteChange(value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.trainingName)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} md={3} lg={2} xl={1.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(payrollMessages.fromdate)}
                        value={
                          formInfo.fromDate ? dayjs(formInfo.fromDate) : null
                        }
                        sx={{ width: '100%' }}
                        onChange={(date) => onDatePickerChange(date, 'fromDate')
                        }
                        onError={(error) => {
                          setDateError((prevState) => ({
                            ...prevState,
                            fromDate: error !== null,
                          }));
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={6} md={3} lg={2} xl={1.5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={intl.formatMessage(payrollMessages.todate)}
                        value={formInfo.toDate ? dayjs(formInfo.toDate) : null}
                        sx={{ width: '100%' }}
                        onChange={(date) => onDatePickerChange(date, 'toDate')}
                        onError={(error) => {
                          setDateError((prevState) => ({
                            ...prevState,
                            toDate: error !== null,
                          }));
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid> 

                  <Grid item xs={12}></Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='enDescription'
                      value={formInfo.enDescription}
                      onChange={onInputChange}
                      label={intl.formatMessage(assessmentMessages.description)}
                      fullWidth
                      variant='outlined'
                      required
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='arDescription'
                      value={formInfo.arDescription}
                      onChange={onInputChange}
                      label={intl.formatMessage(
                        assessmentMessages.arDescription
                      )}
                      fullWidth
                      variant='outlined'
                      required
                      multiline
                      rows={1}
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControl>
                      <FormLabel>
                        {intl.formatMessage(assessmentMessages.showStyles)}
                      </FormLabel>

                      <RadioGroup
                        row
                        value={formInfo.showStyle}
                        onChange={onRadioInputChange}
                        name='showStyle'
                      >
                        <FormControlLabel
                          value='1'
                          control={<Radio />}
                          label={intl.formatMessage(
                            assessmentMessages.oneByOne
                          )}
                        />
                        <FormControlLabel
                          value='2'
                          control={<Radio />}
                          label={intl.formatMessage(assessmentMessages.list)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {employees.length > 0 && (
                    <Grid item xs={12}>
                      <EmployeeList employees={employees} />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>

            {/* TODO: find a suitable way to submit form */}
            <Box sx={{ display: 'none' }}>
              <button type='submit' ref={submitBtnRef}>
								Submit
              </button>
            </Box>
          </form>
        </Grid>

        <Grid item xs={12}>
          <QuestionInfo
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            questionList={questionList}
            questionTypesList={questionTypesList}
          />
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

TestTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TestTemplateCreate);
