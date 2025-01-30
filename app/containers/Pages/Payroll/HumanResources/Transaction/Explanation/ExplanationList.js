import React, { useEffect, useState } from "react";
import ApiData from "../../../Explanation/api/ExplanationData";
import { useSelector } from "react-redux";
import { Button, Grid, TextField, Autocomplete } from "@mui/material";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useStyles from "../../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import EditButton from "../../../Component/EditButton";
import style from "../../../../../../../app/styles/styles.scss";
import PayRollLoader from "../../../Component/PayRollLoader";
import SimplifiedPayrollTable from "../../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../../helpers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toast } from "react-hot-toast";
import SITEMAP from "../../../../../App/routes/sitemap";
import { getDateColumnOptions } from "../../../Component/PayrollTable/utils.payroll-table";

function ExplanationList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [fromdate, setfromate] = useState(null);
  const [todate, settodate] = useState(null);
  const [employee, setemployee] = useState(null);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [type, settype] = useState(null);
  const [TypeList, setTypeList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [DateError, setDateError] = useState({});

  const getFilterHighlights = () => {
    const highlights = [];

    const selectedEmployee = getAutoCompleteValue(EmployeeList, employee);
    const selectedType = getAutoCompleteValue(TypeList, type);

    if (selectedEmployee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: selectedEmployee.name,
      });
    }

    if (selectedType) {
      highlights.push({
        label: intl.formatMessage(messages.type),
        value: selectedType.name,
      });
    }

    if (fromdate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.fromdate),
        value: formateDate(fromdate),
      });
    }

    if (todate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.todate),
        value: formateDate(todate),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    let Fromdate = formateDate(fromdate)
    let Todate = formateDate(todate)
    
    try {
      setIsLoading(true);
      const dataApi = await ApiData(locale).GetReport({
        employeeId: employee,
        typeId: type,
        Fromdate,
        Todate,
      });
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    setIsLoading(true);

    const all = true

    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      const types = await GeneralListApis(locale).GetExplanationTypeList(all);
      setTypeList(types);
      const dataApi = await ApiData(locale).GetReport({
        employeeId: employee,
        typeId: type,
        fromdate,
        todate,
      });
      setdata(dataApi);
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
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
      },
    },
    {
      name: "job",
      label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },
    {
      name: "questionDate",
      label: intl.formatMessage(messages.date),
      options: getDateColumnOptions(
        intl.formatMessage(messages.date),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },
    {
      name: "expTypeName",
      label: intl.formatMessage(Payrollmessages.type),
      options: {
        filter: true,
      },
    },
    {
      name: "questionTitle",
      label: intl.formatMessage(Payrollmessages.title),
      options: {
        filter: true,
      },
    },
    {
      name: "questionDetails",
      label: intl.formatMessage(Payrollmessages.details),
      options: {
        noWrap: true,
      },
    },
    {
      name: "Actions",
      label: intl.formatMessage(Payrollmessages.Actions),
      options: {
        filter: false,
        print: false,

        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0], questionType: tableMeta.rowData[4] }}
                url={SITEMAP.humanResources.ExplanationEdit.route}
              ></EditButton>
            </div>
          );
        },
      },
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <div>          
          <Grid container spacing={3}>
                  <Grid item xs={12} md={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={fromdate ? dayjs(fromdate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            setfromate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromdate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`fromdate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={2}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label={intl.formatMessage(Payrollmessages.todate)}
                          value={todate ? dayjs(todate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            settodate(date)
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`todate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`todate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>


            <Grid item xs={12} md={2}>
              <Autocomplete
                id="typeId"
                options={TypeList}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  settype(value == null ? null : value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(Payrollmessages.type)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="employeeId"
                options={EmployeeList}
                //value={{id:data.employeeId,name:data.employeeName}}
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setemployee(value == null ? null : value.id);
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
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleSearch}
              >
                <FormattedMessage {...Payrollmessages.search} />
              </Button>
            </Grid>
          </Grid>

        </div>
      </PapperBlock>

          <SimplifiedPayrollTable
            title=""
            data={data}
            columns={columns}
            filterHighlights={filterHighlights}
          />
    </PayRollLoader>
  );
}

export default injectIntl(ExplanationList);
