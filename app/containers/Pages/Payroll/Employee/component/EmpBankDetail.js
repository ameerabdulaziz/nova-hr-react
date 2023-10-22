import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import avatarApi from 'enl-api/images/avatars';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
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
import messages from '../messages';
import useStyles from './EmpBank-jss';
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
import EmployeeBankElement from '../Code/EmployeeBankElement';
import { data } from 'autoprefixer';
//import Apidata from '../api/EmployeeBankData';
import Apidata from '../api/contactData';
import { toast } from 'react-hot-toast';
import notif from 'enl-api/ui/notifMessage';
import { useSelector } from 'react-redux';
const ITEM_HEIGHT = 48;

function EmpBankDetail(props) {
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
    employeeId,
    //processing,
  } = props;
  // const ref = useRef(null);
  const locale = useSelector((state) => state.language.locale);
  
  const { classes, cx } = useStyles();
  //const [bnkList, setbnkList] = useState([]);

  const [id, setid] = useState(
    dataContact && dataContact.length > 0 && itemSelected >= 0
      ? dataContact[0].key
      : 0
  );
  const [name, setname] = useState('');
  const [avtr, setavtr] = useState(avatarApi[11]);
  //const [employeeId, setemployeeId] = useState();
  const [bankId, setbankId] = useState({ id: 0, name: '' });

  const [bnkAcc, setbnkAcc] = useState('');
  // );

  const [branchNo, setbranchNo] = useState(
    !loading && dataContact.length > 0 && itemSelected >= 0
      ? dataContact[itemSelected].bankBranchNo
      : ''
  );
  const [iban, setiban] = useState(
    !loading && dataContact.length > 0 && itemSelected >= 0
      ? dataContact[itemSelected].iban
      : ''
  );
  const [bnkEmpCode, setbnkEmpCode] = useState(
    !loading && dataContact.length > 0 && itemSelected >= 0
      ? dataContact[itemSelected].bnkEmpCode
      : ''
  );
  const [swiftCode, setswiftCode] = useState(
    !loading && dataContact.length > 0 && itemSelected >= 0
      ? dataContact[itemSelected].swiftCode
      : ''
  );
  const dataTable = useSelector((state) => state.crudTableDemo.dataTable);

  useEffect(() => {
    setid(
      dataContact && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].key
        : 0
    );

    setname(
      dataContact && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].name
        : ''
    );
    setavtr(
      dataContact && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].avatar
        : avatarApi[11]
    );
    setbnkAcc(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].bnkAcc
        : ''
    );
    setbranchNo(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].bankBranchNo
        : ''
    );
    setiban(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].iban
        : ''
    );
    setbnkEmpCode(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].bnkEmpCode
        : ''
    );
    setswiftCode(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? dataContact[itemSelected].swiftCode
        : ''
    );
    setbankId(
      !loading && dataContact.length > 0 && itemSelected >= 0
        ? {
            id: dataContact[itemSelected].bankId,
            name: dataContact[itemSelected].name,
          }
        : { id: 0, name: '' }
    );
  }, [itemSelected]);

  //const [anchorElOpt, setAnchorElOpt] = useState(null);
  //   const handleClickOpt = (event) => setAnchorElOpt(event.currentTarget);
  //   const handleCloseOpt = () => setAnchorElOpt(null);
  const deletedata = async (e) => {
    try {
      
      const dataApi = await Apidata().Delete(id);
      if (dataApi.status == 200) {
        toast.error(notif.removed);
      } else {
        toast.error(dataApi.statusText);
      }
    } catch (err) {
    }
  };
  const addContact = (item) => {
    setid(0);
    setbnkAcc('');
    setbranchNo('');
    setiban('');
    setbnkEmpCode('');
    setswiftCode('');
    setbankId({ id: 0, name: '' });
    setavtr(avatarApi[11]);
    setname('');
  };
  async function on_submit() {
    try {
      
      if (dataTable.length == 0) {
        toast.error('ُEnter Details data');
        return;
      }
      const data = {
        id: id,
        employeeId: employeeId,
        bankId: bankId.id,
        bankBranchNo: branchNo,
        iban: iban,
        bnkEmpCode: bnkEmpCode,
        bankName: bankId.name,
        swiftCode: swiftCode,
      };

      let response = await Apidata(locale).SaveData(data, dataTable);

      if (response.status == 200) {
        toast.success(notif.saved);
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
    }
  }
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
            color="secondary"
            aria-label="Edit"
            onClick={() => deletedata()}
            size="large"
            className={classes.EditBtn}
          >
            <Delete />
          </IconButton>
        </div>

        <Hidden smDown>
          {!loading && dataContact.length > 0 ? (
            <Fragment>
              <Avatar alt={name} src={avtr} className={classes.avatar} />
              <Typography className={classes.userName} variant="h6">
                {name}
                <div>
                  <Typography variant="caption">{branchNo}</Typography>
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
              <Avatar alt={name} src={avtr} className={classes.avatar} />
              <Typography variant="h5">
                {name}
                <Typography>{bnkAcc}</Typography>
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
                        
                          setbankId((prevFilters) => ({
                            ...prevFilters,
                            id: value !== null?value.id:0,
                            name: value !== null?value.name:'',
                          }));
                        
                      }}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          variant="standard"
                          {...params}
                          name="bank"
                          label="Bank" //{intl.formatMessage(messages.bank)}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      className={classes.field}
                      // component={TextFieldRedux}
                      placeholder="bnkAcc" //{intl.formatMessage(messages.bnkAcc)}
                      label="bnkAcc" //{intl.formatMessage(messages.bnkAcc)}
                      value={bnkAcc}
                      onChange={(e) => setbnkAcc(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="name"
                      // component={TextFieldRedux}
                      placeholder="branchNo" //{intl.formatMessage(messages.branchNo)}
                      label="branchNo" //{intl.formatMessage(messages.branchNo)}
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
                      placeholder="bnkEmpCode" //{intl.formatMessage(messages.bnkEmpCode)}
                      label="bnkEmpCode" //{intl.formatMessage(messages.bnkEmpCode)}
                      className={classes.field}
                      value={bnkEmpCode ?? '0'}
                      onChange={(e) => setbnkEmpCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="phone"
                      // component={TextFieldRedux}
                      placeholder="iban" //{intl.formatMessage(messages.iban)}
                      // type="tel"
                      label="iban" //{intl.formatMessage(messages.iban)}
                      className={classes.field}
                      value={iban ?? '0'}
                      onChange={(e) => setiban(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      name="secondaryPhone"
                      // component={TextFieldRedux}
                      placeholder={intl.formatMessage(messages.swiftCode)}
                      type="tel"
                      label={intl.formatMessage(messages.swiftCode)}
                      className={classes.field}
                      value={swiftCode ?? '0'}
                      onChange={(e) => setswiftCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}></Grid>

                  <EmployeeBankElement ids={id} />
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
                    onClick={on_submit}

                    // disabled={submitting || processing}
                  >
                    SUBMITT
                  </Button>
                  <Button
                    type="button"
                    //  disabled={pristine || submitting}
                    onClick={() => reset()}
                  ></Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

EmpBankDetail.propTypes = {
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

EmpBankDetail.defaultProps = {
  loading: false,
};

export default injectIntl(EmpBankDetail);
