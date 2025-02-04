import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
  FormControlLabel
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import GeneralListApis from "../../api/GeneralListApis";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoaderInForms from "../../Component/PayRollLoaderInForms";
import { toast } from "react-hot-toast";
import SimplifiedPayrollTable from "../../Component/SimplifiedPayrollTable";

function TotalDeptSalaryReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    cash: false,
    bankonly: false,
  });

  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);
  const [TemplatesList, setTemplatesList] = useState([]);
  const [Template, setTemplate] = useState(null);
  const [ElementsList, setElementsList] = useState([]);
  const [Element, setElement] = useState(null);
  const [OrganizationList, setOrganizationList] = useState([]);
  const [fromOrganization, setFromOrganization] = useState(null);
  const [Organization, setOrganization] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [BranchId, setBranchId] = useState(branchId);

  const [filterHighlights, setFilterHighlights] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const getFilterHighlights = () => {
    const highlights = [];

    if (BranchId) {
      highlights.push({
        label: intl.formatMessage(messages.company),
        value: company.name,
      });
    }

    if (Month) {
      highlights.push({
        label: intl.formatMessage(messages.month),
        value: Month.name,
      });
    }

    if (Year) {
      highlights.push({
        label: intl.formatMessage(messages.year),
        value: Year.name,
      });
    }

    if (Template) {
      highlights.push({
        label: intl.formatMessage(messages.template),
        value: Template.name,
      });
    }

    if (Organization && Organization.length) {
      highlights.push({
        label: intl.formatMessage(messages.template),
        value: Organization.map((item) => item.name).join(' , '),
      });
    }

    setFilterHighlights(highlights);
  };

  const handleSearch = async (e) => {

    if(Year && Month && Template)
    {

    

    let OrganizationData = ""

    if(Organization !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Organization.map((ele, index)=>{
      OrganizationData+= `${ele.id}`
        if(index + 1 !== Organization.length)
        {
          OrganizationData+= ","
        }
      })
    }

    

    try {
      setIsLoading(true);

      let formData = {
        OrganizationIds: OrganizationData,
        cash: searchData.cash,
        bankonly: searchData.bankonly
      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      
      const dataApi = await ApiData(locale).TotalDeptSalaryReport(Year,Month,Template,formData);
      setdata(dataApi);

        getFilterHighlights();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.YouMustToChooseYear_MonthAndTemplet));
    }
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const organizations = await GeneralListApis(locale).GetDepartmentList(branchId);
      const template = await GeneralListApis(locale).GetPayTemplateList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();
      const BrList = await GeneralListApis(locale).GetBranchList();
      
      
      setBranchList(BrList);
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
        name: "possal",
        label: intl.formatMessage(messages.posativeSalary),
      options: {
        filter: true,
      },
    },
    {
        name: "negsal",
        label: intl.formatMessage(messages.NegativeSalary),
      options: {
        filter: true,
      },
    },  
  ];


  const openMonthDateWithCompanyChangeFun = async (BranchId) => {

    let OpenMonthData 
    let selectedYear
    let selectedMonth

    try
    {
      if(YearList.length !== 0 && MonthList.length !== 0 && BranchId !== 0)
      {
          OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);

          selectedYear = YearList.find(item => item.id == OpenMonthData.yearId)
          selectedMonth = MonthList.find(item => item.id == OpenMonthData.monthId)
        
          setYear(selectedYear ? selectedYear : null)
          setMonth(selectedMonth ? selectedMonth : null)
      }
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if( BranchId !== 0)
    {      
      openMonthDateWithCompanyChangeFun(BranchId)
    }

    if(BranchId === 0)
    {
      setYear(null)
      setMonth(null)
      
    }

  },[BranchId,YearList,MonthList])


  const handleChange = useCallback(async (name, value) => {
    
    if (name === 'BranchId') {
      setIsLoading(true);

      const organizations = await GeneralListApis(locale).GetDepartmentList(value);
      setOrganizationList(organizations);
      setBranchId(value !== null ? value : 0)
      setOrganization([])
      setIsLoading(false);
    }
  }, []); 


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
          <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                      <Autocomplete
                        id="branchId"
                        options={BranchList}
                        isOptionEqualToValue={(option, value) =>
                          value.id === 0 ||
                          value.id === "" ||
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.name ? option.name : ""
                        }
                        value={ BranchList.find((item) => item.id === BranchId)
                            ?? null
                        }
                        onChange={(event, value) => {
                          handleChange("BranchId", value  ? value.id : "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            name="branchId"
                            label={intl.formatMessage(Payrollmessages.branch)}
                          />
                        )}
                      />
              </Grid>

              <Grid item xs={12} md={3}>
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
                            setTemplate(null);
                        }
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name="Template"
                           label={intl.formatMessage(messages.Template)}
                        margin="normal" 
                        className={style.fieldsSty}
                        />
                    )}
                    /> 
                </Grid>

                <Grid item xs={6} md={2} xl={1.5}>
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

                <Grid item xs={6} md={2} xl={1.2} >
                  <Autocomplete
                      id="ddlMenu"   
                      isOptionEqualToValue={(option, value) => option.id === value.id}                      
                      options={MonthList.length != 0 ? MonthList: []}
                      value={Month}
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
                            setMonth(value);
                          } else {
                            setMonth(null);
                          }
                      }}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          name="Month"
                          label={intl.formatMessage(messages.Month)}
                          margin="normal" 
                          className={style.fieldsSty}
                          />
                      )}
                  />
                </Grid>

                <Grid item xs={12}  md={4}> 
              <Autocomplete
                    multiple  
                    value={Organization ?  Organization  : null}   
                    className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                    id="checkboxes-tags-demo"
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={OrganizationList.length != 0 ? OrganizationList: []}
                    disableCloseOnSelect
                    getOptionLabel={(option) =>(
                      option  ? option.name : ""
                  )
                  }
                  onChange={(event, value) => {
                    if (value !== null) {
                      setOrganization(value);
                    } else {
                      setOrganization(null);
                    }
                }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props} key={props.id}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} 
                      label={intl.formatMessage(Payrollmessages.organizationName)}
                      />
                    )}
                  />
                </Grid>

               <Grid item xs={12}></Grid>

                <Grid item xs={4} md={3}  xl={1} >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchData.cash}
                        onChange={(evt) => {
                          setsearchData((prev) => ({
                            ...prev,
                            cash: evt.target.checked,
                            bankonly: false,
                          }));
                        }}
                      />
                    }
                    label={intl.formatMessage(messages.cash)}
                  />
                </Grid>

                <Grid item xs={4} md={3} xl={1.5}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={searchData.bankonly}
                            onChange={(evt) => {
                              setsearchData((prev) => ({
                                ...prev,
                                cash: false,
                                bankonly: evt.target.checked,
                              }));
                            }}
                          />
                        }
                        label={intl.formatMessage(messages.bankOnly)}
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

      <SimplifiedPayrollTable
        title=""
        data={data}
        columns={columns}
        filterHighlights={filterHighlights}
      />
    </PayRollLoaderInForms>
  );
}

TotalDeptSalaryReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(TotalDeptSalaryReport);
