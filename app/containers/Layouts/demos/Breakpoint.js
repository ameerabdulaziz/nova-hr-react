import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Hidden from '@mui/material/Hidden';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing(1),
  },
  divider: {
    margin: `${theme.spacing(3)} 0`,
  }
}));

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function Breakpoint() {
  const { classes } = useStyles();
  const width = useWidth();

  return (
    <div className={classes.root}>
      {/* Breakpoin up block */}
      <Typography variant="h5">Breakpoint up</Typography>
      <Typography gutterBottom noWrap>
        Using any breakpoint up property, the given children will be hidden at or above the breakpoint.
      </Typography>
      <div className={classes.container}>
        <Hidden xsUp>
          <Paper className={classes.paper}>xsUp</Paper>
        </Hidden>
        <Hidden smUp>
          <Paper className={classes.paper}>smUp</Paper>
        </Hidden>
        <Hidden mdUp>
          <Paper className={classes.paper}>mdUp</Paper>
        </Hidden>
        <Hidden lgUp>
          <Paper className={classes.paper}>lgUp</Paper>
        </Hidden>
        <Hidden xlUp>
          <Paper className={classes.paper}>xlUp</Paper>
        </Hidden>
      </div>
      <Typography variant="caption" gutterBottom align="center">
        Current width:&nbsp;
        {width}
      </Typography>
      <Divider className={classes.divider} />
      {/* Breakpoin down block */}
      <Typography variant="h5">Breakpoint down</Typography>
      <Typography gutterBottom noWrap>
        Using any breakpoint down property, the given children will be hidden at or below the breakpoint.
      </Typography>
      <div className={classes.container}>
        <Hidden mdDown>
          <Paper className={classes.paper}>xsDown</Paper>
        </Hidden>
        <Hidden lgDown>
          <Paper className={classes.paper}>smDown</Paper>
        </Hidden>
        <Hidden smDown>
          <Paper className={classes.paper}>mdDown</Paper>
        </Hidden>
        <Hidden smDown>
          <Paper className={classes.paper}>lgDown</Paper>
        </Hidden>
        <Hidden smDown>
          <Paper className={classes.paper}>xlDown</Paper>
        </Hidden>
      </div>
      <Typography variant="caption" gutterBottom align="center">
        Current width:&nbsp;
        {width}
      </Typography>
      <Divider className={classes.divider} />
      {/* Breakpoin only block */}
      <Typography variant="h5">Breakpoint only</Typography>
      <Typography gutterBottom noWrap>
        Using the breakpoint only property, the given children will be hidden at the specified breakpoint(s).
      </Typography>
      <div className={classes.container}>
        <Hidden only="lg">
          <Paper className={classes.paper}>Hidden on lg</Paper>
        </Hidden>
        <Hidden only="sm">
          <Paper className={classes.paper}>Hidden on sm</Paper>
        </Hidden>
        <Hidden only={['sm', 'lg']}>
          <Paper className={classes.paper}>Hidden on sm and lg</Paper>
        </Hidden>
      </div>
      <Typography variant="caption" gutterBottom align="center">
        Current width:&nbsp;
        <span>{`width: ${width}`}</span>;
      </Typography>
    </div>
  );
}

export default Breakpoint;
