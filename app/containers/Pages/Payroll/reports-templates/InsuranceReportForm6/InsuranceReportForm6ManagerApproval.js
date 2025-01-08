import {
  Box,
  Grid,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import BlackDivider from './components/InsuranceReportForm6Divider';

const StyledTableThCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
  lineHeight: '1.1rem',
}));

const StyledTableCell = styled(TableCell)(() => ({
  border: '1px solid black',
  padding: '3px',
}));

function InsuranceReportForm6ManagerApproval() {
  return (
    <>
      <BlackDivider label='إقــرار المدير المسئول في حالة وجود نزاع' />

      <Typography fontWeight='bold'>
        أقــر أن البيانات بعالية صحيحة وإنني أرسلت صورة من هذا الإخطار إلى
        المؤمن عليه بخطاب موصى عليه بعلم
      </Typography>

      <Stack direction='row' alignItems='center' gap={1}>
        <Typography fontWeight='bold'>الوصول برقم</Typography>

        <Typography fontWeight='bold'>.............................</Typography>

        <Stack direction='row' alignItems='center' gap={1}>
          <Typography fontWeight='bold'>بتاريخ</Typography>
          <Typography fontWeight='bold'></Typography>
          <Typography fontWeight='bold'>/</Typography>
          <Typography fontWeight='bold'></Typography>
          <Typography fontWeight='bold'>/</Typography>
          <Typography fontWeight='bold'>٢٠</Typography>
        </Stack>
      </Stack>

      <Grid container my={3} alignItems='center'>
        <Grid item xs={6}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            style={{
              width: 120,
              height: 50,
              border: '1px solid #000',
              borderRadius: '50%',
            }}
          >
            <Typography fontWeight='bold'>خاتـــم الجهــة</Typography>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography fontWeight='bold'> توقيع المدير المسئول </Typography>

            <Typography fontWeight='bold'>
              .............................
            </Typography>

            <Stack direction='row' alignItems='center' gap={1}>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'></Typography>
              <Typography fontWeight='bold'>/</Typography>
              <Typography fontWeight='bold'>٢٠</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Box
        style={{
          borderTop: '1px solid #000',
          margin: '5px 0',
        }}
      />

      <Table size='small' style={{ margin: 1 }}>
        <TableHead>
          <TableRow>
            <StyledTableThCell align='center'>البيان</StyledTableThCell>
            <StyledTableThCell align='center'>مستلم الاخطار</StyledTableThCell>
            <StyledTableThCell align='center'>المراجع</StyledTableThCell>
            <StyledTableThCell align='center'>مسجل الي</StyledTableThCell>
            <StyledTableThCell align='center'>مراجع الي</StyledTableThCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>
              الاسم
            </StyledTableCell>

            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
          </TableRow>

          <TableRow>
            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>
              التوقيع
            </StyledTableCell>

            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
          </TableRow>

          <TableRow>
            <StyledTableCell align='center' style={{ fontWeight: 'bold' }}>
              التاريخ
            </StyledTableCell>

            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
            <StyledTableCell />
          </TableRow>
        </TableBody>
      </Table>

      <Box
        style={{
          borderTop: '1px solid #000',
          margin: '5px 0',
        }}
      />

      <Stack direction='row' alignItems='center' gap={1} flexWrap='wrap'>
        <Typography
          fontWeight='bold'
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          ملحوظة:
        </Typography>
        <Typography fontWeight='bold'>
          يلزم التأكد من توقيع كل من العامل وصاحب العمل على الإقرار الموضح خلف
          الاستمارة.
        </Typography>
      </Stack>

      <Typography fontWeight='bold' mt={1}>
        (أنظــر خلفه){' '}
      </Typography>
    </>
  );
}

export default InsuranceReportForm6ManagerApproval;
