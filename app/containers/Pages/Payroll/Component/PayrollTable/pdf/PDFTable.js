import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import React, { useContext, useMemo } from 'react';
import PayrollTableContext from '../PayrollTableContext';

const StyledTableThRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  pageBreakInside: 'avoid',
}));

const StyledTableThCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
  lineHeight: 1,
}));

const StyledPre = styled('pre')({
  margin: 0,
});

function PDFTableHeader() {
  const payrollTableContext = useContext(PayrollTableContext);

  // Memoized rendering logic for the table header cells
  const headerCells = useMemo(() => {
    const cells = payrollTableContext.visibleColumns.map((column) => {
      if (column?.options?.print === false) {
        return null;
      }

      return (
        <StyledTableThCell key={column.name} align="center">
          <StyledPre>{column.label}</StyledPre>
        </StyledTableThCell>
      );
    });

    return cells;
  }, [payrollTableContext.visibleColumns]);

  return (
    <TableHead>
      <StyledTableThRow>
        {/* First cell for numbering */}
        <StyledTableThCell sx={{ width: '30px' }} />

        {/* Render visible columns */}
        {headerCells}
      </StyledTableThRow>
    </TableHead>
  );
}

function PDFTableBody() {
  const payrollTableContext = useContext(PayrollTableContext);
  const { pdfData, visibleColumns } = payrollTableContext;

  return (
    <TableBody>
      {/* Filter data with no header */}
      {pdfData.filter((item) => item?.header !== true).map((row, index) => (
        <TableRow key={index} sx={{ pageBreakInside: 'avoid' }}>
          <StyledTableCell component="th" scope="row" sx={{ height: '22px' }} align="center">
            <StyledPre>{index + 1}</StyledPre>
          </StyledTableCell>

          {visibleColumns.map((col) => {
            if (col?.options?.print === false) {
              return null;
            }

            let value = row[col.name];

            if (col?.options?.customBodyRender && !col?.options?.noFormatOnPrint) {
              value = col.options.customBodyRender(row[col.name]);
            }

            return (
              <StyledTableCell
                component="th"
                key={col.name}
                scope="row"
                align="center"
              >
                {value}
              </StyledTableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}

function PDFTable() {
  return (
    <Table size='small' sx={{ mt: 0 }}>
      <PDFTableHeader/>

      <PDFTableBody/>
    </Table>
  );
}

export default PDFTable;
