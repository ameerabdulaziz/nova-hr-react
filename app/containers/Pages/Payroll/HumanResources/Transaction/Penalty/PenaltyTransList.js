import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { formateDate, getAutoCompleteValue } from '../../../helpers';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/PenaltyTransData';
import messages from '../../messages';
import { PapperBlock } from "enl-components";
import PayRollLoader from "../../../Component/PayRollLoader";
import {
  Button,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import useStyles from "../../../Style";
import GeneralListApis from "../../../api/GeneralListApis";
import SITEMAP from '../../../../../App/routes/sitemap';
import { getDateColumnOptions } from '../../../Component/PayrollTable/utils.payroll-table';


function PenaltyTransList(props) {
  const { intl } = props;
  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const { classes } = useStyles();
  const [data, setdata] = useState([]);
  const Title = localStorage.getItem('MenuName');
  const [isLoading, setIsLoading] = useState(true);
  const [DateError, setDateError] = useState({});
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(branchId);
  const [filterHighlights, setFilterHighlights] = useState([]);

  async function fetchData() {
    try {
      
      const company = await GeneralListApis(locale).GetBranchList();

      setCompanyList(company);
      setdata(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);
      await ApiData(locale).Delete(id);

      toast.success(notif.saved);
      fetchData();
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        display: false,
        filter: false,
        print: false,
      },
    },
    {
      name: 'date',
      label: intl.formatMessage(messages.date),
      options: getDateColumnOptions(
        intl.formatMessage(messages.date),
        {
          minDateLabel: intl.formatMessage(Payrollmessages.minDate),
          maxDateLabel: intl.formatMessage(Payrollmessages.maxDate),
        }
      ),
    },

    {
      name: 'employeeName',
      label: intl.formatMessage(messages.employeeName),
    },
    {
      name: 'superEmployeeName',
      label: intl.formatMessage(messages.superEmployeeName),
    },
    {
      name: 'penaltyName',
      label: intl.formatMessage(messages.penaltyName),
    },
    {
      name: 'elementName',
      label: intl.formatMessage(messages.elementName),
    },
    {
      name: 'value',
      label: intl.formatMessage(messages.value),
    },

    {
      name: 'note',
      label: intl.formatMessage(messages.note),
    },
    {
      name: 'step',
      label: intl.formatMessage(Payrollmessages.step),
    },
    {
      name: 'status',
      label: intl.formatMessage(Payrollmessages.status),
    },
    {
      name: 'approvedEmp',
      label: intl.formatMessage(Payrollmessages.approvedEmp),
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.PenaltyTransCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.PenaltyTransEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
  };



  const getFilterHighlights = () => {
    const highlights = [];

    const companyData = getAutoCompleteValue(companyList, company);

    if (FromDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.fromdate),
        value: formateDate(FromDate),
      });
    }

    if (ToDate) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.todate),
        value: formateDate(ToDate),
      });
    }

    if (companyData) {
      highlights.push({
        label: intl.formatMessage(Payrollmessages.company),
        value: companyData.name,
      });
    }

    setFilterHighlights(highlights);
  };


  const handleSearch = async (e) => {

    // used to stop call api if user select wrong date
    if (Object.values(DateError).includes(true)) {  
      toast.error(intl.formatMessage(Payrollmessages.DateNotValid));
      return;
    }


  try {
    setIsLoading(true);
    let formData = {
      FromDate: formateDate(FromDate),
      ToDate: formateDate(ToDate),
    };
    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key] === null ? "" : formData[key];
    });
    const dataApi = await ApiData(locale).GetReport(formData);

    setdata(dataApi);

    getFilterHighlights();
  } catch (err) {
  } finally {
    setIsLoading(false);
  }
};


  const onCompanyAutoCompleteChange = async (value) => {
    
    let branchId
    let OpenMonthData

    try
    {
      if(value)
      {

        branchId = value
        OpenMonthData = await GeneralListApis(locale).getOpenMonth(value,0);
      }
      else
      {
        branchId = null
      }

      setFromDate(OpenMonthData ? OpenMonthData.fromDateAtt : null)
      setToDate(OpenMonthData ? OpenMonthData.todateAtt : null)

    }
    catch(err)
    {}
  }



  useEffect( ()=>{
    if(company)
    {            
      onCompanyAutoCompleteChange(company)
    }

    if(!company)
    {
      setFromDate(null)
      setToDate(null)
    }

  },[company])



  

  return (
    <PayRollLoader isLoading={isLoading}>
       <PapperBlock whiteBg icon="border_color" title={Title} desc="">

<Grid container spacing={2}>
      <Grid item xs={12} md={4}>
            <Autocomplete
              options={companyList}
              value={getAutoCompleteValue(companyList, company)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => (option ? option.name : "")}
              renderOption={(propsOption, option) => (
                <li {...propsOption} key={option.id}>
                  {option.name}
                </li>
              )}
            onChange={(e,value)=>{
              if(value)
              {
                setCompany(value.id);
              }
              else
              {
                setCompany(null);
                setFromDate(null)
                setToDate(null)
              }
            }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(Payrollmessages.company)}
                />
              )}
            />
          </Grid>
    

          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
               label={intl.formatMessage(Payrollmessages.fromdate)}
                value={FromDate  ? dayjs(FromDate) : FromDate}
                className={classes.field}
                  onChange={(date) => {
                    setFromDate(date)
                }}
                onError={(error,value)=>{
                  if(error !== null)
                  {
                    setDateError((prevState) => ({
                      ...prevState,
                        [`FromDate`]: true
                    }))
                  }
                  else
                  {
                    setDateError((prevState) => ({
                      ...prevState,
                        [`FromDate`]: false
                    }))
                  }
                }}
                />
            </LocalizationProvider>
          </Grid>

        <Grid item xs={12} md={2}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
             label={intl.formatMessage(Payrollmessages.todate)}
              value={ToDate  ? dayjs(ToDate) : ToDate}
              className={classes.field}
                onChange={(date) => {
                  setToDate(date)
              }}
              onError={(error,value)=>{
                if(error !== null)
                {
                  setDateError((prevState) => ({
                    ...prevState,
                      [`ToDate`]: true
                  }))
                }
                else
                {
                  setDateError((prevState) => ({
                    ...prevState,
                      [`ToDate`]: false
                  }))
                }
              }}
              />
          </LocalizationProvider>
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
</Grid>
</PapperBlock>

      <SimplifiedPayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={data}
        columns={columns}
        actions={actions}
      />
    </PayRollLoader>
  );
}

PenaltyTransList.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PenaltyTransList);
