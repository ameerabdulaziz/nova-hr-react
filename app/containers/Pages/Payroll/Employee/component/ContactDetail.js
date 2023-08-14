import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';
import Hidden from '@mui/material/Hidden';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowBack from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Edit from '@mui/icons-material/Edit';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalPhone from '@mui/icons-material/LocalPhone';
import Email from '@mui/icons-material/Email';
import Smartphone from '@mui/icons-material/Smartphone';
import LocationOn from '@mui/icons-material/LocationOn';
import Work from '@mui/icons-material/Work';
import Language from '@mui/icons-material/Language';
import Divider from '@mui/material/Divider';
import { injectIntl, FormattedMessage } from 'react-intl';
import PlaceLoader from './PlaceLoader';
import messages from './messages';
import useStyles from './contact-jss';
import css from 'enl-styles/Form.scss';
import {
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  Input,
} from '@mui/material';
//import UserMenuData from '../../Setting/api/UserMenuData';
import EmployeeBankElementData from '../api/EmployeeBankElementData';
import { EditTable } from '../../../../Tables/demos';

const ITEM_HEIGHT = 48;

function ContactDetail(props) {
  const required = (value) => (value == null ? 'Required' : undefined);

  const {
    dataContact,
    itemSelected,
    edit,
    showMobileDetail,
    hideDetail,
    loading,
    intl,
    remove,
    favorite,
    bnkList,
    //processing,
  } = props;
  // const ref = useRef(null);
  debugger;
  const { classes, cx } = useStyles();
  //const [bnkList, setbnkList] = useState([]);

  const [id, setid] = useState(
    dataContact && dataContact.length > 0 ? dataContact[0].key : 0
  );
  const [employeeId, setemployeeId] = useState(0);
  const [bankId, setbankId] = useState({});

  const [bnkAcc, setbnkAcc] = useState(
    dataContact.length > 0 ? dataContact[itemSelected].bnkAcc : ''
  );
  // );

  const [branchNo, setbranchNo] = useState(
    !loading && dataContact.length > 0 ? dataContact[itemSelected].branchNo : ''
  );
  const [iban, setiban] = useState(
    !loading && dataContact.length > 0 ? dataContact[itemSelected].iban : ''
  );
  const [bnkEmpCode, setbnkEmpCode] = useState(
    !loading && dataContact.length > 0
      ? dataContact[itemSelected].bnkEmpCode
      : ''
  );
  const [swiftCode, setswiftCode] = useState(
    !loading && dataContact.length > 0
      ? dataContact[itemSelected].swiftCode
      : ''
  );

  useEffect(() => {
    setid(dataContact && dataContact.length > 0 ? dataContact[0].key : 0);
    setbnkAcc(
      !loading && dataContact.length > 0 ? dataContact[itemSelected].bnkAcc : ''
    );
    setbranchNo(
      !loading && dataContact.length > 0
        ? dataContact[itemSelected].branchNo
        : ''
    );
    setiban(
      !loading && dataContact.length > 0 ? dataContact[itemSelected].iban : ''
    );
    setbnkEmpCode(
      !loading && dataContact.length > 0
        ? dataContact[itemSelected].bnkEmpCode
        : ''
    );
    setswiftCode(
      !loading && dataContact.length > 0
        ? dataContact[itemSelected].swiftCode
        : ''
    );
    setbankId(
      !loading && dataContact.length > 0
        ? {
            id: dataContact[itemSelected].bankId,
            name: dataContact[itemSelected].name,
          }
        : { id: 0, name: '' }
    );
  }, [itemSelected]);

  const anchorTable = [
    {
      name: 'id',
      label: 'code',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'EmpBankId',
      label: 'code',
      type: 'text',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'elementName',
      label: 'govname',
      // type: 'selection',
      type: 'text',
      initialValue: '',
      // options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'elementId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'currencyName',
      label: 'city',
      // type: 'selection',
      initialValue: '',
      // options: [],
      width: 'auto',
      hidden: false,
    },

    {
      name: 'currencyId',
      label: 'id',
      type: 'text',
      width: 'auto',
      initialValue: '',
      hidden: true,
    },

    {
      name: 'edited',
      label: '',
      type: 'static',
      initialValue: '',
      hidden: true,
    },
    {
      name: 'action',
      label: 'action',
      type: 'static',
      initialValue: '',
      hidden: false,
    },
  ];

  //const [anchorElOpt, setAnchorElOpt] = useState(null);
  //   const handleClickOpt = (event) => setAnchorElOpt(event.currentTarget);
  //   const handleCloseOpt = () => setAnchorElOpt(null);
  const deleteContact = (item) => {
    // remove(item);
    // setAnchorElOpt(null);
  };
  return (
    <main
      className={cx(
        classes.content,
        showMobileDetail ? classes.detailPopup : ''
      )}
    >
      <section className={classes.cover}>
        <div className={classes.opt}>
          <IconButton
            aria-label="Edit"
            onClick={() => edit(dataContact[itemSelected])}
            size="large"
          >
            <Edit />
          </IconButton>
        </div>

        <Hidden smDown>
          {!loading && dataContact.length > 0 ? (
            <Fragment>
              <Avatar
                alt={dataContact[itemSelected].name}
                src={dataContact[itemSelected].avatar}
                className={classes.avatar}
              />
              <Typography className={classes.userName} variant="h6">
                {dataContact[itemSelected].name}
                <div>
                  <Typography variant="caption">
                    {dataContact[itemSelected].bankBranchNo}
                  </Typography>
                </div>
              </Typography>
            </Fragment>
          ) : (
            <div className={classes.placeLoaderCover}>
              <PlaceLoader loop={1} />
            </div>
          )}
        </Hidden>
      </section>
      <div>
        <Hidden smUp>
          {!loading && dataContact.length > 0 ? (
            <div className={classes.avatarTop}>
              <Avatar
                alt={dataContact[itemSelected].name}
                src={dataContact[itemSelected].avatar}
                className={classes.avatar}
              />
              <Typography variant="h5">
                {dataContact[itemSelected].name}
                <Typography>{dataContact[itemSelected].title}</Typography>
              </Typography>
            </div>
          ) : (
            <div className={classes.placeLoaderCover}>
              <PlaceLoader loop={1} />
            </div>
          )}
        </Hidden>

        {dataContact.length > 0 && (
          <div className={classes.detailContact}>
            <form>
              <section className={css.bodyForm}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <Autocomplete
                      className={classes.autocomplete}
                      id="ddlBnk"
                      options={bnkList}
                      value={{ id: bankId.id, name: bankId.name }}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ''
                      }
                      onChange={(event, value) => {
                        debugger;
                        if (value !== null) {
                          setbankId((prevFilters) => ({
                            ...prevFilters,
                            id: value.id,
                            name: value.name,
                          }));
                        } else {
                          setbankId((prevFilters) => ({
                            ...prevFilters,
                            id: 0,
                            name: '',
                          }));
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          variant="standard"
                          {...params}
                          name="element"
                          label={intl.formatMessage(messages.title)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      className={classes.field}
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.address)}
                      label={intl.formatMessage(messages.address)}
                      value={bnkAcc}
                      onChange={(e) => setbnkAcc(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="name"
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.name)}
                      label={intl.formatMessage(messages.name)}
                      // validate={required}
                      required
                      className={classes.field}
                      value={branchNo ?? '0'}
                      onChange={(e) => setbranchNo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="title"
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.title)}
                      label={intl.formatMessage(messages.title)}
                      className={classes.field}
                      value={bnkEmpCode ?? '0'}
                      onChange={(e) => setbnkEmpCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="phone"
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.phone)}
                      type="tel"
                      label={intl.formatMessage(messages.phone)}
                      className={classes.field}
                      value={iban ?? '0'}
                      onChange={(e) => setiban(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="secondaryPhone"
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.secondary_phone)}
                      type="tel"
                      label={intl.formatMessage(messages.secondary_phone)}
                      className={classes.field}
                      value={swiftCode ?? '0'}
                      onChange={(e) => setswiftCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}></Grid>
                  <EditTable
                    anchorTable={anchorTable}
                    title={id.toString()}
                    API={EmployeeBankElementData(id)}
                  />
                </Grid>
              </section>

              <div className={css.buttonArea}>
                <p>
                  Once you submit, its mean you have agreed with our &nbsp;
                  <a href="/terms-conditions" target="_blank">
                    terms &amp; conditions
                  </a>
                </p>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    // disabled={submitting || processing}
                  >
                    <FormattedMessage {...messages.submit} />
                  </Button>
                  <Button
                    type="button"
                    //  disabled={pristine || submitting}
                    onClick={() => reset()}
                  >
                    <FormattedMessage {...messages.reset} />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

ContactDetail.propTypes = {
  showMobileDetail: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  dataContact: PropTypes.array.isRequired,
  itemSelected: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  // hideDetail: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

ContactDetail.defaultProps = {
  loading: false,
};

export default injectIntl(ContactDetail);
