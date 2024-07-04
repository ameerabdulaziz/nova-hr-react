import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

const COLUMNS_COUNT = 2;

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

function PrintHighlights(props) {
  const { highlights } = props;

  const pairs = useMemo(() => {
    const result = [];

    // Split highlights into pairs of COLUMNS_COUNT cells
    for (let i = 0; i < highlights.length; i += COLUMNS_COUNT) {
      result.push(highlights.slice(i, i + COLUMNS_COUNT));
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

PrintHighlights.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PrintHighlights;
