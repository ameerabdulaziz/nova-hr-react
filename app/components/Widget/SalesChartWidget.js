import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import Computer from '@mui/icons-material/Computer';
import Toys from '@mui/icons-material/Toys';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Style from '@mui/icons-material/Style';
import Typography from '@mui/material/Typography';
import colorfull from 'enl-api/palette/colorfull';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart, Pie, Cell,
  Legend
} from 'recharts';
import { dataSales } from 'enl-api/chart/chartData';
import { data2 } from 'enl-api/chart/chartMiniData';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  purple, blue, cyan, pink
} from '@mui/material/colors';
import messages from './messages';
import useStyles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

const color = ({
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
});

const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];

function SalesChartWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  return (
    <PapperBlock whiteBg noMargin title={intl.formatMessage(messages.product_title)} icon="bar_chart" desc="">
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <ul className={classes.bigResume}>
            <li>
              <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                <LocalLibrary />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.pinkText}>4321</span>
                <Typography>
                  <FormattedMessage {...messages.fashions} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                <Computer />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.purpleText}>9876</span>
                <Typography>
                  <FormattedMessage {...messages.electronics} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.blueAvatar)}>
                <Toys />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.blueText}>345</span>
                <Typography>
                  <FormattedMessage {...messages.toys} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.tealAvatar)}>
                <Style />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.tealText}>1021</span>
                <Typography>
                  <FormattedMessage {...messages.vouchers} />
                </Typography>
              </Typography>
            </li>
          </ul>
          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={800} height="80%">
                <BarChart
                  data={dataSales}
                >
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <CartesianAxis />
                  <Tooltip />
                  <Bar dataKey="Fashions" fill={color.primary} />
                  <Bar dataKey="Electronics" fill={color.secondary} />
                  <Bar dataKey="Toys" fill={color.third} />
                  <Bar dataKey="Vouchers" fill={color.fourth} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <CardGiftcard className={classes.leftIcon} />
            <FormattedMessage {...messages.today_sales} />
          </Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.secondaryWrap}>
            <PieChart width={300} height={300}>
              <Pie
                data={data2}
                cx={150}
                cy={100}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                fill="#FFFFFF"
                paddingAngle={5}
                label
              >
                {
                  data2.length>0 && data2.map((entry, index) => <Cell key={index.toString()} fill={colorsPie[index % colorsPie.length]} />)
                }
              </Pie>
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            </PieChart>
          </Grid>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

SalesChartWidget.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(SalesChartWidget);
