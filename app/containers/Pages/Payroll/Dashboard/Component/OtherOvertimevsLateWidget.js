import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CardGiftcard from "@mui/icons-material/CardGiftcard";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import Computer from "@mui/icons-material/Computer";
import Toys from "@mui/icons-material/Toys";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Style from "@mui/icons-material/Style";
import Typography from "@mui/material/Typography";
import colorfull from "enl-api/palette/colorfull";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import useStyles from "./widget-jss";
import { PapperBlock } from "enl-components";
import Check from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import HotTubSharpIcon from "@mui/icons-material/HotTubSharp";
import AddCard from "@mui/icons-material/AddCard";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const color = {
  primary: colorfull[0],
  secondary: colorfull[1],
  third: colorfull[2],
  fourth: colorfull[3],
};

const dataSales = [
  {
    name: 'Mohamed wessam',
    overtime: 40,
    late: 124,
  },
  {
    name: 'Adballah Ahmed',
    overtime: 45,
    late: 100,
  },
  {
    name: 'Nermin Ahmed',
    overtime: 27,
    late: 20,
  },
  {
    name: 'shymaa abdelhameed',
    overtime: 50,
    late: 120,
  },
  {
    name: 'Beshoy Atef',
    overtime: 32,
    late: 117,
  },
  {
    name: 'Noha Abd Elbasset',
    overtime: 50,
    late: 34,
  },
  {
    name: 'Moaaz Mohamed',
    overtime: 24,
    late: 40,
  },
  {
    name: 'Malek Mohamed',
    overtime: 32,
    late: 117,
  },
  {
    name: 'Mrwan Mohamed',
    overtime: 40,
    late: 20,
  },
  {
    name: 'Ahmed Hanfy',
    overtime: 27,
    late: 20,
  },
  {
    name: 'Ahmed Eltokhey',
    overtime: 50,
    late: 113,
  },
  {
    name: 'Ahmed awad',
    overtime: 79,
    late: 101,
  },
];
function OtherOvertimevsLateWidget(props) {
  const { intl } = props;
  const { classes, cx } = useStyles();

  const locale = useSelector((state) => state.language.locale);
  return (
    <PapperBlock whiteBg noMargin title={""}>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <StackedLineChartIcon className={classes.leftIcon} />
            <FormattedMessage {...messages.OtherOvertimevsLateWidget} />
          </Typography>
          <Divider className={classes.divider} />

          <ul className={classes.bigResume}>
            <li>
              <Avatar className={cx(classes.avatar, classes.indigoAvatar)}>
                <HotTubSharpIcon />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.indigoText}>125</span>
                <Typography noWrap>
                  <FormattedMessage {...messages.Overtime} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.pinkAvatar)}>
                <CreditCardOffIcon />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.pinkText}>5</span>
                <Typography noWrap>
                  <FormattedMessage {...messages.penalty} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.tealAvatar)}>
                <AddCard />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.tealText}>8</span>
                <Typography noWrap>
                  <FormattedMessage {...messages.rewards} />
                </Typography>
              </Typography>
            </li>
            <li>
              <Avatar className={cx(classes.avatar, classes.orangeAvatar)}>
                <HomeSharpIcon />
              </Avatar>
              <Typography variant="h6">
                <span className={classes.orangeText}>40</span>
                <Typography noWrap>
                  <FormattedMessage {...messages.Vacations} />
                </Typography>
              </Typography>
            </li>
          </ul>

          <div className={classes.chartWrap}>
            <div className={classes.chartFluid}>
              <ResponsiveContainer width={780} height="100%">
                <BarChart data={dataSales} width={780} height={300}>
                  <XAxis dataKey="name" tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickSize={3}
                    tickLine={false}
                    tick={{ stroke: "none" }}
                  />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <CartesianAxis />
                  <Tooltip />
                  <Bar dataKey="overtime" fill={color.primary} />
                  <Bar dataKey="late" fill={color.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <Check className={classes.leftIcon} />
            <FormattedMessage {...messages.empwithWorstAtt} />
          </Typography>
          <Divider className={classes.divider} />

          <div className={classes.divnotification}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Nermen Ahmed" />

                <ListItemText
                  primary="90%"
                  className={
                    locale == "en"
                      ? cx(classes.textRight)
                      : cx(classes.textLeft)
                  }
                />
              </ListItem>
              <li className={cx(classes.paddingProgress)}>
                <LinearProgress
                  variant="determinate"
                  className={cx(classes.redProgress)}
                  value={90}
                />
              </li>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Ahmed Awad" />

                <ListItemText
                  primary="80%"
                  className={
                    locale == "en"
                      ? cx(classes.textRight)
                      : cx(classes.textLeft)
                  }
                />
              </ListItem>
              <li className={cx(classes.paddingProgress)}>
                <LinearProgress
                  variant="determinate"
                  className={cx(classes.redProgress)}
                  value={80}
                />
              </li>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Wessam Mohamed" />

                <ListItemText
                  primary="70%"
                  className={
                    locale == "en"
                      ? cx(classes.textRight)
                      : cx(classes.textLeft)
                  }
                />
              </ListItem>
              <li className={cx(classes.paddingProgress)}>
                <LinearProgress
                  variant="determinate"
                  className={cx(classes.redProgress)}
                  value={70}
                />
              </li>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Noha Abdelbaset" />

                <ListItemText
                  primary="70%"
                  className={
                    locale == "en"
                      ? cx(classes.textRight)
                      : cx(classes.textLeft)
                  }
                />
              </ListItem>
              <li className={cx(classes.paddingProgress)}>
                <LinearProgress
                  variant="determinate"
                  className={cx(classes.redProgress)}
                  value={70}
                />
              </li>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={cx(classes.avatar, classes.purpleAvatar)}>
                    <Check />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Shymaa Abdelhameed" />

                <ListItemText
                  primary="70%"
                  className={
                    locale == "en"
                      ? cx(classes.textRight)
                      : cx(classes.textLeft)
                  }
                />
              </ListItem>
              <li className={cx(classes.paddingProgress)}>
                <LinearProgress
                  variant="determinate"
                  className={cx(classes.redProgress)}
                  value={70}
                />
              </li>
            </List>
          </div>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

OtherOvertimevsLateWidget.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(OtherOvertimevsLateWidget);
