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
import templateMessages from '../../Assessment/messages';
import NameList from '../../Component/NameList';
import PayRollLoader from '../../Component/PayRollLoader';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/SurveyTemplateData';
import QuestionInfo from '../components/SurveyTemplate/QuestionInfo';
import messages from '../messages';

function SurveyTemplateCreate(props) {
  const { intl } = props;

  const submitBtnRef = useRef(null);

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const [surveyTypeList, setSurveyTypeList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [questionTypesList, setQuestionTypesList] = useState([]);
  const [questionGroupsList, setQuestionGroupsList] = useState([]);
  const [choicesGroupsList, setChoicesGroupsList] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [dateError, setDateError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    enName: '',
    arName: '',
    surveyTypeId: null,
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
      const surveyTypes = await GeneralListApis(locale).GetSurveyTypeList();
      setSurveyTypeList(surveyTypes);

      const questionTypes = await GeneralListApis(
        locale
      ).GetSurveyQuestionTypeList();
      setQuestionTypesList(questionTypes);

      const groups = await api(locale).getSurveyQuestionGroup();
      setQuestionGroupsList(groups);

      const choices = await api(locale).getSurveyChoiceGroup();
      setChoicesGroupsList(choices);

      const questions = await api(locale).getQuestionList();
      setQuestionList(questions);
      if (id !== 0) {
        const dataApi = await api(locale).getById(id);

        setFormInfo(dataApi);

        const mappedEmployees = dataApi.employeeList.map((item) => ({
          id: item.employeeId,
          name: item.employeeName,
          isSelected: true,
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

    const mappedEmployees = employees
      .filter((item) => item.isSelected)
      .map((item) => item.id);

    const questions = formInfo.questionList.map((item) => ({
      id: item.isNew ? 0 : item.questionId,
      questionGroupId: item.questionGroupId,
      questionTypeId: item.questionTypeId,
      enName: item.enName,
      arName: item.arName,
      choiceGroupId: item.choiceGroupId ?? null,
      commentNumbers: item.commentNumbers,
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
      surveyTypeId: formInfo.surveyTypeId,

      questionList: questions,
      employeeList: mappedEmployees,
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);

      toast.success(notif.saved);
      history.push('/app/Pages/Survey/SurveyTemplate');
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
    history.push('/app/Pages/Survey/SurveyTemplate');
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

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid container spacing={3} mt={0} direction='row'>
        <Grid item xs={12}>
          <form onSubmit={onFormSubmit}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(templateMessages.templateInfo)}
                </Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <TextField
                      name='enName'
                      value={formInfo.enName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(templateMessages.templateName)}
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
                      label={intl.formatMessage(
                        templateMessages.arTemplateName
                      )}
                      fullWidth
                      variant='outlined'
                      autoComplete='off'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={surveyTypeList}
                      value={
                        surveyTypeList.find(
                          (item) => item.id === formInfo.surveyTypeId
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
                      onChange={(_, value) => onAutoCompleteChange(value, 'surveyTypeId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.surveyType)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
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

                  <Grid item xs={12} md={4}>
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

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='enDescription'
                      value={formInfo.enDescription}
                      onChange={onInputChange}
                      label={intl.formatMessage(templateMessages.description)}
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
                      label={intl.formatMessage(templateMessages.arDescription)}
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
                        {intl.formatMessage(templateMessages.showStyles)}
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
                          label={intl.formatMessage(templateMessages.oneByOne)}
                        />
                        <FormControlLabel
                          value='2'
                          control={<Radio />}
                          label={intl.formatMessage(templateMessages.list)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <NameList
                      dataList={employees}
                      setdataList={setEmployees}
                      Key='Employee'
                    />
                  </Grid>
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
            questionGroupsList={questionGroupsList}
            choicesGroupsList={choicesGroupsList}
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

SurveyTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTemplateCreate);
