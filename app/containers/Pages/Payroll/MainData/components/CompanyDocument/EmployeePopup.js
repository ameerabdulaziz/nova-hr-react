import PeopleIcon from '@mui/icons-material/People';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
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
import messages from '../../messages';

function StuffPopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, selectedEmployees
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [employeeApi, setEmployeeApi] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
  });

  const resetData = () => {
    setRowsPerPage(10);
    setPage(0);
    setFilters({
      query: '',
    });
  };

  useEffect(() => {
    if (isOpen) {
      setEmployeeApi(selectedEmployees);
    } else {
      resetData();
    }
  }, [isOpen]);

  const getEmployees = useCallback(() => {
    const selectedEmployeeIds = employeeApi.map((item) => item.employeeId);

    const allEmployee = [...employeeApi];

    employeeApi.forEach((employee) => {
      if (employee.isSelect) {
        if (!selectedEmployeeIds.includes(employee.employeeId)) {
          allEmployee.push(employee);
        }
      }
    });

    return allEmployee;
  }, [employeeApi]);

  const filteredEmployee = useMemo(() => {
    let filteredData = [...employeeApi];

    if (filters.query.length !== 0) {
      filteredData = filteredData.filter((item) => item.employeeName.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    return filteredData;
  }, [employeeApi, filters.query]);

  const visibleRows = useMemo(() => {
    let filteredData = [...filteredEmployee];

    if (filters.query.length !== 0) {
      filteredData = filteredData.filter(
        (item) => item.organizationName
          .toLowerCase()
          .includes(filters.query.toLowerCase()) || item.employeeName
      );
    }

    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage, filteredEmployee, filters.query]);

  const onPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const employees = getEmployees();

    onSave(employees);

    setIsOpen(false);
  };

  const onCheckboxChange = (evt, index) => {
    const clonedItems = [...filteredEmployee];
    const employee = visibleRows[index];

    const employeeIndex = clonedItems.findIndex(
      (item) => item.employeeId === employee.employeeId
    );

    if (employeeIndex !== -1) {
      clonedItems[employeeIndex].isSelect = evt.target.checked;
    }

    setEmployeeApi(clonedItems);
  };

  const onAllCheckboxChange = (evt) => {
    const clonedItems = [...filteredEmployee];

    visibleRows.forEach((employee) => {
      const employeeIndex = clonedItems.findIndex(
        (item) => item.employeeId === employee.employeeId
      );

      if (employeeIndex !== -1) {
        clonedItems[employeeIndex].isSelect = evt.target.checked;
      }
    });

    setEmployeeApi(clonedItems);
  };

  const onInputChange = (evt) => {
    setFilters((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const isAllSelect = useCallback(
    () => visibleRows.every((item) => item.isSelect),
    [visibleRows]
  );

  const isSomeSelect = useCallback(() => {
    const filtered = visibleRows.filter((item) => item.isSelect).length;

    return filtered > 0 && filtered < visibleRows.length;
  }, [visibleRows]);

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog
      open={isOpen}
      component='form'
      onSubmit={onFormSubmit}
      PaperProps={{
        sx: (th) => ({
          [th.breakpoints.down('md')]: {
            width: '100%',
          },
          width: '80vw',
          maxWidth: '80vw',
        }),
      }}
    >
      <DialogTitle>
        {intl.formatMessage(messages.addOrChangeEmployee)}
      </DialogTitle>

      <DialogContent>
        <Grid container mb={3} gap={3} pt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='query'
              value={filters.query}
              onChange={onInputChange}
              label={intl.formatMessage(messages.employeeName)}
              fullWidth
              variant='outlined'
            />
          </Grid>
        </Grid>

        {filteredEmployee.length > 0 ? (
          <>
            <TableContainer>
              <Table size='small' sx={{ minWidth: 700 }}>
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
                      {intl.formatMessage(messages.employeeCode)}
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(messages.employeeName)}
                    </TableCell>

                    <TableCell>{intl.formatMessage(messages.branch)}</TableCell>

                    <TableCell>
                      {intl.formatMessage(messages.department)}
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(messages.section)}
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
                        {employee.employeeCode}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {employee.employeeName}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {employee.branch}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {employee.department}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {employee.section}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component='div'
              count={filteredEmployee.length}
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
                {intl.formatMessage(messages.noEmployeeFound)}
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(messages.close)}
        </Button>
        <Button type='submit' variant='contained'>
          {intl.formatMessage(messages.save)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

StuffPopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedEmployees: PropTypes.array.isRequired,
};

export default injectIntl(StuffPopup);
