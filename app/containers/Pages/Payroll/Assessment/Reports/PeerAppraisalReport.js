import React, { useEffect, useState,useRef } from "react";
import ApiData from "../api/AssessmentReportData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import PayRollLoader from "../../Component/PayRollLoader";
import style from "../../../../../styles/styles.scss";
import PayrollTable from "../../Component/PayrollTable";

function AssessmentReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [DepartmentList, setDepartmentList] = useState([]);
  const [Department, setDepartment] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusList, setStatusList] = useState([
    {id: 0 , name: "All"},
    {id: 1 , name: "Done"},
    {id: 2 , name: "Not Done"}
  ]);




  const handleSearch = async (e) => {
        try {
        setIsLoading(true);

        // const dataApi = await ApiData(locale).GetDataById(Year.id,Department,EmployeeIds,Month);

        // setdata(dataApi);
        } catch (err) {
        } finally {
        setIsLoading(false);
        }
  };

  async function fetchData() {
    setIsLoading(true);
    
    try {
      const departments = await GeneralListApis(locale).GetDepartmentList();

      setDepartmentList(departments)

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      name: 'employeeId',
      options: {
        filter: false,
        display: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'peerAppraisalSettingId',
      label: intl.formatMessage(messages.evaluatorEmployee),
    },
    {
      name: 'peerAppraisalSettingId2',
      label: intl.formatMessage(messages.evaluatedEmployee),
    },
    {
      name: 'organizationName',
      label: intl.formatMessage(messages.organization),
    },
    {
      name: 'month',
      label: intl.formatMessage(messages.month),
    },
    {
      name: 'totalDegree',
      label: intl.formatMessage(messages.totalDegree),
    }
  ];

  return (
    <PayRollLoader isLoading={isLoading}>


      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                    <Autocomplete
                    id="ddlMenu"   
                    isOptionEqualToValue={(option, value) => option.id === value.id}                      
                    options={DepartmentList.length != 0 ? DepartmentList: []}
                    getOptionLabel={(option) =>(
                        option  ? option.name : ""
                    )
                    }
                    renderOption={(props, option) => {
                        return (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                        );
                    }}
                    onChange={(event, value) => {
                        if (value !== null) {
                            setDepartment(value.id);
                        } else {
                            setDepartment(null);
                        }
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name="VacationType"
                        label={intl.formatMessage(messages.department)}
                        margin="normal" 
                        className={style.fieldsSty}
                        
                        />
                )}
                />
            </Grid>

            <Grid item xs={12} md={2}>
                    <Autocomplete
                    id="Status"
                    options={statusList}
                    isOptionEqualToValue={(option, value) => {
                        return (
                        option.id === value.id || value.id === 0 || value.id === ""
                        );
                    }}
                    getOptionLabel={(option) => (option.name ? option.name : "")}
                    onChange={(event, value) => {
                        setStatus(value !== null ? value.id : null)
                    }}
                    renderInput={(params) => (
                        <TextField
                        variant="outlined"
                        {...params}
                        name="Status"
                        label={intl.formatMessage(messages.status)}
                        />
                    )}
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

AssessmentReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(AssessmentReport);
