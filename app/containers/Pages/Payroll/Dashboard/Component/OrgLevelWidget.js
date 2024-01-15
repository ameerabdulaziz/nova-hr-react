import React from "react";

import { purple, blue, cyan, pink } from "@mui/material/colors";
import "enl-styles/vendors/react-weather/GenericWeather.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PapperBlock } from "enl-components";
import useStyles from "./fluidChart-jss";
import FilterCenterFocus from "@mui/icons-material/PieChart";
import Divider from "@mui/material/Divider";
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";

const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];
function OrgLevelWidget(props) {
  const { classes, cx } = useStyles();
  const data2 = [
    {
      name: 'Top Management',
      value: 400
    }, {
      name: 'Classified Emp',
      value: 300
    },
    {
      name: 'Middle Management',
      value: 300
    }, {
      name: 'Non  classified',
      value: 200
    }
  ];
  return (
    <PapperBlock whiteBg noMargin title={""} icon="timeline" desc="">
      <Grid item md={12} xs={12}>
        <Typography className={classes.smallTitle} variant="button">
          <FilterCenterFocus className={classes.leftIcon} />
          <FormattedMessage {...messages.orgchar} />
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.chartWrap}>
          <div className={classes.bichartFluid}>
            <ResponsiveContainer width={350} height="100%">
            <PieChart width={300} height={275}>
              <Pie
                data={data2}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                fill="#FFFFFF"
                paddingAngle={5}
                label
              >
                {
                  data2.map((entry, index) => <Cell key={index.toString()} fill={colorsPie[index % colorsPie.length]} />)
                }
              </Pie>
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Grid>
    </PapperBlock>
  );
}

export default OrgLevelWidget;
