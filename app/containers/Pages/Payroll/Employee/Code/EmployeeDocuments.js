import React, { useState, useEffect } from "react";
import brand from "enl-api/dummy/brand";
import { injectIntl } from "react-intl";
import EmployeeDocumentsData from "../api/EmployeeDocumentsData";
import MUIDataTable from "mui-datatables";
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
import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Payrollmessages from "../../messages";

function EmployeeDocuments({ intl }) {
  const Title = localStorage.getItem("MenuName");
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const { state } = useLocation();
  const employeeID = state?.employeeId;
  const [deleteItem, setDeleteItem] = useState("");

  const getdata = async () => {
    try {
      const employees = await GeneralListApis(locale).GetEmployeeList(locale);

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
        display: true,
      },
    },
    {
      name: "empName",
      label: intl.formatMessage(messages.employeename),
      options: {
        filter: true,
      },
    },
    {
      name: "startDate",
      label: intl.formatMessage(messages.startDate),
      options: {
        filter: true,
      },
    },
    {
      name: "endDate",
      label: intl.formatMessage(messages.endDate),
      options: {
        filter: true,
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
      name: "isPaperCopy",
      label: intl.formatMessage(messages.HardCopy),
      options: {
        filter: true,
      },
    },
    {
      name: "Actions",
      label: intl.formatMessage(messages.actions),
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
              <EditButton
                param={{ id: tableMeta.rowData[0], employeeId: employee }}
                url={"/app/Pages/Employee/EmployeeDocumentsEdit"}
              ></EditButton>

              <DeleteButton
                clickfnc={() => handleClickOpen(tableMeta.rowData)}
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
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    page: 0,
    searchOpen: true,
    selectableRows: "none",
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

  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const DeleteFun = async () => {
    try {
      setIsLoading(true);
      let response = await EmployeeDocumentsData().Delete(deleteItem);

      if (response.status == 200) {
        toast.success(notif.saved);
        employeeChangeFun(employee);
      } else {
        toast.error(response.statusText);
      }
      setIsLoading(false);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
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
    <Box
      sx={{
        zIndex: 100,
        position: "relative",
      }}
    >
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Backdrop
          sx={{
            color: "primary.main",
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
          }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          data={dataTable}
          columns={columns}
          options={options}
          className={style.tableSty}
        />
      </div>

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(Payrollmessages.deleteMessage)}${
          deleteItem[1]
        }`}
        callFun={DeleteFun}
      />
    </Box>
  );
}

export default injectIntl(EmployeeDocuments);
