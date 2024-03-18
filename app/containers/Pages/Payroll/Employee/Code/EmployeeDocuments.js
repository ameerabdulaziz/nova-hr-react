import React, { useState, useEffect } from "react";
import brand from "enl-api/dummy/brand";
import { injectIntl } from "react-intl";
import EmployeeDocumentsData from "../api/EmployeeDocumentsData";
import messages from "../messages";
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import GeneralListApis from "../../api/GeneralListApis";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import EditButton from "../../Component/EditButton";
import DeleteButton from "../../Component/DeleteButton";
import AddButton from "../../Component/AddButton";
import PayRollLoader from "../../Component/PayRollLoader";
import { useLocation } from "react-router-dom";
import Payrollmessages from "../../messages";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate, getCheckboxIcon } from "../../helpers";

function EmployeeDocuments({ intl }) {
  const Title = localStorage.getItem("MenuName");
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const { state } = useLocation();
  const employeeID = state?.employeeId;

  const getdata = async () => {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList();

      setEmployeeList(employees);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (employeeList.length !== 0 && employeeID) {
      setEmployee(employeeID);

      employeeChangeFun(employeeID);
    }
  }, [employeeID, employeeList]);

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(messages.id),
      options: {
        display: false,
        print: false,
      },
    },
    {
      name: "documentName",
      label: intl.formatMessage(messages.documentType),
      options: {
        filter: true,
      },
    },
    {
      name: "startDate",
      label: intl.formatMessage(messages.startDate),
      options: {
        filter: true,
        customBodyRender: (value) => <pre> {formateDate(value)} </pre>,
      },
    },
    {
      name: "endDate",
      label: intl.formatMessage(messages.endDate),
      options: {
        filter: true,
        customBodyRender: (value) => <pre> {formateDate(value)} </pre>,
      },
    },
    {
      name: "followDate",
      label: intl.formatMessage(messages.followDate),
      options: {
        filter: true,
      },
    },
    {
      name: "inDate",
      label: intl.formatMessage(messages.inDate),
    },
    {
      name: "outDate",
      label: intl.formatMessage(messages.outDate),
    },
    {
      name: "isPaperCopy",
      label: intl.formatMessage(messages.HardCopy),
      options: {
        filter: true,
        customBodyRender: (value) => getCheckboxIcon(typeof value === 'string' ? value === 'true' : value),
      },
    },
  ];

  const options = {
    customToolbar: () => (
      <span>
        <AddButton
          url={"/app/Pages/Employee/EmployeeDocumentsCreate"}
          param={{ employeeId: employee }}
          disabled={employee ? false : true}
        ></AddButton>
      </span>
    ),
  };

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await EmployeeDocumentsData().Delete(id);

      toast.success(notif.saved);
      employeeChangeFun(employee);
      setIsLoading(false);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    edit: {
      url: '/app/Pages/Employee/EmployeeDocumentsEdit',
    },
    delete: {
      api: deleteRow,
    },
  };

  const employeeChangeFun = async (id) => {
    if (id) {
      try {
        setIsLoading(true);
        const data = await EmployeeDocumentsData().GetList(id, locale);

        let newData = data.map((items) => {
          Object.keys(items).forEach((val) => {
            // this used to convert boolean values to string  until table can read the values
            if (typeof items[val] == "boolean") {
              items[val] = String(items[val]);
            }

            // used to make table read date Data as a date
            if (
              val === "startDate" ||
              val === "endDate" ||
              val === "followDate"
            ) {
              items[val] = new Date(items[val]).toLocaleDateString();
            }
          });
          return items;
        });

        setDataTable(newData);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={1} sm={6}>
            <Autocomplete
              id="ddlEmp"
              options={employeeList}
              value={
                employee
                  ? employeeList.find((item) => item.id === employee)
                  : null
              }
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(event, value) => {
                if (value !== null) {
                  setEmployee(value.id);
                } else {
                  setEmployee(0);
                }
                employeeChangeFun(value !== null ? value.id : null);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="employee"
                  value={employee}
                  label={intl.formatMessage(messages.chooseEmp)}
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        data={dataTable}
        columns={columns}
        options={options}
        actions={actions}
      />

    </PayRollLoader>
  );
}

export default injectIntl(EmployeeDocuments);
