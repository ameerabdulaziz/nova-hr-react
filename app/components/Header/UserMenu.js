import ExitToApp from "@mui/icons-material/ExitToApp";
import Info from "@mui/icons-material/Info";
import NotificationsActiveOutlined from "@mui/icons-material/NotificationsActiveOutlined";
import { Icon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import link from "enl-api/ui/link";
import messageStyles from "enl-styles/Messages.scss";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { formateDate } from "../../containers/Pages/Payroll/helpers";
import ResetPasswordData from "../../containers/Pages/Payroll/Setting/api/ResetPasswordData";
import useStyles from "./header-jss";
import messages from "./messages";
import UnderContractionPopup from "../../containers/Pages/Payroll/Component/UnderContractionPopup";
import style from "../../styles/styles.scss";
import CampaignIcon from '@mui/icons-material/Campaign';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ApiData from "../../containers/Pages/Payroll/Dashboard/api";
import { useSelector } from "react-redux";
import SITEMAP ,{ DOMAIN_NAME } from "../../containers/App/routes/sitemap";

function UserMenu(props) {
  const { classes, cx } = useStyles();
  const { dark, signOut, avatar, notifications, notificationsCallFun, newsData, lastNewsFun } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [isUnderContractionPopupOpen, setIsUnderContractionPopupOpen] = useState(false)
  const locale = useSelector((state) => state.language.locale);
  const history = useHistory();

  const handleMenu = (menu) => (event) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const onOpenBtnClick = (notifData) => {
    if (notifData.url) {
      handleClose();

      if(notifData.id === 0 && notifData.notificationType)
      {
        history.push(`/${notifData.url}`, {NotificationTypeId: notifData.notificationType});

        sessionStorage.setItem('hrNotificationsId',JSON.stringify( 
           notifData.notificationType
        ));
      }
      else
      {
        notificationsCallFun(notifData.id)
        history.push(notifData.url);
      }
    }
  };

  const openUnderContractionPopup = () => {
    setIsUnderContractionPopupOpen(true);
    handleClose();
  };



  const onOpenNews = async (url,dataKey,Id) => {

    try
    {
      if (url) {
        handleClose();
        if(dataKey === "all")
        {
          history.push(url, { dataKey: "all" });
        }

        if(dataKey === "oneNews")
          {
            
            const  response = await ApiData(locale).getNewsById(Id);
                              await lastNewsFun()
            history.push(url, { dataKey: "oneNews", id: Id, newsData: response });
          }
      }
    }
    catch(err)
    {}
  };


  return (
    <div>

      <UnderContractionPopup
        isOpen={isUnderContractionPopupOpen}
        setIsOpen={setIsUnderContractionPopupOpen}
      />

    {newsData.length !== 0 && (
      <IconButton
        aria-haspopup="true"
        onClick={handleMenu("news")}
        color="inherit"
        className={cx(classes.notifIcon, dark ? classes.dark : classes.light)}
        size="large"
      >
        <Badge
          className={classes.badge}
          badgeContent={0}
          color="secondary"
        >
          <img 
            src={`${DOMAIN_NAME}/images/news2.webp`} 
            alt="speaker" 
            className={style.speakerSty}
            />
        </Badge>
      </IconButton>
      )} 

      <Menu
        id="menu-news"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === "news"}
        onClose={handleClose}
      >
        <div 
        style={{color:"#838383",textAlign:"right", padding:"0px 10px",fontSize:"13px", cursor:"pointer"}}
        onClick={() => onOpenNews(SITEMAP.global.NewsDetails.route, "all")}
        >
          <FormattedMessage {...messages.seeAll} />
        </div>

        {newsData.length > 0 ? (
          newsData.map((item, index) => (
            <MenuItem
              divider={index < newsData.length - 1}
              onClick={() => onOpenNews(SITEMAP.global.NewsDetails.route,"oneNews",item.id)}
              key={index}
            >
              <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                  <Avatar alt="User Name" className={messageStyles.icon}>
                    {item.newsTypeId === 1 && (
                      <CampaignIcon />
                    )}

                    {item.newsTypeId === 2 && (
                      <WorkIcon />
                    )}

                    {item.newsTypeId === 3 && (
                      <NotificationsIcon />
                    )}

                    {item.newsTypeId === 4 && (
                      <BeachAccessIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.details}
                  className={classes.textNotif}
                  secondary={`${formateDate(item.fromDate, "dd MMM yyyy")} - ${formateDate(item.toDate, "dd MMM yyyy")}` }
                />
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <div className={messageStyles.messageInfo}>
              <ListItemAvatar>
                <Avatar alt="User Name" className={messageStyles.icon}>
                  <Icon>
                    <Info />
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ alignSelf: "center" }}
                primary={<FormattedMessage {...messages.noNews} />}
                className={classes.textNotif}
              />
            </div>
          </MenuItem>
        )}
      </Menu>


{/* /////////////// */}
      <IconButton
        aria-haspopup="true"
        onClick={handleMenu("notification")}
        color="inherit"
        className={cx(classes.notifIcon, dark ? classes.dark : classes.light)}
        size="large"
      >
        <Badge
          className={classes.badge}
          badgeContent={notifications.length}
          color="secondary"
        >
          <NotificationsActiveOutlined />
        </Badge>
      </IconButton>
      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === "notification"}
        onClose={handleClose}
      >
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <MenuItem
              divider={index < notifications.length - 1}
              onClick={() => onOpenBtnClick(item)}
              key={index}
            >
              <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                  <Avatar alt="User Name" className={messageStyles.icon}>
                    <Icon>{item.iconClass}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.description}
                  className={classes.textNotif}
                  secondary={formateDate(item.date, "dd MMM yyyy")}
                />
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <div className={messageStyles.messageInfo}>
              <ListItemAvatar>
                <Avatar alt="User Name" className={messageStyles.icon}>
                  <Icon>
                    <Info />
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ alignSelf: "center" }}
                primary={<FormattedMessage {...messages.noNotification} />}
                className={classes.textNotif}
              />
            </div>
          </MenuItem>
        )}
      </Menu>
      <Button onClick={handleMenu("user-setting")}>
        <Avatar alt="avatar" src={avatar} />
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openMenu === "user-setting"}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to={SITEMAP.global.Profile.route}>
          <FormattedMessage {...messages.profile} />
        </MenuItem>
        <MenuItem onClick={openUnderContractionPopup} >
          <FormattedMessage {...messages.task} />
        </MenuItem>
        <MenuItem onClick={openUnderContractionPopup} >
          <FormattedMessage {...messages.email} />
          {/* <ListItemIcon>
            <Badge
              className={cx(classes.badge, classes.badgeMenu)}
              badgeContent={2}
              color="secondary"
            >
              &nbsp;
            </Badge>
          </ListItemIcon> */}
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={SITEMAP.setting.ChangePassword.route}
        >
          <FormattedMessage {...messages.changePassword} />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            history.push(SITEMAP.auth.Login.route);

            await ResetPasswordData().Logout();
            localStorage.removeItem("Token");
            sessionStorage.removeItem("Review");
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
