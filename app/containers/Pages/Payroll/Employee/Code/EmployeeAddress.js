/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import brand from "enl-api/dummy/brand";
import { PapperBlock } from "enl-components";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import messages from "../messages";
import { EditTable } from "../../../../Tables/demos";
import { useLocation } from "react-router-dom";
import EmployeeAddressData from "../api/EmployeeAddressData";
import GeneralListApis from "../../api/GeneralListApis";
import { Grid, TextField, Autocomplete } from "@mui/material";

const useStyles = makeStyles()(() => ({
  root: {
    flexGrow: 1,
  },
}));

function EmployeeAddress(props) {
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

  const GetLookup = useCallback(async () => {
    try {
      const empdata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(empdata || []);
    } catch (err) {
    } finally {
    }
  }, []);

  useEffect(() => {
    GetLookup();
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
      name: "arAddress",
      label: "araddress",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: false,
    },
    {
      name: "enaddress",
      label: "enaddress",
      type: "text",
      initialValue: "",
      width: "auto",
      hidden: false,
    },
    {
      name: "govName",
      label: "govname",
      type: "selection",
      initialValue: "",
      options: [],
      orignaldata: [],
      childname: "cityName",
      width: "auto",
      hidden: false,
    },

    {
      name: "governmentId",
      label: "id",
      type: "text",
      width: "auto",
      initialValue: "",
      hidden: true,
    },
    {
      name: "cityName",
      label: "city",
      type: "selection",
      initialValue: "",
      options: [],
      orignaldata: [],
      width: "auto",
      hidden: false,
    },

    {
      name: "cityId",
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

      <div className={classes.root}>
        <EditTable
          anchorTable={anchorTable}
          title={employee.name}
          API={EmployeeAddressData(employee.id)}
        />
      </div>
    </div>
  );
}

export default injectIntl(EmployeeAddress);
