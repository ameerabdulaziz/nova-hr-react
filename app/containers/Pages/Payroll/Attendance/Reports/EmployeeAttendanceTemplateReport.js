import React, { useEffect, useState } from "react";
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
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import { useLocation } from "react-router-dom";
import PayrollTable from "../../Component/PayrollTable";


function EmployeeAttendanceTemplate(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { state } = useLocation();
  const [Tamplete, setTamplete] = useState(state ? state.Tamplete : "");
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
        chkNoAttRule: searchData.noAttendanceRule,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).EmployeeAttendanceTemplateReport(
        formData
      );
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
    if (Tamplete) handleSearch();
  }, []);

  const columns = [
    {
      name: "employeeId",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: "controlParameter",
      label: intl.formatMessage(messages.TampleteName),
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.EmpCode),
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: "job",
      label: intl.formatMessage(messages.job),
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
    },
  ];

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
              value={
                Tamplete&&TampleteList.length>0 ? TampleteList.find((item) => item.id === Tamplete) : null
              }
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

        <PayrollTable
          title=""
          data={data}
          columns={columns}
        />
    </PayRollLoader>
  );
}

EmployeeAttendanceTemplate.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(EmployeeAttendanceTemplate);
