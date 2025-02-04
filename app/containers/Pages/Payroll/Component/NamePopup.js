import React, { memo, useState, useCallback, useEffect } from "react";
import css from "enl-styles/Table.scss";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import Payrollmessages from "../messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { toast } from "react-hot-toast";
import useStyles from "../Style";
import { useSelector } from "react-redux";
import GeneralListApis from "../api/GeneralListApis";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import style from "../../../../styles/styles.scss";
import SimplifiedPayrollTable from "./SimplifiedPayrollTable";

function NamePopup(props) {
  const { intl, IsInsured, withoutSalaryStructure, branchId, setOpenPopup } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const { classes, cx } = useStyles();
  const [EmployeeList, setEmployeeList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const { handleClose, open, Key, ElementType, ElementId } = props;
  var SelectedRows = [];

  const CloseClick = async () => {
    handleClose(SelectedRows || []);
  };


  async function handleSelect(allRowsSelected) {
    try {
      SelectedRows = [];
      for (let i = 0; i < allRowsSelected.length; i++) {
        SelectedRows.push({
          id: EmployeeList[allRowsSelected[i]].id,
          name: EmployeeList[allRowsSelected[i]].name,
          fixedElementsSilimit:
            EmployeeList[allRowsSelected[i]].fixedElementsSilimit,
          organizationName:
            EmployeeList[allRowsSelected[i]].organizationName || "",
          businessUnitName:
            EmployeeList[allRowsSelected[i]].businessUnitName || "",
          branchName:
            EmployeeList[allRowsSelected[i]].branchName || "",
          sellPrice: EmployeeList[allRowsSelected[i]].sellPrice || "",
          isSelected: true,
        });
      }

       
    } catch (err) {
      toast.error(err.message);
    }
  }

  const GetList = async () => {
    try {
      setIsLoading(true);
      var data = [];
      if (Key == "Employee" || Key === "payrollEmployee") {
        data = await GeneralListApis(locale).GetEmployeeListComponent(
          IsInsured || false,
          withoutSalaryStructure || false,
          branchId || false
        );

        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              fixedElementsSilimit: obj.fixedElementsSilimit,
              organizationName: obj.organizationName,
              businessUnitName: obj.businessUnitName,
              branchName: obj.branchName,
              jobName: obj.jobName,
              isSelected: false,
            };
          })
        );
      } else if (Key == "Job") {
        data = await GeneralListApis(locale).GetJobList();

        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              isSelected: false,
            };
          })
        );
      } else if (Key == "Organization") {
        data = await GeneralListApis(locale).GetDepartmentList();

        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              isSelected: false,
            };
          })
        );
      } else if (Key == "shift") {
        data = await GeneralListApis(locale).GetShiftList();

        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              isSelected: false,
            };
          })
        );
      } else if (Key == "Element") {
        var result = await GeneralListApis(locale).GetElementList(
          0,
          0,
          "",
          ElementType
        );

        if (ElementId) {
          data = result.filter((x) => x.id != ElementId);
        } else data = result;
        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              isSelected: false,
            };
          })
        );
      } else if (Key == "Items") {
        data = await GeneralListApis(locale).GetItemList();

        setEmployeeList(
          data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          })
        );
      } else if (Key == "Courses") {
        data = await GeneralListApis(locale).GetCourseList();

        setEmployeeList(
          data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          })
        );
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) GetList();
  }, [open]);

  const columns = [
    {
      name: "id",
      label: intl.formatMessage(Payrollmessages.id),
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "name",
      label: intl.formatMessage(Payrollmessages.name),
      options: {
        filter: true,
      },
    },
  ];
  if (Key == "Employee") {
    columns.push(
      {
        name: "jobName",
        label: intl.formatMessage(Payrollmessages.job),
        options: {
          filter: true,
        },
      },
      {
        name: "organizationName",
        label: intl.formatMessage(Payrollmessages.organizationName),
        options: {
          filter: true,
        },
      },
      
      {
        name: "branchName",
        label: intl.formatMessage(Payrollmessages.branch),
        options: {
          filter: true,
        },
      },
      {
        name: "businessUnitName",
        label: intl.formatMessage(Payrollmessages.businessUnitName),
        options: {
          filter: true,
        },
      }
    );
  }
  if (Key == "Items") {
    columns.push({
      name: "sellPrice",
      label: intl.formatMessage(Payrollmessages.price),
      options: {
        filter: true,
      },
    });
  }

  const options = {
    selectableRows: "multiple",
    selectToolbarPlacement: "above",
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={1}></Grid>
        </Grid>
      </div>
    ),
    onRowSelectionChange: (rows, allRows, rowsSelectedIndexes) => {
      // onRowsSelect: (curRowSelected, allRowsSelected) => {
      handleSelect(rowsSelectedIndexes);
    },
    rowsSelected: SelectedRows,
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        PaperProps={{
          overflowy: "clip !important",
        }}
        maxWidth="md"
        onClose={() => CloseClick()}
      >
        <DialogTitle>{`${Key} List`} </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                height: "100px",
              }}
            >
              <CircularProgress />
            </Stack>
          ) : (
            <SimplifiedPayrollTable
              title=""
              data={EmployeeList}
              columns={columns}
              options={options}
            />
          )}
        </DialogContent>
        <DialogActions>
        <Button className={style.deleteAlertBtnSty} onClick={CloseClick}>
            <FormattedMessage {...Payrollmessages.save} />
          </Button>
          <Button
            className={style.deleteAlertBtnSty}
            onClick={() => {
              handleClose([]);
              // setOpenPopup(false);
            }}
          >
            <FormattedMessage {...Payrollmessages.cancel} />
          </Button>
          {/* <Button
            className={style.deleteAlertBtnSty}
            onClick={() => {
              handleClose();
              callFun();
            }}
          >
            <FormattedMessage {...Payrollmessages.yes} />
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const MemoedNamePopup = memo(NamePopup);

export default injectIntl(MemoedNamePopup);
