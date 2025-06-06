import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Icon from '@mui/material/Icon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useStyles from './sidebar-jss';
import { useSelector } from 'react-redux';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
function MainMenu(props) {
  const { classes, cx } = useStyles();
  const locale = useSelector(state => state.language.locale);
  const dataMenu = useSelector(state => state.authReducer.usermenu);
  //const [dataMenu,setdataMenu]=useState([]);
  const {
    openSubMenu,
    open,
    toggleDrawerOpen,
    loadTransition
  } = props;
  
  const handleClick = () => {
    
    toggleDrawerOpen();
    loadTransition(false);
  };

  const getMenus = (menuArray, level = 1) => menuArray.map((item, index) => {
   
    if (item.child || item.linkParent) {
      return (
        <div key={index.toString()}>
          <ListItem
            button
            component={LinkBtn}
            to={item.linkParent ? item.linkParent : '#'}
            className={
              cx(
                classes.head,
                item.icon ? classes.iconed : '',
                open.indexOf(item.key) > -1 ? classes.opened : '',
              )
            }
            onClick={() => openSubMenu(item.key, item.keyParent)}
          >
            {item.icon && (
              <ListItemIcon className={classes.icon}>
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
            )}
            <ListItemText classes={{ primary: classes.primary }} primary={locale=="en"?item.name:item.arname} />
            { !item.linkParent && (
              <span>
                { open.indexOf(item.key) > -1 ? <ExpandLess /> : <ExpandMore /> }
              </span>
            )}
          </ListItem>
          { !item.linkParent && (
            <Collapse
              component="div"
              className={cx(
                classes.nolist,
                (item.keyParent ? classes.child : ''),
              )}
              in={open.indexOf(item.key) > -1}
              timeout="auto"
              unmountOnExit
              sx={{ paddingInlineStart: level === 0 ? '25px' : 0 }}
            >
              <List className={classes.dense} component="nav" dense>
                { getMenus(item.child, level + 1) }
              </List>
            </Collapse>
          )}
        </div>
      );
    }
    if (item.title) {
      return (
        <ListSubheader
          disableSticky
          key={index.toString()}
          component="div"
          className={classes.title}
        >
          {locale=="en"?item.name:item.arname}
        </ListSubheader>
      );
    }

    if (item.isHidden) {
      return null;
    }

    return (
      <ListItem
        key={index.toString()}
        exact
        className={classes.nested}
        activeClassName={classes.active}
        component={LinkBtn}
        to={item.link ?? '#'}
        onClick={() => handleClick()}
      >
        {item.icon && (
          <ListItemIcon className={classes.icon}>
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
        )}
        <ListItemText classes={{ primary: classes.primary }} primary={locale=="en"?item.name:item.arname} />
        {item.badge && (
          <Chip color="primary" label={item.badge} className={classes.badge} />
        )}
      </ListItem>
    );
  });

  return (
    dataMenu?
    <div>
      {getMenus(dataMenu, 0)}
    </div>:''
  );
}

MainMenu.propTypes = {
  open: PropTypes.array.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });

const mapStateToProps = state => ({
  open: state.ui.subMenuOpen
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);

export default MainMenuMapped;
