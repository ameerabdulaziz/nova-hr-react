import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import PayRollLoader from '../../../Component/PayRollLoader';
import API from '../../api/MonthOpenCloseAssData';
import messages from '../../messages';

function EmployeePopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, employeeList
  } = props;

  const locale = useSelector((state) => state.language.locale);

  const [selectedEmployee, setSelectedEmployee] = useState(employeeList);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (isOpen) {
      setSelectedEmployee(employeeList);
    }
  }, [employeeList]);

  const closePopup = () => {
    setIsOpen(false);
    onSave();
  };

  const onConfirmBtnClick = async () => {
    setIsLoading(true);

    try {
      const employees = selectedEmployee.filter((item) => item.isSelect);

      await API(locale).SaveEmployeeTemplate(employees);

      onSave();

      setIsOpen(false);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => selectedEmployee.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, selectedEmployee]
  );

  const onCheckboxChange = (evt, index) => {
    const indexToUpdate = selectedEmployee.findIndex(item => item.employeeId === visibleRows[index].employeeId);

    const clonedItems = [...selectedEmployee];
    clonedItems[indexToUpdate].isSelect = evt.target.checked;

    setSelectedEmployee(clonedItems);
  };

  const onAllCheckboxChange = (evt) => {
    setSelectedEmployee((prev) => prev.map((item) => ({ ...item, isSelect: evt.target.checked }))
    );
  };

  const isAllSelect = useCallback(
    () => selectedEmployee.every((item) => item.isSelect),
    [selectedEmployee]
  );

  const isSomeSelect = useCallback(() => {
    const filtered = selectedEmployee.filter((item) => item.isSelect).length;

    return filtered > 0 && filtered < selectedEmployee.length;
  }, [selectedEmployee]);

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '60vw',
          maxWidth: '60vw',
        }),
      }}
    >
      <DialogTitle>{intl.formatMessage(messages.addNewEmployee)}</DialogTitle>

      <DialogContent>
        <PayRollLoader isLoading={isLoading}>
          <TableContainer>
            <Table size='small' sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 30 }}>
                    <Checkbox
                      checked={isAllSelect()}
                      onChange={onAllCheckboxChange}
                      indeterminate={isSomeSelect()}
                      name='all'
                    />
                  </TableCell>

                  <TableCell>
                    {intl.formatMessage(messages.employeeName)}
                  </TableCell>

                  <TableCell component='th' scope='row'>
                    {intl.formatMessage(messages.departmentName)}
                  </TableCell>

                  <TableCell component='th' scope='row'>
                    {intl.formatMessage(messages.jobName)}
                  </TableCell>

                  <TableCell component='th' scope='row'>
                    {intl.formatMessage(messages.templateName)}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((employee, index) => (
                  <TableRow
                    key={employee.employeeId}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={visibleRows[index].isSelect}
                        onChange={(evt) => onCheckboxChange(evt, index)}
                        name='isSelect'
                      />
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {employee.employeeName}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {employee.organizationName}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {employee.jobName}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {employee.templateName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={selectedEmployee.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </PayRollLoader>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePopup}>
          {intl.formatMessage(messages.close)}
        </Button>

        <Button onClick={onConfirmBtnClick} variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EmployeePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  employeeList: PropTypes.array.isRequired,
};

export default injectIntl(EmployeePopup);
