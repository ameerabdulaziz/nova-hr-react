import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import style from '../../../../../styles/styles.scss';
import AlertPopup from '../../Component/AlertPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/AsTemplateData';
import CompetencyInfo from '../components/AsTemplate/CompetencyInfo';
import StuffInfo from '../components/AsTemplate/StuffInfo';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function AsTemplateCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const submitBtnRef = useRef(null);

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

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isPropationValue, setIsPropationValue] = useState(null);
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
      setJobList(jobs);

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
          })),
          asTemplateJob: dataApi.asTemplateJob.map((item) => ({
            id: item.jobId,
            name: item.name,
          })),
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

    formData.asTemplateJob = formData.asTemplateJob.map((item) => ({
      jobId: item.id,
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
      history.push(SITEMAP.assessment.AsTemplate.route);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onCancelBtnClick = () => {
    history.push(SITEMAP.assessment.AsTemplate.route);
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

  const onMultiAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onProbationAutoCompleteChange = (value) => {
    setIsPropationValue(value);

    if (formInfo.isPropation === null) {
      setFormInfo((prev) => ({
        ...prev,
        isPropation: value !== null ? value.id : null,
      }));
    }

    if (formInfo.isPropation !== null) {
      setIsConfirmPopupOpen(true);
    }
  };

  const onSubmitBtnClick = () => {
    submitBtnRef.current.click();
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };

  const confirmChangeProbationValue = async () => {
    setFormInfo((prev) => ({
      ...prev,
      isPropation: isPropationValue !== null ? isPropationValue.id : null,
      asTemplateEmployee: [],
      asTemplateJob: [],
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <AlertPopup
        handleClose={closeConfirmPopup}
        open={isConfirmPopupOpen}
        messageData={intl.formatMessage(messages.probationPeriodConfirm)}
        callFun={confirmChangeProbationValue}
      />

      <Grid container spacing={3} mt={0} direction='row'>
        <Grid item xs={12}>
          <form onSubmit={onFormSubmit}>
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
                      autoComplete='off'
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
                      autoComplete='off'
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
                      onChange={(_, value) => onProbationAutoCompleteChange(value)
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
                      autoComplete='off'
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
                      autoComplete='off'
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
                        <li {...props} key={props.id}>
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

                  <Grid item md={3} xs={12}>
                    <FormControl>
                      <FormLabel>
                        {intl.formatMessage(messages.showStyles)}
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

                  <Grid item md={3} xs={12}>
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

            {/* TODO: find a suitable way to submit form */}
            <Box sx={{ display: 'none' }}>
              <button type='submit' ref={submitBtnRef}>
								Submit
              </button>
            </Box>
          </form>
        </Grid>

        <Grid item xs={12}>
          <CompetencyInfo
            formInfo={formInfo}
            competencyList={competencyList}
            setFormInfo={setFormInfo}
          />
        </Grid>

        <Grid item xs={12}>
          <StuffInfo
            formInfo={formInfo}
            jobList={jobList}
            setFormInfo={setFormInfo}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: '16px!important' }}>
              <Stack direction='row' gap={2}>
                <Button
                  variant='contained'
                  onClick={onSubmitBtnClick}
                  size='medium'
                  type='button'
                  color='secondary'
                >
                  <FormattedMessage {...payrollMessages.save} />
                </Button>

                <Button
                  variant='contained'
                  size='medium'
                  color='primary'
                  type='button'
                  onClick={onCancelBtnClick}
                >
                  <FormattedMessage {...payrollMessages.cancel} />
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

AsTemplateCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(AsTemplateCreate);
