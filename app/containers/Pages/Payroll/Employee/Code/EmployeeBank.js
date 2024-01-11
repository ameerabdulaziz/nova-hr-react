import React, { useEffect, memo, useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import dummy from 'enl-api/dummy/dummyContents';
import { Notification } from 'enl-components';
import EmpBankDetail from '../component/EmpBankDetail';
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
import useStyles from '../component/EmpBank-jss';
import { TextField, Autocomplete } from '@mui/material';

import data from '../api/contactData';
import GeneralListApis from '../../api/GeneralListApis';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
function Contact() {
  const history = useHistory();
  const location = useLocation();
  const { empid } = location.state ?? { id: 0, name: '' };
  const [employee, setEmployee] = useState(empid ?? { id: 0, name: '' });
  const avatarInit = null; //useSelector((state) => state.contact.avatarInit);
  const [dataContact, setdata] = useState([]);
  const [itemSelected, setitemSelected] = useState(-1);
  const [loading, setloading] = useState(false);
  const keyword = ''; //useSelector((state) => state.contact.keywordValue);
  const clippedRight = 'clippedRight';
  const locale = useSelector((state) => state.language.locale);
  const [showMobileDetail, setshowMobileDetail] = useState(false);
  const messageNotif = useSelector((state) => state.contact.notifMsg);

  const [employeeList, setEmployeeList] = useState([]);
  const [BankList, setBankList] = useState([]);

  useEffect(() => {
    async function fetchEmployee() {
      const empdata = await GeneralListApis(locale).GetEmployeeList();
      setEmployeeList(empdata || []);

      const bnkdata = await data(locale).GetBankLookup(employee.id);
      setBankList(bnkdata || []);
    }
    fetchEmployee();
  }, []);

  useEffect(() => {
    async function fetchData1() {
      const dataApi = await data(locale).GetList(employee.id);
      setdata(dataApi);
      setitemSelected(-1);
    }

    fetchData1();
  }, [employee]);

  const getItem = (dataArray) =>
    dataArray.map((data) => {
      const index = dataContact.indexOf(data);
      if (data.name.toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
      // test
      return (
        <ListItem
          button
          key={data.key}
          className={index === itemSelected ? classes.selected : ''}
          onClick={() => {
            //showDetail(data)

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
    //submit(submitAction(item, avatarPreview));
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
                    value={{ id: employee.id, name: employee.name }}
                    isOptionEqualToValue={(option, value) =>
                      value.id === 0 ||
                      value.id === '' ||
                      option.id === value.id
                    }
                    getOptionLabel={(option) =>
                      option.name ? option.name : ''
                    }
                    onChange={(event, value) => {
                      setEmployee({
                        id: value !== null ? value.id : 0,
                        name: value !== null ? value.name : '',
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        {...params}
                        name="employee"
                        //value={employee}
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

        <EmpBankDetail
          employeeId={employee.id}
          loading={loading}
          showMobileDetail={showMobileDetail}
          bnkList={BankList}
          dataContact={dataContact}
          itemSelected={itemSelected}
        />
      </div>
    </div>
  );
}

const MemoedContact = memo(Contact);
export default MemoedContact;
