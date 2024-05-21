import React from "react";
import css from "enl-styles/Table.scss";
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Payrollmessages from "../../../../messages";
import messages from "../../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../../../../Style";

function ControlParamvac(props) {
  const { intl, dataList, setdataList } = props;
  const { classes, cx } = useStyles();

  const handleChange = (event, row) => {
    setdataList(
      dataList.map((x) => {
        
        if (x.vacationId == row.vacationId) {
          if (event.target.name == "afterFromDate") {
            x.afterFromDate = event.target.checked;
          }
          if (event.target.name == "inFromDate") {
            x.inFromDate = event.target.checked;
          }
          if (event.target.name == "afterDaysNo") {
            x.afterDaysNo = event.target.value;
          }
          if (event.target.name == "beforeD") {
            x.beforeD = event.target.value;
          }
        }
        return x;
      })
    );
  };

  return (
    <Grid container spacing={3} alignItems="flex-start" direction="row">
      <Grid item xs={6} md={12}>
        <label
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginRight: "30px",
          }}
        >
          {intl.formatMessage(messages.Vacparam)}
        </label>
      </Grid>
      <Grid item xs={6} md={12}>
        <div className={cx(css.tableCrud, classes.stripped, classes.rootTable)}>
          <TableContainer style={{ maxHeight: 420 }}>
            <Table>
              <TableHead>
                <TableRow>
                  
                  <TableCell
                    style={{
                      width: "5px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...Payrollmessages.VacationName} />
                  </TableCell>
                  
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.InFromDate} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.AfterFromDate} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.AfterDaysNo} />
                  </TableCell>

                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.BeforeD} />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.length !== 0 &&
                  dataList.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.vacationId}
                        sx={{ height: 1 }}
                        style={{ padding: "0px" }}
                      >
                        <TableCell
                          style={{
                            width: "5px",
                            padding: "0px",
                            textAlign: "center",
                          }}
                        >
                          {row.vacationName}
                        </TableCell>

                        <TableCell
                          style={{
                            width: "5px",
                            padding: "0px",
                            textAlign: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            id="inFromDate"
                            name="inFromDate"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.inFromDate}
                          />
                        </TableCell>

                        <TableCell
                          style={{
                            width: "5px",
                            padding: "0px",
                            textAlign: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            id="afterFromDate"
                            name="afterFromDate"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.afterFromDate}
                          />
                        </TableCell>

                        <TableCell
                          style={{
                            width: "5px",
                            padding: "0px",
                            textAlign: "center",
                          }}
                        >
                          <TextField
                            style={{ width: "50px" }}
                            id="afterDaysNo"
                            name="afterDaysNo"
                            value={row.afterDaysNo}
                            onChange={(e) => handleChange(e, row)}
                            label={""}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </TableCell>

                        <TableCell
                          style={{
                            width: "5px",
                            padding: "0px",
                            textAlign: "center",
                          }}
                        >
                          <TextField
                            style={{ width: "50px" }}
                            id="beforeD"
                            name="beforeD"
                            value={row.beforeD}
                            onChange={(e) => handleChange(e, row)}
                            label={""}
                            variant="outlined"
                            autoComplete='off'
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
}

export default injectIntl(ControlParamvac);
