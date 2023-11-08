import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from '../messages';

function FooterCV(props) {
  const { config, intl } = props;

  return (
    <footer className='cv-footer'>
      <div className='cv-container'>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Link to='/public/JobVacation/'>
              <img src={config.logo} alt='favicon' className='logo' />
            </Link>

            <Typography color='#A7ACB2' my={3}>
              {config.description}
            </Typography>

            <Typography color='#A7ACB2'>
              © 2023 {config.title}. {intl.formatMessage(messages.allRightReserved)}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant='h5' mb={3} fontWeight='normal'>
              {intl.formatMessage(messages.contact)}
            </Typography>

            <Typography fontWeight='bold'>
              {intl.formatMessage(messages.phone)}
            </Typography>

            <a title='Home' href={`tel:${config.phone}`} className='link'>
              {config.phone}
            </a>

            <Typography fontWeight='bold' mt={3}>
              {intl.formatMessage(messages.email)}
            </Typography>

            <a title='Home' href={`mailto:${config.email}`} className='link'>
              {config.email}
            </a>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

FooterCV.propTypes = {
  intl: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default injectIntl(FooterCV);
