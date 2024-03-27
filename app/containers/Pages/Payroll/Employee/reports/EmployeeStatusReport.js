import BusinessIcon from '@mui/icons-material/Business';
import DateRange from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhone from '@mui/icons-material/LocalPhone';
import LocationOn from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import useStyles from '../../../../../components/Widget/widget-jss';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import Search from '../../Component/Search';
import hrMessages from '../../HumanResources/messages';
import vacationMessages from '../../Vacation/messages';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
// import api from '../api/EmployeeStatusReportData';
import messages from '../messages';

function EmployeeStatusReport(props) {
  const { intl } = props;
  const { classes } = useStyles();

  // const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    EmployeeId: null,
    BranchId: null,
    EmpStatusId: 1,
    OrganizationId: null,
    FromDate: null,
    ToDate: null,
  });

  const [employeeInfo, setEmployeeInfo] = useState({
    penalty: [],
    leave: [],
    vacation: [],
    rewords: [],
    jobs: [],
    department: [],
    profile: {},
    leaveInfo: {},
  });

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (!formInfo.EmployeeId) {
      toast.error(intl.formatMessage(messages.youMustChooseAnEmployee));
      return;
    }

    setIsLoading(true);
    console.log(formInfo);
    try {
      // const response = await api(locale).getEmployeeInfo(formInfo.EmployeeId);
      // setEmployeeInfo(response);
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
      name: 'daysCount',
      label: intl.formatMessage(vacationMessages.daysCount),
    },

    {
      name: 'fromDate',
      label: intl.formatMessage(vacationMessages.fromDate),
    },

    {
      name: 'toDate',
      label: intl.formatMessage(vacationMessages.toDate),
    },

    {
      name: 'trxDate',
      label: intl.formatMessage(vacationMessages.transactionDate),
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
    },

    {
      name: 'oldJob',
      label: intl.formatMessage(hrMessages.oldJob),
    },

    {
      name: 'oldElemVal',
      label: intl.formatMessage(hrMessages.oldElemVal),
    },

    {
      name: 'job',
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

  const departmentColumns = [
    {
      name: 'date',
      label: intl.formatMessage(hrMessages.date),
    },

    {
      name: 'oldJob',
      label: intl.formatMessage(hrMessages.oldJob),
    },

    {
      name: 'oldElemVal',
      label: intl.formatMessage(hrMessages.oldElemVal),
    },

    {
      name: 'department',
      label: intl.formatMessage(messages.department),
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
      value: employeeInfo.profile?.reportToName,
    },
  ];

  const employeeStatusList = [
    {
      title: intl.formatMessage(messages.vacation),
      icon: <LogoutIcon />,
      value: employeeInfo.profile?.workEmail,
    },

    {
      title: intl.formatMessage(messages.absent),
      icon: <PersonOffIcon />,
      value: employeeInfo.profile?.mobile,
    },
  ];

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <form onSubmit={onFormSubmit}>
          <Search
            setsearchData={setFormInfo}
            searchData={formInfo}
            setIsLoading={setIsLoading}
          />

          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            type='submit'
          >
            {intl.formatMessage(payrollMessages.search)}
          </Button>
        </form>
      </PapperBlock>

      <Grid container direction='row' mb={3} spacing={3}>
        <Grid item md={6} xs={12}>
          <PapperBlock
            title={intl.formatMessage(messages.employeeInfo)}
            icon='contacts'
            whiteBg
            noMargin
            desc=''
          >
            <List dense className={classes.profileList}>
              {employeeInfoList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{item.icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.value} />
                </ListItem>
              ))}
            </List>
          </PapperBlock>
        </Grid>

        <Grid item md={6} xs={12}>
          <PapperBlock
            title={intl.formatMessage(messages.statusInfo)}
            icon='contacts'
            whiteBg
            noMargin
            desc=''
          >
            <List dense className={classes.profileList}>
              {employeeStatusList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{item.icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} secondary={item.value} />
                </ListItem>
              ))}
            </List>
          </PapperBlock>
        </Grid>
      </Grid>

      <PayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.vacationReport)}
        data={employeeInfo.vacation}
        columns={vacationColumns}
      />

      <PayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.rewordsReport)}
        data={employeeInfo.rewords}
        columns={rewordsColumns}
      />

      <PayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.penaltyReport)}
        data={employeeInfo.penalty}
        columns={penaltyColumns}
      />

      <PayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.jobsReport)}
        data={employeeInfo.jobs}
        columns={jobsColumns}
      />

      <PayrollTable
        isLoading={isLoading}
        title={intl.formatMessage(messages.departmentReport)}
        data={employeeInfo.department}
        columns={departmentColumns}
      />
    </PayRollLoader>
  );
}

EmployeeStatusReport.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(EmployeeStatusReport);
