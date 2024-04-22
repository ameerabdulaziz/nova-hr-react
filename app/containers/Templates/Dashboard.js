import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GuideSlider } from "enl-components";
import {
  toggleAction,
  openAction,
  playTransitionAction,
} from "enl-redux/actions/uiActions";
import { logout } from "enl-redux/actions/authActions";
import dummy from "enl-api/dummy/dummyContents";
import LeftSidebarLayout from "./layouts/LeftSidebar";
import LeftSidebarBigLayout from "./layouts/LeftSidebarBig";
import MegaMenuLayout from "./layouts/MegaMenu";
import DropMenuLayout from "./layouts/DropMenu";
import useStyles from "./appStyles-jss";
import { useSelector, useDispatch } from "react-redux";
import API from "./api";
import {
  getCompanyInfo,
  syncUser,
  syncUserMenu,
} from "../../redux/actions/authActions";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";

function Dashboard(props) {
  const { classes, cx } = useStyles();
  const {
    initialOpen,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    history,
    layout,
    changeMode,
    signOut,
    user,
    isAuthenticated,
  } = props;
  const [appHeight, setAppHeight] = useState(0);
  const [openGuide, setOpenGuide] = useState(false);
  const [title, setTitle] = useState(localStorage.getItem("MenuName"));
  //const getAuth = useSelector(state => state.authReducer.user);
  const Dispatcher = useDispatch();
  const Auth = useSelector((state) => state.authReducer.loggedIn);
  const description = brand.desc;

  const titleException = [
    "/app",
    "/app/crm-dashboard",
    "/app/crypto-dashboard",
  ];
  const parts = history.location.pathname.split("/");
  let place = parts[parts.length - 1].replace("-", " ");
  const pathname = history.location.pathname;
  const dataMenu = useSelector((state) => state.authReducer.usermenu);
  const locale = useSelector((state) => state.language.locale);
  function findNode(array, path) {
    if (array) {
      for (const node of array) {
        let finalpath = "";
        if (path.endsWith("/"))
          finalpath = path.substring(0, path.lastIndexOf("/"));
        else finalpath = path;

        if (node.link && node.link === path) {
          return node;
        }
        if (node.child) {
          const child = findNode(node.child, path);
          if (child) return child;
        }
      }
    }
  }

  var result = findNode(
    dataMenu,
    place.endsWith("Create")
      ? pathname.replace("Create", "")
      : place.endsWith("Edit")
      ? pathname.replace("Edit", "")
      : pathname
  );
  if (result) {
    localStorage.setItem(
      "MenuName",
      locale == "en" ? result.name : result.arname
    );
    localStorage.setItem("Menu", JSON.stringify(result));
    place = locale == "en" ? result.name : result.arname;
  } else if (
    pathname != "/app/pages/error" &&
    pathname != "/app" &&
    pathname != "/app/EmployeeDashboard" &&
    pathname != "/app/ManagementDashboard" &&
    dataMenu
  ) {


    var isFound = false;
    //children.props.children[0].props.path

    for (const item of children.props.children) {
      /* if (
        item.props.path ===
        (pathname.endsWith("/")
          ? pathname.substring(0, pathname.lastIndexOf("/"))
          : pathname)
      )  */
      if (pathname.includes(item.props.path)) {
        isFound = true;
        break;
      }
    }
    if (isFound) history.push(`/app/pages/error`);
  }

  // used to read page name ( MenuName ) from localStorage
  useEffect(()=>{
    if(localStorage.getItem("MenuName"))
    {
      console.log("innnn = ", localStorage.getItem("MenuName"));
      setTitle(localStorage.getItem("MenuName"))
    }

  },[localStorage.getItem("MenuName")])

  const profile = (userProfile) => {
    if (userProfile) {
      return {
        avatar: userProfile.photoURL || dummy.user.avatar,
        name:
          (locale === "en" ? userProfile?.enName : userProfile?.arName) ??
          userProfile.name,
      };
    }
    return {
      avatar: dummy.user.avatar,
      name: dummy.user.name,
    };
  };

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  useEffect(() => {
    // Adjust min height
    setAppHeight(window.innerHeight + 112);

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // Execute all arguments when page changes
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });

    return () => {
      unlisten();
    };
  }, []);

  const fetchNeededData = async () => {
    loadTransition(false);

    try {
      const companyInfo = await API(locale).getCompanyInfo();
      const menuItems = await API(locale).getMenu();
      const userInfo = await API(locale).getUserInfo();

      if (!userInfo) {
        signOut();
      }

      const mappedMenu = menuItems.map((item) => ({
        ...item,
        icon: item.icon ?? "widgets",
        child: item.child?.map((child) => ({
          ...child,
          icon: child.icon ?? "extension",
          child: child.child?.map((subChild) => ({
            ...subChild,
            icon: subChild.icon ?? "layers",
          })),
        })),
      }));

      const userPayload = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.userName,
        avatar: null,
        title: "Administrator",
        status: "online",
        displayName: userInfo.userName,
        isHR: userInfo.isHR,
        isManagement: userInfo.isManagement,
        isSuper: userInfo.isSuper,
        arName: userInfo.arName,
        enName: userInfo.enName,
        photoURL: userInfo.photo,
        branchId: userInfo.branchId,
      };

      Dispatcher(syncUser(userPayload));

      Dispatcher(getCompanyInfo(companyInfo));

      Dispatcher(syncUserMenu(mappedMenu));
    } catch (error) {
      //
    } finally {
      loadTransition(true);
    }
  };

  useEffect(() => {
    console.log("history.location.pathname =", history.location.pathname);
    if (Auth === null || Auth === false) {
      history.push(`/login?redirectTo=${history.location.pathname}`);
    }

    fetchNeededData();
  }, []);

  return (
    <div
      style={{ minHeight: appHeight }}
      className={cx(
        classes.appFrameInner,
        layout === "top-navigation" || layout === "mega-menu"
          ? classes.topNav
          : classes.sideNav,
        mode === "dark" ? "dark-mode" : "light-mode"
      )}
    >
       <Helmet>
        <title>{brand.name + " - " + title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
      </Helmet>
      <GuideSlider openGuide={openGuide} closeGuide={handleCloseGuide} />
      {
        /* Left Sidebar Layout */
        layout === "sidebar" && (
          <LeftSidebarLayout
            history={history}
            toggleDrawer={toggleDrawer}
            loadTransition={loadTransition}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
            signOut={signOut}
            isLogin={isAuthenticated}
            userAttr={profile(user)}
          >
            {children}
          </LeftSidebarLayout>
        )
      }
      {
        /* Left Big-Sidebar Layout */
        layout === "big-sidebar" && (
          <LeftSidebarBigLayout
            history={history}
            toggleDrawer={toggleDrawer}
            loadTransition={loadTransition}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
            signOut={signOut}
            isLogin={isAuthenticated}
            userAttr={profile(user)}
          >
            {children}
          </LeftSidebarBigLayout>
        )
      }
      {
        /* Top Bar with Dropdown Menu */
        layout === "top-navigation" && (
          <DropMenuLayout
            history={history}
            toggleDrawer={toggleDrawer}
            loadTransition={loadTransition}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
            signOut={signOut}
            isLogin={isAuthenticated}
            userAttr={profile(user)}
          >
            {children}
          </DropMenuLayout>
        )
      }
      {
        /* Top Bar with Mega Menu */
        layout === "mega-menu" && (
          <MegaMenuLayout
            history={history}
            toggleDrawer={toggleDrawer}
            loadTransition={loadTransition}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
            signOut={signOut}
            isLogin={isAuthenticated}
            userAttr={profile(user)}
          >
            {children}
          </MegaMenuLayout>
        )
      }
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {
  user: null,
  isAuthenticated: null,
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.ui.sidebarOpen,
  pageLoaded: state.ui.pageLoaded,
  mode: state.ui.type,
  layout: state.ui.layout,
  isAuthenticated: state.authReducer.loggedIn,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
  signOut: bindActionCreators(logout, dispatch),
});

const DashboardMaped = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardMaped;
