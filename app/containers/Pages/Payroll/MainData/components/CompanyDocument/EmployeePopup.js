import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PeopleIcon from '@mui/icons-material/People';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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
import { useSelector } from 'react-redux';
import style from '../../../../../../styles/styles.scss';
import messages from '../../messages';

function EmployeePopup(props) {
  const {
    intl,
    isOpen,
    setIsOpen,
    onSave,
    selectedEmployees,
    employeeList,
    departmentList,
  } = props;

  const locale = useSelector((state) => state.language.locale);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [employeeApi, setEmployeeApi] = useState([]);
  const [filters, setFilters] = useState({
    department: [],
    query: '',
    allManagers: false,
  });

  const resetData = () => {
    setRowsPerPage(10);
    setPage(0);
    setFilters({
      department: [],
      query: '',
      allManagers: false,
    });
  };

  useEffect(() => {
    if (isOpen) {
      const selectedEmployeeIds = selectedEmployees.map(
        (item) => item.employeeId
      );

      const employees = employeeList.map((item) => ({
        ...item,
        isSelect: selectedEmployeeIds.includes(item.employeeId),
      }));
      setEmployeeApi(employees);
    } else {
      resetData();
    }
  }, [isOpen]);

  const filteredEmployee = useMemo(() => {
    let filteredData = [...employeeApi];

    if (filters.query.length !== 0) {
      setPage(0);

      filteredData = filteredData.filter((item) => item.employeeName.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    if (filters.department.length !== 0) {
      setPage(0);
      const selectedDepartmentIds = filters.department.map((item) => item.id);

      filteredData = filteredData.filter((item) => selectedDepartmentIds.includes(item.organizationId)
      );
    }

    if (filters.allManagers) {
      setPage(0);
      filteredData = filteredData.filter((item) => item.ismgr);
    }

    return filteredData;
  }, [employeeApi, filters]);

  const visibleRows = useMemo(
    () => filteredEmployee.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, filteredEmployee, filters.query]
  );

  const onPopupClose = () => {
    setIsOpen(false);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const employees = employeeApi.filter((item) => item.isSelect);

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

  const onMultiAutoCompleteChange = (value, name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onInputChange = (evt) => {
    setFilters((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onFilterCheckboxChange = (evt) => {
    setFilters((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const isAllSelect = useCallback(
    () => visibleRows.every((item) => item.isSelect),
    [visibleRows]
  );

  const isSomeSelect = useCallback(() => {
    const filtered = visibleRows.filter((item) => item.isSelect).length;

    return filtered > 0 && filtered < visibleRows.length;
  }, [visibleRows]);

  const onPageChange = (_, newPage) => {
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
        <Grid container mb={3} spacing={3} pt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name='query'
              value={filters.query}
              onChange={onInputChange}
              label={intl.formatMessage(messages.employeeName)}
              fullWidth
              variant='outlined'
              autoComplete='off'
            />
          </Grid>

          <Grid item md={3} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.allManagers}
                  onChange={onFilterCheckboxChange}
                  name='allManagers'
                />
              }
              label={intl.formatMessage(messages.allManagers)}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Autocomplete
              options={departmentList}
              multiple
              disableCloseOnSelect
              className={`${style.AutocompleteMulSty} ${
                locale === 'ar' ? style.AutocompleteMulStyAR : null
              }`}
              value={filters.department}
              renderOption={(optionProps, option, { selected }) => (
                <li {...optionProps} key={optionProps.id}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                    checkedIcon={<CheckBoxIcon fontSize='small' />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              getOptionLabel={(option) => (option ? option.name : '')}
              onChange={(_, value) => onMultiAutoCompleteChange(value, 'department')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={intl.formatMessage(messages.department)}
                />
              )}
            />
          </Grid>
        </Grid>

        {visibleRows.length > 0 ? (
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

                    <TableCell>
                      {intl.formatMessage(messages.department)}
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
                        {employee.organizationName}
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

EmployeePopup.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  employeeList: PropTypes.array.isRequired,
  departmentList: PropTypes.array.isRequired,
  selectedEmployees: PropTypes.array.isRequired,
};

export default injectIntl(EmployeePopup);
