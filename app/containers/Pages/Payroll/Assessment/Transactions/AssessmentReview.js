import React, { useState, useEffect } from "react";
import AssessmentReviewData from "../api/AssessmentReviewData";
import messages from "../messages";
import Payrollmessages from '../../messages';
import useStyles from "../../Style";
import { useSelector } from "react-redux";
import style from "../../../../../styles/styles.scss";
import AlertPopup from "../../Component/AlertPopup";
import { toast } from "react-hot-toast";
import notif from "enl-api/ui/notifMessage";
import PayRollLoader from "../../Component/PayRollLoader";
import {
    Button,
    Grid,
    TextField,
    Autocomplete
  } from "@mui/material";
  import { PapperBlock } from "enl-components";
  import { injectIntl, FormattedMessage } from "react-intl";
  import GeneralListApis from "../../api/GeneralListApis";
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import IconButton from '@mui/material/IconButton';
  import Tooltip from '@mui/material/Tooltip';
  import { Link } from "react-router-dom";
  import { format } from 'date-fns';
import { formateDate, getDefaultYearAndMonth } from "../../helpers";
import PayrollTable from "../../Component/PayrollTable";

function AssessmentReview({ intl }) {
  const { classes, cx } = useStyles();
  const locale = useSelector((state) => state.language.locale);
  const [dataTable, setDataTable] = useState([]);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const Title = localStorage.getItem("MenuName");

  const [EmployeeList, setEmployeeList] = useState([]);
  const [MonthList, setMonthList] = useState([]);
  const [YearList, setYearList] = useState([]);
  const [Employee, setEmployee] = useState(null);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);

  const getdata = async () => {
    setIsLoading(true);

    try {
      const empolyees = await GeneralListApis(locale).GetEmployeeList();
      const months = await GeneralListApis(locale).GetMonths();
      const years = await GeneralListApis(locale).GetYears();
      const today = getDefaultYearAndMonth(years);

      setEmployeeList(empolyees)
      setMonthList(months)
      setYearList(years)
      setMonth( today ? months.find((item)=> item.id === today.monthId) : null)
      setYear( today ? years.find((item)=> item.id === today.yearId) : null)

    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const columns = [
    {
      name: "assessmentId",
      label: "id",
      options: {
        display: false,
        print: false,
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
      name: "assessmentDate",
      label: intl.formatMessage(Payrollmessages.date),
      options: {
        filter: true,
        customBodyRender: (value) => (<pre>{formateDate(value)}</pre>),
      },
    },
    {
        name: "mgrcomment",
        label: intl.formatMessage(messages.OverAllAssessment),
        options: {
          filter: true,
        },
      },
      {
        name: "status",
        label: intl.formatMessage(messages.status),
        options: {
          filter: true,
        },
      },
    {
      name: "Actions",
      label: intl.formatMessage(messages.actions),
      options: {
        filter: false,
        print: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <div className={style.actionsSty}>
                <Tooltip title={intl.formatMessage(Payrollmessages.review)} cursor="pointer" className="mr-6">     
                    <IconButton
                        aria-label={intl.formatMessage(Payrollmessages.review)}
                        size="large"
                        color="secondary"
                        className={classes.button}
                    >
                        <Link to={{ pathname: '/app/Pages/Assessment/AssessmentReviewEdit', state: { id: tableMeta.rowData[0] },}} color="secondary">
                            <VisibilityIcon color="secondary"/>             
                        </Link>
                    </IconButton>
                    </Tooltip>
            </div>
          );
        },
      },
    },
  ];


  const handleSearch = async (e) => {
    if(Month !== null && Year !== null )
    {
    try {
      setIsLoading(true);
     
      const dataApi = await AssessmentReviewData(locale).Get(Employee,Month,Year);
      setDataTable(dataApi);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
    }
    else
    {
        toast.error(intl.formatMessage(messages.monthAndYearErrorMes));
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>

      <PapperBlock whiteBg icon="border_color" title={Title} desc="">
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            
                <Autocomplete
                id="ddlMenu"   
                isOptionEqualToValue={(option, value) => option.id === value.id}                      
                options={EmployeeList.length != 0 ? EmployeeList: []}
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
                        setEmployee(value);
                    } else {
                        setEmployee(null);
                    }
                }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    name="VacationType"
                    label={intl.formatMessage(messages.employeeName)}
                    margin="normal" 
                    className={style.fieldsSty}
                    
                    />
              )}
            />
          </Grid>

          <Grid item xs={12} md={2}>
           
            <Autocomplete
                id="ddlMenu"   
                value={ Month ? Month : null }
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
                    name="VacationType"
                    label={intl.formatMessage(messages.months)}
                    margin="normal" 
                    className={style.fieldsSty}
                    
                    />

                )}
                /> 
          </Grid>
          <Grid item xs={12} md={2}>
            
                 <Autocomplete
                id="ddlMenu"   
                value={ Year ? Year : null }
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
        data={dataTable}
        columns={columns}
      />

    </PayRollLoader>
  );
}

export default injectIntl(AssessmentReview);
