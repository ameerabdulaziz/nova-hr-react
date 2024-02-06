import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import GeneralListApis from "../../api/GeneralListApis";

function DeviceLogReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [FingerprintType, setFingerprintType] = useState("");
  const [DevicesList, setDevicesList] = useState([]);
  const [Device, setDevice] = useState("");
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    DisplayDeviceName: false,
    DisplayDeleted: false,
    GroupByDate: true,
  });


// used to clear table if search elements has change
  useEffect(()=>{
    setdata([])
  },[searchData])


  const handleSearch = async (e) => {
    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        IsGroupedBydate:searchData.GroupByDate,
        IsDeleted: searchData.DisplayDeleted,
        IsINOutDev: searchData.DisplayDeviceName ,
        DeviceIds: Device,
        ModeId: FingerprintType
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).DeviceLogReportApi(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
      },
    },
    {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
        },
      },
      {
        name: "employeeCode",
        label: intl.formatMessage(messages.EmpCode),
        options: {
          filter: true,
        },
      },
      {
        name: "employeeName",
        label: intl.formatMessage(messages.employeeName),
        options: {
          filter: true,
        },
      },
      searchData.GroupByDate ?
      {
        name: "timeIn",
        // label: "time In",
        label: intl.formatMessage(messages.timeIn),
        options: {
          filter: true,
        },
      } 
      : "",
      searchData.GroupByDate ?
      {
        name: "timeOut",
        // label: "time Out",
        label: intl.formatMessage(messages.timeOut),
        options: {
          filter: true,
        },
      } : "",
      searchData.DisplayDeviceName ?
      {
        name: "devName",
        // label: "Device Name",
        label: intl.formatMessage(messages.DeviceName),
        options: {
          filter: true,
        },
      } : "",
      {
        name: "trxDateTime2",
        label: intl.formatMessage(messages.date),
        options: {
          filter: true,
          customBodyRender: (value) => (<pre>{
            searchData.GroupByDate ?
            format(new Date(value), "yyyy-MM-dd")
           : format(new Date(value), "yyyy-MM-dd hh:mm aa")
            }</pre>),
        },
      },
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    selectableRows: "none",
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };


  async function fetchData() {
    try {
      
      const Devices = await GeneralListApis(locale).GetDeviceList();
      setDevicesList(Devices);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);




  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
            ></Search>
          </Grid>

          

          <Grid item md={5} lg={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.DisplayDeviceName}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            DisplayDeviceName: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.DisplayDeviceName)}
                  />
            </Grid>


            <Grid item md={4} lg={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.DisplayDeleted}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            DisplayDeleted: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.DisplayDeleted)}
                  />
            </Grid>

            <Grid item md={12} >
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Sign In Only"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="Group By Date" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  GroupByDate: !prev.GroupByDate,
                                }));
                              }}
                            />} 
                            checked={searchData.GroupByDate}
                            label={intl.formatMessage(messages.GroupByDate)}
                        />

                        <FormControlLabel 
                            value="All Transactions" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  GroupByDate: !prev.GroupByDate,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.AllTransactions)}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>



            <Grid item xs={12} md={4} lg={3}>
            <Autocomplete
              id="StatusList"
              options={[
                { id: null, name: "All" },
                { id: 1, name: "Password/Fingerprint" },
                { id: 2, name: "Card" },
                { id: 3, name: "Mobile" },
              ]}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) =>
                setFingerprintType(
                  value === null ? "" : value.id == null ? "" : value.id
                )
              }
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="StatusList"
                  label={intl.formatMessage(messages.FingerType)}
                />
              )}
            />
          </Grid>


          <Grid item xs={12} md={4} lg={3}>
            <Autocomplete
              id="DeviceType"
              options={DevicesList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setDevice(value == null ? "" : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeviceType"
                  label={intl.formatMessage(messages.DeviceType)}
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
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

DeviceLogReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(DeviceLogReport);
