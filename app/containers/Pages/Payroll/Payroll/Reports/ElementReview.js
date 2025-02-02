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
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";
import { getAutoCompleteValue } from "../../helpers";

function ElementReview(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 

  const [filterHighlights, setFilterHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
    BranchId: branchId,
  });

  const [statusList, setStatusList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState("");
  const [TemplatesList, setTemplatesList] = useState([]);
  const [Template, setTemplate] = useState(null);
  const [ElementsList, setElementsList] = useState([]);
  const [Element, setElement] = useState(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const getFilterHighlights = () => {
    const highlights = [];

    const employee = getAutoCompleteValue(employeeList, searchData.EmployeeId);
    const organization = getAutoCompleteValue(
      organizationList,
      searchData.OrganizationId
    );
    const company = getAutoCompleteValue(companyList, searchData.BranchId);
    const status = getAutoCompleteValue(statusList, searchData.EmpStatusId);

    if (Template) {
      highlights.push({
        label: intl.formatMessage(messages.template),
        value: Template.name,
      });
    }

    if (Year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: Year.name,
      });
    }

    if (company) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.company),
        value: company.name,
      });
    }

    if (status) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.status),
        value: status.name,
      });
    }

    if (employee) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.employeeName),
        value: employee.name,
      });
    }

    if (organization) {
      highlights.push({
        label: intl.formatMessage(payrollMessages.organizationName),
        value: organization.name,
      });
    }

    if (Element && Element.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.element),
        value: Element.map((item) => item.name).join(' , '),
      });
    }

    if (Month && Month.length > 0) {
      highlights.push({
        label: intl.formatMessage(messages.Month),
        value: Month.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    if(Year.length !== 0 && Element)
    {

    

    let ElementsData = ""
    let MonthsData = ""

    if(Element !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Element.map((ele, index)=>{
        ElementsData+= `${ele.id}`
        if(index + 1 !== Element.length)
        {
            ElementsData+= ","
        }
      })
    }

    if(Month !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Month.map((ele, index)=>{
        MonthsData+= `${ele.id}`
        if(index + 1 !== Month.length)
        {
            MonthsData+= ","
        }
      })
    }
    

    try {
      setIsLoading(true);

      let formData = {
        OrganizationId: searchData.OrganizationId,
        EmployeeId: searchData.EmployeeId,
        EmployeeStatusId: searchData.EmpStatusId,
        PayTemplateId: Template && Template.id ? Template.id : "",
        MonthIds: MonthsData,
        BranchId: searchData.BranchId,
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      
      const dataApi = await ApiData(locale).GetReport(Year,ElementsData,formData);
      setdata(dataApi);

        getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.YouMustToChooseYearAndAtLeastOneElement));
    }
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const template = await GeneralListApis(locale).GetPayTemplateList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      const employees = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(employees);

      const status = await GeneralListApis(locale).GetEmpStatusList();
      setStatusList(status);

      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const organizations = await GeneralListApis(locale).GetDepartmentList();
      setOrganizationList(organizations);

      setTemplatesList(template)

      const defaultTemplate = template.find((item) => item.id === 1);

      if (defaultTemplate) {
        setTemplate(defaultTemplate);
      }

      setMonthList(months)
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
        print: false,
        filter: false,
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
        name: "payTemplate",
        label: intl.formatMessage(messages.payment),
      options: {
        filter: true,
      },
    },
    {
        name: "elementName",
        label: intl.formatMessage(messages.element),
      options: {
        filter: true,
      },
    },
    {
        name: "elemVal",
        label: intl.formatMessage(messages.countVal),
      options: {
        filter: true,
      },
    },
    {
        name: "elemValCalc",
        label: intl.formatMessage(messages.CalculatedValue),
      options: {
        filter: true,
      },
    },
    {
        name: "elementType",
        label: intl.formatMessage(messages.elementType),
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
        
          setYear(selectedYear)
      }
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
      setYear("")
    }

  },[searchData.BranchId, searchData.EmployeeId,YearList])


  const getElementsByTempletFun = async () => {
    try
    {
      const elements = await GeneralListApis(locale).GetElementListByTemplate(Template && Template.id ? Template.id : 0);
      setElementsList(elements)
    }
    catch(err)
    {}
  }



  useEffect(()=>{
    getElementsByTempletFun()
  },[Template])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>
          <Grid item xs={12}  lg={6}>
            <Search
              setsearchData={setsearchData}
              searchData={searchData}
              setIsLoading={setIsLoading}
              notShowDate={true}
              company={searchData.BranchId}
            ></Search>
          </Grid>

          <Grid item xs={12}  lg={6} >
           <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
             <Autocomplete
                 id="ddlMenu"   
                 isOptionEqualToValue={(option, value) => option.id === value.id}                      
                 options={TemplatesList.length != 0 ? TemplatesList: []}
                 value={Template}
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
                         setTemplate(value);
                     } else {
                         setTemplate("");
                     }
                 }}
                 renderInput={(params) => (
                 <TextField
                     {...params}
                     name="VacationType"
                        label={intl.formatMessage(messages.Template)}
                     margin="normal" 
                     className={style.fieldsSty}

                     />
                 )}
                 /> 
            </Grid>

            <Grid item xs={12} md={6} >
            <Grid item xs={8}>
              <Autocomplete
                  id="ddlMenu"   
                  value={Year && Year.length !== 0 ? Year : null}
                  isOptionEqualToValue={(option, value) => option.id === value.id}                      
                  options={YearList.length != 0 ? YearList: []}
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
                          setYear("");
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
            </Grid>

            <Grid item xs={12} md={6} > 
              <Autocomplete
                    multiple  
                    className={`${style.AutocompleteMulSty} ${locale !== "en" ?  style.AutocompleteMulStyAR : null}`}
                    id="checkboxes-tags-demo"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={ElementsList.length != 0 ? ElementsList: []}
                    disableCloseOnSelect
                    getOptionLabel={(option) =>(
                      option  ? option.name : ""
                  )
                  }
                  onChange={(event, value) => {
                    if (value !== null) {
                      setElement(value);
                    } else {
                      setElement(null);
                    }
                }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} 
                    label={intl.formatMessage(messages.element)}
                    />
                  )}
                />
            </Grid>

            <Grid item xs={12} md={6}> 
               <Grid item xs={8}>
              <Autocomplete
                    multiple  
                    className={`${style.AutocompleteMulSty} ${locale !== "en" ?  style.AutocompleteMulStyAR : null}`}
                    id="checkboxes-tags-demo"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={MonthList.length != 0 ? MonthList: []}
                    disableCloseOnSelect
                    getOptionLabel={(option) =>(
                      option  ? option.name : ""
                  )
                  }
                  onChange={(event, value) => {
                    if (value !== null) {
                      setMonth(value);
                    } else {
                      setMonth(null);
                    }
                }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} 
                    label={intl.formatMessage(messages.Month)}
                    />
                  )}
                />
                </Grid>
            </Grid>

           </Grid>
          </Grid>

          <Grid item xs={12} md={12}></Grid>

          <Grid item>
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

    </PayRollLoaderInForms>
  );
}

ElementReview.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(ElementReview);
