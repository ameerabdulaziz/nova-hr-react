import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import ApiData from '../api/PenaltyTransData';
import messages from '../messages';
import Payrollmessages from '../../messages';
import { useSelector } from 'react-redux';
import notif from 'enl-api/ui/notifMessage';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  Tooltip,
} from '@mui/material';
import useStyles from '../../Style';
import PropTypes from 'prop-types';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GeneralListApis from '../../api/GeneralListApis';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL } from '../../api/ServerConfig';
import { NavLink } from 'react-router-dom';
import EmployeeData from '../../Component/EmployeeData';

function PenaltyCreate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  debugger;

  const location = useLocation();
  const { id } = location.state ?? 0;
  const [processing, setprocessing] = useState(false);
  const { classes, cx } = useStyles();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [data, setdata] = useState({
    id: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    docName: '',
    employeeId: '',
    employeeName: '',
    elementId: '',
    elementName: '',
    monthId: '',
    monthName: '',
    note: '',
    penaltyDetailId: '',
    penaltyTypeId: '',
    penaltyTypeName: '',
    penaltyId: '',
    penaltyName: '',
    superEmployeeId: '',
    superEmployeeName: '',
    value: '',
    yearId: '',
    yearName: '',
    job: '',
    organization: '',
    hiringDate: '',
    superJob: '',
    superOrganization: '',
    superHiringDate: '',
    month: '',
    sixMonth: '',
    year: '',
    hiringDateNo: '',
    lastDate: '',
    uploadedFile: null,
    docName: '',
  });
  const [YearList, setYearList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [PenaltyList, setPenaltyList] = useState([]);
  const [PenaltyTypeList, setPenaltyTypeList] = useState([]);

  const history = useHistory();

  const handleChange = (event) => {
    debugger;

    if (event.target.name == 'note')
      setdata((prevFilters) => ({
        ...prevFilters,
        note: event.target.value,
      }));

    if (event.target.name == 'value')
      setdata((prevFilters) => ({
        ...prevFilters,
        value: event.target.value,
      }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger;
      setprocessing(true);
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        history.push(`/app/Pages/HR/PenaltyTransList`);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  async function oncancel() {
    history.push(`/app/Pages/HR/PenaltyTransList`);
  }
  async function fetchData() {
    debugger;
    const years = await GeneralListApis(locale).GetYears();
    setYearList(years);

    const months = await GeneralListApis(locale).GetMonths();
    setMonthList(months);

    const penalties = await GeneralListApis(locale).GetPenaltyList();
    setPenaltyList(penalties);

    const dataApi = await ApiData(locale).Get(id ?? 0);
    if (dataApi.id != 0) setdata(dataApi);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function getPenaltyData(id) {
    debugger;
    if (!id) {
      setdata((prevFilters) => ({
        ...prevFilters,
        elementId: 0,
        elementName: '',
        penaltyDetailId: 0,
        penaltyTypeId: 0,
        penaltyTypeName: '',
        value: '',
      }));
      setPenaltyTypeList([]);
      return;
    }
    const result = await ApiData(locale).GetPenaltyTypesListByPenltyId(
      id,
      data.employeeId
    );
    setdata((prevFilters) => ({
      ...prevFilters,
      elementId: result.elementId,
      elementName: result.elementName,
      penaltyDetailId: result.selected.penaltyDetailId,
      penaltyTypeId: result.selected.id,
      penaltyTypeName: result.selected.name,
      value: result.selected.value,
    }));
    setPenaltyTypeList(result.penaltyTypeList);
  }

  return (
    <div>
      <PapperBlock
        whiteBg
        icon="border_color"
        title={
          data.id == 0
            ? intl.formatMessage(messages.createRewardTitle)
            : intl.formatMessage(messages.updateRewardTitle)
        }
        desc={''}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label={intl.formatMessage(messages.date)}
                  value={data.date}
                  onChange={(date) => {
                    debugger;
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      date: format(new Date(date), 'yyyy-MM-dd'),
                    }));
                  }}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="yearid"
                options={YearList}
                value={{ id: data.yearId, name: data.yearName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
                  if (value !== null) {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      yearId: value.id,
                      yearName: value.name,
                    }));
                  } else {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      yearId: 0,
                      yearName: '',
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="yearId"
                    required
                    label={intl.formatMessage(messages.yearName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Autocomplete
                id="monthId"
                options={MonthList}
                value={{ id: data.monthId, name: data.monthName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
                  if (value !== null) {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      monthId: value.id,
                      monthName: value.name,
                    }));
                  } else {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      monthId: 0,
                      monthName: '',
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="monthId"
                    required
                    label={intl.formatMessage(messages.monthName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="employeeId"
                        options={EmployeeList}
                        value={{ id: data.employeeId, name: data.employeeName }}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === '' ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ''
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              employeeId: value.id,
                              employeeName: value.name,
                            }));
                            getEmployeeData(value.id, false);
                          } else {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              employeeId: 0,
                              employeeName: '',
                            }));
                            getEmployeeData(0, false);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="employeeId"
                            required
                            label={intl.formatMessage(messages.employeeName)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Autocomplete
                        id="monthId"
                        options={MonthList}
                        value={{ id: data.monthId, name: data.monthName }}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === '' ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ''
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              monthId: value.id,
                              monthName: value.name,
                            }));
                          } else {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              monthId: 0,
                              monthName: '',
                            }));
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="monthId"
                            required
                            label={intl.formatMessage(messages.monthName)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <FormControl variant="standard">
                        <div className={classes.actions}>
                          <Tooltip title="Upload">
                            <Button
                              variant="contained"
                              color="secondary"
                              component="label"
                            >
                              <AddIcon
                                className={cx(
                                  smUp && classes.leftIcon,
                                  classes.iconSmall
                                )}
                              />
                              {smUp && ' '} Upload
                              <input
                                hidden
                                type="file"
                                name="file"
                                id="inputGroupFile"
                                onChange={(e) => {
                                  debugger;
                                  setdata((prevFilters) => ({
                                    ...prevFilters,
                                    uploadedFile: e.target.files[0],
                                  }));
                                }}
                                accept="image/png, image/jpeg, image/jpg, image/apng, image/webp, image/svg+xml"
                              />
                            </Button>
                          </Tooltip>
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      {data.docName && (
                        <NavLink
                          to={{ pathname: `${ServerURL}${data.docName}` }}
                          target="_blank"
                        >
                          <Button size="small">Open File</Button>
                        </NavLink>
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <EmployeeData
                        data={data}
                        setdata={setdata}
                        GetEmployeePenalties={true}
                      ></EmployeeData>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <EmployeeData
                        data={data}
                        setdata={setdata}
                        isSuper={true}
                      ></EmployeeData>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        id="penaltyId"
                        options={PenaltyList}
                        value={{ id: data.penaltyId, name: data.penaltyName }}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === '' ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ''
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              penaltyId: value.id,
                              penaltyName: value.name,
                            }));
                            getPenaltyData(value.id);
                          } else {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              penaltyId: 0,
                              penaltyName: '',
                            }));
                            getPenaltyData(0);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="rewardsid"
                            required
                            label={intl.formatMessage(messages.penaltyName)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="elementName"
                        name="elementName"
                        value={data.elementName}
                        label={intl.formatMessage(messages.elementName)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="organization"
                        name="organization"
                        value={data.organization}
                        label={intl.formatMessage(messages.organization)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="hiringDate"
                        name="hiringDate"
                        value={data.hiringDate === null ? '' : data.hiringDate}
                        label={intl.formatMessage(messages.hiringDate)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}></Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        id="month"
                        name="month"
                        value={data.month}
                        label={intl.formatMessage(messages.month)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        id="sixMonth"
                        name="sixMonth"
                        value={data.sixMonth}
                        label={intl.formatMessage(messages.sixMonth)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        id="year"
                        name="year"
                        value={data.year}
                        label={intl.formatMessage(messages.year)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        id="hiringDateNo"
                        name="hiringDateNo"
                        value={data.hiringDateNo}
                        label={intl.formatMessage(messages.hiringDateNo)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TextField
                        id="lastDate"
                        name="lastDate"
                        value={data.lastDate}
                        label={intl.formatMessage(messages.lastDate)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid
                    container
                    spacing={3}
                    alignItems="flex-start"
                    direction="row"
                  >
                    <Grid item xs={12} md={4}>
                      <Autocomplete
                        id="superempId"
                        options={SuperEmployeeList}
                        value={{
                          id: data.superEmployeeId,
                          name: data.superEmployeeName,
                        }}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === '' ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ''
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              superEmployeeId: value.id,
                              superEmployeeName: value.name,
                            }));
                            getEmployeeData(value.id, true);
                          } else {
                            setdata((prevFilters) => ({
                              ...prevFilters,
                              superEmployeeId: 0,
                              superEmployeeName: '',
                            }));
                            getEmployeeData(0, true);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="superempId"
                            required
                            label={intl.formatMessage(
                              messages.superEmployeeName
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="superJob"
                        name="superJob"
                        value={data.superJob}
                        label={intl.formatMessage(messages.job)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="superOrganization"
                        name="superOrganization"
                        value={data.superOrganization}
                        label={intl.formatMessage(messages.organization)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="superHiringDate"
                        name="superHiringDate"
                        value={
                          data.superHiringDate === null
                            ? ''
                            : data.superHiringDate
                        }
                        label={intl.formatMessage(messages.hiringDate)}
                        className={classes.field}
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                id="penaltyId"
                options={PenaltyList}
                value={{ id: data.penaltyId, name: data.penaltyName }}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === '' || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
                  if (value !== null) {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      penaltyId: value.id,
                      penaltyName: value.name,
                    }));
                    getPenaltyData(value.id);
                  } else {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      penaltyId: 0,
                      penaltyName: '',
                    }));
                    getPenaltyData(0);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="rewardsid"
                    required
                    label={intl.formatMessage(messages.penaltyName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="elementName"
                name="elementName"
                value={data.elementName}
                label={intl.formatMessage(messages.elementName)}
                className={classes.field}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="penaltyTypeId"
                options={PenaltyTypeList}
                value={{
                  penaltyDetailId: data.penaltyDetailId,
                  id: data.penaltyTypeId,
                  name: data.penaltyTypeName,
                }}
                isOptionEqualToValue={(option, value) =>
                  value.penaltyDetailId === 0 ||
                  value.penaltyDetailId === '' ||
                  option.penaltyDetailId === value.penaltyDetailId
                }
                getOptionLabel={(option) => (option.name ? option.name : '')}
                onChange={(event, value) => {
                  if (value !== null) {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      penaltyTypeId: value.id,
                      penaltyTypeName: value.name,
                      penaltyDetailId: value.penaltyDetailId,
                      value: value.value,
                    }));
                  } else {
                    setdata((prevFilters) => ({
                      ...prevFilters,
                      penaltyTypeId: 0,
                      penaltyTypeName: '',
                      penaltyDetailId: value.penaltyDetailId,
                      value: '',
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="penaltyTypeId"
                    required
                    label={intl.formatMessage(messages.penaltyTypeName)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="value"
                name="value"
                value={data.value}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.value)}
                required
                className={classes.field}
                variant="outlined"
                //disabled={data.value ? true : false}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                id="note"
                name="note"
                value={data.note}
                onChange={(e) => handleChange(e)}
                label={intl.formatMessage(messages.note)}
                className={classes.field}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
                disabled={processing}
              >
                {processing && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={oncancel}
              >
                <FormattedMessage {...Payrollmessages.cancel} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>
    </div>
  );
}
PenaltyCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(PenaltyCreate);
