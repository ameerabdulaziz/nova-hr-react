import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Footer from './Footer.cv';
import Navbar from './Navbar.cv';

import './styles.cv.css';

function CVApplicationLayout(props) {
  const { changeMode, config, isLoading } = props;

  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      changeMode('light');
      document.body.classList.remove('cv-layout-dark');
    } else {
      setTheme('dark');
      changeMode('dark');
      document.body.classList.add('cv-layout-dark');
    }
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ minHeight: 500 }}></Box>
      ) : (
        <div className='cv-layout'>
          <Navbar config={config} theme={theme} changeTheme={changeTheme} />

          {props.children}

          <Footer config={config} />
        </div>
      )}
    </>
  );
}

CVApplicationLayout.propTypes = {
  children: PropTypes.element.isRequired,
  changeMode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
};

export default CVApplicationLayout;
