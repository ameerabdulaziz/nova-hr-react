import { TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { toArabicDigits, formatNumber } from '../../helpers';
import Paper from '@mui/material/Paper';

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
  console.log();
  

  return (
    <TableContainer  elevation={0} sx={{ backgroundColor: "white !important", color: "black !important" }}>
      <Table size='small' style={{marginBottom:"5px"}} sx={{ color: "black" }}>
        <TableHead>
          <StyledTableThRow>
            <StyledTableThCell align='center' rowSpan={2} sx={{ color: "black" }}>
              الرقم التأميني
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2} sx={{ color: "black" }}>
              الموظف
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2} sx={{ color: "black" }}>
              الرقم القومي
            </StyledTableThCell>
            <StyledTableThCell align='center' colSpan={3} sx={{ color: "black" }}>
              تاريخ الالتحاق
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2} sx={{ color: "black" }}>
              أجر الاشتراك التأميني
            </StyledTableThCell>
            <StyledTableThCell align='center' rowSpan={2} sx={{ color: "black" }}>
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
          {rows.sort((a, b) => Number( a.socialInsuranceID ) - Number( b.socialInsuranceID)).map((row) => {
            const subscriptionDate = new Date(row.insuranceDate);

            return (
              <TableRow key={row.id}>
                <StyledTableCell component='th' scope='row' align='center' sx={{ color: "black" }}>
                  {toArabicDigits(row.socialInsuranceID)}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {row.employeeName}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits(row.identityNumber)}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits(subscriptionDate.getDate())}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits(subscriptionDate.getMonth() + 1)}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits(subscriptionDate.getFullYear())}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits( formatNumber(row.mainSalary)  )}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ color: "black" }}>
                  {toArabicDigits( formatNumber(row.insGrossSalary) )}
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
