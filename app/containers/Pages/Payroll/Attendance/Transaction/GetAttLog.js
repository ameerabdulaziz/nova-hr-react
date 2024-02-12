import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import DeviceApi from "../api/DeviceData";
import { useSelector } from "react-redux";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";
import Payrollmessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";
import ApiData from "../api/DeviceData";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import GeneralListApis from "../../api/GeneralListApis";
import useMediaQuery from "@mui/material/useMediaQuery";
import { read, utils } from "xlsx";
import moment from "moment";

function DataFromAllDevices(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [Device, setDevice] = useState("");
  const [ip, setIp] = useState([]);
  const [port, setPort] = useState([]);
  const [DeviceList, setDeviceList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Employee, setEmployee] = useState([]);
  const [FromDate, setFromDate] = useState([]);
  const [Type, setType] = useState(1);
  const [FormType, setFormType] = useState(1);
  const [password, setPassword] = useState("");
  const [ToDate, setToDate] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);

  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");

  const submitFun = async (e) => {
    try {
      setIsLoading(true);
      let response = await ApiData(locale).SaveAttLog(fileData, Device);

      if (response.status == 200) {
        toast.success(notif.saved);
        setFileData([]);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = ($event) => {
    debugger;
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      let jsonData = [];
      let obj = {};
      var filename = file.name.split(".")[0];
      var fileExtension = file.name.split(".")[1];
      reader.onload = (event) => {
        if (fileExtension === "dat") {
          var text = reader.result;
          var rows = text.split(/\r?\n/g); //split by newline chars to get all lines as array
          if (rows.length !== 0) {
            for (var i = 0; i < rows.length; i++) {
              obj = {};
              var r = rows[i].split("\t"); //split to cols

              obj.enrollNumber = Number(r[0]);
              obj.date = r[1];
              obj.verifyMode = Number(r[2]);
              obj.inOutMode = Number(r[3]);
              obj.workCode = Number(r[4]);
              jsonData.push(obj);
            }
          } else {
            toast.error(intl.formatMessage(Payrollmessages.FileIsEmpty));
          }
          setFileData(jsonData);
        } else {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
              raw: false,
            });
            if (rows.length !== 0) {
              rows.map(
                (items) => (
                  (obj = {}),
                  Object.keys(items).map((item, index) => {
                    if (index === 0 && items[item].length !== 0) {
                      obj.enrollNumber = Number(items[item]);
                    }

                    if (index === 1 && items[item].length !== 0) {
                      if (
                        items[item].endsWith("AM") ||
                        items[item].endsWith("PM")
                      ) {
                        var m = moment(items[item], "DD/MM/YYYY h:mm a");
                        var d = m.toISOString(); //m.toDate();
                        obj.date = d;
                      } else obj.date = items[item];
                    }

                    if (index === 2 && items[item].length !== 0) {
                      obj.verifyMode = Number(items[item]);
                    }
                    if (index === 3 && items[item].length !== 0) {
                      obj.inOutMode = Number(items[item]);
                    }
                    if (index === 4 && items[item].length !== 0) {
                      obj.workCode = Number(items[item]);
                    }
                    if (Object.keys(items).length === 2) {
                      obj.verifyMode = 0;
                      obj.inOutMode = 0;
                      obj.workCode = 0;
                    }
                  }),
                  jsonData.push(obj)
                )
              );
            } else {
              toast.error(intl.formatMessage(Payrollmessages.FileIsEmpty));
            }
            setFileData(jsonData);
          }
        }
      };
      if (fileExtension === "dat") reader.readAsText(file);
      else reader.readAsArrayBuffer(file);

      setFileTitle(filename);
    }
  };
  const getData = async (e) => {
    try {
      debugger;
      setIsLoading(true);
      const dataApi = await ApiData(locale).ReadAttLog(Device);
      if (dataApi.data) setFileData(dataApi.data);
      else {
        toast.error(dataApi);
        //setFileData([]);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      debugger;
      const devices = await GeneralListApis(locale).GetDeviceList();
      setDeviceList(devices);
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function getDeviceData(id) {
    try {
      if (!id) {
        setDevice("");
        setPort("");
        setIp("");
        return;
      }
      setIsLoading(true);
      const result = await DeviceApi(locale).Get(id);
      setDevice(result.id);
      setPort(result.port);
      setIp(result.ip);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "enrollNumber",
      //label: <FormattedMessage {...Payrollmessages["employeeId"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "date",
      label: <FormattedMessage {...messages["date"]} />,
      options: {
        filter: true,
        /*  customBodyRender: (value) =>
            value == null ? "" : format(new Date(value), "yyyy-MM-dd HH:mm"), */
      },
    },

    {
      name: "verifyMode",
      //label: <FormattedMessage {...messages["verifyMode"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "inOutMode",
      //label: <FormattedMessage {...messages["inOutMode"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "workCode",
      //label: <FormattedMessage {...messages["workCode"]} />,
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,

    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => <div></div>,

    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2} alignItems="flex-start" direction="row">
          <Grid item md={12} xs={12}>
            <FormControl>
              <RadioGroup
                row
                name="type"
                aria-label="Direction"
                value={Type}
                onChange={(e) => setType(e.target.value)}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={intl.formatMessage(messages.tcp)}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={intl.formatMessage(messages.access)}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label={intl.formatMessage(messages.excell)}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label={intl.formatMessage(messages.txt)}
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label={intl.formatMessage(messages.csv)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      id="deviceId"
                      options={DeviceList}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        getDeviceData(value == null ? "" : value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="deviceId"
                          label={intl.formatMessage(messages.device)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="ip"
                      name="ip"
                      value={ip}
                      disabled
                      label={intl.formatMessage(messages.ip)}
                      className={classes.field}
                      variant="outlined"
                      autoComplete='off'
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="port"
                      name="port"
                      value={port}
                      disabled
                      label={intl.formatMessage(messages.port)}
                      className={classes.field}
                      variant="outlined"
                      autoComplete='off'
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl>
                      <RadioGroup
                        row
                        name="type"
                        aria-label="Direction"
                        value={FormType}
                        onChange={(e) => setFormType(e.target.value)}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label={intl.formatMessage(messages.firstform)}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label={intl.formatMessage(messages.secondform)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Autocomplete
                      id="employeeId"
                      options={EmployeeList}
                      isOptionEqualToValue={(option, value) =>
                        value.id === 0 ||
                        value.id === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, value) => {
                        setEmployee(value == null ? "" : value.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          variant="outlined"
                          {...params}
                          name="employeeId"
                          label={intl.formatMessage(
                            Payrollmessages.employeeName
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(Payrollmessages.fromdate)}
                        value={FromDate}
                        onChange={(date) => {
                          if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                            if (!isNaN(new Date(date))) { 
                              setFromDate(date === null ? null : format(new Date(date), "yyyy-MM-dd"))
                            } 
                            else
                            {
                              setFromDate(null)
                            }
                          }
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DesktopDatePicker
                        label={intl.formatMessage(Payrollmessages.todate)}
                        value={ToDate}
                        onChange={(date) => {
                          if (Object.prototype.toString.call(new Date(date)) === "[object Date]") {
                            if (!isNaN(new Date(date))) { 
                              setToDate(date === null ? null : format(new Date(date), "yyyy-MM-dd"))
                            } 
                            else
                            {
                              setToDate(null)
                            }
                          }
                        }}
                        className={classes.field}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id="password"
                      name="password"
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      label={intl.formatMessage(messages.devicePass)}
                      className={classes.field}
                      variant="outlined"
                      autoComplete='off'
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {Type == 1 ? (
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                disabled={Device == "" ? true : false}
                color="primary"
                component="label"
                onClick={() => getData()}
              >
                <AddIcon
                  className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                />
                {smUp && " "} Import
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                disabled={Device == "" ? true : false}
                color="primary"
                component="label"
              >
                <AddIcon
                  className={cx(smUp && classes.leftIcon, classes.iconSmall)}
                />
                {smUp && " "} Import
                <input
                  hidden
                  value={file}
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="inputGroupFile"
                  onChange={handleImport}
                  accept=".csv,.txt,.dat, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </Button>
            </Grid>
          )}

          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              size="medium"
              disabled={fileData.length == 0 ? true : false}
              color="secondary"
              onClick={submitFun}
            >
              <FormattedMessage {...Payrollmessages.save} />
            </Button>
          </Grid>
        </Grid>
      </PapperBlock>
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title={fileTitle}
          data={fileData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

export default injectIntl(DataFromAllDevices);
