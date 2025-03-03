import React, { useState,useRef } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import XLSX from 'xlsx-js-style';
import { formateDate } from '../../../containers/Pages/Payroll/helpers';
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
import {FormattedMessage, injectIntl } from 'react-intl';

import AlertPopup from "../../../containers/Pages/Payroll/Component/AlertPopup";
import Payrollmessages from '../../../containers/Pages/Payroll/messages';

function MainTable(props) {

  const childRef = useRef();

  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const { classes, cx } = useStyles();
  const { items, anchor, downloadExcel, title, setIsLoading, API, intl,IsNotSave ,isNotAdd,addBtnLock} = props;

  const branch = 'crudTableDemo';
  const [search, setsearch] = useState('');
  const addEmptyRow = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  console.log('MainTable');
  const getItems = (dataArray) =>IsNotSave?dataArray
  .map((item) => (
    <Row anchor={anchor} item={item} key={item.id} API={API} IsNotSave={IsNotSave} isNotAdd={isNotAdd} handleClickOpen={handleClickOpen} ref={childRef} setIsLoading={setIsLoading} />
  )):dataArray
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  .map((item) => (
    <Row anchor={anchor} item={item} key={item.id} API={API} IsNotSave={IsNotSave} isNotAdd={isNotAdd} handleClickOpen={handleClickOpen} ref={childRef} setIsLoading={setIsLoading}   />
  ));
  
  const getData = () => {
    if (search.length !== 0) {
      return items.filter((item) =>
        Object.keys(item).some((key) => {
          const value = item[key];
          return value != null && value.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      return items;
    }
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



  const handleClickOpen = (item) => {
    setOpenParentPopup(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  const onExcelExportClick = () => {
    const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

    const documentTitle = `${title || 'Export'} ${today}`;

    const visibleColumns = anchor
      .filter(item => !item.hidden && item.name !== 'action')
      .map(item => ({ ...item, label: intl.formatMessage(messages[item.label]) }));

    const sheetData = items.map(row => {
      const rowData = {};

      visibleColumns.forEach((col) => {
        if (col?.options?.download !== false && col.label) {
          rowData[col.label] = row[col.name];
        }
      });

      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    const downloadURI = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', downloadURI);
    link.setAttribute('download', documentTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadURI);
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
          <Stack direction="row" spacing={2}>

            {downloadExcel !== false && (
              <Tooltip
                placement='bottom'
                title={intl.formatMessage(Payrollmessages.downloadExcel)}
              >
                <IconButton onClick={onExcelExportClick}>
                  <BackupTableIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Tooltip>
            )}

          {(isNotAdd)?'':
          <Tooltip title="Add Item">
            <Button
              variant="contained"
              onClick={() => addEmptyRow(addAction(anchor, branch))}
              color="secondary"
              className={classes.button}
              disabled={addBtnLock}
            >
              <AddIcon
                className={cx(smUp && classes.leftIcon, classes.iconSmall)}
              />
              {smUp && ' '} <FormattedMessage {...messages.add} />
            </Button>
          </Tooltip>}
          </Stack>
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
          rowsPerPageOptions={[20, 40, 60, 80]}
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

      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(Payrollmessages.deleteMessage)}`}
        callFun={()=> childRef?.current?.eventDel(deleteItem)}
      />
    </div>
  );
}

MainTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  anchor: PropTypes.array.isRequired,
  // intl: PropTypes.object.isRequired,
};

export default injectIntl(MainTable);
