import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

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

function PrintableTable(props) {
  const { rows, columns } = props;

  return (
    <Table size='small' sx={{ mt: 0 }}>
      <TableHead>
        <StyledTableThRow>
          <StyledTableThCell sx={{ width: '30px' }} />

          {columns.map((column) => {
            if (column?.options?.print === false) {
              return null;
            }

            return (
              <StyledTableThCell key={column.name} align='center'>
                <pre style={{ margin: 0 }}>{column.label}</pre>
              </StyledTableThCell>
            );
          })}
        </StyledTableThRow>
      </TableHead>

      <TableBody>
        {rows.filter(item => item?.header !== true).map((row, index) => (
          <TableRow key={index} sx={{ pageBreakInside: 'avoid' }} >
            <StyledTableCell component='th' scope='row' sx={{ height: '22px' }} align='center'>
              <pre style={{ margin: 0 }}>{index + 1}</pre>
            </StyledTableCell>

            {columns.map((col) => {
              if (col?.options?.print === false) {
                return null;
              }

              return (
                <StyledTableCell
                  component='th'
                  key={col.name}
                  scope='row'
                  align='center'
                >
                  {col?.options?.customBodyRender && !Boolean(col?.options?.noFormatOnPrint)
                    ? col?.options?.customBodyRender(row[col.name])
                    : row[col.name]}
                </StyledTableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

PrintableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default PrintableTable;
