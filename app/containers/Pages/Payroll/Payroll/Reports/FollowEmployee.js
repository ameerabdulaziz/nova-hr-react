import React, { useEffect, useState } from "react";
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
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import { getAutoCompleteValue } from "../../helpers";

function FollowEmployee(props) {
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
    BranchId: branchId
  });

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  const [ElementsList, setElementsList] = useState([]);
  const [Element, setElement] = useState(null);

  const getFilterHighlights = () => {
    const highlights = [];

    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
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

    if (company) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (Element) {
      highlights.push({
        label: intl.formatMessage(messages.element),
        value: Element.name,
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    if(searchData.EmployeeId.length !== 0 && Element)
    {

    try {
      setIsLoading(true);

      let formData = {
        OrganizationId: searchData.OrganizationId,

      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });
      
      const dataApi = await ApiData(locale).FollowEmployeeReport(searchData.EmployeeId,Element,formData);
      setdata(dataApi);

      getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.youMustToChooseEmployeeAndElement));
    }
  };

  async function fetchData() {
    try {
      const elements = await GeneralListApis(locale).GetElementList(0,0,"",1);
    
    setElementsList(elements)

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

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
      options: {
        display: false,
        print: false,
      },
    },
    {
      name: "mindate",
      label: intl.formatMessage(messages.FromMonth),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
        name: "maxdate",
        label: intl.formatMessage(messages.ToMonth),
      options: {
        filter: true,
        customBodyRender: (value) => (value ? <pre>{value}</pre> : ''),
      },
    },
    {
        name: "elemVal",
        label: intl.formatMessage(messages.Trx_Value),
      options: {
        filter: true,
      },
    },
  ];

  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={6}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
              notShowStatus={true}
              company={searchData.BranchId}
            ></Search>
          </Grid>

           <Grid item xs={12} md={3} lg={2}>
           
           <Autocomplete
               id="ddlMenu"   
               isOptionEqualToValue={(option, value) => option.id === value.id}                      
               options={ElementsList.length != 0 ? ElementsList: []}
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
                    setElement(value);
                   } else {
                    setElement("");
                   }
               }}
               renderInput={(params) => (
               <TextField
                   {...params}
                   name="Element"
                      label={intl.formatMessage(messages.element)}
                   margin="normal" 
                   className={style.fieldsSty}
                   
                   />

               )}
               /> 
           </Grid>

          <Grid item xs={12} >
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
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

FollowEmployee.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(FollowEmployee);
