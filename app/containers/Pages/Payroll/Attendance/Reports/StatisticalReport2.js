import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import ApiData from "../api/AttendanceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";


function StatisticalReport2(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });



  

  const handleSearch = async (e) => {

    try {
      setIsLoading(true);
      let formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      const dataApi = await ApiData(locale).StatisticalReport2Api(formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }

  };

 


  const columns = [
    {
      name: "Id",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false
      },
    },
    {
      name: "employeeCode",
      label: intl.formatMessage(messages.Code),
      options: {
        filter: true,
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: "0" }),
            ...(locale === "ar" && { right: "0" }),
            background: "white",
            zIndex: 100,
            paddingLeft: 20,
            paddingRight: 20
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: 0 }),
            ...(locale === "ar" && { right: 0 }),
            background: "white",
            zIndex: 101,
            paddingLeft: 20,
            paddingRight: 20
          }
        })
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(messages.employeeName),
      options: {
        filter: true,
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: 60 }),
            ...(locale === "ar" && { right: 95 }),
            background: "white",
            zIndex: 100,
            paddingLeft: 20,
            paddingRight: 20
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: 60 }),
            ...(locale === "ar" && { right: 95 }),
            background: "white",
            zIndex: 101,
            paddingLeft: 20,
            paddingRight: 20
          }
        })
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
      options: {
        filter: true,
        setCellProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: 223 }),
            ...(locale === "ar" && { right: 198 }),
            background: "white",
            zIndex: 100,
            paddingLeft: 20,
            paddingRight: 20
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: "nowrap",
            position: "sticky",
            ...(locale === "en" && { left: 223 }),
            ...(locale === "ar" && { right: 198 }),
            background: "white",
            zIndex: 101,
            paddingLeft: 20,
            paddingRight: 20
          }
        })
      },
    },
    {
        name: "Vac_Balance",
        label: intl.formatMessage(messages.vacBalance),
        options: {
          filter: true,
          setCellProps: () => ({
            style: {
              whiteSpace: "nowrap",
              position: "sticky",
              ...(locale === "en" && { left: 363 }),
            ...(locale === "ar" && { right: 285 }),
              background: "white",
              zIndex: 100,
              paddingLeft: 20,
            paddingRight: 20
            }
          }),
          setCellHeaderProps: () => ({
            style: {
              whiteSpace: "nowrap",
              position: "sticky",
              ...(locale === "en" && { left: 363 }),
            ...(locale === "ar" && { right: 285 }),
              background: "white",
              zIndex: 101,
              paddingLeft: 20,
            paddingRight: 20
            }
          })
        },
      },
      {
        name: "absence",
        label: intl.formatMessage(messages.Absence),
        options: {
          filter: true,
        },
      },
      {
        name: "vac1",
        label: intl.formatMessage(messages.leaves),
        options: {
          filter: true,
        },
      },
      {
        name: "vac14",
        label: intl.formatMessage(messages.casualL),
        options: {
          filter: true,
        },
      },
      {
        name: "vac3",
        label: intl.formatMessage(messages.deductedL),
        options: {
          filter: true,
        },
      },
      {
        name: "vac10",
        label: intl.formatMessage(messages.payedL),
        options: {
          filter: true,
        },
      },
      {
        name: "vac2",
        label: intl.formatMessage(messages.sickL),
        options: {
          filter: true,
        },
      },
      {
        name: "vac4in",
        label: intl.formatMessage(messages.workedOfficial),
        options: {
          filter: true,
        },
      },
      {
        name: "vac4notin",
        label: intl.formatMessage(messages.Official),
        options: {
          filter: true,
        },
      },
      {
        name: "vac4intime",
        label: intl.formatMessage(messages.workedOfficialT),
        options: {
          filter: true,
        },
      },
      {
        name: "shiftVacInCount",
        label: intl.formatMessage(messages.workedWeekendCount),
        options: {
          filter: true,
        },
      },
      {
        name: "shiftVacnotInCount",
        label: intl.formatMessage(messages.Weekend),
        options: {
          filter: true,
        },
      },
      {
        name: "shiftVacInTime",
        label: intl.formatMessage(messages.workedWeekendT),
        options: {
          filter: true,
        },
      },
      {
        name: "notIn",
        label: intl.formatMessage(messages.missingSignIn),
        options: {
          filter: true,
        },
      },
      {
        name: "notOut",
        label: intl.formatMessage(messages.missingSignOut),
        options: {
          filter: true,
        },
      },
      {
        name: "notINOut",
        label: intl.formatMessage(messages.total),
        options: {
          filter: true,
        },
      },
      {
        name: "morningPer",
        label: intl.formatMessage(messages.dayPermissionC),
        options: {
          filter: true,
        },
      },
      {
        name: "morningPerMin",
        label: intl.formatMessage(messages.dayPermissionT),
        options: {
          filter: true,
        },
      },
      {
        name: "nightPer",
        label: intl.formatMessage(messages.nightPermissionC),
        options: {
          filter: true,
        },
      },
      {
        name: "nightPerMin",
        label: intl.formatMessage(messages.nightPermissionT),
        options: {
          filter: true,
        },
      },
      {
        name: "lateNoPer",
        label: intl.formatMessage(messages.lateCount),
        options: {
          filter: true,
        },
      },
      {
        name: "lateNoPerMin",
        label: intl.formatMessage(messages.lateTime),
        options: {
          filter: true,
        },
      },
      {
        name: "leaveEarlyNoPer",
        label: intl.formatMessage(messages.leaveEarlyC),
        options: {
          filter: true,
        },
      },
      {
        name: "leaveEarlyNoPerMin",
        label: intl.formatMessage(messages.leaveEarlyT),
        options: {
          filter: true,
        },
      },
      {
        name: "morMiss",
        label: intl.formatMessage(messages.dayMissionsCount),
        options: {
          filter: true,
        },
      },
      {
        name: "morMissMin",
        label: intl.formatMessage(messages.dayMissionT),
        options: {
          filter: true,
        },
      },
      {
        name: "nightMiss",
        label: intl.formatMessage(messages.nightMissionC),
        options: {
          filter: true,
        },
      },
      {
        name: "nightMissMin",
        label: intl.formatMessage(messages.nightMissionT),
        options: {
          filter: true,
        },
      },
      {
        name: "allDayMiss",
        label: intl.formatMessage(messages.fullDayMissions),
        options: {
          filter: true,
        },
      },
      {
        name: "overTimeC",
        label: intl.formatMessage(messages.overTimeC),
        options: {
          filter: true,
        },
      },
      {
        name: "overTimeMin",
        label: intl.formatMessage(messages.overTimeT),
        options: {
          filter: true,
        },
      },
      {
        name: "appOvertime",
        label: intl.formatMessage(messages.confirmedOverTime),
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
            ></Search>
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

StatisticalReport2.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(StatisticalReport2);
