import { Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import XLSX from 'xlsx-js-style';
import useStyles from '../Style';
import { formateDate } from '../helpers';
import payrollMessages from '../messages';
import AlertPopup from './AlertPopup';
import PayRollLoader from './PayRollLoader';
import PrintableTable from './PayrollTable/PrintableTable';

// Determine if render loader of just table without loader
function Loader(props) {
  const { isLoading, children, showLoader } = props;

  if (showLoader) {
    return <PayRollLoader isLoading={isLoading}>{children}</PayRollLoader>;
  }

  return children;
}

function PayrollTable(props) {
  const {
    intl,
    isLoading,
    data,
    options,
    columns,
    showLoader,
    title,
    actions,
  } = props;
  const { classes } = useStyles();
  const history = useHistory();

  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;
  const menuName = localStorage.getItem('MenuName');

  // Company info for employee
  const company = useSelector((state) => state.authReducer.companyInfo);

  // Ref for print container
  const printContainerRef = useRef(null);

  // Store selected rows
  const [rowsSelected, setRowsSelected] = useState([]);

  // Today's formatted date
  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  // Document title for printing & export
  const documentTitle = `${title || menuName || 'Report'} ${today}`;

  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Table state
  const [filterData, setFilterData] = useState(data);
  const [filterColumns, setFilterColumns] = useState(columns);
  const [columnsVisibility, setColumnsVisibility] = useState([]);

  const getDateColumnOptions = (item) => {
    const isNameIncludeDate = item?.name?.toLowerCase()?.endsWith('date');

    if (isNameIncludeDate) {
      return {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
        filterType: 'custom',
        customFilterListOptions: {
          // Get filter label depend on value (min & max or min or max)
          render: (filterValue) => {
            const minDateLabel = intl.formatMessage(payrollMessages.minDate);
            const maxDateLabel = intl.formatMessage(payrollMessages.maxDate);

            // min & max filter label
            if (filterValue[0] && filterValue[1]) {
              return `${item.label} - ${minDateLabel}: ${filterValue[0]}, ${maxDateLabel}: ${filterValue[1]}`;
            }

            // min filter label
            if (filterValue[0]) {
              return `${item.label} - ${minDateLabel}: ${filterValue[0]}`;
            }

            // max filter label
            if (filterValue[1]) {
              return `${item.label} - ${maxDateLabel}: ${filterValue[1]}`;
            }

            return [];
          },
        },
        filterOptions: {
          names: [],
          // logic for date calculation
          logic(date, filters) {
            // column date
            const date1 = new Date(date);

            // has min & max date
            if (filters[0]) {
              const minDate = new Date(filters[0]);
              const maxDate = new Date(filters[1]);

              if (date1 >= minDate && date1 <= maxDate) {
                return false;
              }
              return true;
            }

            // has min date only
            if (filters[0]) {
              const minDate = new Date(filters[0]);
              if (date1 >= minDate) {
                return false;
              }
              return true;
            }

            // has max date only
            if (filters[1]) {
              const maxDate = new Date(filters[1]);
              if (date1 <= maxDate) {
                return false;
              }
              return true;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <>
              <Typography variant='subtitle1' color='gray' mb={1}>
                {column.label}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      value={
                        filterList[index][0]
                          ? dayjs(filterList[index][0])
                          : null
                      }
                      onChange={(date) => {
                        if (new Date(date).toString() !== 'Invalid Date') {
                          filterList[index][0] = formateDate(date);
                          onChange(filterList[index], index, column);
                        }
                      }}
                      label={intl.formatMessage(payrollMessages.minDate)}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={
                        filterList[index][1]
                          ? dayjs(filterList[index][1])
                          : null
                      }
                      onChange={(date) => {
                        if (new Date(date).toString() !== 'Invalid Date') {
                          filterList[index][1] = formateDate(date);
                          onChange(filterList[index], index, column);
                        }
                      }}
                      label={intl.formatMessage(payrollMessages.maxDate)}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </>
          ),
        },
      };
    }
    return {};
  };

  // useEffect to update filtered data when data prop changes
  useEffect(() => {
    setFilterData(data);

    // Reset selected rows when data prop changes
    setRowsSelected([]);
  }, [data]);

  const wrapValueInPre = (value, options) => {
    if (options?.noWrap) {
      return value;
    }

    return <pre>{value}</pre>;
  };

  // useEffect to initialize columns and column visibility settings
  useEffect(() => {
    const mappedColumns = columns.map((item) => ({
      ...item,
      options: {
        viewColumns: item?.options?.viewColumns ?? Boolean(item.name),

        // Make sure every column wrap with <pre>
        customBodyRender: (value) => wrapValueInPre(value, item?.options),

        // Ensure that boolean value are shown
        customFilterListOptions: {
          render: (value) => `${item.label} - ${String(value)}`,
        },
        ...getDateColumnOptions(item),
        ...item?.options,
      },
      isColumnVisible: true,
    }));

    setFilterColumns(mappedColumns);
    setColumnsVisibility(mappedColumns);
  }, [columns]);

  // useReactToPrint hook for printing functionality
  const printJS = useReactToPrint({
    documentTitle,
    content: () => printContainerRef?.current,
    onBeforeGetContent: () => {
      setIsPrintLoading(true);
    },
    onAfterPrint: () => {
      setIsPrintLoading(false);
    },
    onPrintError: () => {
      setIsPrintLoading(false);
    },
  });

  const onPrintClick = async () => {
    printJS();
  };

  const onAddActionBtnClick = () => {
    // Check is employee has create permission
    if (menu.isAdd) {
      history.push(actions?.add?.url, {
        ...(actions?.add?.params || {}),
      });
    }
  };

  const onEditActionBtnClick = (id) => {
    // Check is employee has update permission
    if (menu.isUpdate) {
      history.push(actions?.edit?.url, {
        id,
        ...(actions?.edit?.params || {}),
      });
    }
  };

  const onDeleteActionBtnClick = (id) => {
    // Check is employee has delete permission
    if (menu.isDelete) {
      setDeletedId(id);
      setIsDeletePopupOpen(true);

      // Reset selected rows
      setRowsSelected([]);
    }
  };

  // Export excel function
  const onExcelExportClick = useCallback(() => {
    // Visible columns
    const cols = filterColumns.filter(
      (_, index) => columnsVisibility[index]?.isColumnVisible
    );

    // Table data base on visible columns
    const sheetData = filterData
      .filter((item) => item?.header !== true)
      .map((row) => {
        const rowData = {};

        cols.forEach((col) => {
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

    // Create dummy "a" link to download the file
    const link = document.createElement('a');
    link.setAttribute('href', downloadURI);
    link.setAttribute('download', documentTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadURI);
  }, [filterData, filterColumns, columnsVisibility]);

  // Custom toolbar for table (contain: download, print, add button)
  const customToolbar = useCallback(() => {
    let isAddBtnDisabled = !menu.isAdd;

    if (typeof actions?.add?.disabled === 'boolean') {
      isAddBtnDisabled = actions?.add?.disabled;
    } else if (typeof actions?.add?.disabled === 'function') {
      isAddBtnDisabled = actions?.add?.disabled();
    }

    return (
      <>
        {options.download !== false && (
          <Tooltip
            placement='bottom'
            title={intl.formatMessage(payrollMessages.downloadExcel)}
          >
            <IconButton onClick={onExcelExportClick}>
              <BackupTableIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Tooltip>
        )}

        {options.print !== false && (
          <Tooltip
            placement='bottom'
            title={intl.formatMessage(payrollMessages.Print)}
          >
            <IconButton onClick={onPrintClick}>
              {isPrintLoading ? (
                <CircularProgress size={15} />
              ) : (
                <Print sx={{ fontSize: '1.2rem' }} />
              )}
            </IconButton>
          </Tooltip>
        )}

        {actions.add && (
          <Button
            disabled={isAddBtnDisabled}
            variant='contained'
            onClick={onAddActionBtnClick}
            color='primary'
            startIcon={<AddIcon />}
          >
            {intl.formatMessage(payrollMessages.add)}
          </Button>
        )}

        {options.customToolbar && options.customToolbar()}
      </>
    );
  }, [options, isPrintLoading, filterData, actions]);

  // Memoize default table options
  const tableOptions = useMemo(
    () => ({
      filterType: 'dropdown',
      responsive: 'vertical',
      print: false,
      rowsPerPage: 50,
      // Initial selected rows
      rowsSelected,
      onRowSelectionChange: (rows, allRows) => {
        // Set selected rows
        setRowsSelected(allRows.map((row) => row.dataIndex));
      },
      rowsPerPageOptions: [10, 50, 100],
      // Download options for csv (only visible columns)
      downloadOptions: {
        filename: `${documentTitle}.csv`,
        filterOptions: {
          useDisplayedRowsOnly: true,
          useDisplayedColumnsOnly: true,
        },
      },
      page: 0,
      selectableRows: 'none',
      searchOpen: false,
      // Translation for table
      textLabels: {
        body: {
          noMatch: isLoading
            ? intl.formatMessage(payrollMessages.loading)
            : intl.formatMessage(payrollMessages.noMatchingRecord),
          toolTip: intl.formatMessage(payrollMessages.sort),
        },
        pagination: {
          next: intl.formatMessage(payrollMessages.nextPage),
          previous: intl.formatMessage(payrollMessages.previousPage),
          rowsPerPage: intl.formatMessage(payrollMessages.rowsPerPage),
          displayRows: intl.formatMessage(payrollMessages.of),
        },
        toolbar: {
          search: intl.formatMessage(payrollMessages.search),
          downloadCsv: intl.formatMessage(payrollMessages.downloadCSV),
          print: intl.formatMessage(payrollMessages.Print),
          viewColumns: intl.formatMessage(payrollMessages.viewColumns),
          filterTable: intl.formatMessage(payrollMessages.filterTable),
        },
        filter: {
          all: intl.formatMessage(payrollMessages.all),
          title: intl.formatMessage(payrollMessages.filters),
          reset: intl.formatMessage(payrollMessages.reset),
        },
        viewColumns: {
          title: intl.formatMessage(payrollMessages.showColumns),
          titleAria: intl.formatMessage(payrollMessages.showHideTableColumns),
        },
        selectedRows: {
          text: intl.formatMessage(payrollMessages.rowSelected),
          delete: intl.formatMessage(payrollMessages.delete),
          deleteAria: intl.formatMessage(payrollMessages.deleteSelectedRows),
        },
      },
      // Add arabic unicode for excel
      onDownload: (buildHead, buildBody, cols, rows) => {
        console.log(cols, rows, filterData);
        const realRows = [];

        filterData.forEach((item, index) => {
          if (item?.header !== true) {
            realRows.push(rows[index]);
          }
        });

        console.log(realRows);
        return '\uFEFF' + buildHead(cols) + buildBody(realRows);
      },
      ...options,
      // Save filtered rows for export & print
      onFilterChange: (
        changedColumn,
        filterList,
        type,
        changedColumnIndex,
        displayData
      ) => {
        if (displayData) {
          setFilterData(displayData.map((item) => data[item.dataIndex]));
        }

        if (options.onFilterChange) {
          options.onFilterChange(
            changedColumn,
            filterList,
            type,
            changedColumnIndex,
            displayData
          );
        }
      },
      // Add column visibility control
      onViewColumnsChange: (changedColumn, action) => {
        const clonedColumns = [...columnsVisibility];
        const index = clonedColumns.findIndex(
          (item) => item.name === changedColumn
        );

        if (index !== -1) {
          if (action === 'remove') {
            clonedColumns[index].isColumnVisible = false;
          } else {
            clonedColumns[index].isColumnVisible = true;
          }
        }

        setColumnsVisibility(clonedColumns);
        if (options.onViewColumnsChange) {
          options.onViewColumnsChange(changedColumn, action);
        }
      },
      customToolbar,
    }),
    [options, columns, customToolbar, isLoading]
  );

  // Memoize table columns and actions (add, edit, delete) based on actions props
  const tableColumns = useMemo(
    () => [
      ...filterColumns,
      {
        name: 'actions',
        label: intl.formatMessage(payrollMessages.Actions),
        options: {
          print: false,
          display: Boolean(actions?.edit?.url || actions?.delete?.api),
          download: false,
          viewColumns: false,
          filter: false,
          customBodyRender: (_, tableMeta) => {
            let isDeleteBtnDisabled = !menu.isDelete;

            if (typeof actions?.delete?.disabled === 'boolean') {
              isDeleteBtnDisabled = actions?.delete?.disabled;
            } else if (typeof actions?.delete?.disabled === 'function') {
              isDeleteBtnDisabled = actions?.delete?.disabled(
                tableMeta.rowData
              );
            }

            let isEditBtnDisabled = !menu.isUpdate;

            if (typeof actions?.edit?.disabled === 'boolean') {
              isEditBtnDisabled = actions?.edit?.disabled;
            } else if (typeof actions?.edit?.disabled === 'function') {
              isEditBtnDisabled = actions?.edit?.disabled(tableMeta.rowData);
            }

            return (
              <Stack direction='row' spacing={1}>
                {actions?.extraActions && actions?.extraActions(tableMeta.rowData)}

                {actions?.edit && (
                  <Tooltip
                    placement='bottom'
                    title={intl.formatMessage(payrollMessages.edit)}
                  >
                    <span>
                      <IconButton
                        color='primary'
                        disabled={isEditBtnDisabled}
                        onClick={() => onEditActionBtnClick(tableMeta.rowData[0])
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}

                {actions?.delete && (
                  <Tooltip
                    placement='bottom'
                    title={intl.formatMessage(payrollMessages.delete)}
                  >
                    <span>
                      <IconButton
                        color='error'
                        disabled={isDeleteBtnDisabled}
                        onClick={() => onDeleteActionBtnClick(tableMeta.rowData[0])
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Stack>
            );
          },
        },
      },
    ],
    [filterColumns, actions]
  );

  return (
    <Loader isLoading={isLoading} showLoader={showLoader}>
      {/* Delete popup confirmation */}
      <AlertPopup
        handleClose={() => {
          setIsDeletePopupOpen(false);
        }}
        open={isDeletePopupOpen}
        messageData={intl.formatMessage(payrollMessages.deleteMessage)}
        callFun={() => actions?.delete?.api(deletedId)}
      />

      {/* Pdf container */}
      <Box
        ref={printContainerRef}
        sx={{
          display: 'none',
          pageBreakBefore: 'always',
          direction: 'ltr',
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root, .MuiTableCell-root': {
            fontSize: '7px',
            color: '#000',
          },
          '@page': {
            margin: 4,
          },
          svg: {
            fontSize: '0.7rem',
          },
        }}
      >
        {/* Pdf Header with company logo */}
        <Stack
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography fontWeight='bold' variant='subtitle1'>
            {menuName}
          </Typography>

          <img src={company?.logo} alt='' height={45} />
        </Stack>

        {/* Table pdf */}
        <PrintableTable
          columns={tableColumns.filter(
            (_, index) => columnsVisibility[index]?.isColumnVisible
          )}
          rows={filterData}
        />
      </Box>

      {/* Main table */}
      <div className={classes.CustomMUIDataTable}>
        <MUIDataTable
          title={title}
          data={data}
          columns={tableColumns}
          options={tableOptions}
        />
      </div>
    </Loader>
  );
}

PayrollTable.propTypes = {
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  showLoader: PropTypes.bool,
  title: PropTypes.string,
  actions: PropTypes.object,
};

PayrollTable.defaultProps = {
  isLoading: false,
  options: {},
  data: [],
  columns: [],
  actions: {},
  showLoader: false,
  title: '',
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  showLoader: PropTypes.bool.isRequired,
};

export default memo(injectIntl(PayrollTable));
