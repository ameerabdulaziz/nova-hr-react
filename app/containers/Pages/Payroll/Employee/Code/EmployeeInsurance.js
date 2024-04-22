/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import PropTypes from "prop-types";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import messages from "../messages";
import { EditTable } from "../../../../Tables/demos";
import { toast } from "react-hot-toast";
import EmployeeInsuranceData from "../api/EmployeeInsuranceData";
import GeneralListApis from "../../api/GeneralListApis";
import { Grid, TextField, Autocomplete } from "@mui/material";

import { useHistory } from "react-router-dom";
import DecryptUrl from "../../Component/DecryptUrl";
const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function EmployeeInsurance(props) {

  // get employee data from url
  const empid  = DecryptUrl()
  const { intl } = props;
  const history = useHistory();
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: "" });
  const [employeeList, setEmployeeList] = useState([]);
  const title = "Employee Insurance"; //localStorage.getItem('MenuName');
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);

  const GetEmpLookup = useCallback(async () => {
    try {
      const data = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(data || []);
    } catch (err) {}
  }, []);

  useEffect(() => {
    GetEmpLookup();
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
      name: "companyName",
      label: "companyname",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: false,
    },

    {
      name: "fromDate",
      label: "fromdate",
      type: "date",
      initialValue: new Date(),
      width: "auto",
      hidden: false,
    },
    {
      name: "toDate",
      label: "todate",
      width: "auto",
      type: "date",
      initialValue: new Date(),
      hidden: false,
    },
    {
      name: "startDate",
      label: "startdate",
      type: "date",
      initialValue: new Date(),
      width: "auto",
      hidden: false,
    },
    {
      name: "endDate",
      label: "enddate",
      width: "auto",
      type: "date",
      initialValue: new Date(),
      hidden: false,
    },
    {
      name: "monthNo",
      label: "monthno",
      type: "text",
      width: "auto",
      initialValue: 0,
      hidden: true,
      disabled: true,
    },
    {
      name: "notes",
      label: "note",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: false,
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
        API={EmployeeInsuranceData(employee.id)}
        addBtnLock={JSON.stringify(employee) === JSON.stringify({ id: 0, name: "" })}
      />
    </div>
  );
}

export default injectIntl(EmployeeInsurance);
