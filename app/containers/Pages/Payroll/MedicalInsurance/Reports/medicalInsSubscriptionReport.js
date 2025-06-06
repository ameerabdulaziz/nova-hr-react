import React, { useEffect, useState } from "react";
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
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { formateDate, getAutoCompleteValue } from "../../helpers";

import { toast } from 'react-hot-toast';
import { getDateColumnOptions } from "../../Component/PayrollTable/utils.payroll-table";

function medicalInsSubscription(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [MinsuranceCompanyList, setMinsuranceCompanyList] = useState([]);
  const [MinsuranceCategoryList, setMinsuranceCategoryList] = useState([]);
  const [Deleted, setDeleted] = useState("");
  const [InsuranceCompany, setInsuranceCompany] = useState("");
  const [MedicalInsuranceCategory, setMedicalInsuranceCategory] = useState("");
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

   const [printFilterData, setPrintFilterData] = useState({
      FromDate: null,
      ToDate: null,
      Employee: '',
      EmpStatus: "",
      Organization: '',
      Branch: "",
    });

  const [DateError, setDateError] = useState({});

  const [filterHighlights, setFilterHighlights] = useState([]);
  const deleteList = [
    { id: null, name: "All" },
    { id: true, name: "Deleted" },
    { id: false, name: "Not Deleted" },
  ];

  const getFilterHighlights = () => {
    const highlights = [];

    const isDeleted = getAutoCompleteValue(deleteList, Deleted);
    const insuranceCompany = getAutoCompleteValue(MinsuranceCompanyList, InsuranceCompany);
    const medicalInsuranceCategory = getAutoCompleteValue(MinsuranceCategoryList, MedicalInsuranceCategory);

    if (printFilterData.Organization && printFilterData.Organization.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: printFilterData.Organization.name,
      });
    }

    if (printFilterData.Employee && printFilterData.Employee.length !== 0) {
      highlights.push({
        label: intl.formatMessage(messages.employeeName),
        value: printFilterData.Employee.name,
      });
    }

    if (printFilterData.EmpStatus && printFilterData.EmpStatus.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: printFilterData.EmpStatus.name,
      });
    }

    if (printFilterData.Branch && printFilterData.Branch.length !== 0) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: printFilterData.Branch.name,
      });
    }

    if (printFilterData.FromDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.fromdate),
        value: formateDate(printFilterData.FromDate),
      });
    }

    if (printFilterData.ToDate) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.todate),
        value: formateDate(printFilterData.ToDate),
      });
    }

    if (isDeleted) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.delete),
        value: isDeleted.name,
      });
    }

    if (insuranceCompany) {
      highlights.push({
        label: intl.formatMessage(messages.insuranceCompany),
        value: insuranceCompany.name,
      });
    }

    if (medicalInsuranceCategory) {
      highlights.push({
        label: intl.formatMessage(messages.medicalInsuranceCategory),
        value: medicalInsuranceCategory.name,
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
        IsDeleted: Deleted,
        OrganizationId: searchData.OrganizationId,
        InsCmpId:  InsuranceCompany,
        MedInsuCatId: MedicalInsuranceCategory,
        EmpStatusId: searchData.EmpStatusId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetMedicalInsSubscriptionReport(formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchData() {
    try {
      const MinsuranceCompany = await GeneralListApis(locale).GetMinsuranceCompanyList();
      const MinsuranceCategory = await GeneralListApis(locale).GetMinsuranceCategoryList();
      setMinsuranceCompanyList(MinsuranceCompany);
      setMinsuranceCategoryList(MinsuranceCategory)

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
      name: "subDate",
      label: intl.formatMessage(messages.SubscriptionDate),
      options: getDateColumnOptions(
        intl.formatMessage(messages.SubscriptionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },
    {
      name: "subMonthlyFees",
      label: intl.formatMessage(messages.SubscriptionMonthlyFees),
      options: {
        filter: true,
      },
    },
    {
      name: "cmpFees",
      label: intl.formatMessage(messages.companyShare),
      options: {
        filter: true,
      },
    },
    {
      name: "subMonths",
      label: intl.formatMessage(messages.subMonths),
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
      name: "insuCompanyName",
      label: intl.formatMessage(messages.InsuranceCompany),
      options: {
        filter: true,
      },
    },
    {
      name: "medInsuCatName",
      label: intl.formatMessage(messages.medicalInsuranceCategory),
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

      setPrintFilterData((prev)=>({
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

      setPrintFilterData((prev)=>({
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
               setPrintFilterData={setPrintFilterData}
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
              id="InsuranceCompany"
              name="InsuranceCompany"
              options={MinsuranceCompanyList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setInsuranceCompany(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="InsuranceCompany"
                  label={intl.formatMessage(messages.InsuranceCompany)}
                />
              )}
            />
               </Grid>

               <Grid item xs={6} md={12} lg={6} xl={6}>
            <Autocomplete
              id="medicalInsuranceCategory"
              name="medicalInsuranceCategory"
              options={MinsuranceCategoryList}
              isOptionEqualToValue={(option, value) =>
                value.id === 0 || value.id === "" || option.id === value.id
              }
              getOptionLabel={(option) => (option.name ? option.name : "")}
              onChange={(event, value) => {
                setMedicalInsuranceCategory(
                  value == null ? "" : value.id == null ? "" : value.id
                );
              }}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  name="medicalInsuranceCategory"
                  label={intl.formatMessage(messages.medicalInsuranceCategory)}
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

medicalInsSubscription.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(medicalInsSubscription);
