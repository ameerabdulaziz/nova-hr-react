import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

function SalaryYearReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });


  const [YearList, setYearList] = useState([]);
  const [Year, setYear] = useState(null);


  const handleSearch = async (e) => {

    if(Year)
    {

    try {
      setIsLoading(true);

      let formData = {
        OrganizationId: searchData.OrganizationId,
        EmployeeId: searchData.EmployeeId,
        EmployeeStatusId: searchData.EmpStatusId,
        BranchId: searchData.BranchId
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      
      const dataApi = await ApiData(locale).SalaryYearReport(Year,formData);
      setdata(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.YouMustToChooseYear));
    }
  };

  async function fetchData() {
    try {
      const years = await GeneralListApis(locale).GetYears();

      setYearList(years)

      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setYear(years.find((item) => item.id === response.yearId) ?? null);
      }
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
      name: "id",
      options: {
        display: false,
      },
    },
    {
      name: "organizationName",
      label: intl.formatMessage(messages.orgName),
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
        name: "jobName",
        label: intl.formatMessage(messages.job),
      options: {
        filter: true,
      },
    },
    {
        name: "socialInsuranceId",
        label: intl.formatMessage(messages.socialInsuranceId),
      options: {
        filter: true,
      },
    },
    {
        name: "insuranceDate",
        label: intl.formatMessage(messages.InsuranceDate),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{format(new Date(value), "yyyy-MM-dd")}</pre> : ''),
      },
    },
    {
        name: "netSal",
        label: intl.formatMessage(messages.NetSalary),
      options: {
        filter: true,
      },
    },
    {
        name: "insuEmpValVar",
        label: intl.formatMessage(messages.EmployeeShare),
      options: {
        filter: true,
      },
    },
    
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
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

                  <Grid item xs={12} md={2}>
            
                        <Autocomplete
                            id="ddlMenu"   
                            isOptionEqualToValue={(option, value) => option.id === value.id}                      
                            options={YearList.length != 0 ? YearList: []}
                            value={Year}
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
                                    setYear(value);
                                } else {
                                    setYear(null);
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="VacationType"
                                label={intl.formatMessage(messages.year)}
                                margin="normal" 
                                className={style.fieldsSty}
                                
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

SalaryYearReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(SalaryYearReport);
