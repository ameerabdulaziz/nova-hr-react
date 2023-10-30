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

function ControlParamLate(props) {
  const { intl, dataList, setdataList } = props;
  const { classes, cx } = useStyles();

  const handledelete = (event, row) => {
    setdataList(dataList.filter((x) => x.id != row.id));
  };

  const handleAdd = () => {
    setdataList((prev) => [
      ...prev,
      {
        id: dataList.length + 1,
        fromMin: "1",
        toMin: "1",
        factor: "",
        discTime: false,
        discValue: "",
        discPer: false,
        discPer: "",
        doneOnce: false,
        discPervalue: "",
        frstTime: "",
        secondTime: "",
        thirdTime: "",
        focusTime: "",
      },
    ]);
  };

  const handleChange = (event, row) => {
    setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "fromMin") {
            x.fromMin = event.target.value;
          }
          if (event.target.name == "toMin") {
            x.toMin = event.target.value;
          }
          if (event.target.name == "factor") {
            x.factor = event.target.value;
          }
          if (event.target.name == "discTime") {
            x.discTime = event.target.checked;
          }
          if (event.target.name == "discValue") {
            x.discValue = event.target.value;
          }
          if (event.target.name == "discPer") {
            x.discPer = event.target.checked;
          }
          if (event.target.name == "doneOnce") {
            x.doneOnce = event.target.checked;
          }
          if (event.target.name == "discPervalue") {
            x.discPervalue = event.target.value;
          }

          if (event.target.name == "frstTime") {
            x.frstTime = event.target.value;
          }
          if (event.target.name == "secondTime") {
            x.secondTime = event.target.value;
          }
          if (event.target.name == "thirdTime") {
            x.thirdTime = event.target.value;
          }
          if (event.target.name == "fourthTime") {
            x.fourthTime = event.target.value;
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
          {intl.formatMessage(messages.lateparam)}
        </label>

        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={handleAdd}
        >
          <FormattedMessage {...Payrollmessages.add} />
        </Button>
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
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.fromMin} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.toMin} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.factor} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.discTime} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.discValue} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.discPer} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.doneOnce} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.discPervalue} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.frstTime} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.secondTime} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.thirdTime} />
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <FormattedMessage {...messages.fourthTime} />
                  </TableCell>

                  <TableCell
                    style={{
                      width: "5px",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  ></TableCell>
                 
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
                          <TextField
                            style={{ width: "50px" }}
                            id="fromMin"
                            name="fromMin"
                            value={row.fromMin}
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
                            id="toMin"
                            name="toMin"
                            value={row.toMin}
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
                            id="factor"
                            name="factor"
                            value={row.factor}
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
                          <input
                            type="checkbox"
                            id="discTime"
                            name="discTime"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.discTime}
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
                            id="discValue"
                            name="discValue"
                            value={row.discValue}
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
                          <input
                            type="checkbox"
                            id="discPer"
                            name="discPer"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.discPer}
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
                            id="doneOnce"
                            name="doneOnce"
                            onChange={(e) => handleChange(e, row)}
                            checked={row.doneOnce}
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
                            id="discPervalue"
                            name="discPervalue"
                            value={row.discPervalue}
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
                            id="frstTime"
                            name="frstTime"
                            value={row.frstTime}
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
                            id="secondTime"
                            name="secondTime"
                            value={row.secondTime}
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
                            id="thirdTime"
                            name="thirdTime"
                            value={row.thirdTime}
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
                            id="fourthTime"
                            name="fourthTime"
                            value={row.fourthTime}
                            onChange={(e) => handleChange(e, row)}
                            label={""}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <IconButton
                            style={{ padding: "0px", margin: "0px" }}
                            className={classes.button}
                            aria-label="Delete"
                            size="large"
                            onClick={(e) => handledelete(e, row)}
                          >
                            <DeleteIcon />
                          </IconButton>
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

export default injectIntl(ControlParamLate);
