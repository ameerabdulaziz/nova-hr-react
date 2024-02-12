import { Print } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
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
import useStyles from '../Style';
import { formateDate } from '../helpers';
import payrollMessages from '../messages';
import AlertPopup from './AlertPopup';
import PayRollLoader from './PayRollLoader';
import PrintableTable from './PayrollTable/PrintableTable';

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

  const company = useSelector((state) => state.authReducer.companyInfo);

  const printContainerRef = useRef(null);

  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

  const documentTitle = `${title || menuName || 'Report'} ${today}`;

  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [filterData, setFilterData] = useState(data);
  const [filterColumns, setFilterColumns] = useState(columns);
  const [columnsVisibility, setColumnsVisibility] = useState([]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  useEffect(() => {
    const mappedColumns = columns.map((item) => ({
      ...item,
      options: {
        ...item?.options,
        viewColumns: item?.options?.viewColumns ?? Boolean(item.name),
      },
      isColumnVisible: true,
    }));

    setFilterColumns(mappedColumns);
    setColumnsVisibility(mappedColumns);
  }, [columns]);

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
    if (menu.isAdd) {
      history.push(actions?.add?.url);
    }
  };

  const onEditActionBtnClick = (id) => {
    if (menu.isUpdate) {
      history.push(actions?.edit?.url, {
        id,
      });
    }
  };

  const onDeleteActionBtnClick = (id) => {
    if (menu.isDelete) {
      setDeletedId(id);
      setIsDeletePopupOpen(true);
    }
  };

  const customToolbar = useCallback(
    () => (
      <>
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
            disabled={!menu.isAdd}
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
    ),
    [options, isPrintLoading]
  );

  const tableOptions = useMemo(
    () => ({
      filterType: 'dropdown',
      responsive: 'vertical',
      print: false,
      rowsPerPage: 50,
      rowsPerPageOptions: [10, 50, 100],
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
      onDownload: (buildHead, buildBody, cols, rows) => '\uFEFF' + buildHead(cols) + buildBody(rows),
      ...options,
      onFilterChange: (
        changedColumn,
        filterList,
        type,
        changedColumnIndex,
        displayData
      ) => {
        setFilterData(displayData.map((item) => data[item.dataIndex]));
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
              <Stack direction='row' spacing={2}>
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
      <AlertPopup
        handleClose={() => {
          setIsDeletePopupOpen(false);
        }}
        open={isDeletePopupOpen}
        messageData={intl.formatMessage(payrollMessages.deleteMessage)}
        callFun={() => actions?.delete?.api(deletedId)}
      />

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

        <PrintableTable
          columns={tableColumns.filter(
            (_, index) => columnsVisibility[index]?.isColumnVisible
          )}
          rows={filterData}
        />
      </Box>

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
