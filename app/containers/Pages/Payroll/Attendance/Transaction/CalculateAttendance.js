import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import dayjs from "dayjs";
import notif from "enl-api/ui/notifMessage";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import {
  formateDate,
  getAutoCompleteValue,
  getCheckboxIcon,
} from "../../helpers";
import payrollMessages from "../../messages";
import api from "../api/CalculateAttendanceData";
import RowDropdown from "../components/CalculateAttendance/RowDropdown";
import messages from "../messages";
import CalculateAttendancePopUp from "../../Component/CalculateAttendancePopUp";
import MenuIcon from "@mui/icons-material/Menu";

function CalculateAttendance(props) {
  const { intl } = props;

  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem("MenuName");
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState();
  const [popUpTitle, setPopUpTitle] = useState("");
  const [disabledLock, setDisabledLock] = useState(false);
  const [shortcutType, setShortcutType] = useState();
  const [isLoadingPopup, setIsLoadingPopup] = useState(false);
  const [openParentPopup, setOpenParentPopup] = useState(false);

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [openMonth, setOpenMonth] = useState({
    todate: null,
    fromDate: null,
  });

  const [formInfo, setFormInfo] = useState({
    companyId: 0,
    EmployeeIds: [],
    OrganizationIds: [],
    FromDate: null,
    ToDate: null,
    calculateBreak: false,
    overnightAllowance: false,
  });
  const [DateError, setDateError] = useState({});

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);
      if (company.length > 0)
        setFormInfo((prev) => ({
          ...prev,
          companyId: company[0].id,
        }));
      const department = await GeneralListApis(locale).GetDepartmentList(
        company.length > 0 ? company[0].id : 0
      );
      setDepartmentList(department);

      const employee = await GeneralListApis(locale).GetEmployeeList(
        null,
        null,
        company.length > 0 ? company[0].id : null,
        null
      );
      setEmployeeList(employee);

      if (company.length > 0) {
        const response = await GeneralListApis(locale).getOpenMonth(
          company[0].id,
          0
        );

        setOpenMonth({
          todate: response.todateAtt,
          fromDate: response.fromDateAtt,
        });

        setFormInfo((prev) => ({
          ...prev,
          FromDate: response.fromDateAtt,
          ToDate: response.todateAtt,
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

  const getFilterHighlights = () => {
    const highlights = [];

    const company = getAutoCompleteValue(companyList, formInfo.companyId);

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (formInfo.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(formInfo.FromDate),
      });
    }

    if (formInfo.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(formInfo.ToDate),
      });
    }

    if (formInfo.EmployeeIds && formInfo.EmployeeIds.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: formInfo.EmployeeIds.map((item) => item.name).join(" , "),
      });
    }

    if (formInfo.OrganizationIds && formInfo.OrganizationIds.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.department),
        value: formInfo.OrganizationIds.map((item) => item.name).join(" , "),
      });
    }

    setFilterHighlights(highlights);
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    handleSearch();
  };

  const handleSearch = async () => {
    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }

    let fromdate = new Date(openMonth.fromDate);
    const isValidRange = isDateInRange(
      formInfo.FromDate,
      fromdate.setDate(fromdate.getDate() - 1),
      openMonth.todate
    );

    if (!isValidRange) {
      toast.error(
        intl.formatMessage(messages.startAndEndDateNotInOpenMonthRange)
      );
      return;
    }

    // used to check if the user choose more than one day then he must to choose employee 
    // if he choose one day then get data without choose employee
    if(formInfo.FromDate && formInfo.ToDate)
      {
        const timeDiff = Math.abs(new Date(formInfo.ToDate ) - new Date(formInfo.FromDate));
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
  
        if(dayDiff > 0)
        {          
          if (formInfo.EmployeeIds.length === 0) {
            toast.error(intl.formatMessage(messages.employeeErrMess));
            return;
          }
        }
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

      getFilterHighlights();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  const handleCalculate = async () => {
    try {
      if (Object.values(DateError).includes(true)) {
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }
      let fromdate = new Date(openMonth.fromDate);
      const isValidRange = isDateInRange(
        formInfo.FromDate,
        fromdate.setDate(fromdate.getDate() - 1),
        openMonth.todate
      );

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
        if (response.data.length > 0) toast.error(response.data);
        else {
          toast.success(notif.success);
        }
        const result = await api(locale).GetList(body, formData);
        setTableData(result);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  const handlePost = async () => {
    try {
      if (Object.values(DateError).includes(true)) {
        toast.error(intl.formatMessage(payrollMessages.DateNotValid));
        return;
      }
      let fromdate = new Date(openMonth.fromDate);
      const isValidRange = isDateInRange(
        formInfo.FromDate,
        fromdate.setDate(fromdate.getDate() - 1),
        openMonth.todate
      );

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
        OvernightAllowance: formInfo.overnightAllowance,
      };

      const body = {
        companyId: formInfo.companyId,
      };

      const response = await api(locale).PostToPayroll(body, formData);

      if (response.success) {
        if (response.success.length == 0) toast.success(notif.success);
        else {
          var errors = "";
          response.success.map(
            (item, index) => (errors += item.staff_Id + ":" + item.msg + " ")
          );
          toast.error(errors);
        }
      } else {
        toast.error(Object.keys(response)[0]);
        //setFileData([]);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const handleRollBackAttendance = async () => {
    try {
      let fromdate = new Date(openMonth.fromDate);
      const isValidRange = isDateInRange(
        formInfo.FromDate,
        fromdate.setDate(fromdate.getDate() - 1),
        openMonth.todate
      );

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
      //
    } finally {
      setIsLoading(false);
    }
  };

  const handleRollBackPost = async () => {
    try {
      let fromdate = new Date(openMonth.fromDate);
      const isValidRange = isDateInRange(
        formInfo.FromDate,
        fromdate.setDate(fromdate.getDate() - 1),
        openMonth.todate
      );

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

      const response = await api(locale).RollBackPost(body, formData);
      if (response.status == 200) {
        toast.success(notif.success);
      }
    } catch (err) {
      //
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
      [name]: value,
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
      if (companyId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          companyId,
          0
        );
        setOpenMonth({
          todate: response.todateAtt,
          fromDate: response.fromDateAtt,
        });
        setFormInfo((prev) => ({
          ...prev,
          FromDate: response.fromDateAtt,
          ToDate: response.todateAtt,
        }));
      } else {
        setOpenMonth({
          todate: null,
          fromDate: null,
        });
        setFormInfo((prev) => ({
          ...prev,
          FromDate: null,
          ToDate: null,
        }));
      }
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

  const handleClose = () => {
    setOpenParentPopup(false);
    setSelectedRowData();
    handleSearch();
  };

  const handleClickOpen = (item, popUpTitle, disabledLock, shortcutType) => {
    setOpenParentPopup(true);
    setSelectedRowData(
      tableData.find((itemData) => itemData.id === item.rowData[0])
    );
    setPopUpTitle(popUpTitle);
    setDisabledLock(disabledLock);
    setShortcutType(shortcutType);
    setIsLoadingPopup(true);
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "employeeId",
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return "";
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              handleClickOpen={handleClickOpen}
              DataOfSelectedRow={tableData.find(
                (itemData) => itemData.id === tableMeta.rowData[0]
              )}
            />
          );
        },
        customHeadRender: (columnMeta) => (
          <th key={columnMeta.index}>
            <MenuIcon />
          </th>
        ),
      },
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.EmpCode)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "weekDayName",
      label: intl.formatMessage(messages.day),
      options: {
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.day)}
            >
              <span>{value}</span>
            </Tooltip>
          </pre>
        ),
      },
    },
    {
      name: "shiftCode",
      label: intl.formatMessage(messages.shiftCode),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.shiftCode)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "shiftName",
      label: intl.formatMessage(messages.shiftName),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.shiftName)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "shiftDate",
      label: intl.formatMessage(messages.shiftDate),
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <pre
              style={{
                ...(tableData?.[tableMeta?.rowIndex]?.absence && {
                  backgroundColor: "#f00",
                }),
                ...(tableData?.[tableMeta?.rowIndex]?.vac && {
                  backgroundColor: "#fafa02",
                }),
                ...(tableData?.[tableMeta?.rowIndex]?.shiftVacancy && {
                  backgroundColor: "#1bff00",
                }),
                ...((tableData?.[tableMeta?.rowIndex]?.absence ||
                  tableData?.[tableMeta?.rowIndex]?.vac ||
                  tableData?.[tableMeta?.rowIndex]?.shiftVacancy) && {
                  padding: "7px",
                  borderRadius: "10px",
                  margin: "0",
                  boxShadow: "0px 1px 3px 1px #c7c7c7",
                }),
              }}
            >
              <Tooltip
                enterDelay={500}
                leaveDelay={200}
                placement="top"
                title={intl.formatMessage(messages.shiftDate)}
              >
                <span>{format(new Date(value), "yyyy-MM-dd")}</span>
              </Tooltip>
            </pre>
          );
        },
        setCellProps: (value, rowIndex) => ({
          style: {
            paddingLeft: "0",
            textAlign: "center",
          },
        }),
      },
    },

    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.employeeName)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "timeIn",
      label: intl.formatMessage(messages.signIn),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.signIn)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "timeOut",
      label: intl.formatMessage(messages.signOut),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.signOut)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "workHours",
      label: intl.formatMessage(messages.workHours),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.workHours)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "lateMin",
      label: intl.formatMessage(messages.late),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.late)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "extraTime",
      label: intl.formatMessage(messages.extraTime),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.extraTime)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "lessTime",
      label: intl.formatMessage(messages.LessTime),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.LessTime)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "ReplaceVac",
      label: intl.formatMessage(messages.AccuredLeave),
      options: {
        customBodyRender: (value) => (
          <div>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.AccuredLeave)}
            >
              <span>{value}</span>
            </Tooltip>
          </div>
        ),
      },
    },

    {
      name: "vac",
      label: intl.formatMessage(messages.leave),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.leave)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "mission",
      label: intl.formatMessage(messages.mission),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.mission)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "per",
      label: intl.formatMessage(messages.permission),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.permission)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "absence",
      label: intl.formatMessage(messages.absent),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.absent)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "shiftVacancy",
      label: intl.formatMessage(messages.weekendLeave),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.weekendLeave)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "manual",
      label: intl.formatMessage(messages.manual),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.manual)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },

    {
      name: "stopD",
      label: intl.formatMessage(messages.stop),
      options: {
        filter: false,
        customBodyRender: (value) => (
          <pre>
            <Tooltip
              enterDelay={500}
              leaveDelay={200}
              placement="top"
              title={intl.formatMessage(messages.stop)}
            >
              {getCheckboxIcon(value)}
            </Tooltip>
          </pre>
        ),
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return "";
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              handleClickOpen={handleClickOpen}
              DataOfSelectedRow={tableData.find(
                (itemData) => itemData.id === tableMeta.rowData[0]
              )}
            />
          );
        },
      },
    },
    {
      name: "startTime",
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "endTime",
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <CalculateAttendancePopUp
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(payrollMessages.deleteMessage)}`}
        Data={selectedRowData}
        popUpTitle={popUpTitle}
        disabledLock={disabledLock}
        shortcutType={shortcutType}
        isLoadingPopup={isLoadingPopup}
        setIsLoadingPopup={setIsLoadingPopup}
      />

      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon="border_color" title={title} desc="">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
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

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.startDate)}
                  value={formInfo.FromDate ? dayjs(formInfo.FromDate) : null}
                  className={classes.field}
                  minDate={dayjs(openMonth.fromDate).subtract(1, "day")}
                  //maxDate={dayjs(openMonth.todate)}
                  onChange={(date) => {
                    onDatePickerChange(date, "FromDate");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        FromDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        FromDate: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={3} lg={2} xl={1.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={intl.formatMessage(messages.endDate)}
                  minDate={dayjs(openMonth.fromDate).subtract(1, "day")}
                  //maxDate={dayjs(openMonth.todate)}
                  value={formInfo.ToDate ? dayjs(formInfo.ToDate) : null}
                  className={classes.field}
                  onChange={(date) => {
                    onDatePickerChange(date, "ToDate");
                  }}
                  onError={(error, value) => {
                    if (error !== null) {
                      setDateError((prevState) => ({
                        ...prevState,
                        ToDate: true,
                      }));
                    } else {
                      setDateError((prevState) => ({
                        ...prevState,
                        ToDate: false,
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
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

            <Grid item xs={12} md={6} xl={3}>
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

            <Grid item lg={3} md={6} xs={12}>
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

            <Grid item lg={3} md={6} xs={12}>
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
            <Grid item>
              <Button variant="contained" onClick={handleRollBackAttendance}>
                {intl.formatMessage(messages.rollbackAttendance)}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handlePost}>
                {intl.formatMessage(messages.postToPayroll)}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={handleRollBackPost}>
                {intl.formatMessage(messages.rollbackPost)}
              </Button>
            </Grid>

            {/* TO DO */}
            {/*  
            

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

      <SimplifiedPayrollTable
        title=""
        data={tableData}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

CalculateAttendance.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CalculateAttendance);
