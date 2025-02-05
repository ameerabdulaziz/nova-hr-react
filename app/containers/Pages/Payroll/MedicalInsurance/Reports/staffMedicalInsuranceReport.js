import React, { useEffect, useState, useCallback } from "react";
import ApiData from "../api/MedicalInsuranceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Autocomplete,
  TextField
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function staffMedicalInsuranceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [MedicalInsuranceCentersList, setMedicalInsuranceCentersList] = useState([]);
  const [MedicalTypesList, setMedicalTypesList] = useState([]);
  const [Deleted, setDeleted] = useState("");
  const [MedicalType, setMedicalType] = useState("");
  const [MedicalInsuranceCenter, setMedicalInsuranceCenter] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    FromDate: null,
    ToDate: null,
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });

  const [DateError, setDateError] = useState({});

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const deleteList = [
    { id: null, name: "All" },
    { id: true, name: "Deleted" },
    { id: false, name: "Not Deleted" },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const isDeleted = getAutoCompleteValue(deleteList, Deleted);
    const medicalType = getAutoCompleteValue(
      MedicalTypesList,
      MedicalType
    );
    const medicalInsuranceCenter = getAutoCompleteValue(
      MedicalInsuranceCentersList,
      MedicalInsuranceCenter
    );

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
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
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (searchData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(searchData.FromDate),
      });
    }

    if (searchData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(searchData.ToDate),
      });
    }

    if (medicalInsuranceCenter) {
      highlights.push({
        label: intl.formatMessage(messages.MedicalInsuranceCenters),
        value: medicalInsuranceCenter.name,
      });
    }

    if (isDeleted) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.delete),
        value: isDeleted.name,
      });
    }

    if (medicalType) {
      highlights.push({
        label: intl.formatMessage(messages.MedicalTypes),
        value: medicalType.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

     // used to stop call api if user select wrong date
     if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(payrollMessages.DateNotValid));
      return;
    }


    try {
      setIsLoading(true);
      var formData = {
        FromDate: formateDate(searchData.FromDate),
        ToDate: formateDate(searchData.ToDate),
        EmployeeId: searchData.EmployeeId,
        EmpStatusId: searchData.EmpStatusId,
        OrganizationId: searchData.OrganizationId,
        IsDeleted: Deleted,
        MedCentId: MedicalInsuranceCenter,
        MedItemId: MedicalType
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetstaffMedicalInsuranceReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const MedicalInsuranceCenters = await GeneralListApis(locale).GetMedicalInsuranceCentersList();
      const MedicalTypes = await GeneralListApis(locale).GetMedicalInsuranceItemList();
      setMedicalInsuranceCentersList(MedicalInsuranceCenters);
      setMedicalTypesList(MedicalTypes)

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);
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
        label: intl.formatMessage(payrollMessages.id),
      options: {
        display: false,
        print: false,
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
        name: "medItemName",
        label: intl.formatMessage(messages.MedicalTypes),
        options: {
          filter: true,
        },
      },
      {
        name: "medCentName",
        label: intl.formatMessage(messages.MedicalInsuranceCenters),
        options: {
          filter: true,
        },
      },
      {
        name: "totalvalue",
        label: intl.formatMessage(messages.totalValue),
        options: {
          filter: true,
        },
      },
      {
        name: "employeeShare",
        label: intl.formatMessage(messages.employeeShare),
        options: {
          filter: true,
        },
      },
    {
      name: "trxDate",
      label: intl.formatMessage(messages.fromDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.fromDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
  ];


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setSearchData((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(searchData.BranchId !== "" && searchData.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(searchData.BranchId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, searchData.EmployeeId)
    }

    if(searchData.BranchId === "" && searchData.EmployeeId === "")
    {
      setSearchData((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[searchData.BranchId, searchData.EmployeeId])
  

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} xl={7}>
            <Search
               setsearchData={setSearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               DateError={DateError}
               setDateError={setDateError}
               company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item xs={12} md={6}  lg={6} xl={5}>
            <Grid container spacing={2}>

          <Grid item xs={6} md={12} lg={6} xl={6}>
            <Autocomplete
              id="DeleteList"
              name="DeleteList"
              options={deleteList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setDeleted(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeleteList"
                  label={intl.formatMessage(payrollMessages.delete)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={12} lg={6} xl={6}>
            <Autocomplete
              id="MedicalTypes"
              name="MedicalTypes"
              options={MedicalTypesList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setMedicalType(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="MedicalTypes"
                  label={intl.formatMessage(messages.MedicalTypes)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6} md={12} lg={6} xl={6}>
            <Autocomplete
              id="MedicalInsuranceCenters"
              name="MedicalInsuranceCenters"
              options={MedicalInsuranceCentersList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setMedicalInsuranceCenter(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="DeleteList"
                  label={intl.formatMessage(messages.MedicalInsuranceCenters)}
                />
              )}
            />
          </Grid>      

            </Grid>
          </Grid>


    
          <Grid item xs={12} >
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

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />

    </PayRollLoaderInForms>
  );
}

staffMedicalInsuranceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(staffMedicalInsuranceReport);
