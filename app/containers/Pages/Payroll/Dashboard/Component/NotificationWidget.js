import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Hidden from "@mui/material/Hidden";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import PhoneIcon from "@mui/icons-material/Phone";
import Chat from "@mui/icons-material/Chat";
import Mail from "@mui/icons-material/Mail";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import Info from "@mui/icons-material/Info";
import Warning from "@mui/icons-material/Warning";
import Check from "@mui/icons-material/CheckCircle";
import Error from "@mui/icons-material/RemoveCircle";
import AccountBox from "@mui/icons-material/AccountBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaylistAddCheck from "@mui/icons-material/PlaylistAddCheck";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dataContact from "enl-api/apps/contactData";
import messageStyles from "enl-styles/Messages.scss";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import useStyles from "./widget-jss";
import Grid from "@mui/material/Grid";
import { PapperBlock } from "enl-components";
import Divider from "@mui/material/Divider";
import FilterCenterFocus from "@mui/icons-material/FilterCenterFocus";

function NotificationWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <Typography className={classes.smallTitle} variant="button">
        <NotificationsActive className={classes.leftIcon} />
        <FormattedMessage {...messages.notification1} />
      </Typography>
      <Divider className={classes.divider} />

      <List>
        <ListItem className={messageStyles.messageWarning}>
          <ListItemAvatar>
            <Avatar className={messageStyles.icon}>
              <NotificationsActive />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Notification1 Notification1 Notification1 " secondary="12 Oct 2018" />
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
      </List>
    </PapperBlock>
  );
}

export default injectIntl(NotificationWidget);
