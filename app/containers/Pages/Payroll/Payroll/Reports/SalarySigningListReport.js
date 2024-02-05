import React, { useEffect, useState } from "react";
import ApiData from "../api/PayrollReportsData";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  TextField
} from "@mui/material";
import messages from "../messages";
import Payrollmessages from "../../messages";
import useStyles from "../../Style";
import { injectIntl, FormattedMessage } from "react-intl";
import { PapperBlock } from "enl-components";
import PropTypes from "prop-types";
import Search from "../../Component/Search";
import PayRollLoader from "../../Component/PayRollLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import GeneralListApis from "../../api/GeneralListApis";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import { toast } from "react-hot-toast";
import PayrollTable from "../../Component/PayrollTable";

function SalarySigningListReport(props) {
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
    BankOnly: false,
    Cash: false,
    Insured: false,
    NotInsured: false,
    PrintSalary: true,
    BranchId: branchId,
  });
  const [JobsList, setJobsList] = useState([]);
  const [Job, setJob] = useState(null);
  const [TemplatesList, setTemplatesList] = useState([]);
  const [Template, setTemplate] = useState(null);
  const [CurrencyList, setCurrencyList] = useState([]);
  const [Currency, setCurrency] = useState(null);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const handleSearch = async (e) => {

    if(Template && Year && Month)
    {

    let JobData = ""

    if(Job !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    Job.map((ele, index)=>{
        JobData+= `${ele.id}`
        if(index + 1 !== Job.length)
        {
            JobData+= ","
        }
      })
    }


    try {
      setIsLoading(true);
      let formData = {
        EmployeeId: searchData.EmployeeId,
        OrganizationId: searchData.OrganizationId,
        EmployeeStatusId: searchData.EmpStatusId,
        CurrencyId: Currency && Currency.id ? Currency.id : null,
        JobId: JobData,
        bankonly: searchData.BankOnly,
        cash: searchData.Cash,
        insured: searchData.Insured,
        notinsured: searchData.NotInsured,
        BranchId: searchData.BranchId
          };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });


      const dataApi = await ApiData(locale).SalarySigningListReportApi(Year,Month,Template,formData);
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


  const columns = [
    {
      name: "id",
        label: intl.formatMessage(Payrollmessages.id),
      options: {
        display: false,
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
        name: "organizationName",
        label: intl.formatMessage(messages.orgName),
        options: {
          filter: true,
        },
      },
      // show and hide PrintSalary column depend on condition
      searchData.PrintSalary ? {
        name: "netSal",
        label: intl.formatMessage(messages.NetSalary),
        options: {
           filter: true,
           },
      }: ""     
  ];


  async function fetchData() {
    try {
      
      const jobs = await GeneralListApis(locale).GetJobsList();
      const template = await GeneralListApis(locale).GetPayTemplateList();
      const currency = await GeneralListApis(locale).MdCurrency();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      setJobsList(jobs);
      setTemplatesList(template)
      setCurrencyList(currency)
      setMonthList(months)
      setYearList(years)


      if (branchId) {
        const response = await GeneralListApis(locale).getOpenMonth(
          branchId,
          0
        );

        setYear(years.find((item) => item.id === response.yearId) ?? null);
        setMonth(months.find((item) => item.id === response.monthId) ?? null);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);




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
                        id="ddlMenu"   
                        isOptionEqualToValue={(option, value) => option.id === value.id}                      
                        options={TemplatesList.length != 0 ? TemplatesList: []}
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
                        options={CurrencyList.length != 0 ? CurrencyList: []}
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
                                setCurrency(value);
                            } else {
                                setCurrency(null);
                            }
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            name="Currency"
                                  label={intl.formatMessage(messages.currency)}
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
                                        name="year"
                                        label={intl.formatMessage(messages.year)}
                                        margin="normal" 
                                        className={style.fieldsSty}
                                        
                                        />
                                    )}
                                />
                        </Grid>

                <Grid item xs={12}  md={3}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={JobsList.length != 0 ? JobsList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null) {
                            setJob(value);
                          } else {
                            setJob(null);
                          }
                      }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props} key={option.id}>
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
                            label={intl.formatMessage(messages.job)}
                            />
                          )}
                        />
              
                  </Grid>

                <Grid item md={2} >
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchData.BankOnly}
                            onChange={(evt) => {
                            setsearchData((prev) => ({
                                ...prev,
                                BankOnly: evt.target.checked,
                                Cash: false
                            }));
                            }}
                        />
                        }
                        label={intl.formatMessage(messages.bankOnly)}
                    />
                </Grid>

                <Grid item md={2} >
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchData.Cash}
                            onChange={(evt) => {
                            setsearchData((prev) => ({
                                ...prev,
                                Cash: evt.target.checked,
                                BankOnly: false
                            }));
                            }}
                        />
                        }
                        label={intl.formatMessage(messages.cash)}
                    />
                </Grid>

                <Grid item md={4} lg={2}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchData.Insured}
                            onChange={(evt) => {
                            setsearchData((prev) => ({
                                ...prev,
                                Insured: evt.target.checked,
                                NotInsured: false
                            }));
                            }}
                        />
                        }
                        label={intl.formatMessage(messages.insured)}
                    />
                </Grid>

                <Grid item md={4} lg={2}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchData.NotInsured}
                            onChange={(evt) => {
                            setsearchData((prev) => ({
                                ...prev,
                                NotInsured: evt.target.checked,
                                Insured: false
                            }));
                            }}
                        />
                        }
                        label={intl.formatMessage(messages.unInsured)}
                    />
                </Grid>

            <Grid item md={4} >
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Print Salary"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="Print Salary" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  PrintSalary: !prev.PrintSalary,
                                }));
                              }}
                            />} 
                            checked={searchData.PrintSalary}
                            label={intl.formatMessage(messages.PrintSalary)}
                        />

                        <FormControlLabel 
                            value="Print Names Only" 
                            control={
                            <Radio 
                            onChange={(evt) => {
                                setsearchData((prev) => ({
                                  ...prev,
                                  PrintSalary: !prev.PrintSalary,
                                }));
                              }}
                            />} 
                            label={intl.formatMessage(messages.PrintNamesOnly)}
                        />
                    </RadioGroup>
                </FormControl>
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

SalarySigningListReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(SalarySigningListReport);
