import { Chip, Divider, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const BlackDivider = styled(Divider)(() => ({
  marginTop: 15,
  marginBottom: 15,
  '&::before': {
    borderColor: '#000',
  },
  '&::after': {
    borderColor: '#000',
  },
}));

function InsuranceReportForm6Divider(props) {
  const { label } = props;

  return (
    <BlackDivider>
      <Chip
        label={label}
        size='small'
        variant='outlined'
        style={{
          padding: '0 30px',
          borderRadius: 6,
          borderColor: '#000',
          fontWeight: 'bold',
        }}
      />
    </BlackDivider>
  );
}

InsuranceReportForm6Divider.propTypes = {
  label: PropTypes.string,
};

export default InsuranceReportForm6Divider;
