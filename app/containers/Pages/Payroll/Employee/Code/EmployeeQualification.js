/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import messages from "../messages";
import { EditTable } from "../../../../Tables/demos";
import { useLocation } from "react-router-dom";
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

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function EmployeeQualification(props) {
  const history = useHistory();
  const location = useLocation();
  const { empid } =
    location.state == null ? { id: 0, name: "" } : location.state;
  const { intl } = props;
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [employeeList, setEmployeeList] = useState([]);
  const title = localStorage.getItem("MenuName");
  const description = brand.desc;
  console.log(description + "*" + title);
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const GetUserMenuLookup = useCallback(async () => {
    try {
      const employeedata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employeedata || []);
    } catch (err) {}
  }, []);

  useEffect(() => {
    GetUserMenuLookup();
  }, []);

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
          <Grid item xs={1} sm={6}>
            <Autocomplete
              id="ddlEmp"
              options={employeeList}
              value={{ id: employee.id, name: employee.name }}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setEmployee({
                  id: value !== null ? value.id : 0,
                  name: value !== null ? value.name : "",
                });
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="employee"
                  //  value={employee.id}
                  label={intl.formatMessage(messages.chooseEmp)}
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
      </PapperBlock>
      <EditTable
        anchorTable={anchorTable}
        title={employee.name}
        API={EmployeeQualificationData(employee.id)}
      />
    </div>
  );
}

export default injectIntl(EmployeeQualification);
