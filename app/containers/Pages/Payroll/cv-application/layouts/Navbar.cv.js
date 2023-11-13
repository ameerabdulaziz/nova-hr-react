import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  Grid,
  IconButton
} from '@mui/material';
import LocaleToggle from 'containers/LocaleToggle';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarCV(props) {
  const { config, theme, changeTheme } = props;

  const getLogoUrl = () => {
    if (typeof config.logo !== 'string' && config.logo) {
      return URL.createObjectURL(config.logo);
    }

    return config.logo;
  };

  return (
    <nav className='cv-navbar'>
      <div className='cv-container'>
        <Grid
          container
          py={2}
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item xs={3}>
            <Link to='/public/JobVacation/'>
              <img src={getLogoUrl()} alt={config.companyName} className='logo' />
            </Link>
          </Grid>

          <Grid item>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <IconButton className='theme-icon' onClick={changeTheme}>
                  {theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Grid>

              <Grid item>
                <LocaleToggle />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </nav>
  );
}

NavbarCV.propTypes = {
  config: PropTypes.object.isRequired,
  changeTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default NavbarCV;
