import React, { memo,useState } from "react";
import css from "enl-styles/Table.scss";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import Payrollmessages from "../../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../../../Style";
import messages from "../../messages";
import ApiData from "../../api/LoanTrxData";
import { useSelector } from "react-redux";
import AlertPopup from "../../../Component/AlertPopup";
import { toast } from "react-hot-toast";

function LoanDetailTable(props) {
  const { intl, dataList, setdataList, isUpdate } = props;
  const { classes, cx } = useStyles();
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [ProcessId, setProcessId] = useState(1);
  const [selectedrow, setselectedrow] = useState(1);

  const locale = useSelector((state) => state.language.locale);

  const handleClickOpen = (Id, row) => {
    debugger;
    setOpenParentPopup(true);
    setProcessId(Id);
    setselectedrow(row);
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };

  async function doProcess() {
    if (ProcessId == 1) handlePost(selectedrow);
    else handleRecalculate(selectedrow);
  }
  const handleEnableOne = (event, row) => {
    debugger;
    var newList = dataList.map((x) => {
      if (x.lineNo == row.lineNo) {
        if (event.target.name == "payVal") {
          x.payVal = event.target.value;
        }
      }
      return x;
    });
    setdataList((prevFilters) => ({
      ...prevFilters,
      details: newList,
    }));
  };
  const handlePost = async (row) => {
    debugger;
    const dataApi = await ApiData(locale).PostponeOneLoan(
      row.id,
      row.loanTraxId
    );
    if (dataApi.message) toast.error(dataApi.message);
    else
      setdataList((prevFilters) => ({
        ...prevFilters,
        details: dataApi.data,
      }));
  };
  const handleRecalculate = async (row) => {
    const dataApi = await ApiData(locale).RecalculateLoan(
      row.id,
      row.loanTraxId,
      row.payVal
    );
    if (dataApi.message) toast.error(dataApi.message);
    else
      setdataList((prevFilters) => ({
        ...prevFilters,
        details: dataApi.data,
      }));
  };

  return (
    <div>
      <div className={classes.rootTable}>
        <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...messages.lineNo} />
              </TableCell>
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...Payrollmessages.year} />
              </TableCell>
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...Payrollmessages.month} />
              </TableCell>
              <TableCell
                style={{ width: "10%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...messages.payvalue} />
              </TableCell>
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...messages.isPaid} />
              </TableCell>
              {isUpdate ? (
                <TableCell
                  style={{ width: "10%", padding: "0px", textAlign: "center" }}
                ></TableCell>
              ) : (
                ""
              )}
              {isUpdate ? (
                <TableCell
                  style={{ width: "10%", padding: "0px", textAlign: "center" }}
                ></TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.length !== 0 &&
              dataList.map((row) => {
                return (
                  <TableRow
                    hover
                    key={row.lineNo}
                    sx={{ height: 1 }}
                    style={{ padding: "0px" }}
                  >
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      {row.lineNo}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      {row.yearName}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      {row.monthName}
                    </TableCell>

                    <TableCell
                      style={{
                        width: "10%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        name="payVal"
                        type="text"
                        value={row.payVal}
                        style={{ width: "80%" }}
                        disabled={row.done}
                        onChange={(event) => handleEnableOne(event, row)}
                      ></input>
                    </TableCell>
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <Checkbox
                        checked={row.done}
                        color="primary"
                        name="done"
                        onChange={(event) => handleEnableOne(event, row)}
                        value={row.done}
                        disabled={true}
                      />
                    </TableCell>
                    {row.id ? (
                      <TableCell
                        style={{
                          width: "10%",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          style={{ width: "50%" }}
                          onClick={() => handleClickOpen(1, row)}
                          disabled={row.done}
                        >
                          <FormattedMessage {...messages.post} />
                        </Button>
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {row.id ? (
                      <TableCell
                        style={{
                          width: "10%",
                          padding: "0px",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          style={{ width: "80%" }}
                          onClick={() => handleClickOpen(2, row)}
                          disabled={row.done}
                        >
                          <FormattedMessage {...messages.recalculate} />
                        </Button>
                      </TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <AlertPopup
        handleClose={handleClose}
        open={openParentPopup}
        messageData={`${intl.formatMessage(Payrollmessages.confirmation)}`}
        callFun={doProcess}
      />
    </div>
  );
}

const MemoedElementTable = memo(LoanDetailTable);

export default injectIntl(MemoedElementTable);
