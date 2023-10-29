import React, { useState, useCallback, useEffect } from "react";
import css from "enl-styles/Table.scss";
import {
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
} from "@mui/material";
import Payrollmessages from "../../../messages";
import messages from "../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../../../Style";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function ControlParamvac(props) {
  const { intl, dataList, setdataList } = props;
  const { classes, cx } = useStyles();

  const handleChange = (event, row) => {
    setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "AfterFromDate") {
            x.fromMin = event.target.checked;
          }
          if (event.target.name == "InFromDate") {
            x.toMin = event.target.checked;
          }
          if (event.target.name == "AfterDaysNo") {
            x.factor = event.target.value;
          }
          if (event.target.name == "BeforeD") {
            x.factor = event.target.value;
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
                    <FormattedMessage {...Payrollmessages.id} />
                  </TableCell>
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
                        key={row.id}
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
                          {row.id}
                        </TableCell>
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
                            id="InFromDate"
                            name="InFromDate"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.InFromDate}
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
                            id="AfterFromDate"
                            name="AfterFromDate"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.AfterFromDate}
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
                            id="AfterDaysNo"
                            name="AfterDaysNo"
                            value={row.AfterDaysNo}
                            onChange={(e) => handleChange(e, row)}
                            label={""}
                            variant="outlined"
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
                            id="BeforeD"
                            name="BeforeD"
                            value={row.BeforeD}
                            onChange={(e) => handleChange(e, row)}
                            label={""}
                            variant="outlined"
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
