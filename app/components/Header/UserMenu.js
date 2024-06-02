import ExitToApp from '@mui/icons-material/ExitToApp';
import Info from '@mui/icons-material/Info';
import NotificationsActiveOutlined from '@mui/icons-material/NotificationsActiveOutlined';
import { Icon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import link from 'enl-api/ui/link';
import messageStyles from 'enl-styles/Messages.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { formateDate } from '../../containers/Pages/Payroll/helpers';
import useStyles from './header-jss';
import messages from './messages';

function UserMenu(props) {
  const { classes, cx } = useStyles();
  const {
    dark, signOut, avatar, notifications
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const history = useHistory();

  const handleMenu = (menu) => (event) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const onOpenBtnClick = (url) => {
    if (url) {
      handleClose();
      history.push(url);
    }
  };

  return (
    <div>
      <IconButton
        aria-haspopup='true'
        onClick={handleMenu('notification')}
        color='inherit'
        className={cx(classes.notifIcon, dark ? classes.dark : classes.light)}
        size='large'
      >
        <Badge
          className={classes.badge}
          badgeContent={notifications.length}
          color='secondary'
        >
          <NotificationsActiveOutlined />
        </Badge>
      </IconButton>
      <Menu
        id='menu-notification'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === 'notification'}
        onClose={handleClose}
      >
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <MenuItem
              divider={index < notifications.length - 1}
              onClick={() => onOpenBtnClick(item.url)}
              key={index}
            >
              <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                  <Avatar alt='User Name' className={messageStyles.icon}>
                    <Icon>{item.iconClass}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.description}
                  className={classes.textNotif}
                  secondary={formateDate(item.date, 'dd MMM yyyy')}
                />
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <div className={messageStyles.messageInfo}>
              <ListItemAvatar>
                <Avatar alt='User Name' className={messageStyles.icon}>
                  <Icon>
                    <Info />
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ alignSelf: 'center' }}
                primary={<FormattedMessage {...messages.noNotification} />}
                className={classes.textNotif}
              />
            </div>
          </MenuItem>
        )}
      </Menu>
      <Button onClick={handleMenu('user-setting')}>
        <Avatar alt='avatar' src={avatar} />
      </Button>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenu === 'user-setting'}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to={link.profile}>
          <FormattedMessage {...messages.profile} />
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.task}>
          <FormattedMessage {...messages.task} />
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.email}>
          <FormattedMessage {...messages.email} />
          <ListItemIcon>
            <Badge
              className={cx(classes.badge, classes.badgeMenu)}
              badgeContent={2}
              color='secondary'
            >
							&nbsp;
            </Badge>
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            signOut();
            localStorage.removeItem('Token');
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <FormattedMessage {...messages.logout} />
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  notifications: PropTypes.array.isRequired,
};

UserMenu.defaultProps = {
  dark: false,
};

export default injectIntl(UserMenu);
