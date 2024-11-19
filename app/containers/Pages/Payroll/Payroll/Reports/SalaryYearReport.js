import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
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
import { formateDate, getAutoCompleteValue } from "../../helpers";
import PayrollTable from "../../Component/PayrollTable";

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

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);

    if (organization) {
      highlights.push({
        label: intl.formatMessage(messages.organization),
        value: organization.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: employee.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (Year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: Year.name,
      });
    }

    setFilterHighlights(highlights);
  };

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

        getFilterHighlights();
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
      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      const years = await GeneralListApis(locale).GetYears();

      setYearList(years)


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
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
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


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 
    let selectedYear

    try
    {
      if(YearList.length !== 0)
      {
        if(!EmployeeId)
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
        }
        else
        {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
        }



        selectedYear = YearList.find(item => item.id == OpenMonthData.yearId)
        
          setYear(selectedYear ? selectedYear : null)

      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if((searchData.BranchId || searchData.BranchId !== "") && (!searchData.EmployeeId ||searchData.EmployeeId === ""))
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if((!searchData.BranchId || searchData.BranchId === "") && (searchData.EmployeeId  || searchData.EmployeeId !== ""))
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if((!searchData.BranchId || searchData.BranchId === "") && (!searchData.EmployeeId || searchData.EmployeeId === ""))
    {
      setYear(null)
    }

  },[searchData.BranchId, searchData.EmployeeId,YearList])

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
              company={searchData.BranchId}
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
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} md={12}></Grid>
        </Grid>
      </PapperBlock>

      <PayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />

    </PayRollLoader>
  );
}

SalaryYearReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(SalaryYearReport);
