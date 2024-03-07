import React, { useEffect, useState } from "react";
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
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function TotalDeptSalaryReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
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
  const [Organization, setOrganization] = useState(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
      const organizations = await GeneralListApis(locale).GetDepartmentList();
      const template = await GeneralListApis(locale).GetPayTemplateList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();
      

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

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
       
        <Grid container spacing={2}>

                  <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
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
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label={intl.formatMessage(messages.orgName)}
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

                  <Grid item xs={12} md={2}>
            
                    <Autocomplete
                        id="ddlMenu"   
                        isOptionEqualToValue={(option, value) => option.id === value.id}                      
                        options={MonthList.length != 0 ? MonthList: []}
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

                  <Grid item xs={12} md={2}>
            
                        <Autocomplete
                            id="ddlMenu"   
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


                <Grid item md={1.5} >
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

          
            <Grid item md={2}>
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

TotalDeptSalaryReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(TotalDeptSalaryReport);
