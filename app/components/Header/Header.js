import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenOutlined from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlined from "@mui/icons-material/FullscreenExitOutlined";
import InvertColors from "@mui/icons-material/InvertColorsOutlined";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { NavLink, Link } from "react-router-dom";
import brand from "enl-api/dummy/brand";
import { injectIntl, FormattedMessage } from "react-intl";
import menuMessages from "enl-api/ui/menuMessages";
import link from "enl-api/ui/link";
import UserMenu from "./UserMenu";
import SearchUi from "../Search/SearchUi";
import SelectLanguage from "../SelectLanguage";
import messages from "./messages";
import useStyles from "./header-jss";
import { useSelector } from "react-redux";
import api from "../../containers/Pages/Payroll/Dashboard/api";
import payrollMessages from "../../containers/Pages/Payroll/messages";
import PayRollLoader from "../../containers/Pages/Payroll/Component/PayRollLoader";
import SITEMAP, { DOMAIN_NAME } from "../../containers/App/routes/sitemap";

const elem = document.documentElement;

function Header(props) {
  const { classes, cx } = useStyles();
  const {
    changeMode,
    toggleDrawerOpen,
    margin,
    mode,
    title,
    openGuide,
    history,
    signOut,
    dense,
    isLogin,
    avatar,
    intl,
  } = props;
  const [open] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const locale = useSelector((state) => state.language.locale);
  const { isHR, isManagement, isSuper } = useSelector((state) => state.authReducer.user) || {};
  const [notifications, setNotifications] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Initial header style
  let flagDarker = false;
  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = scroll > 30;
    const newFlagTitle = scroll > 40;
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  const lastNewsFun = async () => {
    try {

      const newsResponse = await api(locale).getLastNews();

      setNews(newsResponse)

    } catch (error) {
      //      
    } finally {
      setIsLoading(false);
    }
  }

  const fetchNeededList = async () => {
    setIsLoading(true);

    try {
      const notificationsResponse = await api(locale).getNotifications();

      lastNewsFun()
      setNotifications(notificationsResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchNeededList();
    }
  }, [isLogin]);

  const openFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const turnMode = (newMode) => {
    if (newMode === "light") {
      changeMode("dark");
    } else {
      changeMode("light");
    }
  };
  const handleChat = () => {

    setIsPopupOpen(true);
    
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onPopupClose = () => {

    setQuestion("");
    setAnswer("");
    setIsPopupOpen(false);
    
  };
  const onPopupFormSubmit = async (evt) => {

    evt.preventDefault();
    setIsLoading(true);

    try {

      const response = await api(locale).UseChatGPT(question);

      setAnswer(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };


  const refreshNotifFun = async (id) => {    
    setIsLoading(true);

    try {

        await api(locale).SaveNotification(id);

        const notificationsResponse = await api(locale).getNotifications();
        setNotifications(notificationsResponse);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <AppBar
      className={cx(
        classes.appBar,
        classes.floatingBar,
        margin && classes.appBarShift,
        turnDarker && classes.darker
      )}
    >
      <Dialog
        open={isPopupOpen}
        onClose={onPopupClose}
        component="form"
        onSubmit={onPopupFormSubmit}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down("md")]: {
              width: "100%",
            },
            width: "70vw",
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...messages.askNova} />
        </DialogTitle>

        <DialogContent sx={{ pt: "10px !important" }}>
          <PayRollLoader isLoading={isLoading}>
            <Grid container mt={0} spacing={2}>
            <Grid item xs={12} md={12}>
                <TextField
                  name="question"
                  value={question}
                  fullWidth
                  variant="outlined"                  
                  multiline
                  onChange={(e)=>setQuestion(e.target.value)}
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="answer"
                  value={answer?.trimStart()}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </PayRollLoader>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onPopupClose()}>
            {intl.formatMessage(payrollMessages.cancel)}
          </Button>

          <Button type="submit" variant="contained">
            {intl.formatMessage(payrollMessages.send)}
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar disableGutters={!open}>
        <div className={cx(classes.brandWrap, dense && classes.dense)}>
          <span>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </span>
          <Hidden smDown>
            <NavLink to='/' className={cx(classes.brand, classes.brandBar)}>
              <img
                src={`${DOMAIN_NAME}/images/logo.png`}
                alt={brand.name}
                style={{ width: 120, height: 25 }}
                loading="lazy"
              />
              {/* {brand.name} */}
            </NavLink>
          </Hidden>
        </div>
        <Hidden smDown>
          <div className={classes.headerProperties}>
            <div
              className={cx(classes.headerAction, showTitle && classes.fadeOut)}
            >
              {fullScreen ? (
                <Tooltip
                  title={intl.formatMessage(messages.exitFullScreen)}
                  placement="bottom"
                >
                  <IconButton
                    className={classes.button}
                    onClick={closeFullScreen}
                    size="small"
                  >
                    <FullscreenExitOutlined />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip
                  title={intl.formatMessage(messages.fullScreen)}
                  placement="bottom"
                >
                  <IconButton
                    className={classes.button}
                    onClick={openFullScreen}
                    size="small"
                  >
                    <FullscreenOutlined />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip
                title={intl.formatMessage(messages.lamp)}
                placement="bottom"
              >
                <IconButton
                  className={classes.button}
                  onClick={() => turnMode(mode)}
                  size="small"
                >
                  <InvertColors />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title={intl.formatMessage(messages.guide)} placement="bottom">
                <IconButton className={classes.button} onClick={openGuide} size="small">
                  <HelpOutlineOutlined />
                </IconButton>
              </Tooltip> */}
            </div>
            <Typography
              component="h2"
              className={cx(classes.headerTitle, showTitle && classes.show)}
            >
              {menuMessages[title] !== undefined ? (
                <FormattedMessage {...menuMessages[title]} />
              ) : title == "app" ? (
                "Hr Dashboard"
              ) : (
                title
              )}
            </Typography>
          </div>
        </Hidden>
        
      {isHR || isManagement || isSuper ? (
        <Tooltip
          title={intl.formatMessage(messages.askNova)}
          placement="bottom"
        >
          <Box onClick={handleChat} sx={{ cursor: 'pointer' }}>
            <img src={`${DOMAIN_NAME}/images/chat (1).png`} alt='chat' height={40} loading="lazy" />
          </Box>
        </Tooltip>
        )
      : null}
        <div className={classes.searchWrapper}>
          <div className={classes.wrapper}>
            <div className={classes.search}>
              <SearchIcon />
            </div>
            <SearchUi history={history} />
          </div>
        </div>
        <Hidden smDown>
          <span className={classes.separatorV} />
        </Hidden>

        <div className={classes.userToolbar}>
          <SelectLanguage />
          {isLogin ? (
            <UserMenu
              signOut={signOut}
              avatar={avatar}
              notifications={notifications}
              notificationsCallFun={refreshNotifFun}
              newsData={news}
              lastNewsFun={lastNewsFun}
            />
          ) : (
            <Button
              color="primary"
              className={classes.buttonTop}
              component={Link}
              to={SITEMAP.auth.Login.route}
              variant="contained"
            >
              <AccountCircle />
              <FormattedMessage {...messages.login} />
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  toggleDrawerOpen: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  margin: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  dense: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

Header.defaultProps = {
  dense: false,
  isLogin: false,
};

export default injectIntl(Header);
