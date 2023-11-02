import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";

function EmployeeAttendanceTemplate(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [Tamplete, setTamplete] = useState("");
  const [TampleteList, setTampleteList] = useState([]);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    attendanceRulesNotApplied: false,
    noAttendanceRule: false,
  });
  

  const handleSearch = async (e) => {

    
    try {
      setIsLoading(true);
      var formData = {
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        ParaTempId: Tamplete,
        chkNoTemp: searchData.attendanceRulesNotApplied,
        chkNoAttRule: searchData.noAttendanceRule
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).EmployeeAttendanceTemplateReport(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      
      const tamplete = await GeneralListApis(locale).GetControlParameterList();
      setTampleteList(tamplete);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "employeeId",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
      },
    },
    {
      name: "controlParameter",
      label: intl.formatMessage(messages.TampleteName),
      options: {
        filter: true,
      },
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
      options: {
        filter: true,
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
      name: "job",
      label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },
    {
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
          <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
            ></Search>
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="MissionId"
              options={TampleteList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setTamplete(value == null ? "" : value.id);
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="TampleteName"
                  label={intl.formatMessage(messages.TampleteName)}
                />
              )}
            />
          </Grid>

          <Grid item md={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.attendanceRulesNotApplied}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            attendanceRulesNotApplied: evt.target.checked,
                            noAttendanceRule: false,

                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.attendanceRulesNotApplied)}
                  />
            </Grid>

          
            <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.noAttendanceRule}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            attendanceRulesNotApplied: false,
                            noAttendanceRule: evt.target.checked,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.noAttendanceRule)}
                  />
            </Grid>

         

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...Payrollmessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
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

EmployeeAttendanceTemplate.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmployeeAttendanceTemplate);
