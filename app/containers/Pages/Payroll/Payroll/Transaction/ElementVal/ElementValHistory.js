import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import elementApi from "../../api/ElementsData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { injectIntl, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ElementValData";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PayRollLoader from "../../../Component/PayRollLoader";

function ElementValHistory(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { classes } = useStyles();
  const Title = localStorage.getItem("MenuName");
  const [dataList, setdataList] = useState([]);
  const [notes, setnotes] = useState("");
  const [isNotUpdate, setisNotUpdate] = useState(true);
  const [newValue, setNewValue] = useState("");
  const [elementData, setElementData] = useState({
    id: 0,
    elementMaxVal: "",
    elementMinVal: "",
    elementModeId: "",
    elementCalcMethodId: "",
    defaultVal: "",
  });
  
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [PayTemplateId, setPayTemplateId] = useState(0);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(branchId);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [fromdate, setFromdate] = useState(dayjs());
  const [todate, setTodate] = useState(dayjs());
  const [elementList, setElementList] = useState([]);
  const [elementCalcMethodId, setelementCalcMethodId] = useState(1);
  const [newElemVal, setnewElemVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  

  async function GetLookup() {
    try {
      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);

      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(PayList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetLookup();
  }, []);

  const handleChange = useCallback(async (name, value) => {
    if (name == "fromDate") {
      setFromdate(value);
    }

    if (name == "toDate") {
      setTodate(value);
    }
  }, []);

  async function changeEmployee(id) {
    try {
      setIsLoading(true);
      setEmployeeId(id);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementList(id) {
    try {
      setIsLoading(true);
      setElementData({
        elementId: 0,
        elementMaxVal: "",
        elementMinVal: "",
        elementModeId: "",
        elementCalcMethodId: "",
        defaultVal: "",
      });
      if (!id) {
        setElementList([]);
      } else {
        const result = await GeneralListApis(locale).GetElementListByTemplate(
          id,
          0
        );
        setElementList(result);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function getElementData(id) {
    try {
      setIsLoading(true);
      if (!id) {
        setElementData({
          id: 0,
          elementMaxVal: 0,
          elementMinVal: 0,
          elementModeId: 0,
          elementCalcMethodId: 0,
          defaultVal: 0,
        });
      } else {
        const result = await elementApi(locale).Get(id);

        setElementData({
          id: result.id,
          elementMaxVal: result.elementMaxVal,
          elementMinVal: result.elementMinVal,
          elementModeId: result.elementModeId,
          elementCalcMethodId: result.elementCalcMethodId,
          defaultVal: result.defaultVal,
        });
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      var result1 = await ApiData(locale).GetElementHistory(
        fromdate,
        todate,
        BranchId,
        EmployeeId,
        PayTemplateId,
        elementData.id
      );
      setdataList(result1 || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  async function getEployees(id) {
    try {
      if (!id) {
      
        setdataList([]);
        setEmployeeList([]);
        return;
      }
      setIsLoading(true);
      const EmpList = await GeneralListApis(locale).GetEmployeeList(
        false,
        false,
        id
      );
      setEmployeeList(EmpList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const columns = [

    {
      name: "employeeCode",
      label: intl.formatMessage(Payrollmessages.employeeCode),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages["employeeName"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    
    /* {
      name: "payTemplateName",
      label: intl.formatMessage(messages["payTemplate"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    }, */
    {
      name: "elementName",
      label: intl.formatMessage(Payrollmessages["element"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    {
      name: "elementType",
      label: intl.formatMessage(messages["elementType"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    {
      name: "elementMode",
      label: intl.formatMessage(messages["elementMode"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    {
      name: "elemValCalc",
      label: intl.formatMessage(messages["val"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    {
      name: "month",
      label: intl.formatMessage(Payrollmessages.month),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
    {
      name: "year",
      label: intl.formatMessage(Payrollmessages.year),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ""),
      },
    },
  ];

  const options = {
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    search: true,
    selection: true,
    selectableRows: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => <div></div>,

    customToolbarSelect: () => <div></div>,
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };


  useEffect(()=>{
    if(PayTemplateList.length !== 0)
    {      
      setPayTemplateId(PayTemplateList[0].id)
      getElementList(PayTemplateList[0].id);
    }
  },[PayTemplateList])

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container spacing={2} alignItems="flex-start" direction="row">
          <Grid item container direction="row" xs={12} md={12}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={4}
                  alignItems="flex-start"
                  direction="row"
                  item
                >
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    xs={12}
                    lg={6}
                  >
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        id="branchId"
                        options={BranchList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        value={
                          BranchId && BranchList.length !== 0
                            ? BranchList.find((item) => item.id === BranchId)
                            : null
                        }
                        onChange={(event, value) => {
                          setBranchId(value !== null ? value.id : 0);
                          getEployees(value !== null ? value.id : 0)
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="branchId"
                            required
                            label={intl.formatMessage(Payrollmessages.branch)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                        value={
                          EmployeeId
                            ? EmployeeList.find(
                                (item) => item.id === EmployeeId
                              )
                            : null
                        }
                        onChange={(event, value) => {
                          changeEmployee(value !== null ? value.id : 0);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="employeeId"
                            required
                            label={intl.formatMessage(
                              Payrollmessages.employeeId
                            )}
                          />
                        )}
                      />
                    </Grid>                    
                    <Grid item xs={6} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(Payrollmessages.fromdate)}
                          value={fromdate}
                          className={classes.field}
                          onChange={(date) => {
                            handleChange("fromDate", date);
                          }}
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                [`FromDate`]: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                [`FromDate`]: false,
                              }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label={intl.formatMessage(Payrollmessages.todate)}
                          value={todate}
                          className={classes.field}
                          onChange={(date) => {
                            handleChange("toDate", date);
                          }}
                          onError={(error, value) => {
                            if (error !== null) {
                              setDateError((prevState) => ({
                                ...prevState,
                                [`toDate`]: true,
                              }));
                            } else {
                              setDateError((prevState) => ({
                                ...prevState,
                                [`toDate`]: false,
                              }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>


                    <Grid item xs={4} md={2}>
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
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                    xs={12}
                    lg={6}
                  >
                    <Card className={classes.card}>
                      <CardContent>
                        <Grid
                          container
                          spacing={1}
                          alignItems="flex-start"
                          direction="row"
                        >
                          <Grid item xs={12} md={6}>
                            <Autocomplete
                              id="PayTemplateId"
                              options={PayTemplateList}
                              isOptionEqualToValue={(option, value) =>
                                value.id === 0 ||
                                value.id === "" ||
                                option.id === value.id
                              }
                              getOptionLabel={(option) =>
                                option.name ? option.name : ""
                              }
                              value={
                                PayTemplateId
                                  ? PayTemplateList.find(
                                      (item) => item.id === PayTemplateId
                                    )
                                  : null
                              }
                              onChange={(event, value) => {
                                if (!BranchId) {
                                  setPayTemplateId(0);
                                  toast.error("choose branch first");
                                } else {
                                  setPayTemplateId(
                                    value !== null ? value.id : 0
                                  );
                                  getElementList(value !== null ? value.id : 0);
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  variant="outlined"
                                  {...params}
                                  name="PayTemplateId"
                                  required
                                  label={intl.formatMessage(
                                    messages.payTemplate
                                  )}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Autocomplete
                              id="elementId"
                              options={elementList}
                              isOptionEqualToValue={(option, value) =>
                                value.id === 0 ||
                                value.id === "" ||
                                option.id === value.id
                              }
                              getOptionLabel={(option) =>
                                option.name ? option.name : ""
                              }
                              value={
                                elementData.id
                                  ? elementList.find(
                                      (item) => item.id === elementData.id
                                    )
                                  : null
                              }
                              onChange={(event, value) => {
                                getElementData(value !== null ? value.id : 0);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  variant="outlined"
                                  {...params}
                                  name="elementId"
                                  required
                                  label={intl.formatMessage(
                                    Payrollmessages.element
                                  )}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TextField
                              id="ElementMode"
                              name="ElementMode"
                              value={
                                elementData.elementModeId == 1
                                  ? intl.formatMessage(messages.constant)
                                  : elementData.elementModeId == 2
                                  ? intl.formatMessage(messages.variable)
                                  : ""
                              }
                              label={intl.formatMessage(messages.elementMode)}
                              className={classes.field}
                              variant="outlined"
                              disabled
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TextField
                              id="elementCalcMethod"
                              name="elementCalcMethod"
                              value={
                                elementData.elementCalcMethodId == 1
                                  ? intl.formatMessage(messages.Value)
                                  : elementData.elementModeId == 2
                                  ? intl.formatMessage(messages.Percentage)
                                  : ""
                              }
                              label={intl.formatMessage(messages.CalcMethod)}
                              className={classes.field}
                              variant="outlined"
                              disabled
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <TextField
                              id="ElementMaxVal"
                              name="ElementMaxVal"
                              value={elementData.elementMaxVal}
                              label={intl.formatMessage(messages.max)}
                              disabled
                              className={classes.field}
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <TextField
                              id="ElementMinVal"
                              name="ElementMinVal"
                              value={elementData.elementMinVal}
                              label={intl.formatMessage(messages.min)}
                              disabled
                              className={classes.field}
                              autoComplete="off"
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <TextField
                              id="DefaultVal"
                              name="DefaultVal"
                              value={elementData.defaultVal}
                              label={intl.formatMessage(messages.defaultValue)}
                              className={classes.field}
                              variant="outlined"
                              disabled
                              autoComplete="off"
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {elementData.id ? (
            <Grid item xs={12} md={12}>
              <Box
                component="fieldset"
                style={{
                  border: "1px solid #c4c4c4",
                  borderRadius: "10px",
                  padding: "30px",
                  paddingTop: "40px",
                  width: "100%",
                }}
              >
                <legend>{intl.formatMessage(messages.newval)}</legend>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={1.5}>
                    <TextField
                      id="Val"
                      name="Val"
                      value={newValue}
                      label={intl.formatMessage(messages.val)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => {
                        setNewValue(e.target.value);
                      }}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12} md={3.5}>
                    <TextField
                      id="Notes"
                      name="Notes"
                      value={notes}
                      label={intl.formatMessage(Payrollmessages.notes)}
                      className={classes.field}
                      variant="outlined"
                      onChange={(e) => {
                        setnotes(e.target.value);
                      }}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isNotUpdate || null}
                          onChange={(e) => setisNotUpdate(e.target.checked)}
                          value={isNotUpdate || null}
                          color="primary"
                        />
                      }
                      label={intl.formatMessage(messages.isNotUpdate)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12} md={12}>
            <div className={classes.CustomMUIDataTable}>
              {/* <ThemeProvider theme={theme}> */}
              <MUIDataTable
                title=""
                data={dataList}
                columns={columns}    
                options={options}            
              />
              {/* </ThemeProvider> */}
            </div>
          </Grid>
        </Grid>
      </PapperBlock>
    </PayRollLoader>
  );
}
ElementValHistory.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementValHistory);
