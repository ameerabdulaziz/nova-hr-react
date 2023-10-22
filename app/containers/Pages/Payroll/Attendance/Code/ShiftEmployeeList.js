import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/ShiftEmployeeData";
import { useSelector } from "react-redux";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import style from "../../../../../../app/styles/styles.scss";
import notif from "enl-api/ui/notifMessage";
import { toast } from "react-hot-toast";
import useStyles from "../../Style";
import { PapperBlock } from "enl-components";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import GeneralListApis from "../../api/GeneralListApis";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import AlertPopup from "../../Component/AlertPopup";
import Payrollmessages from "../../messages";
import PayRollLoader from "../../Component/PayRollLoader";

function ShiftEmployeeList(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [EmployeeList, setEmployeeList] = useState([]);
  const [employee, setemployee] = useState("");
  const { state } = useLocation();
  const employeeID = state?.employeeId;
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = (item) => {
    debugger;
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function deleterow() {
    try {
      debugger;
      setIsLoading(true);
      let response = await ApiData(locale).Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        fetchData();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function Getookup() {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);
      if (employeeID) {
        setemployee(employeeID);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchData() {
    try {
      setIsLoading(true);
      if (!employee) {
        setdata([]);
        return;
      }
      const dataApi = await ApiData(locale).GetList(employee, "", "");
      setdata(dataApi || []);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    Getookup();
  }, []);

  useEffect(() => {
    fetchData();
  }, [employee]);

  const CheckBox = (value) => {
    return (
      <div className={style.actionsSty}>
        {value ? (
          <CheckIcon style={{ color: "#3f51b5" }} />
        ) : (
          <CloseIcon style={{ color: "#717171" }} />
        )}
      </div>
    );
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false,
      },
    },
    {
      name: "shiftId",
      label: <FormattedMessage {...messages["shiftId"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "shiftName",
      label: <FormattedMessage {...messages["shiftName"]} />,
      options: {
        filter: true,
      },
    },

    {
      name: "startTime",
      label: <FormattedMessage {...messages["startTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "endTime",
      label: <FormattedMessage {...messages["endTime"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "fromDate",
      label: <FormattedMessage {...Payrollmessages["fromdate"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "toDate",
      label: <FormattedMessage {...Payrollmessages["todate"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => format(new Date(value), "yyyy-MM-dd"),
      },
    },
    {
      name: "workHours",
      label: <FormattedMessage {...messages["hours"]} />,
      options: {
        filter: true,
      },
    },
    {
      name: "vsaturday",
      label: <FormattedMessage {...Payrollmessages["saturday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vsunday",
      label: <FormattedMessage {...Payrollmessages["sunday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vmonday",
      label: <FormattedMessage {...Payrollmessages["monday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vtuesday",
      label: <FormattedMessage {...Payrollmessages["tuesday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vwednesday",
      label: <FormattedMessage {...Payrollmessages["wednesday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vthursday",
      label: <FormattedMessage {...Payrollmessages["thursday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "vfriday",
      label: <FormattedMessage {...Payrollmessages["friday"]} />,
      options: {
        filter: true,
        customBodyRender: (value) => CheckBox(value),
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,

        customBodyRender: (value, tableMeta) => {
          console.log("tableMeta =", tableMeta);
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{
                  id: tableMeta.rowData[0],
                  employeeId: employee,
                  employeeName: employee
                    ? EmployeeList.find((item) => item.id === employee).name
                    : null,
                }}
                url={"/app/Pages/Att/ShiftEmployeeEdit"}
              ></EditButton>
              <DeleteButton
                clickfnc={() => deleterow(tableMeta.rowData[0])}
              ></DeleteButton>
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
    selectableRows: "none",
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    customToolbar: () => (
      <AddButton
        url={"/app/Pages/Att/ShiftEmployeeCreate"}
        param={{
          employeeId: employee,
          employeeName: employee
            ? EmployeeList.find((item) => item.id === employee).name
            : null,
        }}
        disabled={employee ? false : true}
      ></AddButton>
    ),
    customToolbarSelect: (selectedRows) => (
      <div>
        <DeleteButton
          clickfnc={() => handleClickOpen(selectedRows)}
        ></DeleteButton>
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
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="employeeId"
                options={EmployeeList}
                value={
                  employee
                    ? EmployeeList.find((item) => item.id === employee)
                    : null
                }
                isOptionEqualToValue={(option, value) =>
                  value.id === 0 || value.id === "" || option.id === value.id
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                onChange={(event, value) => {
                  setemployee(value == null ? "" : value.id);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    name="employeeId"
                    required
                    label={intl.formatMessage(Payrollmessages.employeeName)}
                  />
                )}
              />
            </Grid>
          </Grid>          
        </div>
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

export default injectIntl(ShiftEmployeeList);
