import BusinessIcon from '@mui/icons-material/Business';
import DateRange from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhone from '@mui/icons-material/LocalPhone';
import LocationOn from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import useStyles from '../../Style';
import PayRollLoaderInForms from '../../Component/PayRollLoaderInForms';
import SimplifiedPayrollTable from '../../Component/SimplifiedPayrollTable';
import Search from '../../Component/Search';
import hrMessages from '../../HumanResources/messages';
import vacationMessages from '../../Vacation/messages';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/EmployeeStatusReportData';
import messages from '../messages';
import GeneralListApis from "../../api/GeneralListApis";
import styles from '../../../../../styles/styles.scss';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { getDateColumnOptions } from '../../Component/PayrollTable/utils.payroll-table';

function EmployeeStatusReport(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const locale = useSelector((state) => state.language.locale);
  const { branchId = null } = useSelector((state) => state.authReducer.user);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: "",
    BranchId: branchId,
    EmpStatusId: 1,
    OrganizationId: null,
    FromDate: null,
    ToDate: null,
  });

  const [employeeInfo, setEmployeeInfo] = useState({
    penalty: [],
    rewords: [],
    vacation: [],
    jobs: [],
    profile: {},
    employeeDocuments: [],
  });

  const onFormSubmit = async (evt) => {
    if(evt)
    {
      evt.preventDefault();
    }

    setIsLoading(true);

    const params = {
      FromDate: formateDate(formInfo.FromDate),
      ToDate: formateDate(formInfo.ToDate),
    };

    try {
      const response = await api(locale).GetEmployeeStatus(
        formInfo.EmployeeId,
        params
      );

      setEmployeeInfo((prev) => ({
        ...prev,
        profile: response.empData,
        vacation: response.leaveData,
        jobs: response.jobData,
        rewords: response.rewardData,
        penalty: response.penalityData,
        employeeDocuments: response.empDoc,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const vacationColumns = [
    {
      name: 'vacationName',
      label: intl.formatMessage(vacationMessages.LeaveType),
    },

    {
      name: 'dayscount',
      label: intl.formatMessage(vacationMessages.daysCount),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(payrollMessages.fromdate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.fromdate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(payrollMessages.todate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.todate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(vacationMessages.transactionDate),
      options: getDateColumnOptions(
        intl.formatMessage(payrollMessages.transactionDate),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
    },

    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },

    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  const penaltyColumns = [
    {
      name: 'date',
      label: intl.formatMessage(hrMessages.date),
    },

    {
      name: 'yearName',
      label: intl.formatMessage(hrMessages.yearName),
    },

    {
      name: 'monthName',
      label: intl.formatMessage(hrMessages.monthName),
    },

    {
      name: 'superEmployeeName',
      label: intl.formatMessage(hrMessages.superEmployeeName),
    },

    {
      name: 'penaltyName',
      label: intl.formatMessage(hrMessages.penaltyName),
    },

    {
      name: 'elementName',
      label: intl.formatMessage(hrMessages.elementName),
    },

    {
      name: 'value',
      label: intl.formatMessage(hrMessages.value),
    },

    {
      name: 'note',
      label: intl.formatMessage(payrollMessages.notes),
    },

    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
    },

    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },

    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  const rewordsColumns = [
    {
      name: 'date',
      label: intl.formatMessage(hrMessages.date),
      options: getDateColumnOptions(
        intl.formatMessage(hrMessages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'yearName',
      label: intl.formatMessage(hrMessages.yearName),
    },

    {
      name: 'monthName',
      label: intl.formatMessage(hrMessages.monthName),
    },

    {
      name: 'superEmployeeName',
      label: intl.formatMessage(hrMessages.superEmployeeName),
    },

    {
      name: 'payTemplateName',
      label: intl.formatMessage(hrMessages.payTemplateName),
    },

    {
      name: 'elementName',
      label: intl.formatMessage(hrMessages.elementName),
    },

    {
      name: 'rewardsName',
      label: intl.formatMessage(hrMessages.rewardsName),
    },

    {
      name: 'value',
      label: intl.formatMessage(hrMessages.value),
    },

    {
      name: 'note',
      label: intl.formatMessage(hrMessages.note),
    },

    {
      name: 'step',
      label: intl.formatMessage(payrollMessages.step),
    },

    {
      name: 'status',
      label: intl.formatMessage(payrollMessages.status),
    },

    {
      name: 'approvedEmp',
      label: intl.formatMessage(payrollMessages.approvedEmp),
    },
  ];

  const jobsColumns = [
    {
      name: 'date',
      label: intl.formatMessage(hrMessages.date),
      options: getDateColumnOptions(
        intl.formatMessage(hrMessages.date),
        {
          minDateLabel: intl.formatMessage(payrollMessages.minDate),
          maxDateLabel: intl.formatMessage(payrollMessages.maxDate),
        }
      ),
    },

    {
      name: 'job',
      label: intl.formatMessage(hrMessages.oldJob),
    },

    {
      name: 'oldElemVal',
      label: intl.formatMessage(hrMessages.oldElemVal),
    },

    {
      name: 'newJob',
      label: intl.formatMessage(hrMessages.job),
    },

    {
      name: 'elemVal',
      label: intl.formatMessage(hrMessages.value),
    },

    {
      name: 'reason',
      label: intl.formatMessage(hrMessages.reason),
    },
  ];

   const employeeDocumentsColumns = [
    {
      name: 'name',
      label: intl.formatMessage(payrollMessages.name),
    },

    {
      name: 'isDelivered',
      label: intl.formatMessage(messages.isDelivered),
      options: {
        customBodyRender: (value) => (          
          value ?
              <CheckIcon style={{ color: "#3f51b5" }} /> 
            : <CloseIcon style={{ color: "#717171" }} /> 
          )
      },
    },

    {
      name: '',
      label: intl.formatMessage(messages.isNotDelivered),
      options: {
        customBodyRender: (value,tableMeta) => (          
          employeeInfo.employeeDocuments[tableMeta.rowIndex]?.isDelivered ?
              <CloseIcon style={{ color: "#717171" }} />
            : <CheckIcon style={{ color: "#3f51b5" }} />  
          )
      },
    },
  ];

  const employeeInfoList = [
    {
      title: intl.formatMessage(messages.hiringDate),
      icon: <DateRange />,
      value: formateDate(employeeInfo.profile?.hiringDate, 'MMMM dd, yyyy'),
    },

    {
      title: intl.formatMessage(messages.email),
      icon: <EmailIcon />,
      value: employeeInfo.profile?.workEmail,
    },

    {
      title: intl.formatMessage(messages.phone),
      icon: <LocalPhone />,
      value: employeeInfo.profile?.mobile,
    },

    {
      title: intl.formatMessage(messages.address),
      icon: <LocationOn />,
      value: employeeInfo.profile?.address,
    },

    {
      title: intl.formatMessage(messages.organization),
      icon: <BusinessIcon />,
      value: employeeInfo.profile?.organizationName,
    },

    {
      title: intl.formatMessage(messages.reportingTo),
      icon: <FlagIcon />,
      value: employeeInfo.profile?.reportTo,
    },
  ];

  const employeeStatusList = [
    {
      title: intl.formatMessage(messages.vacation),
      icon: <LogoutIcon />,
      value: employeeInfo.profile?.leaveNo,
    },

    {
      title: intl.formatMessage(messages.absent),
      icon: <PersonOffIcon />,
      value: employeeInfo.profile?.absent,
    },
  ];


  const openMonthDateWithCompanyChangeFun = async (BranchId,EmployeeId) => {

    let OpenMonthData 

    try
    {
      if(!EmployeeId)
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( BranchId,0);
      }
      else
      {
         OpenMonthData = await GeneralListApis(locale).getOpenMonth( 0,EmployeeId);
      }

      
      setFormInfo((prev)=>({
        ...prev,
        FromDate: OpenMonthData ? OpenMonthData.fromDateAtt : null,
        ToDate: OpenMonthData ? OpenMonthData.todateAtt : null,
      }))
    }
    catch(err)
    {}

  }


  useEffect(()=>{
    if(formInfo.BranchId !== "" && formInfo.EmployeeId === "")
    {      
      openMonthDateWithCompanyChangeFun(formInfo.BranchId)
    }

    if(formInfo.BranchId === "" && formInfo.EmployeeId !== "")
    {
      openMonthDateWithCompanyChangeFun(0, formInfo.EmployeeId)
    }

    if(formInfo.BranchId === "" && formInfo.EmployeeId === "")
    {
      setFormInfo((prev)=>({
        ...prev,
        FromDate: null,
        ToDate: null,
      }))
    }

  },[formInfo.BranchId, formInfo.EmployeeId])


  useEffect(()=>{
    if(formInfo.EmployeeId !== "")
    {
      onFormSubmit()
    }
    else
    {
      setEmployeeInfo({
        penalty: [],
        rewords: [],
        vacation: [],
        jobs: [],
        profile: {},
        employeeDocuments: [],
      });
    }

  },[formInfo.EmployeeId])


  return (
    <PayRollLoaderInForms isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>

          <Grid container spacing={3}>
            <Grid item xs={12} md={10} lg={9} xl={7.5}>
          <Search
            setsearchData={setFormInfo}
            searchData={formInfo}
            requireEmployee
            setIsLoading={setIsLoading}
            company={formInfo.BranchId}
          />              
            </Grid>

            <Grid item md={2}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
          >
            {intl.formatMessage(payrollMessages.search)}
          </Button>              
            </Grid>
          </Grid>



        </form>
      </PapperBlock>

      <Grid container item direction='row'  spacing={3} style={{marginBottom:"20px"}}>
        <Grid item  xs={12}>
          <div className={`${styles.employeeStatusContainerSty} ${classes.sectionBackgroundColorSty} `} >
            <Grid item  xs={12}>
              <h3>{intl.formatMessage(messages.employeeInfo)}</h3>
              </Grid>

                <Grid item container direction='row'  spacing={3} style={{marginTop:"10px"}}>
                  {employeeInfoList.map((item, index) => (
                    <Grid item md={4} xs={12} style={{paddingTop:"0px"}} key={index} >
                      <div className={styles.cardContainer}>
                          <Avatar className={classes.colorSty} >{item.icon}</Avatar> 
                        <div>
                          <span>{item.title}</span>
                          <p>{item.value}</p>
                        </div>
                      </div>
                      </Grid>
                    ))}
                </Grid>

                <Grid item  xs={12}>
                  <h3>{intl.formatMessage(messages.statusInfo)}</h3>
                </Grid>

                <Grid item container direction='row'  spacing={3} style={{marginTop:"10px"}}>
                  {employeeStatusList.map((item, index) => (
                    <Grid item md={4} xs={12} style={{paddingTop:"0px"}} key={index} >
                      <div className={styles.cardContainer}>
                          <Avatar className={classes.colorSty} >{item.icon}</Avatar> 
                        <div>
                          <span>{item.title}</span>
                          <p>{item.value}</p>
                        </div>
                      </div>
                      </Grid>
                    ))}
                </Grid>
          </div>
        </Grid>
      </Grid>
      

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.vacationReport)}
        data={employeeInfo.vacation}
        columns={vacationColumns}
      />

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.rewordsReport)}
        data={employeeInfo.rewords}
        columns={rewordsColumns}
      />

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.penaltyReport)}
        data={employeeInfo.penalty}
        columns={penaltyColumns}
      />

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.jobsReport)}
        data={employeeInfo.jobs}
        columns={jobsColumns}
      />

      <SimplifiedPayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.EmployeeDocuments)}
        data={employeeInfo.employeeDocuments}
        columns={employeeDocumentsColumns}
      />
    </PayRollLoaderInForms>
  );
}

EmployeeStatusReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeStatusReport);
