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

function ElementTable(props) {
  const { intl, dataList, setdataList, Type } = props;
  const { classes, cx } = useStyles();

  const handlepermcheckboxAll = (event) => {
    
    if (dataList.length > 0) {
      if (Type == 1)
        setdataList((prevFilters) => ({
          ...prevFilters,
          addElement: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 2)
        setdataList((prevFilters) => ({
          ...prevFilters,
          deductElements: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 3)
        setdataList((prevFilters) => ({
          ...prevFilters,
          taxElements: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 4)
        setdataList((prevFilters) => ({
          ...prevFilters,
          insElements: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 5)
        setdataList((prevFilters) => ({
          ...prevFilters,
          elements: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 6)
        setdataList((prevFilters) => ({
          ...prevFilters,
          payrollRefElements: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
      else if (Type == 7)
        setdataList((prevFilters) => ({
          ...prevFilters,
          payrollRefElements2: dataList.map((x) => {
            x.isSelected = event.target.checked;
            return x;
          }),
        }));
    }
  };

  const handleEnableOne = (event, row) => {
    
    var newList = dataList.map((x) => {
      if (
        ((Type==6||Type==7) && x.refElementId == row.refElementId)||((Type==1||Type==2||Type==5) && x.elementId == row.elementId) ||
        ((Type==3||Type==4) && x.id == row.id)
      ) {
        if (event.target.name == "isselected") {
          x.isSelected = event.target.checked;
        }
        if (event.target.name == "relation") {
          x.refValue = event.target.value;
        } else if (event.target.name == "sort") {
          x.sort = event.target.value;
        } else if (event.target.name == "elePercent") {
          x.elePercent = event.target.value;
        } else if (event.target.name == "refPerc") {
          x.refPerc = event.target.value;
        }
      }
      return x;
    });
    if (Type == 1)
      setdataList((prevFilters) => ({
        ...prevFilters,
        addElement: newList,
      }));
    else if (Type == 2)
      setdataList((prevFilters) => ({
        ...prevFilters,
        deductElements: newList,
      }));
    else if (Type == 3)
      setdataList((prevFilters) => ({
        ...prevFilters,
        taxElements: newList,
      }));
    else if (Type == 4)
      setdataList((prevFilters) => ({
        ...prevFilters,
        insElements: newList,
      }));
    else if (Type == 5)
      setdataList((prevFilters) => ({
        ...prevFilters,
        elements: newList,
      }));
    else if (Type == 6)
      setdataList((prevFilters) => ({
        ...prevFilters,
        payrollRefElements: newList,
      }));
    else if (Type == 7)
      setdataList((prevFilters) => ({
        ...prevFilters,
        payrollRefElements2: newList,
      }));
  };

  return (
    <div className={classes.rootTable}>
      <Table className={cx(css.tableCrud, classes.stripped)}>
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
              <FormattedMessage {...Payrollmessages.element} />
            </TableCell>
            <TableCell
              style={{ width: "10%", padding: "0px", textAlign: "center" }}
            >
              <FormattedMessage {...Payrollmessages.name} />
            </TableCell>
            {Type == 7 ? (
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                <FormattedMessage {...Payrollmessages.relation} />
              </TableCell>
            ) : (
              ""
            )}
            {Type == 1 || Type == 2 || Type == 5 || Type == 6 || Type == 7 ? (
              <TableCell
                style={{ width: "5%", padding: "0px", textAlign: "center" }}
              >
                {Type == 5 || Type == 6 || Type == 7 ? (
                  <FormattedMessage {...Payrollmessages.percentage} />
                ) : (
                  <FormattedMessage {...Payrollmessages.sort} />
                )}
              </TableCell>
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
                  key={(Type==6||Type==7) ?row.refElementId:(Type==1||Type==2||Type==5 )? row.elementId: row.id}
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
                    {row.refElementId || row.elementId || row.id}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      padding: "0px",
                      textAlign: "center",
                    }}
                  >
                    {row.refElementName||row.elementName || row.name}
                  </TableCell>
                  {Type == 7 ? (
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        name="relation"
                        type="text"
                        value={row.refValue}
                        style={{width: "80%"}}
                        onChange={(event) => handleEnableOne(event, row)}
                      ></input>
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {Type === 1 || Type === 2 ? (
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        name="sort"
                        type="text"
                        value={row.sort}
                        style={{width: "80%"}}
                        onChange={(event) => handleEnableOne(event, row)}
                      ></input>
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {Type === 5 ? (
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        name="elePercent"
                        type="text"
                        value={row.elePercent}
                        style={{width: "80%"}}
                        onChange={(event) => handleEnableOne(event, row)}
                      ></input>
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {Type == 6 || Type == 7 ? (
                    <TableCell
                      style={{
                        width: "5%",
                        padding: "0px",
                        textAlign: "center",
                      }}
                    >
                      <input
                        name="refPerc"
                        type="text"
                        value={row.refPerc}
                        style={{width: "80%"}}
                        onChange={(event) => handleEnableOne(event, row)}
                      ></input>
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
  );
}

const MemoedElementTable = memo(ElementTable);

export default injectIntl(MemoedElementTable);
