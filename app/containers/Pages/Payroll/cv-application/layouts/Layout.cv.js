import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Footer from './Footer.cv';
import Navbar from './Navbar.cv';

import './styles.cv.css';

const CONFIG = {
  logo: 'https://base-tailwind.preview.uideck.com/images/logo-light.svg',
  description:
    'Join with 5000+ Startups Growing with Base, It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.',
  email: ' example@gmail.com',
  phone: '01015081861',
  title: 'Base',
};

function CVApplicationLayout(props) {
  const { changeMode } = props;

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
    <div className='cv-layout'>
      <Navbar config={CONFIG} theme={theme} changeTheme={changeTheme} />

      {props.children}

      <Footer config={CONFIG} />
    </div>
  );
}

CVApplicationLayout.propTypes = {
  children: PropTypes.element.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default CVApplicationLayout;
