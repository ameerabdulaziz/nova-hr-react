import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import React, { useContext, useMemo } from 'react';
import PayrollTableContext from '../PayrollTableContext';

const StyledTableThCell = styled(TableCell)(({ theme }) => ({
  padding: '0 10px',
  border: '1px solid black',
  backgroundColor: theme.palette.action.selected,
}));

const StyledTableRow = styled(TableRow)(() => ({
  borderBottom: 0,
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
  lineHeight: 1,
  height: '22px',
}));

function PDFHighlights() {
  const payrollTableContext = useContext(PayrollTableContext);
  const { filterHighlights, filterHighlightsColumn } = payrollTableContext;

  const pairs = useMemo(() => {
    const result = [];

    // Split filterHighlights into pairs of filterHighlightsColumn cells
    for (let i = 0; i < filterHighlights.length; i += filterHighlightsColumn) {
      result.push(filterHighlights.slice(i, i + filterHighlightsColumn));
    }
    return result;
  }, [filterHighlights]);

  if (filterHighlights.length === 0) {
    return null;
  }

  return (
    <Table size='small' sx={{ mt: 2, width: 'auto' }}>
      <TableBody>
        {pairs.map((pair, index) => (
          <StyledTableRow key={index}>
            {pair.map((highlight, subIndex) => (
              <React.Fragment key={subIndex}>
                <StyledTableThCell component='th' scope='row' align='center'>
                  {highlight.label}
                </StyledTableThCell>

                <StyledTableCell scope='row' align='center'>
                  {highlight.value}
                </StyledTableCell>
              </React.Fragment>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PDFHighlights;
