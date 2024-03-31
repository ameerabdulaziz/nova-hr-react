import { Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import messages from '../../messages';

import 'react-quill/dist/quill.snow.css';

const StyledTableThRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  pageBreakInside: 'avoid',
}));

const StyledTableThCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: '0 10px',
  border: '1px solid black',
  lineHeight: 1,
}));

const DepartmentTableWithoutIntl = (props) => {
  const { departmentList, intl } = props;

  return (
    <Table
      size='small'
      sx={{
        my: 0,
        'p.MuiTypography-root, .MuiTableCell-root': {
          color: '#000',
        },
      }}
    >
      <TableHead>
        <StyledTableThRow>
          <StyledTableThCell>
            {intl.formatMessage(messages.department)}
          </StyledTableThCell>
          <StyledTableThCell>
            {intl.formatMessage(messages.status)}
          </StyledTableThCell>
          <StyledTableThCell>
            {intl.formatMessage(messages.comment)}
          </StyledTableThCell>
        </StyledTableThRow>
      </TableHead>

      <TableBody>
        {departmentList.map((row, index) => (
          <TableRow key={index}>
            <StyledTableCell sx={{ height: '22px' }}>
              {row.departmentName}
            </StyledTableCell>
            <StyledTableCell>{row.status}</StyledTableCell>
            <StyledTableCell>{row.comment}</StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const CustodyTableWithoutIntl = (props) => {
  const { custodyList, intl } = props;

  return (
    <Table
      size='small'
      sx={{
        my: 0,
        'p.MuiTypography-root, .MuiTableCell-root': {
          color: '#000',
        },
      }}
    >
      <TableHead>
        <StyledTableThRow>
          <StyledTableThCell>
            {intl.formatMessage(messages.custodyName)}
          </StyledTableThCell>
          <StyledTableThCell>
            {intl.formatMessage(messages.receiver)}
          </StyledTableThCell>
          <StyledTableThCell>
            {intl.formatMessage(messages.status)}
          </StyledTableThCell>
        </StyledTableThRow>
      </TableHead>

      <TableBody>
        {custodyList.map((row, index) => (
          <TableRow key={index}>
            <StyledTableCell sx={{ height: '22px' }}>
              {row.custodyName}
            </StyledTableCell>
            <StyledTableCell>{row.reciever}</StyledTableCell>
            <StyledTableCell>{row.status}</StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const DepartmentTable = injectIntl(DepartmentTableWithoutIntl);

const CustodyTable = injectIntl(CustodyTableWithoutIntl);

function PrintableRow(props) {
  const { rowData } = props;
  const { model, printform } = rowData;

  const locale = useSelector((state) => state.language.locale);
  const company = useSelector((state) => state.authReducer.companyInfo);

  const parsedPrintContent = useMemo(() => {
    const departmentList = locale === 'en' ? model.evacuationEnList : model.evacuationList;
    const custodyList = locale === 'en' ? model.custodyEnList : model.custodyList;

    const replaceOptions = {
      replace(domNode) {
        if (
          custodyList.length === 0
          && domNode.type === 'text'
          && domNode.data === '@CustodyList@'
        ) {
          return <></>;
        }

        if (
          custodyList.length > 0
          && domNode.type === 'text'
          && domNode.data === '@CustodyList@'
        ) {
          return <CustodyTable custodyList={custodyList} />;
        }

        if (
          departmentList.length === 0
          && domNode.type === 'text'
          && domNode.data === '@EvacuationList@'
        ) {
          return <></>;
        }

        if (
          departmentList.length > 0
          && domNode.type === 'text'
          && domNode.data === '@EvacuationList@'
        ) {
          return <DepartmentTable departmentList={departmentList} />;
        }

        return '';
      },
    };

    return parse(printform, replaceOptions);
  }, [rowData]);

  return (
    <>
      <Stack spacing={2} px={2}>
        <div>
          <img src={company?.logo} alt='' height={45} />
        </div>
      </Stack>

      <div className='ql-snow'>
        <div className='ql-editor'>{parsedPrintContent}</div>
      </div>
    </>
  );
}

PrintableRow.propTypes = {
  rowData: PropTypes.shape({
    model: PropTypes.object.isRequired,
    printform: PropTypes.string.isRequired,
  }).isRequired,
};

DepartmentTableWithoutIntl.propTypes = {
  departmentList: PropTypes.arrayOf(PropTypes.object),
  intl: PropTypes.object.isRequired,
};

CustodyTableWithoutIntl.propTypes = {
  custodyList: PropTypes.arrayOf(PropTypes.object),
  intl: PropTypes.object.isRequired,
};

export default PrintableRow;
