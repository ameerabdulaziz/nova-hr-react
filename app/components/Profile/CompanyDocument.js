import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import PapperBlock from '../PapperBlock/PapperBlock';
import messages from './messages';
import useStyles from './profile-jss';

function CompanyDocument(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  return (
    <Grid
      container
      alignItems='flex-start'
      justifyContent='space-between'
      direction='row'
      spacing={2}
      className={classes.rootx}
    >
      <Grid item md={6} xs={12}>
        <PapperBlock
          title={intl.formatMessage(messages.hrDocuments)}
          icon='supervisor_account'
          whiteBg
          desc=''
        >
          <List dense className={classes.profileList}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.orangeAvatar)}>
                  H
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Harry Wells'
                secondary='2 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                  J
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='John DOe'
                secondary='8 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                  V
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Victor Wanggai'
                secondary='12 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.greenAvatar)}>
                  H
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Baron Phoenix'
                secondary='10 Mutual Connection'
              />
            </ListItem>
          </List>
        </PapperBlock>
      </Grid>

      <Grid item md={6} xs={12}>
        <PapperBlock
          title={intl.formatMessage(messages.policyDocuments)}
          icon='supervisor_account'
          whiteBg
          desc=''
        >
          <List dense className={classes.profileList}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.orangeAvatar)}>
                  H
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Harry Wells'
                secondary='2 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                  J
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='John DOe'
                secondary='8 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                  V
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Victor Wanggai'
                secondary='12 Mutual Connection'
              />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={cx(classes.avatar, classes.greenAvatar)}>
                  H
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Baron Phoenix'
                secondary='10 Mutual Connection'
              />
            </ListItem>
          </List>
        </PapperBlock>
      </Grid>
    </Grid>
  );
}

CompanyDocument.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompanyDocument);
