import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import shape03 from '../assets/images/icons/shape-03.svg';
import shape06 from '../assets/images/icons/shape-06.svg';
import shape07 from '../assets/images/icons/shape-07.svg';
import shape12 from '../assets/images/icons/shape-12.svg';
import shape13 from '../assets/images/icons/shape-13.svg';

function Section(props) {
  return (
    <section
      className={`cv-section ${
        props.title && props.description ? '' : 'reduce-padding'
      } `}
    >
      <div className='shapes'>
        <img src={shape03} alt='shape-03' className='shape-03' />
        <img src={shape06} alt='shape-06' className='shape-06' />
        <img src={shape07} alt='shape-07' className='shape-07' />
        <img src={shape12} alt='shape-12' className='shape-12' />
        <img src={shape13} alt='shape-13' className='shape-13' />
      </div>

      <Grid container justifyContent='center'>
        <Grid item textAlign='center' md={5}>
          <Typography variant='h3' fontWeight='bold'>
            {props.title}
          </Typography>

          <Typography color='gray' mt={3}>
            {props.description}
          </Typography>
        </Grid>
      </Grid>

      {props.children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Section;
