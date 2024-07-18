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
import messages from "./messages";
import { injectIntl, FormattedMessage } from "react-intl";
import { toast } from "react-hot-toast";
import useStyles from "../Style";
import { useSelector } from "react-redux";
import GeneralListApis from "../api/GeneralListApis";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import style from "../../../../styles/styles.scss";
import PayrollTable from "../Component/PayrollTable";


function WFExecutionList(props) {
  
  const [isLoading, setIsLoading] = useState(false);
  const { classes, cx } = useStyles();
  const [data, setdata] = useState([]);
  const locale = useSelector((state) => state.language.locale);
  const { intl,handleClose, ExecutionId,open, RequestId, DocumentId } = props;
  
  const CloseClick = async () => {
    
    handleClose();
  };

  const GetList = async () => {
    try {
      setIsLoading(true);

      var result = await GeneralListApis(locale).GetWFExecutionList(
        ExecutionId, RequestId, DocumentId
      );
      debugger;
      setdata(result);
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
      name: "employeeCode",
      label: intl.formatMessage(Payrollmessages.employeeCode),
      options: {
        filter: true,
      },
    },
    {
      name: "employeeName",
      label: intl.formatMessage(Payrollmessages.employeeName),
      options: {
        filter: true,
      },
    },
    {
      name: "stepName",
      label: intl.formatMessage(messages.step),
      options: {
        filter: true,
      },
    },
    {
      name: "actionName",
      label: intl.formatMessage(messages.actionType),
      options: {
        filter: true,
      },
    },
    {
      name: "note",
      label: intl.formatMessage(Payrollmessages.notes),
      options: {
        filter: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "vertical",
    print: true,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 15, 50, 100],
    selectableRows: "none",
    page: 0,
    selectableRowsHeader: false,
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
        <DialogTitle>{`Steps List`} </DialogTitle>
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
            <PayrollTable
              title=""
              data={data}
              columns={columns}
              options={options}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button className={style.deleteAlertBtnSty} onClick={CloseClick}>
            <FormattedMessage {...Payrollmessages.close} />
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


export default injectIntl(WFExecutionList);
