import { Delete } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
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
import React, { useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import assessmentMessages from '../../../Assessment/messages';
import StuffPopup from './StuffPopup';

function StuffInfo(props) {
  const {
    intl, setFormInfo, formInfo, employeeList
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEmployeePopupOpen, setIsEmployeePopupOpen] = useState(false);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEmployeePopupBtnClick = async () => {
    setIsEmployeePopupOpen(true);
  };

  const visibleRows = useMemo(
    () => formInfo.employeeList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, formInfo.employeeList]
  );

  const onEmployeeRemove = (index) => {
    const clonedItems = [...formInfo.employeeList];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    setFormInfo((prev) => ({
      ...prev,
      employeeList: clonedItems,
    }));
  };

  const onEmployeeSave = (employees) => {
    setFormInfo((prev) => ({
      ...prev,
      employeeList: employees,
    }));

    setIsEmployeePopupOpen(false);
  };

  return (
    <>
      <StuffPopup
        isOpen={isEmployeePopupOpen}
        setIsOpen={setIsEmployeePopupOpen}
        onSave={onEmployeeSave}
        employeeList={employeeList}
        selectedStuff={formInfo.employeeList}
      />

      <Card>
        <CardContent sx={{ p: '16px!important' }}>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            mb={3}
          >
            <Grid item>
              <Typography variant='h6'>
                {intl.formatMessage(assessmentMessages.stuffInfo)}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                onClick={onEmployeePopupBtnClick}
                color='primary'
              >
                {intl.formatMessage(assessmentMessages.addOrChangeStuff)}
              </Button>
            </Grid>
          </Grid>

          {formInfo.employeeList.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {intl.formatMessage(assessmentMessages.employeeName)}
                      </TableCell>

                      <TableCell>
                        {intl.formatMessage(assessmentMessages.departmentName)}
                      </TableCell>

                      <TableCell>
                        {intl.formatMessage(assessmentMessages.jobName)}
                      </TableCell>

                      <TableCell>
                        {intl.formatMessage(assessmentMessages.actions)}
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
                        <TableCell>{employee.name}</TableCell>

                        <TableCell component='th' scope='row'>
                          {employee.organizationName}
                        </TableCell>

                        <TableCell>{employee.jobName}</TableCell>

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
                count={formInfo.employeeList.length}
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
        </CardContent>
      </Card>
    </>
  );
}

StuffInfo.propTypes = {
  intl: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  setFormInfo: PropTypes.func.isRequired,
  employeeList: PropTypes.array.isRequired,
};

export default injectIntl(StuffInfo);
