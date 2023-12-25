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
import messages from '../../messages';
import StuffPopup from './StuffPopup';
import { toast } from 'react-hot-toast';

function StuffInfo(props) {
  const {
    intl, setFormInfo, formInfo, jobList
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
    if (formInfo.isPropation !== null) {
      setIsEmployeePopupOpen(true);
    } else {
      toast.error(intl.formatMessage(messages.probationPeriodValueIsRequired));
    }
  };

  const visibleRows = useMemo(
    () => formInfo.asTemplateEmployee.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, formInfo.asTemplateEmployee]
  );

  const onEmployeeRemove = (index) => {
    const clonedItems = [...formInfo.asTemplateEmployee];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    setFormInfo((prev) => ({
      ...prev,
      asTemplateEmployee: clonedItems,
    }));
  };

  const onEmployeeSave = (items) => {
    setFormInfo((prev) => ({
      ...prev,
      asTemplateEmployee: items,
    }));

    setIsEmployeePopupOpen(false);
  };

  return (
    <>
      <StuffPopup
        isOpen={isEmployeePopupOpen}
        setIsOpen={setIsEmployeePopupOpen}
        onSave={onEmployeeSave}
        selectedStuff={formInfo.asTemplateEmployee}
        jobList={jobList}
        probationPeriod={Boolean(formInfo.isPropation)}
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
                {intl.formatMessage(messages.stuffInfo)}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant='contained'
                onClick={onEmployeePopupBtnClick}
                color='primary'
              >
                {intl.formatMessage(messages.addOrChangeStuff)}
              </Button>
            </Grid>
          </Grid>

          {formInfo.asTemplateEmployee.length > 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {intl.formatMessage(messages.departmentName)}
                      </TableCell>
                      <TableCell>
                        {intl.formatMessage(messages.jobName)}
                      </TableCell>
                      <TableCell>
                        {intl.formatMessage(messages.employeeName)}
                      </TableCell>
                      <TableCell>
                        {intl.formatMessage(messages.actions)}
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
                        <TableCell component='th' scope='row'>
                          {employee.organizationName}
                        </TableCell>
                        <TableCell>{employee.jobName}</TableCell>
                        <TableCell>{employee.employeeName}</TableCell>
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
                count={formInfo.asTemplateEmployee.length}
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
                  {intl.formatMessage(messages.noStuffFound)}
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
  jobList: PropTypes.array.isRequired,
  setFormInfo: PropTypes.func.isRequired,
};

export default injectIntl(StuffInfo);
