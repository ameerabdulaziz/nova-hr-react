import AccountCircle from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import brand from 'enl-api/dummy/brand';
import dummy from 'enl-api/dummy/dummyContents';
import {
  About, CompanyDocument,
  Cover,
  JobData
} from 'enl-components';
import useStyles from 'enl-components/Profile/cover-jss';
import messages from 'enl-components/Profile/messages';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';

function TabContainer(props) {
  const { children } = props;
  return <div style={{ paddingTop: 8 * 3 }}>{children}</div>;
}

TabContainer.propTypes = { children: PropTypes.node.isRequired };

function UserProfile(props) {
  const { intl } = props;
  const { classes } = useStyles();
  const title = brand.name + ' - Profile';
  const description = brand.desc;
  const [value, setValue] = useState(0);

  const handleChange = (event, val) => {
    setValue(val);
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Helmet>

      <Cover
        coverImg=''
        avatar={dummy.user.avatar}
        name={dummy.user.name}
        desc='Consectetur adipiscing elit.'
      />

      <AppBar position='static' className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={value}
            onChange={handleChange}
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
            value={value}
            onChange={handleChange}
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

      {value === 0 && (
        <TabContainer>
          <About />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <CompanyDocument />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <JobData />
        </TabContainer>
      )}
    </div>
  );
}

UserProfile.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(UserProfile);
