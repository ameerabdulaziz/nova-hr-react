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
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { format } from "date-fns";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate } from "../../helpers";

function staffMedicalInsuranceReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [MedicalInsuranceCentersList, setMedicalInsuranceCentersList] = useState([]);
  const [MedicalTypesList, setMedicalTypesList] = useState([]);
  const [Deleted, setDeleted] = useState("");
  const [MedicalType, setMedicalType] = useState("");
  const [MedicalInsuranceCenter, setMedicalInsuranceCenter] = useState("");
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
      var formData = {
        FromDate: searchData.FromDate,
        ToDate: searchData.ToDate,
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
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
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
            ></Search>
          </Grid>

          <Grid item xs={12} md={2}>
            <Autocomplete
              id="DeleteList"
              name="DeleteList"
              options={[
                { id: null, name: "All" },
                { id: true, name: "Deleted" },
                { id: false, name: "Not Deleted" },
              ]}
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
                  label={intl.formatMessage(Payrollmessages.delete)}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
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

          <Grid item xs={12} md={2}>
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

staffMedicalInsuranceReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(staffMedicalInsuranceReport);
