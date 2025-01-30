import React from 'react';
import XLSX from 'xlsx-js-style';
import { formateDate } from '../../helpers';
import DateFilter from './filters/DateFilter';

function getDefaultOptions(title = 'Report') {
  return {
    filterType: 'multiselect',
    responsive: 'vertical',
    print: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    // Download options for csv (only visible columns)
    downloadOptions: {
      filename: `${title}.csv`,
      filterOptions: {
        useDisplayedRowsOnly: true,
        useDisplayedColumnsOnly: true,
      },
    },
    page: 0,
    selectableRows: 'none',
    searchOpen: false,
  };
}

function exportExcel(cols, data, title = 'Report') {
  // Table data base on visible columns
  const sheetData = data.map((row) => {
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
  link.setAttribute('download', title);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadURI);
}

function getTranslation(intl, payrollMessages, isLoading = false) {
  return {
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
  };
}

// Customize table dropdown filter for only date
// instead of single date input it will be 'from date' input and 'to date' input
function getPayrollTableDateColumnOptions(item, intl, payrollMessages) {
  const isNameIncludeDate = item?.name?.toLowerCase()?.endsWith('date');

  if (!isNameIncludeDate) {
    return {};
  }

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
        <DateFilter
          filterList={filterList}
          onChange={onChange}
          index={index}
          column={column}
        />
      ),
    },
  };
}

function wrapInPre(value, options) {
  if (options?.noWrap) {
    return value;
  }

  return <pre>{value}</pre>;
}

// Customize table dropdown filter for only date
// instead of single date input it will be 'from date' input and 'to date' input
function getDateColumnOptions(label, options) {
  const { minDateLabel = 'From date', maxDateLabel = 'To date' } = options;

  return {
    customBodyRender: (value) => wrapInPre(formateDate(value)),
    filterType: 'custom',
    customFilterListOptions: {
      // Get filter label depend on value (min & max or min or max)
      render: (filterValue) => {
        // min & max filter label
        if (filterValue[0] && filterValue[1]) {
          return `${label} - ${minDateLabel}: ${filterValue[0]}, ${maxDateLabel}: ${filterValue[1]}`;
        }

        // min filter label
        if (filterValue[0]) {
          return `${label} - ${minDateLabel}: ${filterValue[0]}`;
        }

        // max filter label
        if (filterValue[1]) {
          return `${label} - ${maxDateLabel}: ${filterValue[1]}`;
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
        <DateFilter
          filterList={filterList}
          onChange={onChange}
          index={index}
          column={column}
        />
      ),
    },
  };
}

export {
  exportExcel,
  getDateColumnOptions,
  getDefaultOptions,
  getTranslation,
  wrapInPre,
  getPayrollTableDateColumnOptions,
};
