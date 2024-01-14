import BusinessIcon from '@mui/icons-material/Business';
import DateRange from '@mui/icons-material/DateRange';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhone from '@mui/icons-material/LocalPhone';
import LocationOn from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import useStyles from '../../../../../components/Widget/widget-jss';
import MonthCalendar from '../../Component/MonthCalendar';
import messages from '../messages';

function About(props) {
  const { profileInfo, intl } = props;

  const { classes } = useStyles();

  const listItems = [
    {
      title: intl.formatMessage(messages.hiringDate),
      icon: <DateRange />,
      value: profileInfo.hiringDate
        ? format(new Date(profileInfo.hiringDate), 'MMMM dd, yyyy')
        : '',
    },
    {
      title: intl.formatMessage(messages.email),
      icon: <EmailIcon />,
      value: profileInfo.workEmail,
    },
    {
      title: intl.formatMessage(messages.phone),
      icon: <LocalPhone />,
      value: profileInfo.mobile,
    },
    {
      title: intl.formatMessage(messages.address),
      icon: <LocationOn />,
      value: profileInfo.address,
    },
    {
      title: intl.formatMessage(messages.organization),
      icon: <BusinessIcon />,
      value: profileInfo.organizationName,
    },
    {
      title: intl.formatMessage(messages.reportingTo),
      icon: <FlagIcon />,
      value: profileInfo.reportToName,
    },
  ];

  return (
    <Grid container direction='row' spacing={3}>
      <Grid item md={6} xs={12}>
        <PapperBlock
          title={intl.formatMessage(messages.aboutMe)}
          icon='contacts'
          whiteBg
          noMargin
          desc=''
        >
          <List dense className={classes.profileList}>
            {listItems.map((item, index) => (
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

      <Grid item xs={12} md={6}>
        <MonthCalendar />
      </Grid>
    </Grid>
  );
}

About.propTypes = {
  profileInfo: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(About);
