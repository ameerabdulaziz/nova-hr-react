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
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getCheckboxIcon } from "../../helpers";
import EmployeeData from '../../Component/EmployeeData';
import EmployeeNavigation from '../../Component/EmployeeNavigation';
import CallMadeIcon from '@mui/icons-material/CallMade';
import payrollMessages from '../../messages';
import { Button } from '@mui/material';
import SITEMAP from "../../../../App/routes/sitemap";
import ApiData from '../api/PersonalData';
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function EmployeeDocuments({ intl }) {
  const Title = localStorage.getItem("MenuName");
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState({ id: 0, name: '' });
  const { state } = useLocation();
  const employeeID = state?.employeeId;


  useEffect(() => {
    if (employeeID) {


      employeeChangeFun(employeeID);
    }
  }, [employeeID]);

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
      options: getDateColumnOptions(
        intl.formatMessage(messages.startDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "endDate",
      label: intl.formatMessage(messages.endDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.endDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "followDate",
      label: intl.formatMessage(messages.followDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.followDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
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
          url={SITEMAP.employee.EmployeeDocumentsCreate.route}
          param={{ employeeId: employee.id }}
          disabled={employee.id !== 0 ? false : true}
        ></AddButton>
      </span>
    ),
  };

  const deleteRow = async (id) => {
    try {
      setIsLoading(true);
      await EmployeeDocumentsData().Delete(id);

      toast.success(notif.saved);
      employeeChangeFun(employee.id);
      setIsLoading(false);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const actions = {
    edit: {
      url: SITEMAP.employee.EmployeeDocumentsEdit.route,
    },
    delete: {
      api: deleteRow,
    },
  };

  const employeeChangeFun = async (id) => {
    // if (id) {
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
    // }
  };

  const handleEmpChange = (id, name, empName) => {
    if (name == "employeeId")
    {
      // setEmployee(id)

      if (id) {
        setEmployee({ id: id, name: empName })
        employeeChangeFun(id)
      }

      // used to disable add button when clear employee name compobox
    if(id === "")
    {
      setEmployee({ id: 0, name: '' })
      employeeChangeFun(0)
    }
    }
  };


  const ResetDeviceKeyFun = async (employeeId) => {

    try
    {
      setIsLoading(true);
      await ApiData().ResetDeviceKey(employeeId);
  
      toast.success(notif.saved);
    }
    catch(err)
    {
      
    }
    finally {
      setIsLoading(false);
    }
    
   }


  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        <Grid container justifyContent='end' mt={0}>
            <Grid item>
              <EmployeeNavigation
                employeeId={employee.id}
                employeeName={employee.name}
                ResetDeviceKeyFun={ResetDeviceKeyFun}
                openInNewTap
                anchor={
                  <Button disabled={employee.id ? false:true} variant='contained' endIcon={<CallMadeIcon />}>
                    {intl.formatMessage(payrollMessages.goTo)}
                  </Button>
                }
              />
            </Grid>
          </Grid>

          <EmployeeData  handleEmpChange={handleEmpChange}   id={employeeID ? employeeID : null} ></EmployeeData>
      </PapperBlock>

      <SimplifiedPayrollTable
        data={dataTable}
        columns={columns}
        options={options}
        actions={actions}
      />

    </PayRollLoader>
  );
}

export default injectIntl(EmployeeDocuments);
