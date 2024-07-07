import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

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
  height: '22px'
}));

function PrintableFiltersTable(props) {
  const { highlights, columnsCount } = props;

  const pairs = useMemo(() => {
    const result = [];

    // Split highlights into pairs of columnsCount cells
    for (let i = 0; i < highlights.length; i += columnsCount) {
      result.push(highlights.slice(i, i + columnsCount));
    }
    return result;
  }, [highlights]);

  if (highlights.length === 0) {
    return null;
  }

  return (
    <Table size='small' sx={{ mt: 2, width: 'auto' }}>
      <TableBody>
        {pairs.map((pair, index) => (
          <StyledTableRow key={index}>
            {pair.map((highlight, subIndex) => (
              <React.Fragment key={subIndex}>
                <StyledTableThCell
                  component='th'
                  scope='row'
                  align='center'
                >
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

PrintableFiltersTable.defaultProps = {
  columnsCount: 3,
};

PrintableFiltersTable.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  columnsCount: PropTypes.number,
};

export default PrintableFiltersTable;
