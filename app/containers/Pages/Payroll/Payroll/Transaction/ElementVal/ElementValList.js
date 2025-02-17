import React, { useState, useEffect, useCallback } from "react";
import { PapperBlock } from "enl-components";
import elementApi from "../../api/ElementsData";
import messages from "../../messages";
import Payrollmessages from "../../../messages";
import { useSelector } from "react-redux";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import AddButton from "../../../Component/AddButton";
import { useLocation } from "react-router-dom";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Box,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import useStyles from "../../../Style";
import PropTypes from "prop-types";
import GeneralListApis from "../../../api/GeneralListApis";
import { format } from "date-fns";
import MUIDataTable from "mui-datatables";
import ApiData from "../../api/ElementValData";
import style from "../../../../../../../app/styles/styles.scss";
import DeleteButton from "../../../Component/DeleteButton";
import EditButton from "../../../Component/EditButton";
import NamePopup from "../../../Component/NamePopup";
import AlertPopup from "../../../Component/AlertPopup";
import PayRollLoader from "../../../Component/PayRollLoader";
import SITEMAP from "../../../../../App/routes/sitemap";

function ElementValList(props) {
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
    elementCalcMethodId:"",
    defaultVal: "",
  });
  const [OpenPopup, setOpenPopup] = useState(false);
  const [PayTemplateList, setPayTemplateList] = useState([]);
  const [PayTemplateId, setPayTemplateId] = useState(0);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(0);
  const { state } = useLocation();
  const BranchIdState = state?.branchId ?? branchId;
  const EmployeeIdState = state?.employeeId;
  const PayTemplateIdState = state?.payTemplateId ?? 1;
  const ElementIdState = state?.elementId;
  const [EmployeeList, setEmployeeList] = useState([]);
  const [EmployeeId, setEmployeeId] = useState(0);
  const [elementList, setElementList] = useState([]);
  const [OpenMonth, setOpenMonth] = useState({
    monthId: "",
    yearId: "",
    monthName: "",
    yearName: "",
    stYearId: "",
    stYearName: "",
    stMonthId: "",
    stMonthName: "",
  });
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [elementCalcMethodId, setelementCalcMethodId] = useState(1);
  const [newElemVal, setnewElemVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [OrignalMonthList, setOrignalMonthList] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = {
        id: 0,
        employeeId: EmployeeId,
        payTemplateId: PayTemplateId,
        elementId: elementData.id,
        elementModeId: elementData.elementModeId,
        yearId: OpenMonth.yearId,
        monthId: OpenMonth.monthId,
        transDate: format(new Date(), "yyyy-MM-dd"),
        elemVal: newValue,
        notes: notes,
      };
      let response = await ApiData(locale).Save(data);

      if (response.status == 200) {
        toast.success(notif.saved);
        const result = await ApiData(locale).GetList(
          BranchId,
          EmployeeId,
          PayTemplateId,
          elementData.id
        );
        setdataList(result || []);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseNamePopup = useCallback(
    async (Employeesdata) => {
      setOpenPopup(false);
      try {
       
        setIsLoading(true);
        const data = Employeesdata.map((obj) => ({
          id: 0,
          branchId: BranchId,
          employeeId: obj.id,
          payTemplateId: PayTemplateId,
          elementId: elementData.id,
          elementModeId: elementData.elementModeId,
          yearId: OpenMonth.yearId,
          monthId: OpenMonth.monthId,
          transDate: format(new Date(), "yyyy-MM-dd"),
          elemVal: newValue,
          notes: notes,
          trxSorce: "GRB",
          isNotUpdate: isNotUpdate,
        }));
        let response = await ApiData(locale).SaveList(data);

        if (response.status == 200) {
          if (response.data == "Success") toast.success(notif.saved);
          else
            toast.success("Employees Ids :" + response.data + " not inserted");
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    },
    [elementData, notes, newValue, PayTemplateId, isNotUpdate]
  );

  const handleClickOpenNamePopup = () => {
    setOpenPopup(true);
  };

  const handleClickOpen = (item) => {
  
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
     
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        const result = await ApiData(locale).GetList(
          BranchId,
          EmployeeId,
          PayTemplateId,
          elementData.id
        );
        setdataList(result || []);
        
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(selectedRows) {
    try {
      const ids = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        ids.push(dataList[selectedRows.data[i].dataIndex].id);
      }
      if (ids.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).UpdateList(
          ids,
          newElemVal,
          elementCalcMethodId
        );
        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function handlePost(selectedRows) {
    try {
      const ids = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        ids.push(dataList[selectedRows.data[i].dataIndex].id);
      }
      if (ids.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).PostponetoNextMonth(ids);
        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function CopytoSpecifiedMonth(selectedRows) {
    try {
      if (!OpenMonth.stMonthId || !OpenMonth.stYearId) {
        toast.error("year must Enter Month & Year");
        return;
      }
      const ids = [];
      for (let i = 0; i < selectedRows.data.length; i++) {
        ids.push(dataList[selectedRows.data[i].dataIndex].id);
      }
      if (ids.length > 0) {
        setIsLoading(true);
        let response = await ApiData(locale).CopytoSpecifiedMonth(
          ids,
          OpenMonth.stYearId,
          OpenMonth.stMonthId
        );
        if (response.status == 200) {
          toast.success(notif.saved);
          const result = await ApiData(locale).GetList(
            BranchId,
            EmployeeId,
            PayTemplateId,
            elementData.id
          );
          setdataList(result || []);
        } else {
          toast.error(response.statusText);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function GetLookup() {
    try {
      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);
      const months = await GeneralListApis(locale).GetMonths();
      setOrignalMonthList(months);

      const BrList = await GeneralListApis(locale).GetBranchList();
      setBranchList(BrList);

      const PayList = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(PayList);
    
      if (BranchIdState) {
        setBranchId(BranchIdState);
        getOpenMonth(BranchIdState);
      }
      if (EmployeeIdState) {
        setEmployeeId(EmployeeIdState);
        changeEmployee(EmployeeIdState);
      }
      if (PayTemplateIdState) {
        setPayTemplateId(PayTemplateIdState);
        getElementList(PayTemplateIdState);
      }
      if (ElementIdState) {
        getElementData(ElementIdState);
      }
      if (BranchIdState)
        handleSearch(
          BranchIdState,
          EmployeeIdState,
          PayTemplateIdState,
          ElementIdState
        );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetLookup();
  }, []);

  async function changeYear(value) {
    if (value !== null) {
      setOpenMonth((prevFilters) => ({
        ...prevFilters,
        stYearId: value.id,
        stYearName: value.name,
        stMonthId: 0,
        stmonthName: "",
      }));
      if (value.id != OpenMonth.yearId) setMonthList(OrignalMonthList);
      else setMonthList(OrignalMonthList.filter((row) => row.id >= OpenMonth.monthId));
    } else
      setOpenMonth((prevFilters) => ({
        ...prevFilters,
        stYearId: 0,
        stYearName: "",
        stMonthId: 0,
        stMonthName: "",
      }));
  }
  async function changeMonth(value) {
   

    setOpenMonth((prevFilters) => ({
      ...prevFilters,
      stMonthId: value !== null ? value.id : 0,
      stMonthName: value !== null ? value.name : 0,
    }));
  }
  async function getOpenMonth(id) {
    try {
      if (!id) {
        setOpenMonth({
          monthId: "",
          monthName: "",
          yearId: "",
          yearName: "",
          stYearId: "",
          stYearName: "",
          stMonthId: "",
          stMonthName: "",
        });
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
      const result = await GeneralListApis(locale).getOpenMonth(id, 0);
     
      setOpenMonth({
        monthId: result.monthId,
        yearId: result.yearId,
        monthName: result.monthName,
        yearName: result.yearName,
        stYearId: result.yearId,
        stYearName: result.yearName,
        stMonthId: result.monthId,
        stMonthName: result.monthName,
      });
     
      setYearList(
        yearList.filter(
          (row) => parseInt(row.name) >= parseInt(result.yearName)
        )
      );
      setMonthList(OrignalMonthList.filter((row) => row.id >= result.monthId));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
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
        elementCalcMethodId:"",
        defaultVal: "",
      });
      if (!id) {
        setElementList([]);
      } else {
        const result = await GeneralListApis(locale).GetElementListByTemplate(
          id, 0
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
          elementCalcMethodId:result.elementCalcMethodId,
          defaultVal: result.defaultVal,
        });
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async (brId, empId, payId, eleId) => {
    try {
      setIsLoading(true);
      var result1 = [];
      if (empId)
        result1 = await ApiData(locale).GetList(brId, empId, payId, eleId);
      else
        result1 = await ApiData(locale).GetList(
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
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: 'employeeId',
      label: intl.formatMessage(Payrollmessages.employeeId),
      options: {
        filter: false,
        display: false,
        download: false,
        print: false,
      },
    },

    {
      name: 'employeeCode',
      label: intl.formatMessage(Payrollmessages.employeeCode),
    },

    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages["employeeName"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "transDate",
      label: intl.formatMessage(Payrollmessages["date"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
      name: "payTemplateName",
      label: intl.formatMessage(messages["payTemplate"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "elementName",
      label: intl.formatMessage(Payrollmessages["element"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "elementType",
      label: intl.formatMessage(messages["elementType"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "elementMode",
      label: intl.formatMessage(messages["elementMode"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "elemVal",
      label: intl.formatMessage(messages["val"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "trxSorce",
      label: intl.formatMessage(messages["source"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
      name: "notes",
      label: intl.formatMessage(Payrollmessages["notes"]),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <div style={{maxWidth: "200px", width: "max-content"}}>{value}</div> : ''),
      },
    },
    {
      name: "Actions",
      label: intl.formatMessage(Payrollmessages["Actions"]),
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          
          return (
            <div className={style.actionsSty}>
              <EditButton
                //param={{ id: tableMeta.rowData[0] }}
                url={`${SITEMAP.payroll.ElementValEdit.route}/`+btoa( encodeURIComponent(tableMeta.rowData[0]))}
              ></EditButton>
              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData[0])}
              ></DeleteButton>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    search: false,
    selection: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton url={SITEMAP.payroll.ElementValCreate.route}></AddButton>
    ),

    customToolbarSelect: (selectedRows) => (
      <div style={{ width: "90%" }}>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item md={7} xs={12}>
            <Box
              component="fieldset"
              style={{
                border: "1px solid #c4c4c4",
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
              }}
            >
              <legend></legend>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item md={5} xs={12}>
                  <FormControl variant="standard" component="fieldset" required>
                    <RadioGroup
                      row
                      name="elementCalcMethodId"
                      aria-label="Direction"
                      value={elementCalcMethodId || null}
                      onChange={(e) => {
                        
                        setelementCalcMethodId(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label={intl.formatMessage(messages.Value)}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label={intl.formatMessage(messages.Percentage)}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    id="newElemVal"
                    name="newElemVal"
                    value={newElemVal}
                    label={intl.formatMessage(messages.val)}
                    className={classes.field}
                    variant="outlined"
                    onChange={(e) => {
                      setnewElemVal(e.target.value);
                    }}
                    autoComplete='off'
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className="mr-6"
                    onClick={() => handleUpdate(selectedRows)}
                  >
                    <FormattedMessage {...Payrollmessages.apply} />
                  </Button>
                </Grid>
                <Grid item md={2} xs={12}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className="mr-6"
                    onClick={() => handlePost(selectedRows)}
                  >
                    <FormattedMessage {...messages.post} />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={5} xs={12}>
            <Box
              component="fieldset"
              style={{
                border: "1px solid #c4c4c4",
                borderRadius: "10px",
                padding: "10px",
                width: "100%",
              }}
            >
              <legend></legend>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="stYearName"
                    options={yearList}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    value={
                      OpenMonth.stYearId
                        ? yearList.find(
                            (item) => item.id === OpenMonth.stYearId
                          )
                        : null
                    }
                    onChange={(event, value) => {
                      changeYear(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="stYearName"
                        required
                        label={intl.formatMessage(Payrollmessages.Postyear)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    id="stMonthName"
                    options={monthList}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === "" ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    value={
                      OpenMonth.stMonthId
                        ? monthList.find(
                            (item) => item.id === OpenMonth.stMonthId
                          )
                        : null
                    }
                    onChange={(event, value) => {
                      changeMonth(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        name="stMonthName"
                        required
                        label={intl.formatMessage(Payrollmessages.Postmonth)}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={1} xs={12}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className="mr-6"
                    onClick={() => CopytoSpecifiedMonth(selectedRows)}
                  >
                    <FormattedMessage {...Payrollmessages.copy} />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    ),

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
        <NamePopup
          handleClose={handleCloseNamePopup}
          open={OpenPopup}
          Key={"Employee"}
          branchId={BranchId}
        />
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
                    xs={12} lg={10} xl={6}
                  >
                    <Grid item xs={12} md={4} lg={6}>
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
                          BranchId
                            ? BranchList.find((item) => item.id === BranchId)
                            : null
                        }
                        onChange={(event, value) => {
                          setBranchId(value !== null ? value.id : 0);
                          getOpenMonth(value !== null ? value.id : 0);
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
                    <Grid item xs={12} md={4} lg={6}>
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
                    <Grid item xs={4} md={1.2} lg={3}>
                      <TextField
                        id="YearId"
                        name="YearId"
                        value={OpenMonth.yearName ? OpenMonth.yearName : ""}
                        label={intl.formatMessage(Payrollmessages.year)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>
                    <Grid item xs={4} md={1.2}  lg={3}>
                      <TextField
                        id="MonthId"
                        name="MonthId"
                        value={OpenMonth.monthName ? OpenMonth.monthName : ""}
                        label={intl.formatMessage(Payrollmessages.month)}
                        className={classes.field}
                        variant="outlined"
                        autoComplete='off'
                      />
                    </Grid>

                    <Grid item xs={4} md={1.6}  lg={2}>
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
                    xs={12} lg={10} xl={6}
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
                              autoComplete='off'
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
                              autoComplete='off'
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
                              autoComplete='off'
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
                              autoComplete='off'
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
                              autoComplete='off'
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
                      autoComplete='off'
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
                      autoComplete='off'
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
                  <Grid item xs={12} md={2}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      onClick={handleClickOpenNamePopup}
                      disabled={newValue ? false : true}
                    >
                      <FormattedMessage {...Payrollmessages.chooseEmp} />
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      onClick={handleSave}
                      disabled={newValue && EmployeeId ? false : true}
                    >
                      <FormattedMessage {...Payrollmessages.save} />
                    </Button>
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
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(
          Payrollmessages.deleteMessage
        )}${deleteItem}`}
        callFun={deleterow}
      />
    </PayRollLoader>
  );
}
ElementValList.propTypes = {
  intl: PropTypes.object.isRequired,
};
export default injectIntl(ElementValList);
