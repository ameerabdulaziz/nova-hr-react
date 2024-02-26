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
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import PayrollTable from "../../Component/PayrollTable";

function medicalInsuranceListReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [MinsuranceCompanyList, setMinsuranceCompanyList] = useState([]);
  const [MinsuranceCategoryList, setMinsuranceCategoryList] = useState([]);
  const [Deleted, setDeleted] = useState("");
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
  });


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
        label: intl.formatMessage(Payrollmessages.id),
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

          <Grid item xs={12} md={2}>
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

          <Grid item md={1}>
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

            <Grid item md={2}>
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

            <Grid item md={3}>
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

medicalInsuranceListReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(medicalInsuranceListReport);
