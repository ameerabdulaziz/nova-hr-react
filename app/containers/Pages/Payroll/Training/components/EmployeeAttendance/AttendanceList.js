import PeopleIcon from '@mui/icons-material/People';
import {
  Box, Checkbox, Stack, Typography
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
import { formateDate } from '../../../helpers';
import payrollMessages from '../../../messages';
import messages from '../../messages';

function AttendanceList(props) {
  const { intl, setAttendanceInfo, attendanceInfo } = props;

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
    () => attendanceInfo.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, attendanceInfo]
  );

  const onCheckboxChange = (evt, index) => {
    const newAttendanceInfo = [...attendanceInfo];
    newAttendanceInfo[index].isAttend = evt.target.checked;
    setAttendanceInfo(newAttendanceInfo);
  };

  return (
    <>
      {attendanceInfo.length > 0 ? (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {intl.formatMessage(messages.courseName)}
                  </TableCell>

                  <TableCell>
                    {intl.formatMessage(payrollMessages.employeeName)}
                  </TableCell>

                  <TableCell>
                    {intl.formatMessage(messages.trainingDate)}
                  </TableCell>

                  <TableCell>{intl.formatMessage(messages.isAttend)}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {item.courseName}
                    </TableCell>

                    <TableCell>{item.employeeName}</TableCell>

                    <TableCell>{formateDate(item.trainingDate)}</TableCell>

                    <TableCell>
                      <Checkbox
                        checked={item.isAttend}
                        onChange={(evt) => onCheckboxChange(evt, index)}
                        name='isAttend'
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            count={attendanceInfo.length}
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
              {intl.formatMessage(messages.noAttendanceFound)}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
}

AttendanceList.propTypes = {
  intl: PropTypes.object.isRequired,
  attendanceInfo: PropTypes.array.isRequired,
  setAttendanceInfo: PropTypes.func.isRequired,
};

export default injectIntl(AttendanceList);
