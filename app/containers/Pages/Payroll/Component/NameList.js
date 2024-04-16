import React, { useState, useCallback, memo } from "react";
import css from "enl-styles/Table.scss";
import {
  Button,
  Grid,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../Style";
import NamePopup from "./NamePopup";

function NameList(props) {
  const { intl, dataList, setdataList, IsInsured, Key ,withoutSalaryStructure} = props;
  const { classes, cx } = useStyles();
  const [OpenPopup, setOpenPopup] = useState(false);

  const handleClose = useCallback(
    (data) => {
      data.map((row) => {
        if (dataList.filter((x) => x.id == row.id).length == 0) {
          setdataList((prev) => [...prev, row]);
        }
      });
      setOpenPopup(false);
    },
    [dataList]
  );

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handlepermcheckboxAll = (event) => {
    setdataList(
      dataList.map((x) => {
        x.isSelected = event.target.checked;
        return x;
      })
    );
  };

  const handleEnableOne = (event, row) => {
    setdataList(
      dataList.map((x) => {
        if (x.id == row.id) {
          if (event.target.name == "isselected") {
            x.isSelected = event.target.checked;
          }
        }
        return x;
      })
    );
  };

  return (
    <div>
      <NamePopup handleClose={handleClose} setOpenPopup={setOpenPopup} IsInsured={IsInsured} open={OpenPopup} Key={Key} withoutSalaryStructure={withoutSalaryStructure} />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={handleClickOpen}
            >
              <FormattedMessage
                {...(Key === "Employee"
                  ? Payrollmessages.chooseEmp
                  : Payrollmessages.chooseJob)}
              />
            </Button>
          </Grid>

          <Grid item xs={6} md={12}>
            <div
              
              className={cx(css.tableCrud, classes.stripped, classes.rootTable)}
            >
              <TableContainer style={{ maxHeight: 420 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "25%", padding: "0px" }}>
                      <Checkbox
                        checked={
                          dataList.length > 0 &&
                          dataList.filter((crow) => crow.isSelected == true)
                            .length === dataList.length
                            ? true
                            : false
                        }
                        color="primary"
                        name="AllSelect"
                        indeterminate={
                          dataList.filter((crow) => crow.isSelected == true)
                            .length > 0 &&
                          dataList.filter((crow) => crow.isSelected == true)
                            .length < dataList.length
                            ? true
                            : false
                        }
                        onChange={handlepermcheckboxAll}
                      />
                    </TableCell>
                    {/* <TableCell style={{ width: "25%", padding: "0px" }}>
                      <FormattedMessage {...Payrollmessages.id} />
                    </TableCell> */}
                    <TableCell style={{ width: "50%", padding: "0px" }}>
                      <FormattedMessage {...Payrollmessages.name} />
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
                          <TableCell style={{ width: "25%", padding: "0px" }}>
                            <Checkbox
                              checked={row.isSelected}
                              color="primary"
                              name="isselected"
                              onChange={(event) => handleEnableOne(event, row)}
                              value={row.isSelected}
                            />
                          </TableCell>
                          {/* <TableCell style={{ width: "25%", padding: "0px" }}>
                            {row.id}
                          </TableCell> */}
                          <TableCell style={{ width: "50%", padding: "0px" }}>
                            {row.name}
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
      </div>
    </div>
  );
}

const MemoedNameList = memo(NameList);

export default injectIntl(MemoedNameList);
