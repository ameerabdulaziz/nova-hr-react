import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PapperBlock } from "enl-components";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import PayRollLoader from "../../Component/PayRollLoader";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { formateDate } from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/CalculateAttendanceData";
import messages from "../messages";
import { format } from "date-fns";
import { getCheckboxIcon } from "../../helpers";
import notif from "enl-api/ui/notifMessage";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Payrollmessages from "../../messages";

function CalculateAttendance(props) {
  const { intl } = props;

  const { classes } = useStyles();

  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem("MenuName");

  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [openedDropdown, setOpenedDropdown] = useState({});

  const [openMonth, setOpenMonth] = useState({
    todate: null,
    fromDate: null,
  });

  const [formInfo, setFormInfo] = useState({
    companyId: branchId,
    EmployeeIds: [],
    OrganizationIds: [],
    FromDate: null,
    ToDate: null,
    calculateBreak: false,
    overnightAllowance: false,
  });

console.log("formInfo =", formInfo);
  const [DateError, setDateError] = useState({});
  
  // used to reformat date before send it to api
    const dateFormatFun = (date) => {
     return  date ? format(new Date(date), "yyyy-MM-dd") : ""
  }

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const department = await GeneralListApis(locale).GetDepartmentList(
        branchId
      );
      setDepartmentList(department);

      const employee = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employee);

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setOpenMonth(response);

        setFormInfo((prev) => ({
          ...prev,
          FromDate: response.fromDate,
          ToDate: response.todate,
        }));
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const isDateInRange = (dateToCheck, startDate, endDate) => {
    const checkDate = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return checkDate >= start && checkDate <= end;
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }

    const isValidRange =
      isDateInRange(formInfo.FromDate, openMonth.fromDate, openMonth.todate) &&
      isDateInRange(formInfo.ToDate, openMonth.fromDate, openMonth.todate);

    if (!isValidRange) {
      toast.error(
        intl.formatMessage(messages.startAndEndDateNotInOpenMonthRange)
      );
      return;
    }

    setIsLoading(true);

    const formData = {
      FromDate: formateDate(formInfo.FromDate),
      ToDate: formateDate(formInfo.ToDate),
      OrganizationIds: formInfo.OrganizationIds.map((item) => item.id).join(
        ","
      ),
      EmployeeIds: formInfo.EmployeeIds.map((item) => item.id).join(","),
    };

    const body = {
      companyId: formInfo.companyId,
    };

    try {
      const response = await api(locale).GetList(body, formData);
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = async (evt) => {
    try {
      const isValidRange =
        isDateInRange(
          formInfo.FromDate,
          openMonth.fromDate,
          openMonth.todate
        ) &&
        isDateInRange(formInfo.ToDate, openMonth.fromDate, openMonth.todate);

      if (!isValidRange) {
        toast.error(
          intl.formatMessage(messages.startAndEndDateNotInOpenMonthRange)
        );
        return;
      }

      setIsLoading(true);

      const formData = {
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
        OrganizationIds: formInfo.OrganizationIds.map((item) => item.id).join(
          ","
        ),
        EmployeeIds: formInfo.EmployeeIds.map((item) => item.id).join(","),
        IsCalculateBreak: formInfo.calculateBreak,
      };

      const body = {
        companyId: formInfo.companyId,
      };

      const response = await api(locale).CalculateAttendance(body, formData);
      if (response.status == 200) {
        toast.success(notif.success);

        const result = await api(locale).GetList(body, formData);
        setTableData(result);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRollBackAttendance = async (evt) => {
    try {
      const isValidRange =
        isDateInRange(
          formInfo.FromDate,
          openMonth.fromDate,
          openMonth.todate
        ) &&
        isDateInRange(formInfo.ToDate, openMonth.fromDate, openMonth.todate);

      if (!isValidRange) {
        toast.error(
          intl.formatMessage(messages.startAndEndDateNotInOpenMonthRange)
        );
        return;
      }

      setIsLoading(true);

      const formData = {
        FromDate: formateDate(formInfo.FromDate),
        ToDate: formateDate(formInfo.ToDate),
        OrganizationIds: formInfo.OrganizationIds.map((item) => item.id).join(
          ","
        ),
        EmployeeIds: formInfo.EmployeeIds.map((item) => item.id).join(","),
      };

      const body = {
        companyId: formInfo.companyId,
      };

      const response = await api(locale).RollBackAttendance(body, formData);
      if (response.status == 200) {
        toast.success(notif.success);

        const result = await api(locale).GetList(body, formData);
        setTableData(result);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onDatePickerChange = (value, name) => {

    setFormInfo((prev) => ({
            ...prev,
            [name]: value ,
          }));
  };

  const onCompanyAutoCompleteChange = async (value) => {
    setIsLoading(true);

    setFormInfo((prev) => ({
      ...prev,
      EmployeeIds: [],
      OrganizationIds: [],
    }));

    const companyId = value !== null ? value.id : null;

    try {
      const department = await GeneralListApis(locale).GetDepartmentList(
        companyId
      );
      setDepartmentList(department);

      const employees = await GeneralListApis(locale).GetEmployeeList(
        null,
        null,
        companyId,
        null
      );

      setEmployeeList(employees);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }

    setFormInfo((prev) => ({
      ...prev,
      companyId,
    }));
  };

  const onDepartmentMultiAutoCompleteChange = async (value) => {
    setIsLoading(true);

    setFormInfo((prev) => ({
      ...prev,
      EmployeeIds: [],
    }));

    try {
      const employee = await GeneralListApis(locale).GetEmployeeList(
        null,
        null,
        null,
        value.map((item) => item.id).join(",")
      );
      setEmployeeList(employee);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }

    setFormInfo((prev) => ({
      ...prev,
      OrganizationIds: value,
    }));
  };

  const onEmployeeMultiAutoCompleteChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      EmployeeIds: value,
    }));
  };

  const onDropdownClose = (rowIndex) =>
    setOpenedDropdown((prev) => ({
      ...prev,
      [rowIndex]: null,
    }));

  const columns = [
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
      },
    },

    {
      name: "weekDayName",
      label: intl.formatMessage(messages.day),
      options: {
        filter: true,
        customBodyRender: (value) => <pre>{value}</pre>,
      },
    },

    {
      name: "shiftDate",
      label: intl.formatMessage(messages.shiftDate),
      options: {
        filter: true,
        customBodyRender: (value,tableMeta) => (
        
          <pre style={{
            ...(tableData[tableMeta.rowIndex].absence && { backgroundColor:'#f00' }),
            ...(tableData[tableMeta.rowIndex].vac && { backgroundColor:'#fafa02' }),
            ...(tableData[tableMeta.rowIndex].shiftVacancy && { backgroundColor:'#1bff00' }),
            ...((tableData[tableMeta.rowIndex].absence 
              || tableData[tableMeta.rowIndex].vac 
              || tableData[tableMeta.rowIndex].shiftVacancy) && { 
                padding: "7px",
                borderRadius: "10px",
                margin: "0",
                boxShadow: "0px 1px 3px 1px #c7c7c7"
               }),
          }}>
            {format(new Date(value), "yyyy-MM-dd")}
          </pre>),
        setCellProps: (value, rowIndex) => {
          return {
            style: {
              paddingLeft: "0",
              textAlign: "center",
            },
          };
        },
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
      name: "timeIn",
      label: intl.formatMessage(messages.signIn),
      options: {
        filter: true,
        customBodyRender: (value) => (
          <pre>{value ? format(new Date(value), "yyyy-MM-dd hh:mm aa") : ""}</pre>
        ),
      },
    },

    {
      name: "timeOut",
      label: intl.formatMessage(messages.signOut),
      options: {
        filter: true,
        customBodyRender: (value) => (
          <pre>{value ? format(new Date(value), "yyyy-MM-dd hh:mm aa") : ""}</pre>
        ),
      },
    },

    {
      name: "lateMin",
      label: intl.formatMessage(messages.late),
      options: {
        filter: true,
      },
    },

    {
      name: "extraTime",
      label: intl.formatMessage(messages.extraTime),
      options: {
        filter: true,
      },
    },

    {
      name: "LessTime",
      label: intl.formatMessage(messages.LessTime),
      options: {
        filter: true,
      },
    },

    {
      name: "ReplaceVac",
      label: intl.formatMessage(messages.AccuredLeave),
      options: {
        filter: true,
      },
    },

    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "mission",
      label: intl.formatMessage(messages.mission),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "per",
      label: intl.formatMessage(messages.permission),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "absence",
      label: intl.formatMessage(messages.absent),
      options: {
        filter: false,
        customBodyRender: (value) => {
          return getCheckboxIcon(value);
        },
      },
    },

    {
      name: "shiftVacancy",
      label: intl.formatMessage(messages.weekendLeave),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "manual",
      label: intl.formatMessage(messages.manual),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "stopD",
      label: intl.formatMessage(messages.stop),
      options: {
        filter: false,
        customBodyRender: (value) => getCheckboxIcon(value),
      },
    },

    {
      name: "",
      label: "",
      options: {
        filter: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          return (
            <div>
              <IconButton
                onClick={(evt) => {
                  setOpenedDropdown((prev) => ({
                    ...prev,
                    [tableMeta.rowIndex]: evt.currentTarget,
                  }));
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={openedDropdown[tableMeta.rowIndex]}
                open={Boolean(openedDropdown[tableMeta.rowIndex])}
                onClose={() => onDropdownClose(tableMeta.rowIndex)}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <SystemUpdateAltIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText>Dummy Action</ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText>Dummy Action</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          );
        },
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
    searchOpen: true,
    selectableRows: "multiple",
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(payrollMessages.loading)
          : intl.formatMessage(payrollMessages.noMatchingRecord),
      },
    },
  };

  const getAutoCompleteValue = (list, key) =>
    list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon="border_color" title={title} desc="">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={companyList}
                value={getAutoCompleteValue(companyList, formInfo.companyId)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : "")}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onCompanyAutoCompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.company)}
                  />
                )}
              />
            </Grid>

                  <Grid item xs={12} md={4}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                         label={intl.formatMessage(messages.startDate)}
                          value={formInfo.FromDate  ? dayjs(formInfo.FromDate) : null}
                        className={classes.field}
                          onChange={(date) => {
                            onDatePickerChange(date, "FromDate")
                        }}
                        onError={(error,value)=>{
                          if(error !== null)
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`FromDate`]: true
                              }))
                          }
                          else
                          {
                            setDateError((prevState) => ({
                                ...prevState,
                                  [`FromDate`]: false
                              }))
                          }
                        }}
                        />
                    </LocalizationProvider>
                  </Grid>

            <Grid item xs={12} md={4}>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                       label={intl.formatMessage(messages.endDate)}
                        value={formInfo.ToDate ? dayjs(formInfo.ToDate) : null}
                      className={classes.field}
                        onChange={(date) => {
                          onDatePickerChange(date, "ToDate")
                      }}
                      onError={(error,value)=>{
                        if(error !== null)
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`ToDate`]: true
                            }))
                        }
                        else
                        {
                          setDateError((prevState) => ({
                              ...prevState,
                                [`ToDate`]: false
                            }))
                        }
                      }}
                      />
                  </LocalizationProvider>
                </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={departmentList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === "ar" ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formInfo.OrganizationIds}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : "")}
                onChange={(_, value) =>
                  onDepartmentMultiAutoCompleteChange(value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // required={formInfo.OrganizationIds.length === 0}
                    label={intl.formatMessage(messages.department)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={employeeList}
                multiple
                disableCloseOnSelect
                className={`${style.AutocompleteMulSty} ${
                  locale === "ar" ? style.AutocompleteMulStyAR : null
                }`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={formInfo.EmployeeIds}
                renderOption={(optionProps, option, { selected }) => (
                  <li {...optionProps} key={optionProps.id}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : "")}
                onChange={(_, value) =>
                  onEmployeeMultiAutoCompleteChange(value)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // required={formInfo.EmployeeIds.length === 0}
                    label={intl.formatMessage(messages.employee)}
                  />
                )}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.calculateBreak}
                    onChange={onCheckboxChange}
                    name="calculateBreak"
                  />
                }
                label={intl.formatMessage(messages.calculateBreak)}
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formInfo.overnightAllowance}
                    onChange={onCheckboxChange}
                    name="overnightAllowance"
                  />
                }
                label={intl.formatMessage(messages.overnightAllowance)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={0}>
            <Grid item>
              <Button type="submit" variant="contained">
                {intl.formatMessage(messages.search)}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={handleCalculate}>
                {intl.formatMessage(messages.calculate)}
              </Button>
            </Grid>

            {/* <Grid item>
              <Button variant="contained">
                {intl.formatMessage(messages.postToPayroll)}
              </Button>
            </Grid> */}

            <Grid item>
              <Button variant="contained" onClick={handleRollBackAttendance}>
                {intl.formatMessage(messages.rollbackAttendance)}
              </Button>
            </Grid>
{/* TO DO */}
           {/*  <Grid item>
              <Button variant="contained">
                {intl.formatMessage(messages.rollbackPost)}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained">
                {intl.formatMessage(messages.cancelLate)}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained">
                {intl.formatMessage(messages.cancelEarlyLeave)}
              </Button>
            </Grid> */}
          </Grid>
        </PapperBlock>
      </form>

      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

CalculateAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CalculateAttendance);
