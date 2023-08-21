import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import css from 'enl-styles/Table.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import Row from './Row';
import useStyles from '../tableStyle-jss';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { TablePagination, Pagination } from '@mui/material';
import { addAction } from '../../../containers/Tables/reducers/crudTbActions';
import { useDispatch } from 'react-redux';
import messages from '../messages';
import {FormattedMessage } from 'react-intl';

function MainTable(props) {
  const { classes, cx } = useStyles();
  const { items, anchor, title, API, intl,IsNotSave ,isNotAdd} = props;

  const branch = 'crudTableDemo';
  const [search, setsearch] = useState('');
  const addEmptyRow = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  console.log('MainTable');
  const getItems = (dataArray) =>IsNotSave?dataArray
  .map((item) => (
    <Row anchor={anchor} item={item} key={item.id} API={API} IsNotSave={IsNotSave} isNotAdd={isNotAdd} />
  )):dataArray
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((item) => (
    <Row anchor={anchor} item={item} key={item.id} API={API} IsNotSave={IsNotSave} isNotAdd={isNotAdd}  />
  ));
  
  const getData = () => {
    debugger;
    if (search.length !== 0)
      return items.filter((item) =>
        Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    else return items;
  };
  const getHead = (dataArray) =>
    dataArray.map((item, index) => {
      if (!item.hidden) {
        
        return (
          <TableCell padding="none" key={index.toString()} width={item.width}>
            <FormattedMessage {...messages[item.label]} />
          </TableCell>
        );
      }
      return false;
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          {/* <Typography variant="h6">{title}</Typography> */}

          <FormControl variant="standard" className={cx(classes.textField)}>
            <Input
              id="search_filter"
              type="text"
              onChange={(e) => setsearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Search filter" size="large">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {(isNotAdd)?'':
          <Tooltip title="Add Item">
            <Button
              variant="contained"
              onClick={() => addEmptyRow(addAction(anchor, branch))}
              color="secondary"
              className={classes.button}
            >
              <AddIcon
                className={cx(smUp && classes.leftIcon, classes.iconSmall)}
              />
              {smUp && ' '} <FormattedMessage {...messages.add} />
            </Button>
          </Tooltip>}
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>{getHead(anchor)}</TableRow>
          </TableHead>
          <TableBody>{getItems(getData())}</TableBody>
        </Table>
        {!IsNotSave?
        <TablePagination
          component="div"
          size="xlarge"
          count={items.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20]}
          sx={{
            justifyContent: 'center',
            // ml: 10,
          }}
        />:''
        }
        {/*   <Pagination
                  sx={{
                    justifyContent: "center",
                    ml: 10,
                    mt: 1,
                  }}
                  component="div"
                  count={Math.ceil(items.length / rowsPerPage)}
                  size="xlarge"
                  onChange={(event, newPage) => {
                    // if (event.target.type){
                    newPage--;
                    // }
                    handleChangePage(event, newPage);
                  }}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                  page={page + 1}
                /> */}
      </div>
    </div>
  );
}

MainTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  anchor: PropTypes.array.isRequired,
  // intl: PropTypes.object.isRequired,
};

export default MainTable;
