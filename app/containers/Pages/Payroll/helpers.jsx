import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import dayjs from 'dayjs';
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
  if (typeof value !== 'boolean') {
    return <CloseIcon style={{ color: '#717171d1' }} />;
  }

  return value ? (
    <CheckIcon style={{ color: '#000' }} />
  ) : (
    <CloseIcon style={{ color: '#717171d1' }} />
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

/**
 * The above function generates a unique identifier using the UUID format.
 * @returns {String} The `uuid` function returns a randomly generated UUID (Universally
 * Unique Identifier) in the format "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", where
 * each "x" represents a random hexadecimal digit.
 */
function uuid() {
  const S4 = () => ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
  return (
    S4()
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + '-'
    + S4()
    + S4()
    + S4()
  );
}

/**
 * The function converts a string of Arabic digits to their corresponding Arabic
 * numeral characters.
 * @returns {string}
 */
function toArabicDigits(str = '') {
  if (!str) {
    return '';
  }

  const id = '٠١٢٣٤٥٦٧٨٩';
  return str.toString().replace(/\d/g, (w) => id[+w]);
}

/**
 * The function extracts the birth date from a 14-character identity number and
 * returns it if the person is between 16 and 80 years old.
 * @returns {dayjs.Dayjs | null}
 */
function extractBirthDayFromIdentityNumber(identityNumber = '') {
  if (identityNumber.length === 14) {
    // _DDMMYY___....
    const day = identityNumber.slice(1, 3);
    const month = identityNumber.slice(3, 5);
    const year = identityNumber.slice(5, 7);
    const date = dayjs(`${day}-${month}-${year}`);

    if (date.isValid()) {
      // set is between 16 & 80 year old
      if (
        dayjs().diff(date, 'year') >= 16
        && dayjs().diff(date, 'year') <= 80
      ) {
        return date;
      }
    }
  }

  return null;
}

/**
 * Validates if an email address is in a correct format.
 *
 * @param {string} email - The email address to be validated.
 * @return {boolean} Returns true if the email address is valid, false otherwise.
 */
function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

/**
 * Returns the year and month identifiers based on the current date and the given list of years.
 *
 * @param {Array} years - An array of year objects.
 * @return {Object} An object containing the year and month identifiers.
 */
function getDefaultYearAndMonth(years = []) {
  const today = new Date();
  const monthId = today.getMonth() + 1;
  const yearId = years.find((year) => year.name === today.getFullYear().toString())?.id ?? null;

  return { yearId, monthId };
}

export {
  extractBirthDayFromIdentityNumber,
  formateDate,
  formatNumber,
  getCheckboxIcon, getDefaultYearAndMonth, getFormData,
  toArabicDigits,
  uuid,
  validateEmail
};
