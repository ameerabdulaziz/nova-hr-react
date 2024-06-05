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
import assessmentMessages from '../../../Assessment/messages';

function StuffPopup(props) {
  const {
    intl, isOpen, setIsOpen, onSave, selectedStuff, employeeList
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [employeeClone, setEmployeeClone] = useState([]);
  const [query, setQuery] = useState('');

  const resetData = () => {
    setRowsPerPage(10);
    setPage(0);
    setQuery('');
    setEmployeeClone([]);
  };

  const getSelectedEmployees = useCallback(() => {
    const selectedEmployeeIds = employeeClone
      .filter((item) => item.isSelect)
      .map((item) => item.id);

    return employeeClone.filter((item) => selectedEmployeeIds.includes(item.id));
  }, [employeeList, employeeClone]);

  const init = () => {
    const selectedEmployeeIds = selectedStuff.map((item) => item.id);

    const mappedEmployee = employeeList.map((item) => {
      const isSelect = selectedEmployeeIds.includes(item.id);
      return { ...item, isSelect };
    });

    setEmployeeClone(mappedEmployee);
  };

  useEffect(() => {
    if (isOpen) {
      init();
    } else {
      resetData();
    }
  }, [isOpen]);

  const searchAlgorithm = (employee) => {
    const initQuery = query.toLowerCase();
    const employeeName = employee.name.toLowerCase();
    const jobName = employee.jobName.toLowerCase();
    const organizationName = employee.organizationName.toLowerCase();

    const isExist = organizationName.includes(initQuery)
    || employeeName.includes(initQuery)
    || jobName.includes(initQuery);

    return isExist;
  };

  const filteredEmployee = useMemo(() => {
    let filteredData = [...employeeClone];

    if (query.length !== 0) {
      filteredData = filteredData.filter(searchAlgorithm);
    }

    return filteredData;
  }, [employeeClone, query]);

  const visibleRows = useMemo(() => filteredEmployee.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ), [page, rowsPerPage, filteredEmployee, query]);

  const onPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const employees = getSelectedEmployees();

    onSave(employees);

    setIsOpen(false);
  };

  const onCheckboxChange = (evt, index) => {
    const clonedItems = [...employeeClone];
    const employee = visibleRows[index];

    const employeeIndex = clonedItems.findIndex(
      (item) => item.id === employee.id
    );

    if (employeeIndex !== -1) {
      clonedItems[employeeIndex].isSelect = evt.target.checked;
    }

    setEmployeeClone(clonedItems);
  };

  const onAllCheckboxChange = (evt) => {
    const clonedItems = [...filteredEmployee];

    visibleRows.forEach((employee) => {
      const employeeIndex = clonedItems.findIndex(
        (item) => item.id === employee.id
      );

      if (employeeIndex !== -1) {
        clonedItems[employeeIndex].isSelect = evt.target.checked;
      }
    });

    setEmployeeClone(clonedItems);
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
        {intl.formatMessage(assessmentMessages.addOrChangeStuff)}
      </DialogTitle>

      <DialogContent>
        <Grid container mb={3} gap={3} pt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='query'
              value={query}
              onChange={(evt) => setQuery(evt.target.value)}
              label={intl.formatMessage(assessmentMessages.employeeName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
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
                      {intl.formatMessage(assessmentMessages.employeeName)}
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(assessmentMessages.jobName)}
                    </TableCell>

                    <TableCell>
                      {intl.formatMessage(assessmentMessages.departmentName)}
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows.map((item, index) => (
                    <TableRow
                      key={item.id}
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
                        {item.name}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {item.jobName}
                      </TableCell>

                      <TableCell component='th' scope='row'>
                        {item.organizationName}
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
                {intl.formatMessage(assessmentMessages.noStuffFound)}
              </Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onPopupClose}>
          {intl.formatMessage(assessmentMessages.close)}
        </Button>

        <Button type='submit' variant='contained'>
          {intl.formatMessage(assessmentMessages.save)}
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
  selectedStuff: PropTypes.array.isRequired,
  employeeList: PropTypes.array.isRequired,
};

export default injectIntl(StuffPopup);
