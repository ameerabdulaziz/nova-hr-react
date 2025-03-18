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
import { useReactToPrint } from 'react-to-print';
import useStyles from '../Style';
import { formateDate } from '../helpers';
import payrollMessages from '../messages';
import AlertPopup from './AlertPopup';
import CustomToolbar from './PayrollTable/CustomToolbar';
import PayrollTableActions from './PayrollTable/PayrollTableActions';
import PayrollTableContext from './PayrollTable/PayrollTableContext';
import PayrollTableLoader from './PayrollTable/PayrollTableLoader';
import PdfContainer from './PayrollTable/pdf/PDFContainer';
import {
  exportExcel,
  getDefaultOptions,
  getTranslation,
  wrapInPre,
} from './PayrollTable/utils.payroll-table';

function SimplifiedPayrollTable(props) {
  const {
    intl,
    isLoading,
    data,
    options,
    columns,
    showLoader,
    title,
    actions,
    filterHighlights,
    filterHighlightsColumn,
    exportExcelAPI,
  } = props;
  const { classes } = useStyles();

  const stringMenu = localStorage.getItem('Menu');
  const menu = stringMenu ? JSON.parse(stringMenu) : null;
  const menuName = localStorage.getItem('MenuName');

  // Today's formatted date
  const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss') ?? '';

  // Document title for printing & export
  const documentTitle = `${title || menuName || 'Report'} ${today}`;

  // Store selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // const [isPrintLoading, setIsPrintLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Table state
  const [filterData, setFilterData] = useState(data);
  const [filterColumns, setFilterColumns] = useState(columns);
  const [columnsVisibility, setColumnsVisibility] = useState([]);

  // ----- Print ---------
  const [pdfData, setPdfData] = useState([]);
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const printContainerRef = useRef(null);

  const printJS = useReactToPrint({
    documentTitle,
    content: () => printContainerRef?.current,
    onBeforeGetContent: () => {
      setIsPrintLoading(true);
    },
    onAfterPrint: () => {
      setIsPrintLoading(false);
      setPdfData([]);
    },
    onPrintError: () => {
      setIsPrintLoading(false);
      setPdfData([]);
    },
  });

  useEffect(() => {
    if (pdfData.length > 0) {
      printJS();
    }
  }, [pdfData]);

  const onPrintClick = useCallback(() => {
    if (filterData.length > 0) {
      setIsPrintLoading(true);
    }
    setPdfData(filterData);
  }, [filterData]);

  const prepareColumns = () => {
    const initializedColumns = columns.map((item) => ({
      ...item,
      options: {
        viewColumns: item?.options?.viewColumns ?? Boolean(item.name),

        // Make sure every column wrap with <pre> tag except "noWrap" property
        customBodyRender: (value) => wrapInPre(value, item?.options),

        // Ensure that boolean value are shown
        customFilterListOptions: {
          render: (value) => `${item.label} - ${String(value)}`,
        },

        // Reset default options
        ...item?.options,
      },
      isColumnVisible: true,
    }));

    setFilterColumns(initializedColumns);
    setColumnsVisibility(initializedColumns);
  };

  // useEffect to update filtered data when data prop changes
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  // useEffect to initialize columns and column visibility settings
  useEffect(() => {
    prepareColumns();
  }, [columns]);

  const onDeleteActionBtnClick = (id) => {
    // Check is employee has delete permission
    if (menu?.isDelete) {
      setDeletedId(id);
      setIsDeletePopupOpen(true);
    }
  };

  const onDeleteConfirm = async () => {
    // Check is callback exist
    if (actions?.delete?.callback) {
      await actions.delete.callback(deletedId);

      setIsDeletePopupOpen(false);
      setDeletedId(null);

      // Reset selected rows
      setSelectedRows([]);
    }
  };

  const onExcelExportClick = useCallback(() => {
    if (exportExcelAPI && typeof exportExcelAPI === 'function') {
      exportExcelAPI();
      return;
    }

    // Visible columns
    const cols = filterColumns.filter(
      (_, index) => columnsVisibility[index]?.isColumnVisible
    );

    // Table data base on visible columns
    const sheetData = filterData.filter((item) => item?.header !== true);

    exportExcel(cols, sheetData, documentTitle);
  }, [filterData, filterColumns, columnsVisibility]);

  // Memoize default table options
  const tableOptions = useMemo(
    () => ({
      ...getDefaultOptions(documentTitle),

      // Translation for table
      textLabels: getTranslation(intl, payrollMessages, isLoading),

      // Add arabic unicode for excel
      onDownload: (buildHead, buildBody, cols, rows) => {
        const realRows = [];

        filterData.forEach((item, index) => {
          if (item?.header !== true) {
            realRows.push(rows[index]);
          }
        });

        return '\uFEFF' + buildHead(cols) + buildBody(realRows);
      },

      // Add remanding options
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
      // Custom toolbar for table (contain: download, print, add button)
      customToolbar: () => (
        <CustomToolbar
          options={options}
          actions={actions}
          isPrintLoading={isPrintLoading}
          onExcelExportClick={onExcelExportClick}
          onPrintClick={onPrintClick}
        />
      ),
    }),
    [
      intl,
      payrollMessages,
      options,
      filterData,
      actions,
      isPrintLoading,
      columns,
      isLoading,
      documentTitle,
      columnsVisibility,
    ]
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
          display: Boolean(
            actions?.edit?.url || actions?.delete?.api || actions?.extraActions
          ),
          download: false,
          viewColumns: false,
          filter: false,
          customBodyRender: (_, tableMeta) => (
            <PayrollTableActions
              data={data}
              actions={actions}
              tableMeta={tableMeta}
              onDeleteActionBtnClick={onDeleteActionBtnClick}
            />
          ),
        },
      },
    ],
    [filterColumns, actions, data]
  );

  const contextValue = useMemo(() => {
    const visibleColumns = tableColumns.filter(
      (_, index) => columnsVisibility[index]?.isColumnVisible
    );

    return {
      today,
      documentTitle,

      isLoading,

      selectedRows,

      data,
      filterData,

      pdfData,
      setPdfData,

      filterHighlights,
      filterHighlightsColumn,

      tableColumns,
      visibleColumns,
    };
  }, [props, filterData, pdfData]);

  return (
    <PayrollTableContext.Provider value={contextValue}>
      <PayrollTableLoader isLoading={isLoading} showLoader={showLoader}>
        {/* Delete popup confirmation */}
        <AlertPopup
          handleClose={() => {
            setIsDeletePopupOpen(false);
          }}
          open={isDeletePopupOpen}
          messageData={intl.formatMessage(payrollMessages.deleteMessage)}
          callFun={onDeleteConfirm}
        />

        {/* Pdf container */}
        <PdfContainer ref={printContainerRef} />

        {/* Main table */}
        <div className={classes.CustomMUIDataTable}>
          <MUIDataTable
            title={title}
            data={data}
            columns={tableColumns}
            options={tableOptions}
          />
        </div>
      </PayrollTableLoader>
    </PayrollTableContext.Provider>
  );
}

SimplifiedPayrollTable.propTypes = {
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  showLoader: PropTypes.bool,
  title: PropTypes.string,
  actions: PropTypes.object,
  filterHighlights: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  filterHighlightsColumn: PropTypes.number,
};

SimplifiedPayrollTable.defaultProps = {
  isLoading: false,
  options: {},
  data: [],
  columns: [],
  actions: {},
  showLoader: false,
  title: '',
  filterHighlights: [],
  filterHighlightsColumn: 3,
};

export default memo(injectIntl(SimplifiedPayrollTable));
