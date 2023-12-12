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
import MUIDataTable from "mui-datatables";

function NamePopup(props) {
  const { intl, IsInsured, withoutSalaryStructure } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { classes, cx } = useStyles();
  const [EmployeeList, setEmployeeList] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const { handleClose, open, Key, ElementType, ElementId } = props;
  var SelectedRows = [];
  const CloseClick = async () => {
    //handleClose(EmployeeList.filter((row) => row.isSelected==true));
    handleClose(SelectedRows || []);
  };

  async function handleSelect(allRowsSelected) {
    try {
      SelectedRows = [];
      for (let i = 0; i < allRowsSelected.length; i++) {
        SelectedRows.push({
          id: EmployeeList[allRowsSelected[i].dataIndex].id,
          name: EmployeeList[allRowsSelected[i].dataIndex].name,
          fixedElementsSilimit:
            EmployeeList[allRowsSelected[i].dataIndex].fixedElementsSilimit,
          organizationName:
            EmployeeList[allRowsSelected[i].dataIndex].organizationName || "",
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
      if (Key == "Employee") {
        data = await GeneralListApis(locale).GetEmployeeListComponent(
          IsInsured || false,
          withoutSalaryStructure || false
        );
        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              fixedElementsSilimit: obj.fixedElementsSilimit,
              organizationName: obj.organizationName,
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
      } else if (Key == "Element") {
        debugger;
        var result = await GeneralListApis(locale).GetElementListByType(
          ElementType,
          0
        );

        if (ElementId) {
          data = result.filter((x) => x.id != ElementId);
        }
        else
        data = result ;
        setEmployeeList(
          data.map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
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
      }
    );
  }

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 50, 100],
    // rowsPerPage: 50,
    page: 0,
    searchOpen: true,
    onSearchClose: () => {
      //some logic
    },
    customToolbarSelect: (selectedRows) => (
      <div>
        <Grid container spacing={1} alignItems="flex-start" direction="row">
          <Grid item xs={12} md={1}></Grid>
        </Grid>
      </div>
    ),
    onRowSelectionChange: (curRowSelected, allRowsSelected) => {
      // onRowsSelect: (curRowSelected, allRowsSelected) => {
      handleSelect(allRowsSelected);
    },
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
            <div className={classes.CustomMUIDataTable}>
              <MUIDataTable
                title=""
                data={EmployeeList}
                columns={columns}
                options={options}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const MemoedNamePopup = memo(NamePopup);

export default injectIntl(MemoedNamePopup);
