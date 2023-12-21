import { Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
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
import React, { useEffect, useState } from 'react';
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
import messages from '../messages';

function AsTemplateCreate(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const location = useLocation();
  const history = useHistory();

  const id = location.state?.id ?? 0;

  const [jobList, setJobList] = useState([]);
  const [competencyList, setCompetencyList] = useState([]);
  const [monthList, setMonthList] = useState([]);

  const [isCompetencyPopupOpen, setIsCompetencyPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formInfo, setFormInfo] = useState({
    id,

    templateName: '',
    arTemplateName: '',
    months: [],
    jobs: [],
    probationPeriod: false,
    showStyles: false,
    addExample: false,
    description: '',
    arDescription: '',

    competency: [],
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
        setFormInfo(dataApi);
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
      competency: items
    }));

    setIsCompetencyPopupOpen(false);
  };

  const onCompetencyRemove = (id) => {
    const clonedItems = [...formInfo.competency];
    const indexToRemove = clonedItems.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      clonedItems.splice(indexToRemove, 1);
      setFormInfo((prev) => ({
        ...prev,
        competency: clonedItems,
      }));
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <CompetencyPopup
        isOpen={isCompetencyPopupOpen}
        setIsOpen={setIsCompetencyPopupOpen}
        onSave={onCompetencySave}
        selectedCompetency={formInfo.competency}
        competencyList={competencyList}
      />

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={3} mt={0} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>
                  {intl.formatMessage(messages.templateInfo)}
                </Typography>

                <Grid container spacing={3} direction='row'>
                  <Grid item xs={12} md={3}>
                    <TextField
                      name='templateName'
                      value={formInfo.templateName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.templateName)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      name='arTemplateName'
                      value={formInfo.arTemplateName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.arTemplateName)}
                      fullWidth
                      variant='outlined'
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
                      value={formInfo.months}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
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
                      onChange={(_, value) => onMultiAutoCompleteChange(value, 'months')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.months)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='description'
                      value={formInfo.description}
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

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.probationPeriod}
                          onChange={onCheckboxChange}
                          name='probationPeriod'
                        />
                      }
                      label={intl.formatMessage(
                        messages.probationPeriodTemplate
                      )}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.showStyles}
                          onChange={onCheckboxChange}
                          name='showStyles'
                        />
                      }
                      label={intl.formatMessage(messages.showStyles)}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.addExample}
                          onChange={onCheckboxChange}
                          name='addExample'
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

                {formInfo.competency.length > 0 ? (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
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
                        {formInfo.competency.map((competency) => (
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
                                onClick={() => onCompetencyRemove(competency.id)}
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
                <Typography variant='h6'>
                  {intl.formatMessage(messages.templateInfo)}
                </Typography>

                <Grid container spacing={3} direction='row'>
                  <Grid item xs={12}></Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      name='templateName'
                      value={formInfo.templateName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.templateName)}
                      fullWidth
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <TextField
                      name='arTemplateName'
                      value={formInfo.arTemplateName}
                      required
                      onChange={onInputChange}
                      label={intl.formatMessage(messages.arTemplateName)}
                      fullWidth
                      variant='outlined'
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
                      value={formInfo.months}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
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
                      onChange={(_, value) => onMultiAutoCompleteChange(value, 'months')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.months)}
                        />
                      )}
                    />
                  </Grid>
                  {/*
      <Grid item xs={12} md={6}>
        <Autocomplete
          options={jobList}
          multiple
          disableCloseOnSelect
          className={`${style.AutocompleteMulSty} ${
            locale === 'ar' ? style.AutocompleteMulStyAR : null
          }`}
          value={formInfo.jobs}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
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
          onChange={(_, value) => onMultiAutoCompleteChange(value, 'jobs')}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label={intl.formatMessage(messages.jobs)}
            />
          )}
        />
      </Grid> */}

                  <Grid item xs={12} md={6}>
                    <TextField
                      name='description'
                      value={formInfo.description}
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

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.probationPeriod}
                          onChange={onCheckboxChange}
                          name='probationPeriod'
                        />
                      }
                      label={intl.formatMessage(
                        messages.probationPeriodTemplate
                      )}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInfo.showStyles}
                          onChange={onCheckboxChange}
                          name='showStyles'
                        />
                      }
                      label={intl.formatMessage(messages.showStyles)}
                    />
                  </Grid>
                </Grid>
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
