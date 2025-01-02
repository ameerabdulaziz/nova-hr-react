import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import { injectIntl } from "react-intl";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import toast from "react-hot-toast";
import messages from "../../messages";

function RowDropdown(props) {
  const { tableMeta, intl, row, handleClickOpen, DataOfSelectedRow } = props;  

  const [openedDropdown, setOpenedDropdown] = useState({});

  const closeDropdown = (rowIndex) =>
    setOpenedDropdown((prev) => ({
      ...prev,
      [rowIndex]: null,
    }));

  const onAddPopUpBtnClick = (
    rowIndex,
    popUpTitle,
    disabledLock,
    shortcutType
  ) => {
    closeDropdown(rowIndex);
    handleClickOpen(tableMeta, popUpTitle, disabledLock, shortcutType);
  };

  const onRedirectBtnClick = (
    tableMeta,
    validationIndex,
    url,
    shoetcutName
  ) => {    
    closeDropdown(tableMeta.rowIndex);
    if (!tableMeta.rowData[validationIndex]) {

      window
        .open(
          `${encodeURI(
            `${url}/${btoa(
              encodeURIComponent(
                JSON.stringify({
                  id: DataOfSelectedRow.employeeId,
                  shiftDate: DataOfSelectedRow.shiftDate,
                  timeIn: DataOfSelectedRow.timeIn,
                  timeOut: DataOfSelectedRow.timeOut,
                })
              )
            )}`
          )}`,
          "_blank"
        )
        ?.focus();
    } else {
      if (shoetcutName === "Vacation") {
        toast.error(intl.formatMessage(messages.leaveErrorMes));
      }

      if (shoetcutName === "Mission") {
        toast.error(intl.formatMessage(messages.missionErrorMes));
      }

      if (shoetcutName === "Permission") {
        toast.error(intl.formatMessage(messages.permissionErrorMes));
      }
    }
  };

  return (
    <>
      <IconButton
        onClick={(evt) => {
          setOpenedDropdown((prev) => ({
            ...prev,
            [tableMeta.rowIndex]: evt.currentTarget,
          }));
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={openedDropdown[tableMeta.rowIndex]}
        open={Boolean(openedDropdown[tableMeta.rowIndex])}
        onClose={() => closeDropdown(tableMeta.rowIndex)}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            onRedirectBtnClick(
              tableMeta,
              12,
              "/app/Pages/vac/LeaveTrxCreate",
              "Vacation"
            );
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {" "}
              {intl.formatMessage(messages.AddVacation)}
            </ListItemText>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onRedirectBtnClick(
              tableMeta,
              13,
              "/app/Pages/Att/MissionTrxEdit",
              "Mission"
            );
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {intl.formatMessage(messages.AddMission)}
            </ListItemText>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onRedirectBtnClick(
              tableMeta,
              14,
              "/app/Pages/Att/PermissionTrxCreate",
              "Permission"
            );
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {intl.formatMessage(messages.AddPermission)}
            </ListItemText>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onAddPopUpBtnClick(
              tableMeta.rowIndex,
              "AddAttendance",
              false,
              "AddAttendance"
            );
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {intl.formatMessage(messages.AddAttendance)}
            </ListItemText>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onAddPopUpBtnClick(
              tableMeta.rowIndex,
              "CancelLate",
              true,
              "CancelLate"
            );
          }}
        >
          <ListItemIcon>
            <DoDisturbOnOutlinedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {intl.formatMessage(messages.CancelLate)}
            </ListItemText>
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onAddPopUpBtnClick(
              tableMeta.rowIndex,
              "EarlyLeave",
              true,
              "EarlyLeave"
            );
          }}
        >
          <ListItemIcon>
            <DirectionsWalkIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>
            <ListItemText>
              {intl.formatMessage(messages.EarlyLeave)}
            </ListItemText>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

RowDropdown.propTypes = {
  intl: PropTypes.object.isRequired,
  tableMeta: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

export default memo(injectIntl(RowDropdown));
