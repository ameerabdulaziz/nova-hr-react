import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Help from '@mui/icons-material/Help';
import Avatar from '@mui/material/Avatar';
import dummy from 'enl-api/dummy/dummyContents';
import avatarApi from 'enl-api/images/avatars';
import { injectIntl, FormattedMessage } from 'react-intl';
import { TextFieldRedux } from './ReduxFormMUI';
import messages from './messages';
import useStyles from './user-jss';

// validation functions
const required = value => (value === null ? <FormattedMessage {...messages.requiredForm} /> : undefined);

function LockForm(props) {
  const { classes } = useStyles();
  const {
    handleSubmit,
    pristine,
    submitting,
    intl
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShowHint = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className={classes.lockWrap}>
          <Avatar alt="John Doe" src={avatarApi[6]} className={classes.avatar} />
          <div>
            <Typography className={classes.userName} variant="h5">{dummy.user.name}</Typography>
            <div className={classes.lockForm}>
              <FormControl variant="standard" className={classes.lockField}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type="password"
                  label={intl.formatMessage(messages.loginFieldPassword)}
                  required
                  validate={required}
                  className={classes.field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Helper Hint" onClick={handleShowHint} size="large">
                          <Help />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
              <Fab size="small" color="secondary" type="submit" disabled={submitting || pristine}>
                <ArrowForward className={classes.signArrow} />
              </Fab>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.hint}>
                  <FormattedMessage {...messages.lockHint} />
                </Typography>
              </Popover>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

LockForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired
};

const LockFormReduxed = reduxForm({
  form: 'lockFrm',
  enableReinitialize: true,
})(LockForm);

export default injectIntl(LockFormReduxed);
