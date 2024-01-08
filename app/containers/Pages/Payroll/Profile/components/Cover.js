import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import useStyles from '../../../../../components/Profile/cover-jss';

function Cover(props) {
  const { classes } = useStyles();
  const {
    avatar, name, desc, coverImg
  } = props;

  return (
    <div
      className={classes.cover}
      style={{ backgroundImage: `url(${coverImg})` }}
    >
      <div className={classes.content}>
        <Avatar alt={name} src={avatar} className={classes.avatar} />

        <Typography variant='h4' className={classes.name} gutterBottom>
          {name}
        </Typography>

        <Typography className={classes.subheading} gutterBottom>
          {desc}
        </Typography>
      </div>
    </div>
  );
}

Cover.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
};

export default injectIntl(Cover);
