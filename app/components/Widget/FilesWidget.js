import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import imgData from 'enl-api/images/imgData';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from './messages';
import useStyles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';
import {
  MaritalStatusWidget,OrganizationWidget
} from "enl-components";

function FilesWidget(props) {
  const { intl } = props;
  const { classes } = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item md={4} sm={12} xs={12}>
        <MaritalStatusWidget />
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <OrganizationWidget />
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
      <MaritalStatusWidget />
      </Grid>
    </Grid>
  );
}

FilesWidget.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(FilesWidget);
