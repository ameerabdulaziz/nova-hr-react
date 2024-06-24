import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import payrollMessages from '../../../messages';

function EmployeeList(props) {
  const { intl, employees } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, employees]
  );

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage(payrollMessages.employeeName)}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>{employee.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
};

export default injectIntl(EmployeeList);
