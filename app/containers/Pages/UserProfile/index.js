import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import AppBar from '@mui/material/AppBar';
import dummy from 'enl-api/dummy/dummyContents';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Hidden from '@mui/material/Hidden';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
import Favorite from '@mui/icons-material/Favorite';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import {
  Cover,
  About,
  Connection,
  Albums
} from 'enl-components';
import useStyles from 'enl-components/Profile/cover-jss';
import { injectIntl } from 'react-intl';
import messages from 'enl-components/Profile/messages';

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = { children: PropTypes.node.isRequired, };

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
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Cover
        coverImg=""
        avatar={dummy.user.avatar}
        name={dummy.user.name}
        desc="Consectetur adipiscing elit."
      />
      <AppBar position="static" className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} />
            <Tab icon={<SupervisorAccount />} />
            <Tab icon={<Favorite />} />
            <Tab icon={<PhotoLibrary />} />
          </Tabs>
        </Hidden>
        <Hidden mdDown>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label={intl.formatMessage(messages.about)} />
            <Tab icon={<SupervisorAccount />} label={'20 ' + intl.formatMessage(messages.connections)} />
            <Tab icon={<PhotoLibrary />} label={'4 ' + intl.formatMessage(messages.albums)} />
          </Tabs>
        </Hidden>
      </AppBar>
      {value === 0 && <TabContainer><About /></TabContainer>}
      {value === 1 && <TabContainer><Connection /></TabContainer>}
      {value === 2 && <TabContainer><Albums /></TabContainer>}
    </div>
  );
}

UserProfile.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(UserProfile);
