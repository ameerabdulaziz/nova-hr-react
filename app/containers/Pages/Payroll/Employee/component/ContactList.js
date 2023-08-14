import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import Add from '@mui/icons-material/Add';
import Star from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';
import PlaceLoader from './PlaceLoader';
import useStyles from './contact-jss';
import {
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  Input,
} from '@mui/material';
//allbank
function ContactList(props) {
  const { classes, cx } = useStyles();
  const {
    dataContact,
    itemSelected,
    showDetail,
    search,
    keyword,
    clippedRight,
    addContact,
    addFn,
    total,
    loading,
    intl,
  } = props;
  const [filter, setFilter] = useState('all');
  const handleChange = (event, value) => setFilter(value);

  // const favoriteData = dataContact.filter((item) => item.favorited === true);
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
          onClick={() => showDetail(data)}
        >
          <ListItemAvatar>
            <Avatar
              alt={data.name}
              src={data.avatar}
              className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText primary="data.name" secondary={data.title} />
        </ListItem>
      );
    });

  return (
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
                id="ddlBnk"
                // className={classes.compo}
                style={{ margintop: '-160px' }}
                options={null}
                //getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    //className={classes.searchWrapper}
                    variant="standard"
                    {...params}
                    name="bankId"
                    value={0}
                    label={intl.formatMessage(messages.title)}
                    margin="normal"
                  />
                )}
              />
            </div>
          </div>

          {loading ? (
            <PlaceLoader loop={6} />
          ) : (
            <List className={classes.contactList}>{getItem(dataContact)}</List>
          )}
        </div>
      </Drawer>
    </Fragment>
  );
}

ContactList.propTypes = {
  total: PropTypes.number.isRequired,
  dataContact: PropTypes.array.isRequired,
  keyword: PropTypes.string.isRequired,
  itemSelected: PropTypes.number.isRequired,
  addContact: PropTypes.func,
  addFn: PropTypes.bool,
  showDetail: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  clippedRight: PropTypes.bool,
  loading: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};

ContactList.defaultProps = {
  clippedRight: false,
  addContact: () => {},
  addFn: false,
  loading: false,
};

export default injectIntl(ContactList);
