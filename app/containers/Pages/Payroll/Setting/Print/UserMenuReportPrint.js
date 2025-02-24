import React from "react";
import css from "enl-styles/Table.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import messages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../../Style";
import Payrollmessages from "../../messages";
import DoneIcon from "@mui/icons-material/Done";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

function UserMenuReportPrint(props) {
  const { data } = props;

  return (
    <>
      <div>
        <div
          style={{ overflowX: "auto", width: "100%" }}
        >
          <Table
            small
          >
            <TableHead>
              <TableRow sx={{ height: "55px" }}>
                <TableCell sx={{ height: "auto" }}>
                  <FormattedMessage {...Payrollmessages.employeeCode} />
                </TableCell>
                <TableCell sx={{ height: "auto" }}>
                  <FormattedMessage {...Payrollmessages.employeeName} />
                </TableCell>

                <TableCell sx={{ height: "auto" }}>
                  <FormattedMessage {...messages.parentName} />
                </TableCell>
                <TableCell sx={{ height: "auto" }}>
                  <FormattedMessage {...messages.menuName} />
                </TableCell>
                <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                  <FormattedMessage {...messages.delete} />
                </TableCell>
                <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                  <FormattedMessage {...messages.update} />
                </TableCell>
                <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                  <FormattedMessage {...messages.add} />
                </TableCell>
                <TableCell sx={{ width: "70px", p: "0 10px !important" }}>
                  <FormattedMessage {...messages.view} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow sx={{ height: "50px" }} hover key={row.menuID}>
                  <TableCell>{row.employeeCode}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell>{row.parentName}</TableCell>
                  <TableCell>{row.menuName}</TableCell>
                  <TableCell>
                    {row.isDelete ? <DoneIcon /> : <CloseSharpIcon />}
                  </TableCell>
                  <TableCell>
                    {row.isUpdate ? <DoneIcon /> : <CloseSharpIcon />}
                  </TableCell>
                  <TableCell>
                    {row.isAdd ? <DoneIcon /> : <CloseSharpIcon />}
                  </TableCell>
                  <TableCell>
                    {row.isView ? <DoneIcon /> : <CloseSharpIcon />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default injectIntl(UserMenuReportPrint);
