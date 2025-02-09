import React, { useEffect, useState } from "react";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GeneralListApis from "../../api/GeneralListApis";
import style from '../../../../../styles/styles.scss'
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { toast } from "react-hot-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";


function AttendanceDeviceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(branchId);
  const [Shift, setShift] = useState(null);
  const [ShiftList, setShiftList] = useState([]);
  const [DateError, setDateError] = useState({});
  const [filterHighlights, setFilterHighlights] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const companyData = getAutoCompleteValue(companyList, company);

    if (Shift && Shift.length > 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: Shift.map((item) => item.name).join(' , '),
      });
    }

    if (FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(FromDate),
      });
    }

    if (ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(ToDate),
      });
    }

    if (companyData) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: companyData.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    let ShiftData = []
    if (Shift !== null) {
      // used to reformat elements data ( combobox ) before send it to api
      Shift.map((ele, index) => {
        ShiftData.push(ele.id)
      })
    }

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    try {
      setIsLoading(true);
      let formData = {
        FromDate: formateDate(FromDate),
        ToDate: formateDate(ToDate),
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).AttendanceDeviceReportApi(formData, ShiftData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
      console.log("err =", err);

    } finally {
      setIsLoading(false);
    }

  };

  async function fetchData() {
    try {
      const shift = await GeneralListApis(locale).GetDeviceList();

      setShiftList(shift);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      name: "id",
      label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
      },
    },
    {
      name: "deviceName",
      label: intl.formatMessage(messages.device),

    },
    {
      name: "countRecord",
      label: intl.formatMessage(messages.recordCount),

    },
    {
      name: "minDate",
      label: intl.formatMessage(messages.MinDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.MinDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "maxDate",
      label: intl.formatMessage(messages.MaxDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.MaxDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

  ];



  const onCompanyAutoCompleteChange = async (value) => {

    let branchId
    let OpenMonthData

    try {
      if (value) {

        branchId = value
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(value, 0);
      }
      else {
        branchId = null
      }

      setFromDate(OpenMonthData ? OpenMonthData.fromDateAtt : null)
      setToDate(OpenMonthData ? OpenMonthData.todateAtt : null)

    }
    catch (err) { }
  }



  useEffect(() => {
    if (company) {
      onCompanyAutoCompleteChange(company)
    }

    if (!company) {
      setFromDate(null)
      setToDate(null)
    }

  }, [company])


  console.log("filterHighlights =", filterHighlights);



  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <Autocomplete
              options={companyList}
              value={getAutoCompleteValue(companyList, company)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(e, value) => {
                if (value) {
                  setCompany(value.id);
                }
                else {
                  setCompany(null);
                  setFromDate(null)
                  setToDate(null)
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(payrollMessages.company)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={2.5} lg={2} xl={1.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(payrollMessages.fromdate)}
                value={FromDate ? dayjs(FromDate) : FromDate}
                className={classes.field}
                onChange={(date) => {
                  setFromDate(date)
                }}
                onError={(error, value) => {
                  if (error !== null) {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`FromDate`]: true
                    }))
                  }
                  else {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`FromDate`]: false
                    }))
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6} md={2.5} lg={2} xl={1.5}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={intl.formatMessage(payrollMessages.todate)}
                value={ToDate ? dayjs(ToDate) : ToDate}
                className={classes.field}
                onChange={(date) => {
                  setToDate(date)
                }}
                onError={(error, value) => {
                  if (error !== null) {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`ToDate`]: true
                    }))
                  }
                  else {
                    setDateError((prevState) => ({
                      ...prevState,
                      [`ToDate`]: false
                    }))
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid itam xs={12} md={2} lg={4} xl={6} ></Grid>

          <Grid item xs={12} md={7.5} lg={6} xl={4.5}>
            <Autocomplete
              multiple
              className={`${style.AutocompleteMulSty} ${locale === "ar" ? style.AutocompleteMulStyAR : null}`}
              id="checkboxes-tags-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={ShiftList.length != 0 ? ShiftList : []}
              disableCloseOnSelect
              getOptionLabel={(option) => (
                option ? option.name : ""
              )
              }
              onChange={(event, value) => {
                if (value !== null) {
                  setShift(value);
                } else {
                  setShift(null);
                }
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params}
                  label={intl.formatMessage(messages.shift)}
                />
              )}
            />

          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />


    </PayRollLoaderInForms>
  );
}

AttendanceDeviceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AttendanceDeviceReport);
