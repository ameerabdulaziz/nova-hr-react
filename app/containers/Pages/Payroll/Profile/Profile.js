import AccountCircle from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import useStyles from '../../../../components/Profile/cover-jss';
import PayRollLoader from '../Component/PayRollLoader';
import api from './api';
import About from './components/About';
import CompanyDocument from './components/CompanyDocument';
import Cover from './components/Cover';
import JobData from './components/JobData';
import messages from './messages';

function TabContainer(props) {
  const { children } = props;
  return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
}

TabContainer.propTypes = { children: PropTypes.node.isRequired };

function Profile(props) {
  const { intl } = props;
  const { classes } = useStyles();

  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(true);
  const [currentTap, setCurrentTap] = useState(0);
  const [profileInfo, setProfileInfo] = useState({
    id: 0,
    employeeCode: '',
    name: intl.formatMessage(messages.employeeName),
    birthCityName: '',
    birthGovName: '',
    telPhone: '',
    hiringDate: null,
    reportToName: '',
    mobile: '',
    birthDate: '',
    erpcode: '',
    genderName: '',
    jobName: intl.formatMessage(messages.jobName),
    nationalityName: '',
    organizationId: 0,
    organizationName: '',
    photo: '',
    socialStatusName: '',
    employeeJobKpi: [],
    jobDescription: [],
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const info = await api(locale).GetInfo();
      setProfileInfo(info);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onTapChange = (event, val) => {
    setCurrentTap(val);
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <Cover
        coverImg=''
        avatar={profileInfo.photo}
        name={profileInfo.name}
        desc={profileInfo.jobName}
      />

      <AppBar position='static' className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={currentTap}
            onChange={onTapChange}
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab icon={<AccountCircle />} />
            <Tab icon={<ApartmentIcon />} />
            <Tab icon={<WorkIcon />} />
          </Tabs>
        </Hidden>

        <Hidden mdDown>
          <Tabs
            value={currentTap}
            onChange={onTapChange}
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab
              icon={<AccountCircle />}
              label={intl.formatMessage(messages.about)}
            />
            <Tab
              icon={<ApartmentIcon />}
              label={intl.formatMessage(messages.companyData)}
            />
            <Tab
              icon={<WorkIcon />}
              label={intl.formatMessage(messages.jobData)}
            />
          </Tabs>
        </Hidden>
      </AppBar>

      {currentTap === 0 && (
        <TabContainer>
          <About profileInfo={profileInfo} />
        </TabContainer>
      )}

      {currentTap === 1 && (
        <TabContainer>
          <CompanyDocument />
        </TabContainer>
      )}

      {currentTap === 2 && (
        <TabContainer>
          <JobData profileInfo={profileInfo} />
        </TabContainer>
      )}
    </PayRollLoader>
  );
}

Profile.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Profile);
