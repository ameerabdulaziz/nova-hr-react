import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import useStyles from '../../../../../components/Profile/profile-jss';
import PayRollLoader from '../../Component/PayRollLoader';
import { ServerURL } from '../../api/ServerConfig';
import API from '../api';
import messages from '../messages';

function CompanyDocument(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(true);
  const [documentInfo, setDocumentInfo] = useState({
    hrForm: [],
    companyPolicy: [],
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const info = await API(locale).GetEmployeeDocList();
      setDocumentInfo(info);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const renderDocumentList = (documents = [], color = 'orangeAvatar') => {
    if (documents.length === 0) {
      return (
        <Stack
          direction='row'
          sx={{ minHeight: 200 }}
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Box>
            <DescriptionIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
            <Typography color='#a7acb2' variant='body1'>
              {intl.formatMessage(messages.noDocuments)}
            </Typography>
          </Box>
        </Stack>
      );
    }

    return (
      <List dense className={classes.profileList}>
        {documents.map((item) => (
          <ListItem
            button
            disabled={!item.docPath}
            component='a'
            target='_blank'
            href={`${ServerURL}Doc/CompanyDoc/${item.docPath}`}
            key={item.id}
          >
            <ListItemAvatar>
              <Avatar className={cx(classes.avatar, classes[color])}>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={item.docType}
              secondary={item.categoryName}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <PayRollLoader isLoading={isLoading}>
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
            {renderDocumentList(documentInfo.hrForm)}
          </PapperBlock>
        </Grid>

        <Grid item md={6} xs={12}>
          <PapperBlock
            title={intl.formatMessage(messages.policyDocuments)}
            icon='supervisor_account'
            whiteBg
            desc=''
          >
            {renderDocumentList(documentInfo.companyPolicy, 'purpleAvatar')}
          </PapperBlock>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

CompanyDocument.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompanyDocument);
