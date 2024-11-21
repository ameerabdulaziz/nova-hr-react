// import { createContext } from 'react';
// import { formateDate } from '../../helpers';

// // Today's formatted date
// const today = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');

// /**
//  * @description Context for managing the payroll table's state
//  * @property {string} today - The current date in the format "yyyy-MM-dd hh:mm:ss".
//  * @property {string} documentTitle - The title of the document for printing and exporting.
//  * @property {Array<number> } selectedRows - An array of selected rows.
//  * @property {Array<{label: string, value: string}>} filterHighlights - An array of filter highlights.
//  * @property {number} filterHighlightsColumn - The specific column number for filter.
//  * @property {boolean} isLoading - The loading state of the table.
//  * @property {Array<Object>} tableColumns - The columns of the table.
//  * @property {Array<{isColumnVisible: boolean}>} columnsVisibility - The visibility of each column.
//  */
// const PayrollTableContext = createContext({
//   today,
//   documentTitle: 'Report',
//   isLoading: false,

//   selectedRows: [],

//   filterData: [],
//   filterColumns: [],

//   filterHighlights: [],
//   filterHighlightsColumn: 3,

//   tableColumns: [],
//   columnsVisibility: [],
// });

// PayrollTableContext.displayName = 'Payroll Table Context';

// export default PayrollTableContext;
import { createContext } from 'react';

/**
 * @typedef {Object} Column
 * @property {string} label - The display label of the column.
 * @property {string} name - The unique name of the column.
 * @property {boolean} isColumnVisible - Indicates if the column is visible.
 * @property {Object} options - Additional options for the column.
 * @property {boolean} options.print - Indicates if the column should be printed.
 * @property {boolean} options.noFormatOnPrint - Indicates if the column should not be formatted on print.
 * @property {function} options.customBodyRender - A function that returns the custom body render for the column.
*/

/**
 * @typedef {Object} PayrollTableContextProps
 * @property {string} today - The current date in the format "yyyy-MM-dd hh:mm:ss".
 * @property {string} documentTitle - The title of the document for printing and exporting.
 * @property {Array<number>} selectedRows - An array of selected rows.
 * @property {Array<{label: string, value: string}>} filterHighlights - An array of filter highlights.
 * @property {number} filterHighlightsColumn - The specific column number for filter.
 * @property {boolean} isLoading - The loading state of the table.
 * @property {Array<Column>} tableColumns - The columns of the table.
 * @property {Array<{header?:boolean}>} filterData - An array of filter data.
 * @property {Array<{header?:boolean}>} pdfData - An array of data for pdf print
 * @property {Function} setPdfData - Set pdf data
 * @property {Array<Column>} visibleColumns - An array of visible columns.
*/

/**
 * Context for managing the payroll table's state.
 *
 * @type {React.Context<PayrollTableContextProps>}
 */
const PayrollTableContext = createContext({
  today: new Date().toISOString(),
  documentTitle: 'Report',
  isLoading: false,
  selectedRows: [],

  filterData: [],
  tableColumns: [],

  pdfData: [],
  setPdfData: () => {},

  visibleColumns: [],
  filterHighlightsColumn: 3,
  filterHighlights: [],
});

PayrollTableContext.displayName = 'Payroll Table Context';

export default PayrollTableContext;
