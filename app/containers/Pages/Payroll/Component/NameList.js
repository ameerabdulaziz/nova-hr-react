import React, { useState, useCallback, memo, useMemo } from "react";
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
  const {
    intl,
    dataList,
    setdataList,
    IsInsured,
    Key,
    withoutSalaryStructure,
  } = props;
  const { classes, cx } = useStyles();
  const [OpenPopup, setOpenPopup] = useState(false);



  const handleClose = (data) => {

      setOpenPopup(false);
    };


  const savePopup = (data) => {

    let array = []

    data.map((row) => {
       
         array.push(row)
        
      });

      setdataList(array);
      setOpenPopup(false);
  }



  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handlepermcheckboxAll = (event) => {

    setdataList([])
  };

  const handleEnableOne = (event, row) => {

    // used to delete unselected rows from table
    if(event.target.checked === false)
    {
      let selectedData = dataList.filter((item)=> item.id !== row.id)

      setdataList(selectedData)
      
    }
  };

  const buttonLabel = useMemo(() => {
    switch (Key) {
      case "Job":
        return Payrollmessages.chooseJob;
      case "Courses":
        return Payrollmessages.chooseCourse;
      case "Organization":
        return Payrollmessages.chooseOrg;
      case "payrollEmployee":
        return Payrollmessages.selectPayrollEmployee;
      default:
        return Payrollmessages.chooseEmp;
    }
  }, [Key]);

  return (
    <div>
      <NamePopup
        handleClose={handleClose}
        setOpenPopup={setOpenPopup}
        IsInsured={IsInsured}
        open={OpenPopup}
        Key={Key}
        withoutSalaryStructure={withoutSalaryStructure}
        savePopup={savePopup}
        dataList={dataList}
      />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6} md={2}>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={handleClickOpen}
            >
              <FormattedMessage {...buttonLabel} />
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
                                onChange={(event) =>
                                  handleEnableOne(event, row)
                                }
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
