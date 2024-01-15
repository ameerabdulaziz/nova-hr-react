import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import GraphicEq from '@mui/icons-material/GraphicEq';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { injectIntl, FormattedMessage } from 'react-intl';
import 'enl-styles/vendors/rechart/styles.css';

import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';

import colorfull from 'enl-api/palette/colorfull';
import messages from './messages';
import useStyles from './widget-jss';
import { PapperBlock } from "enl-components";

const color = ({
  main: colorfull[2],
  secondary: colorfull[3],
  third: colorfull[0],
  fourth: colorfull[1],
});


export const dataCrypto = [
  {
    name: '2018',
    Tax: 40,
    MedicalInsurance: 124,
    OverTime: 17,
    SocialInsurance: 20,
    gross: 17,
    net: 20
  },
  {
    name: '2019',
    Tax: 45,
    MedicalInsurance: 100,
    OverTime: 2,
    SocialInsurance: 100,
    gross: 2,
    net: 100
  },
  {
    name: '2020',
    Tax: 27,
    MedicalInsurance: 20,
    OverTime: 0,
    SocialInsurance: 80,
    gross: 0,
    net: 80
  },
  {
    name: '2021',
    Tax: 50,
    MedicalInsurance: 120,
    OverTime: 29,
    SocialInsurance: 14,
    gross: 29,
    net: 14

  },
  {
    name: '2022',
    Tax: 32,
    MedicalInsurance: 117,
    OverTime: 20,
    SocialInsurance: 86,
    gross: 20,
    net: 86
  },
  {
    name: '2023',
    Tax: 50,
    MedicalInsurance: 34,
    OverTime: 11,
    SocialInsurance: 29,
    gross: 11,
    net: 29
  },
  {
    name: '2024',
    Tax: 50,
    MedicalInsurance: 120,
    OverTime: 29,
    SocialInsurance: 14,
    gross: 29,
    net: 14
  },
];
function SalaryYearlyWidget(props) {
  const [coin, setCoin] = useState('BTC');
  const [checked, setChecked] = useState(['OverTime', 'SocialInsurance', 'MedicalInsurance', 'Tax']);

  const handleChange = event => {
    setCoin(event.target.value);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { intl } = props;
  const { classes } = useStyles();

  return (
    <PapperBlock
      whiteBg
      noMargin
      title={""}
      desc=""
    >
      
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>  
        <Typography className={classes.smallTitle} variant="button">
            <StackedLineChartIcon className={classes.leftIcon} />
            <FormattedMessage {...messages.yearlySal} />
          </Typography>
          <Divider className={classes.divider} />       
          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={780} height="100%">
                <ComposedChart
                  data={dataCrypto}
                >
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar stackId="2" barSize={10} fillOpacity="0.8" dataKey="gross" fill={color.secondary} />
                  <Bar stackId="5" barSize={10} fillOpacity="0.8" dataKey="net" fill={color.third} />
                  { checked.indexOf('Tax') > -1 && <Line type="monotone" stackId="4" dataKey="Tax" strokeWidth={2} stroke={color.main} /> }
                  { checked.indexOf('MedicalInsurance') > -1 && <Line type="monotone" stackId="3" dataKey="MedicalInsurance" strokeWidth={2} stroke={color.third} /> }
                  { checked.indexOf('OverTime') > -1 && <Area type="monotone" stackId="1" dataKey="OverTime" stroke={color.fourth} fill={color.fourth} /> }
                  { checked.indexOf('SocialInsurance') > -1 && <Area type="monotone" stackId="6" dataKey="SocialInsurance" stroke={color.main} fill={color.secondary} /> }
                  <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <GraphicEq className={classes.leftIcon} />
            <FormattedMessage {...messages.chartIndicator} />
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.root}>
            <List component="nav">
              <ListItem
                role={undefined}
                dense
                button
                onClick={handleToggle('OverTime')}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf('OverTime') !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="OverTime" />
              </ListItem>
              <ListItem
                role={undefined}
                dense
                button
                onClick={handleToggle('Tax')}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf('Tax') !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Tax" />
              </ListItem>
              <ListItem
                role={undefined}
                dense
                button
                onClick={handleToggle('SocialInsurance')}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf('SocialInsurance') !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Social Insurance" />
              </ListItem>
              <ListItem
                role={undefined}
                dense
                button
                onClick={handleToggle('MedicalInsurance')}
                className={classes.listItem}
              >
                <Checkbox
                  checked={checked.indexOf('MedicalInsurance') !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Medical Insurance"  />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

SalaryYearlyWidget.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(SalaryYearlyWidget);
