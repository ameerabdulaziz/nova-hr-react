import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { toArabicDigits } from '../../../helpers';

const BoxInput = styled(Box)(() => ({
  border: '1px solid black',
  position: 'relative',
  width: '20px',
  height: '20px',
  marginRight: '-1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:first-of-type': {
    marginRight: '0',
  },
  '&.divider': {
    border: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 10,
      left: -4,
      borderTop: '1px solid black',
      transform: 'rotate(45deg)',
      width: 28,
    },
  },
}));

function InsuranceReportForm6BoxInput(props) {
  const { count = 0, dividers, value } = props;

  const rows = useMemo(
    () => Array.from({
      length: count,
    }),
    [count]
  );

  if (!count) {
    return null;
  }

  return (
    <Stack direction='row'>
      {rows.map((_, index) => {
        const isDivider = dividers.includes(index);

        const text = isDivider || !value ? null : String(value)[index];

        return (
          <BoxInput
            key={index}
            className={isDivider ? 'divider' : ''}
          >
            {text && <Typography>{toArabicDigits(text)}</Typography>}
          </BoxInput>
        );
      })}
    </Stack>
  );
}

InsuranceReportForm6BoxInput.propTypes = {
  count: PropTypes.number.isRequired,
  dividers: PropTypes.array,
  value: PropTypes.number || PropTypes.string,
};

InsuranceReportForm6BoxInput.defaultProps = {
  dividers: [],
};

export default InsuranceReportForm6BoxInput;
