import React, { useEffect, useState } from "react";
import ApiData from "../api/MedicalInsuranceReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import messages from "../messages";
import payrollMessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";
import { getAutoCompleteValue } from "../../helpers";

function medicalInsuranceListReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [MinsuranceCompanyList, setMinsuranceCompanyList] = useState([]);
  const [MinsuranceCategoryList, setMinsuranceCategoryList] = useState([]);
  const [InsuranceCompany, setInsuranceCompany] = useState("");
  const [MedicalInsuranceCategory, setMedicalInsuranceCategory] = useState("");
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName");
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    all: false,
    PrivMed: false,
    GovIns: false,
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

  const [filterHighlights, setFilterHighlights] = useState([]);


  const getFilterHighlights = () => {
    const highlights = [];

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
    try {
      setIsLoading(true);
      var formData = {
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        InsCmpId:  InsuranceCompany,
        MedInsuCatId: MedicalInsuranceCategory,
        EmpStatusId: searchData.EmpStatusId,
        all: searchData.all ? true: "",
        PrivMed: searchData.PrivMed ? true: "",
        GovIns: searchData.GovIns ? true: "",
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      const dataApi = await ApiData(locale).GetMedicalInsuranceListReport(formData);
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
      name: "privlMedCareNumber",
      label: intl.formatMessage(messages.privlMedCareNumber),
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
    
  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={10} xl={7}>
            <Search
               setsearchData={setsearchData}
               searchData={searchData}
               setIsLoading={setIsLoading}
               notShowDate={true}
               company={searchData.BranchId}
               setPrintFilterData={setPrintFilterData}
            ></Search>
          </Grid>

          <Grid item xs={12} md={5} lg={3.5} xl={2.5}>
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

          <Grid item xs={12} md={5} lg={3.5} xl={2.5}>
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

          <Grid item xs={12}></Grid>

          <Grid item md={4} lg={3} xl={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.all}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: evt.target.checked,
                            PrivMed: false,
                            GovIns: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.All)}
                  />
            </Grid>

            <Grid item md={4} lg={4} xl={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.PrivMed}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            PrivMed: evt.target.checked,
                            GovIns: false
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.privateMedicalInsurance)}
                  />
            </Grid>

            <Grid item md={4} lg={4} xl={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.GovIns}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            all: false,
                            PrivMed: false,
                            GovIns: evt.target.checked
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.governmentMedicalInsurance)}
                  />
            </Grid>
    

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleSearch}
            >
              <FormattedMessage {...payrollMessages.search} />
            </Button>
          </Grid>
          <Grid item xs={12} ></Grid>
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

medicalInsuranceListReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(medicalInsuranceListReport);
