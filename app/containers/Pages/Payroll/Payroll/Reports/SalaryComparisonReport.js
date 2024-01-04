import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
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
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import style from '../../../../../styles/styles.scss'
import ApiData from "../api/PayrollReportsData";
import PayRollLoader from "../../Component/PayRollLoader";
import { toast } from "react-hot-toast";
import { format } from 'date-fns';

function SalaryComparisonReport(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem("MenuName"); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setsearchData] = useState({
    EmployeeId: "",
    OrganizationId: "",
    EmpStatusId: 1,
  });

  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Month1, setMonth1] = useState(null);
  const [Year1, setYear1] = useState(null);
//   const [Year1, setYear1] = useState( YearList.find((item) => item.name === format(new Date(), 'yyyy')));
//   const [Year1, setYear1] = useState({id:"", name: format(new Date(), 'yyyy')});
  const [Month2, setMonth2] = useState(null);
  const [Year2, setYear2] = useState(null);
  const [constElementsList, setConstElementsList] = useState([]);
  const [constElement, setConstElement] = useState(null);
  const [valElementsList, setValElementsList] = useState([]);
  const [ValElement, setValElement] = useState(null);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


//   console.log("test 1=", format(new Date(), 'LLL'));
//   console.log("test 2=", YearList.find((item) => item.name == format(new Date(), 'yyyy')));

// useEffect(()=>{
//     if(YearList.length !== 0)
//     {
//         setYear1(YearList.find((item) => item.name == format(new Date(), 'yyyy')))
//         setYear2(YearList.find((item) => item.name == format(new Date(), 'yyyy')))
//     }

//     if(MonthList.length !== 0)
//     {
//         // setMonth1(YearList.find((item) => item.name == format(new Date(), 'MMM')))
//         // setMonth2(YearList.find((item) => item.name == format(new Date(), 'MMM')))
//     }

   
// },[YearList,MonthList])


  const handleSearch = async (e) => {

    if(Year1.length !== 0 && Year2.length !== 0 && Month1 && Month2 && (constElement || ValElement))
    {

    

    let constElementsData = ""
    let ValElementData = ""

    if(constElement !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    constElement.map((ele, index)=>{
        constElementsData+= `${ele.id}`
        if(index + 1 !== constElement.length)
        {
            constElementsData+= ","
        }
      })
    }

    if(ValElement !== null)
    {
    // used to reformat elements data ( combobox ) before send it to api
    ValElement.map((ele, index)=>{
        ValElementData+= `${ele.id}`
        if(index + 1 !== ValElement.length)
        {
            ValElementData+= ","
        }
      })
    }
    

    try {
      setIsLoading(true);

      let formData = {
          EmployeeId: searchData.EmployeeId,
          EmployeeStatusId: searchData.EmpStatusId,
          OrganizationId: searchData.OrganizationId,
          VarElementIds: ValElementData,
          ConstElementIds: constElementsData,

      };
      Object.keys(formData).forEach((key) => {
        formData[key] = formData[key] === null ? "" : formData[key];
      });

      
      const dataApi = await ApiData(locale).GetSalaryComparisonReport(Year1,Month1,Year2,Month2,formData);
    //   dataApi[0].value1 = [Month1.name," / ",Year1.name]
    //   dataApi[0].value2 = [Month2.name," / ",Year2.name]
        setdata(dataApi);
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
    try {
      const constElements = await GeneralListApis(locale).GetElementList(1,1);
      const valElements = await GeneralListApis(locale).GetElementList(2);
    //   const template = await GeneralListApis(locale).GetPayTemplateList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();

      setConstElementsList(constElements)
      setValElementsList(valElements)
    //   setTemplatesList(template)

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
        name: "elementName",
        label: intl.formatMessage(messages.element),
      options: {
        filter: true,
      },
    },
    // {
    //     name: "elementName",
    //     label: intl.formatMessage(messages.element),
    //   options: {
    //     filter: true,
    //   },
    // },
    { 
        // label: `${Month2 ?  Month2.name : ""} / ${Year2 ?  Year2.name : ""}`,
        name: "v1",
        label: `${Month1 ?  Month1.name : format(new Date(), 'MMM') } / ${Year1 ?  Year1.name : format(new Date(), 'yyyy')}`,
        // label: intl.formatMessage(messages.value1),
      options: {
        filter: true,
      },
    },
    {
        name: "v2",
        label: `${Month2 ?  Month2.name : format(new Date(), 'MMM') } / ${Year2 ?  Year2.name : format(new Date(), 'yyyy')}`,
        // label: intl.formatMessage(messages.value2),
      options: {
        filter: true,
      },
    },
    // {
    //     name: "elemValCalc",
    //     label: intl.formatMessage(messages.CalculatedValue),
    //   options: {
    //     filter: true,
    //   },
    // },
    // {
    //     name: "elementType",
    //     label: intl.formatMessage(messages.elementType),
    //   options: {
    //     filter: true,
    //   },
    // },
    
  ];
  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
    searchOpen: false,
    onSearchClose: () => {
      //some logic
    },
    textLabels: {
      body: {
        noMatch: isLoading
          ? intl.formatMessage(Payrollmessages.loading)
          : intl.formatMessage(Payrollmessages.noMatchingRecord),
      },
    },
  };
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


          {/* <Grid item xs={12} md={3}>
           
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
                    </Grid> */}

          


                  {/* <Grid item xs={12}  md={4}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
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
                          style={{ width: 500 }}
                          renderInput={(params) => (
                            <TextField {...params} 
                            label={intl.formatMessage(messages.Month)}
                            />
                          )}
                        />
              
                  </Grid> */}

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
                                    setMonth1(value);
                                } else {
                                    setMonth1("");
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="VacationType"
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
                            // defaultValue={{id:"", name: format(new Date(), 'yyyy')}}
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
                                    setYear1(value);
                                } else {
                                    setYear1("");
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
                                    setMonth2(value);
                                } else {
                                    setMonth2("");
                                }
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="VacationType"
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
                                    setYear2(value);
                                } else {
                                    setYear2("");
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

                <Grid item xs={12}  md={6}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={constElementsList.length != 0 ? constElementsList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null && value.length !== 0) {
                            console.log("value =",value);
                            setConstElement(value);
                          } else {
                            setConstElement(null);
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
                            // label="const element"
                            label={intl.formatMessage(messages.constElement)}
                            />
                          )}
                        />
              
                  </Grid>

                  <Grid item xs={12}  md={6}> 
                    <Autocomplete
                          multiple  
                          className={`${style.AutocompleteMulSty} ${locale === "ar" ?  style.AutocompleteMulStyAR : null}`}
                          id="checkboxes-tags-demo"
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          options={valElementsList.length != 0 ? valElementsList: []}
                          disableCloseOnSelect
                          getOptionLabel={(option) =>(
                            option  ? option.name : ""
                        )
                        }
                        onChange={(event, value) => {
                          if (value !== null && value.length !== 0) {
                            setValElement(value);
                          } else {
                            setValElement(null);
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
                            // label="val element"
                            label={intl.formatMessage(messages.valElement)}
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
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </PayRollLoader>
  );
}

SalaryComparisonReport.propTypes = { intl: PropTypes.object.isRequired };

export default injectIntl(SalaryComparisonReport);
