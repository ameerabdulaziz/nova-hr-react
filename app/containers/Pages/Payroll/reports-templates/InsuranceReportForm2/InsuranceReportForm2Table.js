import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { toArabicDigits } from '../assets/helper';

const StyledTableThRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
}));

const StyledTableThCell = styled(TableCell)(() => ({
  padding: '0 16px',
  border: '1px solid black',
}));

const StyledTableCell = styled(TableCell)(() => ({
  border: '1px solid black',
}));

function InsuranceReportForm2Table(props) {
  const { rows } = props;

  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <StyledTableThRow>
            <StyledTableThCell align='center' rowSpan={2}>
              الرقم التأميني
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2}>
              الموظف
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2}>
              الرقم القومي
            </StyledTableThCell>
            <StyledTableThCell align='center' colSpan={3}>
              تاريخ الالتحاق
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2}>
              أجر الاشتراك التأميني
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2}>
              الاجر الشامل
            </StyledTableThCell>
          </StyledTableThRow>
          <StyledTableThRow>
            <StyledTableThCell align='center'>يوم</StyledTableThCell>
            <StyledTableThCell align='center'>شهر</StyledTableThCell>
            <StyledTableThCell align='center'>سنة</StyledTableThCell>
          </StyledTableThRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const subscriptionDate = new Date(row.subscriptionDate);

            return (
              <TableRow key={row.id}>
                <StyledTableCell component='th' scope='row' align='center'>
                  {toArabicDigits(row.insuranceNumber)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {row.employeeName}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(row.nationalId)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(subscriptionDate.getDate())}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(subscriptionDate.getMonth() + 1)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(subscriptionDate.getFullYear())}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(row.insuranceSubscriptionFee)}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {toArabicDigits(row.totalSalary)}
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

InsuranceReportForm2Table.propTypes = {
  rows: PropTypes.array.isRequired,
};

InsuranceReportForm2Table.defaultProps = {
  rows: [],
};

export default InsuranceReportForm2Table;
