import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import React from 'react';

/**
 * The function `formateDate` formats a given date according to a specified
 * formatting string.
 * @returns {string | null} the formatted date string according to the specified formatting. If the
input date is null or undefined, the function will return null.
 * @param {string | Date | null} date
 * @param {String} formatString
 */
function formateDate(date, formatString = 'yyyy-MM-dd') {
  // TODO: Mohmmed Taysser check if date is valid
  return date ? format(new Date(date), formatString) : date;
}

/**
 * The formatNumber function formats a number with two decimal places and adds
 * commas for thousands separators.
 * @returns {string} a formatted version of the input number with two decimal places.
 */
function formatNumber(number) {
  if (isNaN(number) || number === null || number === undefined) {
    return number;
  }

  return number.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * @param {string | boolean} value
 * The `getCheckboxIcon` returns an icon based on the value passed as an argument.
If the value is truthy, it returns  CheckIcon, If the value is falsy, it returns a CloseIcon.
*/
function getCheckboxIcon(value) {
  return (
    <div>
      {value ? (
        <CheckIcon style={{ color: '#3f51b5' }} />
      ) : (
        <CloseIcon style={{ color: '#717171' }} />
      )}
    </div>
  );
}

/**
 * The function `getFormData` takes an object as input and returns a FormData
 * object containing the form data from the input object.
 * @returns a FormData object containing the appended form data.
 */
// TODO: Mohammed Taysser - refactor it & add nested levels support
function getFormData(fdObject = {}) {
  // Iterate through the key-value pairs of the input object
  return Object.entries(fdObject).reduce((formData, [key, value]) => {
    if (Array.isArray(value)) {
      // If the value is an array, iterate through its items
      value.forEach((item, index) => {
        // Iterate through the key-value pairs of each array item
        Object.entries(item).forEach(([subKey, subValue]) => {
          if (subValue instanceof File) {
            // If the array item value is a File, append it to FormData with the file name
            formData.append(
              `${key}[${index}].${subKey}`,
              subValue,
              subValue.name
            );
          } else {
            // If not a File, append it to FormData
            formData.append(
              `${key}[${index}].${subKey}`,
              subValue !== undefined ? subValue : null
            );
          }
        });
      });
    } else if (value instanceof File) {
      // If the value is a File, append it to FormData with the file name
      formData.append(key, value, value.name);
    } else {
      // If not a File, append it to FormData
      formData.append(key, value !== undefined ? value : null);
    }
    return formData;
  }, new FormData());
}

export {
  formatNumber, formateDate, getCheckboxIcon, getFormData
};
