import { Delete } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import {
  Box, IconButton, Stack, Typography
} from '@mui/material';
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
import messages from '../../messages';

function EmployeeList(props) {
  const { intl, setEmployees, employees } = props;

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

  const onEmployeeRemove = (index) => {
    const clonedItems = [...employees];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    setEmployees(clonedItems);
  };

  return (
    <>
      {employees.length > 0 ? (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {intl.formatMessage(payrollMessages.employeeId)}
                  </TableCell>

                  <TableCell>
                    {intl.formatMessage(payrollMessages.employeeName)}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((employee, index) => (
                  <TableRow
                    key={employee.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {employee.id}
                    </TableCell>

                    <TableCell>{employee.name}</TableCell>

                    <TableCell>
                      <IconButton
                        color='error'
                        onClick={() => onEmployeeRemove(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
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
      ) : (
        <Stack
          direction='row'
          sx={{ minHeight: 200 }}
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Box>
            <PeopleIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
            <Typography color='#a7acb2' variant='body1'>
              {intl.formatMessage(messages.noEmployees)}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
}

EmployeeList.propTypes = {
  intl: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  setEmployees: PropTypes.func.isRequired,
};

export default injectIntl(EmployeeList);
