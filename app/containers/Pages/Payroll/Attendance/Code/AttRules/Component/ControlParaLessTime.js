import React from "react";
import css from "enl-styles/Table.scss";
import {
  Button,
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import style from "../../../../../../../styles/styles.scss";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

const ControlParaLessTime = (props) => {
  const { classes, cx } = useStyles();

  const { intl, dataList, setdataList, handleClose, open, data, setdata } =
    props;

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
        minusMinutes: "",
        ControParaId: dataList.length > 0 ? dataList[0].ControParaId : 0,
      },
    ]);
  };

  const handleRadioChange = (event) => {
    
    if (event.target.name == "lessTime")
      setdata((prevFilters) => ({
        ...prevFilters,
        lessTimeRule: event.target.value,
      }));
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
          if (event.target.name == "minusMinutes") {
            x.minusMinutes = event.target.value;
          }
        }
        return x;
      })
    );
  };
  return (
    <div>
      <Dialog
        open={open}
        PaperProps={{
          overflowy: "clip !important",
        }}
        maxWidth="md"
        onClose={handleClose}
      >
        <DialogContent>
          <Grid container spacing={3} alignItems="flex-start" direction="row">
            <Grid item xs={6} md={3}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleAdd}
              >
                <FormattedMessage {...Payrollmessages.add} />
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>
              <FormControl variant="standard" component="fieldset" required>
                <RadioGroup row
                  name="lessTime"
                  aria-label="Direction"
                  value={data.lessTimeRule || null}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={intl.formatMessage(messages.daily)}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={intl.formatMessage(messages.monthly)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={12}>
              <div
                className={cx(
                  css.tableCrud,
                  classes.stripped,
                  classes.rootTable
                )}
              >
                <TableContainer style={{ maxHeight: 420 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                          <FormattedMessage {...messages.minusMinutes} />
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
                                <TextField
                                  style={{ width: "50px" }}
                                  id="fromMin"
                                  name="fromMin"
                                  value={row.fromMin}
                                  onChange={(e) => handleChange(e, row)}
                                  label={""}
                                  variant="outlined"
                                  autoComplete="off"
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
                                  autoComplete="off"
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
                                  autoComplete="off"
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
                                  id="minusMinutes"
                                  name="minusMinutes"
                                  value={row.minusMinutes}
                                  onChange={(e) => handleChange(e, row)}
                                  label={""}
                                  variant="outlined"
                                  autoComplete="off"
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
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={handleClose}>
            <FormattedMessage {...Payrollmessages.cancel} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
            onClick={() => {
              handleClose();
            }}
          >
            <FormattedMessage {...Payrollmessages.save} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default injectIntl(ControlParaLessTime);
