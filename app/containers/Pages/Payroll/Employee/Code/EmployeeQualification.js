/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import brand from "enl-api/dummy/brand";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import messages from "../messages";
import { EditTable } from "../../../../Tables/demos";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import EmployeeQualificationData from "../api/EmployeeQualificationData";
import UserMenuData from "../../Setting/api/UserMenuData";
import { CrudTable, Notification } from "enl-components";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  Checkbox,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  Input,
} from "@mui/material";
import GeneralListApis from "../../api/GeneralListApis";
import DecryptUrl from "../../Component/DecryptUrl";
import EmployeeData from '../../Component/EmployeeData';
import EmployeeNavigation from '../../Component/EmployeeNavigation';
import CallMadeIcon from '@mui/icons-material/CallMade';
import payrollMessages from '../../messages';
import ApiData from '../api/PersonalData';
import notif from 'enl-api/ui/notifMessage';

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function EmployeeQualification(props) {

// get employee data from url
const empid  = DecryptUrl()

  const history = useHistory();

  const { intl } = props;
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const title = localStorage.getItem("MenuName");
  const description = brand.desc;
  console.log(description + "*" + title);
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);


  const anchorTable = [
    {
      name: "id",
      label: "code",
      type: "static",
      initialValue: "",
      hidden: true,
    },

    {
      name: "qualificationName",
      label: "qualification",
      type: "selection",
      initialValue: "",
      options: [],
      width: "auto",
      hidden: false,
    },
    {
      name: "qualificationRelease",
      label: "qualificationRelease",
      type: "text",
      initialValue: "",
      width: "auto",
      initialValue: "",
      hidden: false,
    },
    {
      name: "qualificationDate",
      label: "qualificationDate",
      type: "date",
      initialValue: new Date(),
      width: "auto",
      hidden: false,
    },
    {
      name: "gradeName",
      label: "grade",
      type: "selection",
      initialValue: "",
      options: [],
      width: "auto",
      hidden: false,
    },
    {
      name: "membershipNo",
      label: "membershipNo",
      type: "text",
      initialValue: "",
      width: "auto",
      initialValue: "",
      hidden: false,
    },
    {
      name: "qualificationId",
      label: "id",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: true,
    },

    {
      name: "gradeId",
      label: "id",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: true,
    },
    {
      name: "employeeId",
      label: "id",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: true,
    },
    {
      name: "edited",
      label: "",
      type: "static",
      initialValue: "",
      hidden: true,
    },
    {
      name: "action",
      label: "action",
      type: "static",
      initialValue: "",
      hidden: false,
    },
  ];


  const handleEmpChange = (id, name, empName) => {
    if (name == "employeeId")
    {
      if (id && empName) {
        setEmployee({ id: id, name: empName })
      }
    }
    // used to disable add button when clear employee name compobox
    if(id === "")
    {
      setEmployee({ id: 0, name: "" })
    }
  };


  const ResetDeviceKeyFun = async (employeeId) => {

    try
    {
      await ApiData().ResetDeviceKey(employeeId);
  
      toast.success(notif.saved);
    }
    catch(err)
    {
      
    }
    finally {}
    
   }

  return (
    <div>
      <PapperBlock whiteBg icon="border_color" title={title} desc="">
        <Grid
          container
          spacing={1}
          alignItems="flex-start"
          direction="row"
          //justifyContent="center"
        >
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
          <Grid item xs={12} md={12}>
            <EmployeeData handleEmpChange={handleEmpChange}  id={empid && empid.id !== 0 ? empid.id : null} ></EmployeeData>
        </Grid>
        </Grid>
      </PapperBlock>
      <EditTable
        anchorTable={anchorTable}
        title={employee.name}
        API={EmployeeQualificationData(employee.id)}
        addBtnLock={JSON.stringify(employee) === JSON.stringify({ id: 0, name: "" })}
      />
    </div>
  );
}

export default injectIntl(EmployeeQualification);
