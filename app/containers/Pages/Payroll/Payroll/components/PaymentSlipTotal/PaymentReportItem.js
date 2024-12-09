import {
  Grid, Stack, TableContainer, Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import { formatNumber } from '../../../helpers';
import messages from '../../messages';

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

function PaymentReportItem(props) {
  const { intl, item, formInfo } = props;

  if (!item) {
    return null;
  }

  const maxRows = useMemo(
    () => Math.max(
      item.allownace.length,
      item.deductions.length,
      formInfo.showReferenceElements ? item.refElements.length : 0
    ),
    [item, formInfo.showReferenceElements]
  );

  return (
    <>
      {/* <Grid
        container
        alignItems='center'
        sx={{ borderBottom: '2px solid #333', pb: 1 }}
      >
        <Grid item xs={5}>
          <Typography fontWeight='bold' variant='subtitle1'>
            {intl.formatMessage(messages.paymentSlip)}
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography fontWeight='bold'>
            {formInfo.monthName} &nbsp; / &nbsp; {formInfo.yearName}
          </Typography>
        </Grid>
      </Grid> */}

      <Grid mt={2} container alignItems='center'>
        <Grid item xs={4}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography> {intl.formatMessage(messages.company)}: </Typography>
            <Typography fontWeight='bold'>{item.employeeId}</Typography>
            <Typography fontWeight='bold'>-</Typography>
            <Typography fontWeight='bold'>{item.employeeName}</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer>
        <Table size='small' sx={{ my: 2 }}>
          <TableHead>
            <StyledTableThRow>
              <StyledTableThCell align='center' rowSpan={2}>
                {intl.formatMessage(messages.allowances)}
              </StyledTableThCell>

              <StyledTableThCell align='center' rowSpan={2}>
                {intl.formatMessage(messages.value)}
              </StyledTableThCell>

              {formInfo.isShowEffectElements && (
                <StyledTableThCell align='center' rowSpan={2}>
                  {intl.formatMessage(messages.originalValue)}
                </StyledTableThCell>
              )}

              <StyledTableThCell align='center' rowSpan={2}>
                {intl.formatMessage(messages.deductions)}
              </StyledTableThCell>

              <StyledTableThCell align='center' rowSpan={2}>
                {intl.formatMessage(messages.value)}
              </StyledTableThCell>

              {formInfo.isShowEffectElements && (
                <StyledTableThCell align='center' rowSpan={2}>
                  {intl.formatMessage(messages.originalValue)}
                </StyledTableThCell>
              )}

              {formInfo.showReferenceElements && (
                <>
                  <StyledTableThCell align='center' rowSpan={2}>
                    {intl.formatMessage(messages.refranceElements)}
                  </StyledTableThCell>

                  <StyledTableThCell align='center' rowSpan={2}>
                    {intl.formatMessage(messages.value)}
                  </StyledTableThCell>
                </>
              )}
            </StyledTableThRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: maxRows }).map((_, index) => {
              const allownace = item.allownace[index];
              const deduction = item.deductions[index];
              const refElement = item.refElements[index];

              return (
                <TableRow key={index}>
                  <StyledTableCell component='th' scope='row' align='center'>
                    {allownace?.elementName}
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    {allownace && formatNumber(allownace.elemValCalc)}
                  </StyledTableCell>

                  {formInfo.isShowEffectElements && (
                    <StyledTableCell align='center'>
                      {allownace && formatNumber(allownace.elemVal)}
                    </StyledTableCell>
                  )}

                  <StyledTableCell component='th' scope='row' align='center'>
                    {deduction?.elementName}
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    {deduction && formatNumber(deduction.elemValCalc)}
                  </StyledTableCell>

                  {formInfo.isShowEffectElements && (
                    <StyledTableCell align='center'>
                      {deduction && formatNumber(deduction.elemVal)}
                    </StyledTableCell>
                  )}

                  {formInfo.showReferenceElements && (
                    <>
                      <StyledTableCell
                        component='th'
                        scope='row'
                        align='center'
                      >
                        {refElement?.elementName}
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                        {refElement && formatNumber(refElement.elemValCalc)}
                      </StyledTableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container alignItems='center'>
        <Grid item xs={4}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography>
              {intl.formatMessage(messages.totalAllownace)}:
            </Typography>
            <Typography fontWeight='bold'>
              {formatNumber(item.totalAllownace)}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography>
              {intl.formatMessage(messages.totalDeduction)} :
            </Typography>
            <Typography fontWeight='bold'>
              {formatNumber(item.totalDeduction)}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography> {intl.formatMessage(messages.net)}: </Typography>
            <Typography variant='subtitle1' fontWeight='bold'>
              {formatNumber(item.net)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Typography
        fontWeight='bold'
        textAlign='center'
        sx={{ textDecoration: 'underline', mt: 2, mb: 3 }}
      >
        {formInfo.notes}
      </Typography>
    </>
  );
}

PaymentReportItem.propTypes = {
  item: PropTypes.object.isRequired,
  formInfo: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PaymentReportItem);
