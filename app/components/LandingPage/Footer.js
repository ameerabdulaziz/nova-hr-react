import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from 'enl-images/logo.png';
import brand from 'enl-api/dummy/brand';
import link from 'enl-api/ui/link';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './landingStyle-jss';

let counter = 0;
function createData(name, url) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Footer() {
  const menuList = [
    createData('feature', '#feature'),
    createData('showcase', '#showcase'),
    createData('technology', '#tech'),
    createData('contact', '#contact'),
  ];

  const { classes } = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.spaceContainer}>
          <div className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </div>
          <nav>
            <ul>
              { menuList.map(item => (
                <li key={item.id.toString()}>
                  <Button size="small" href={item.url}><FormattedMessage {...messages[item.name]} /></Button>
                </li>
              )) }
            </ul>
          </nav>
        </div>
      </div>
      <div className={classes.copyright}>
        <div className={classes.container}>
          <p>
            &copy; 2023&nbsp;
            {brand.name}
            {' '}
            <FormattedMessage {...messages.copyright} />
            {' '}
          </p>
          <span>
            <IconButton
              color="primary"
              className={classes.button}
              href={link.twitter}
              target="_blank"
              size="large">
              <i className="ion-logo-google" />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.button}
              href={link.pinterest}
              target="_blank"
              size="large">
              <i className="ion-logo-pinterest" />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.button}
              href={link.github}
              target="_blank"
              size="large">
              <i className="ion-logo-github" />
            </IconButton>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default injectIntl(Footer);
