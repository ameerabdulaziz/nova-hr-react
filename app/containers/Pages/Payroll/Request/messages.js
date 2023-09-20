/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Payroll.Request';

export default defineMessages({
  // Permissions
    PermissionsList: {
        id: `${scope}.Transaction.PermissionsList`,
        defaultMessage: 'Permissions List',
      },
    employeeId: {
        id: `${scope}.Transaction.employeeId`,
        defaultMessage: 'Employee Id',
      },
      employeeName: {
        id: `${scope}.Transaction.employeeName`,
        defaultMessage: 'Employee Name',
      },
      permissionType: {
        id: `${scope}.Transaction.permissionType`,
        defaultMessage: 'Permission Type',
      },
      startTime: {
        id: `${scope}.Transaction.startTime`,
        defaultMessage: 'Start Time',
      },
      endTime: {
        id: `${scope}.Transaction.endTime`,
        defaultMessage: 'End Time',
      },
      minutesCount: {
        id: `${scope}.Transaction.minutesCount`,
        defaultMessage: 'Minutes Count',
      },
      actions: {
        id: `${scope}.Transaction.actions`,
        defaultMessage: 'Actions',
      },
      permissionStartTimeErrorMes: {
        id: `${scope}.Transaction.permissionStartTimeErrorMes`,
        defaultMessage: 'Start Time is After End Time',
      },
      createPermissionRequest: {
        id: `${scope}.Transaction.createPermissionRequest`,
        defaultMessage: 'Create Permission Request',
      },
      editPermissionRequest: {
        id: `${scope}.Transaction.editPermissionRequest`,
        defaultMessage: 'Edit Permission Request',
      },
      BackupEmployee: {
        id: `${scope}.Transaction.BackupEmployee`,
        defaultMessage: 'Backup Employee',
      },
      PermissionReason: {
        id: `${scope}.Transaction.PermissionReason`, 
        defaultMessage: 'Permission Reason',
      },
      AccessToTimeInOUT: {
        id: `${scope}.Transaction.AccessToTimeInOUT`,
        defaultMessage: 'Access To Time IN/OUT',
      },
      checkIn: {
        id: `${scope}.Transaction.checkIn`,
        defaultMessage: 'No check In',
      },
      checkOut: {
        id: `${scope}.Transaction.checkOut`,
        defaultMessage: 'No Check Out',
      },
});
