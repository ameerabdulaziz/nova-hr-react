import React, { memo } from "react";
import css from "enl-styles/Table.scss";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Payrollmessages from "../../../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import useStyles from "../../../Style";
import messages from "../../messages";

function ItemTable(props) {
  const { intl,handlechange, dataList, setdataList,isdisabled } = props;
  const { classes, cx } = useStyles();

  const handlepermcheckboxAll = (event) => {
    
    if (dataList.length > 0) {
      setdataList((prevFilters) => ({
        ...prevFilters,
        items: dataList.map((x) => {
          x.isSelected = event.target.checked;
          return x;
        }),
      }));
    }
  };

  const handleEnableOne = (event, row) => {
    
    var newList = dataList.map((x) => {
      if (x.itemId == row.itemId) {
        if (event.target.name == "isselected") {
          x.isSelected = event.target.checked;
        }
        if (event.target.name == "price") {
          x.price = event.target.value;
        } else if (event.target.name == "quantity") {
          x.quantity = event.target.value;
        }
      }
      return x;
    });

    var Total = newList
      .filter((x) => x.isSelected == true)
      .reduce(
        (n, { price, quantity }) =>
          parseInt(n) + parseFloat(price) * parseInt(quantity),
        0
      );
    setdataList((prevFilters) => ({
      ...prevFilters,
      totalvalue: Total,
      nativeTotalValue: Total,
      items: newList,
    }));
    handlechange(0,0,0,Total,1);
  };

  return (
    <div className={classes.rootTable}>
      <Table className={cx(css.tableCrud, classes.table, classes.stripped)}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: "5%", padding: "0px", textAlign: "center" }}
            >
              <Checkbox
                checked={
                  dataList &&
                  dataList.length > 0 &&
                  dataList.filter((crow) => crow.isSelected == true).length ===
                    dataList.length
                    ? true
                    : false
                }
                color="primary"
                name="AllSelect"
                indeterminate={
                  dataList &&
                  dataList.filter((crow) => crow.isSelected == true).length >
                    0 &&
                  dataList.filter((crow) => crow.isSelected == true).length <
                    dataList.length
                    ? true
                    : false
                }
                onChange={handlepermcheckboxAll}
              />
            </TableCell>
            <TableCell
              style={{ width: "5%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...messages.lineNo} />
            </TableCell>
            <TableCell
              style={{ width: "20%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...Payrollmessages.name} />
            </TableCell>
            <TableCell
              style={{ width: "5%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...Payrollmessages.price} />
            </TableCell>

            <TableCell
              style={{ width: "15%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...messages.EmpPrice} />
            </TableCell>
            <TableCell
              style={{ width: "15%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...messages.quantity} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList &&
            dataList.length !== 0 &&
            dataList.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.itemId}
                  sx={{ height: 1 }}
                  style={{ padding: "0px" }}
                >
                  <TableCell
                    style={{ width: "5%", padding: "0px", textAlign: "center" }}
                  >
                    <Checkbox
                      checked={row.isSelected}
                      color="primary"
                      name="isselected"
                      onChange={(event) => handleEnableOne(event, row)}
                      value={row.isSelected}
                    />
                  </TableCell>

                  <TableCell
                    style={{ width: "5%", padding: "0px", textAlign: "center" }}
                  >
                    {row.lineNo}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    {row.itemName}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "5%",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    {row.sellPrice}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "15%",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      name="price"
                      type="text"
                      value={row.price}
                      style={{ width: "80%" }}
                      disabled={isdisabled}
                      onChange={(event) => handleEnableOne(event, row)}
                    ></input>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "15%",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      name="quantity"
                      type="text"
                      value={row.quantity}
                      style={{ width: "80%" }}
                      disabled={isdisabled}
                      onChange={(event) => handleEnableOne(event, row)}
                    ></input>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

const MemoedItemTable = memo(ItemTable);

export default injectIntl(MemoedItemTable);
