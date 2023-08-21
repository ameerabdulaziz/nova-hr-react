import React, { useEffect, memo, useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import dummy from 'enl-api/dummy/dummyContents';
import { Notification } from 'enl-components';
import ContactDetail from '../component/ContactDetail';
import Fab from '@mui/material/Fab';
import Add from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import useStyles from '../component/contact-jss';
import { TextField, Autocomplete } from '@mui/material';

import UserMenuData from '../../Setting/api/UserMenuData';
import {
  fetchAction,
  showDetailAction,
  hideDetailAction,
  submitAction,
  editAction,
  addAction,
  closeAction,
  removeAction,
  addToFavoriteAction,
  searchAction,
  closeNotifAction,
} from '../../../../../../app/containers/SampleApps/Contact/reducers/contactActions';
//import data from '../api/EmployeeBankData';
import data from '../api/contactData';

function Contact() {
  // Redux State
  const avatarInit = null; //useSelector((state) => state.contact.avatarInit);
  //const dataContact = useSelector((state) => state.contact.contactList);
  const [dataContact, setdata] = useState([]);
  const [itemSelected, setitemSelected] = useState(-1);
  const [loading, setloading] = useState(false);
  // const itemSelected = 0; //useSelector((state) => state.contact.selectedIndex);
  const keyword = ''; //useSelector((state) => state.contact.keywordValue);
  //const open = useSelector((state) => state.contact.openFrm);
  const clippedRight = 'clippedRight';

  const [showMobileDetail, setshowMobileDetail] = useState(false);
  //   const showMobileDetail = useSelector(
  //     (state) => state.contact.showMobileDetail
  //   );
  const messageNotif = useSelector((state) => state.contact.notifMsg);
  const [employee, setEmployee] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [BankList, setBankList] = useState([]);
  //bnknoha
  // Dispatcher
  //   const fetchData = useDispatch();
  //   const submit = useDispatch();
  //   const showDetail = useDispatch();
  //   const hideDetail = useDispatch();
  //   const edit = useDispatch();
  //   const add = useDispatch();
  //   const close = useDispatch();
  //   const remove = useDispatch();
  //   const favorite = useDispatch();
  //   const search = useDispatch();
  //   const closeNotif = useDispatch();
  useEffect(() => {
    async function fetchEmployee() {
      debugger;

      const empdata = await UserMenuData().GetUserMenuLookup('en');
      setEmployeeList(empdata.employees || []);

      const bnkdata = await data(employee).GetUserMenuLookup('en');
      setBankList(bnkdata || []);

      if (empdata.employees && empdata.employees.length > 0)
        setEmployee(empdata.employees[0].id);
    }
    fetchEmployee();
  }, []);

  useEffect(() => {
    async function fetchData1() {
      debugger;

      const dataApi = await data(employee).GetList();
      setdata(dataApi);
      setitemSelected(-1);
      //setloading(true);
      //fetchAction(dataApi);
      // fetchData(fetchAction(dataApi));
    }

    fetchData1();
  }, [employee]);

  const getItem = (dataArray) =>
    dataArray.map((data) => {
      const index = dataContact.indexOf(data);
      if (data.name.toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      return (
        <ListItem
          button
          key={data.key}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => {
            //showDetail(data)
            debugger;
            setitemSelected(index || 0);
            setshowMobileDetail(false);
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt={data.name}
              src={data.avatar}
              className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText primary={data.name} secondary={data.bankBranchNo} />
        </ListItem>
      );
    });
  const submitContact = (item, avatar) => {
    const avatarBase64 =
      typeof avatar === 'object' && avatar !== null
        ? URL.createObjectURL(avatar)
        : avatar;
    const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
    submit(submitAction(item, avatarPreview));
  };

  const title = brand.name + ' - Banks';
  const description = brand.desc;
  const { classes, cx } = useStyles();

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
      <Notification
        close={() => closeNotif(closeNotifAction)}
        message={messageNotif}
      />
      <div className={cx(classes.root, classes.padding)}>
        <Fragment>
          <Drawer
            variant="permanent"
            anchor="left"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div>
              <div
                className={cx(
                  classes.toolbar,
                  clippedRight && classes.clippedRight
                )}
              >
                <div className={classes.searchWrapper}>
                  <Autocomplete
                    className={classes.autocomplete}
                    id="ddlEmp"
                    options={employeeList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      if (value !== null) {
                        setEmployee(value.id);
                      } else {
                        setEmployee(0);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        {...params}
                        name="employee"
                        value={employee}
                        label="choose employee"
                        margin="normal"
                      />
                    )}
                  />
                </div>
              </div>

              <List className={classes.contactList}>
                {getItem(dataContact)}
              </List>
            </div>
          </Drawer>
        </Fragment>

        <Tooltip title="add">
          <Fab
            color="secondary"
            onClick={() => setitemSelected(-1)}
            className={classes.addBtn}
          >
            <Add />
          </Fab>
        </Tooltip>

        <ContactDetail
          loading={loading}
          showMobileDetail={showMobileDetail}
          //hideDetail={() => hideDetail(hideDetailAction)}
          bnkList={BankList}
          dataContact={dataContact}
          itemSelected={itemSelected}
          edit={(payload) => edit(editAction(payload))}
          remove={(payload) => remove(removeAction(payload))}
          favorite={(payload) => favorite(addToFavoriteAction(payload))}
        />
      </div>
    </div>
  );
}

const MemoedContact = memo(Contact);
export default MemoedContact;
