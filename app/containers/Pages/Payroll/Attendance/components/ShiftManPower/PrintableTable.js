import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';
import messages from '../../messages';

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
  const { rows, intl } = props;

  return (
    <Table size='small' sx={{ mt: 0 }}>
      <TableHead>
        <StyledTableThRow>
          <StyledTableThCell align='center' sx={{ height: '22px' }}>
            {intl.formatMessage(payrollMessages.id)}
          </StyledTableThCell>

          <StyledTableThCell align='center'>
            {intl.formatMessage(messages.shift)}
          </StyledTableThCell>

          <StyledTableThCell align='center'>
            {intl.formatMessage(messages.idealManPower)}
          </StyledTableThCell>
        </StyledTableThRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index} sx={{ pageBreakInside: 'avoid' }}>
            <StyledTableCell
              component='th'
              scope='row'
              sx={{ height: '22px' }}
              align='center'
            >
              {row.shiftId}
            </StyledTableCell>

            <StyledTableCell align='center'>{row.shiftName}</StyledTableCell>

            <StyledTableCell align='center'>
              {row.idealManPower}
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

PrintableTable.propTypes = {
  rows: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PrintableTable);
