import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PapperBlock } from 'enl-components';
import messageStyles from 'enl-styles/Messages.scss';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PayRollLoader from '../../Component/PayRollLoader';
import { formateDate } from '../../helpers';
import api from '../api';
import messages from './messages';
import useStyles from './widget-jss';
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

function NotificationWidget() {
  const { classes } = useStyles();
  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);

  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNotifications = async () => {
    setIsLoading(true);

    try {
      const notifications = await api(locale).getNotifications();
      setNotification(notifications);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const onOpenBtnClick = (url) => {
    if (url) {
      history.push(url);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg noMargin title='' icon='timeline' desc=''>
        <Typography className={classes.smallTitle} variant='button'>
          <NotificationsActive className={classes.leftIcon} />
          <FormattedMessage {...messages.notification1} />
        </Typography>

        <Divider className={classes.divider} />

        {notification.length > 0 ? (
          <List sx={{ height: '376px', overflow: 'auto' }}>
            {notification.map((item, index) => (
              <ListItem key={index} className={messageStyles.messageWarning}>
                <ListItemAvatar>
                  <Avatar className={messageStyles.icon}>
                    <Icon>{item.iconClass}</Icon>
                  </Avatar>
                </ListItemAvatar>

                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ width: '100%' }}
                >
                  <ListItemText
                    sx={{ whiteSpace: 'wrap' }}
                    primary={item.description}
                    secondary={formateDate(item.date, 'dd MMM yyyy')}
                  />

                  <Hidden smDown>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => onOpenBtnClick(item.url)}
                      color='primary'
                    >
                      <FormattedMessage {...messages.open} />
                    </Button>
                  </Hidden>
                </Stack>
              </ListItem>
            ))}
          </List>
        ) : (
          <Stack
            direction='row'
            sx={{ minHeight: '376px' }}
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <Box>
              <NotificationsActive sx={{ color: '#a7acb2', fontSize: 30 }} />
              <Typography color='#a7acb2' variant='body1'>
                <FormattedMessage {...messages.noNotification} />
              </Typography>
            </Box>
          </Stack>
        )}
        {/* <ListItem className={messageStyles.messageWarning}>
          <ListItemAvatar>
            <Avatar className={messageStyles.icon}>
              <NotificationsActive />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Notification2 Notification2 Notification2 " secondary="12 Oct 2018" />
          <Hidden smDown>
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
              >
                Open
              </Button>

            </ListItemSecondaryAction>
          </Hidden>

        </ListItem>
        <ListItem className={messageStyles.messageWarning}>
          <ListItemAvatar>
            <Avatar className={messageStyles.icon}>
              <NotificationsActive />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Notification3 Notification3 Notification3 " secondary="12 Oct 2018" />
          <Hidden smDown>
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
              >
                Open
              </Button>

            </ListItemSecondaryAction>
          </Hidden>

        </ListItem>
        <ListItem className={messageStyles.messageWarning}>
          <ListItemAvatar>
            <Avatar className={messageStyles.icon}>
              <NotificationsActive />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Notification4 Notification4 Notification4 " secondary="12 Oct 2018" />
          <Hidden smDown>
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
              >
                Open
              </Button>

            </ListItemSecondaryAction>
          </Hidden>

        </ListItem>
        <ListItem className={messageStyles.messageWarning}>
          <ListItemAvatar>
            <Avatar className={messageStyles.icon}>
              <NotificationsActive />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Notification5 Notification5 Notification5 " secondary="12 Oct 2018" />
          <Hidden smDown>
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
              >
                Open
              </Button>

            </ListItemSecondaryAction>
          </Hidden>

        </ListItem> */}
      </PapperBlock>
    </PayRollLoader>
  );
}

export default injectIntl(NotificationWidget);
