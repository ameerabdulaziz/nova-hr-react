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
 * Appends a key-value pair to the FormData object.
 * @param {FormData} formData - The FormData object to append to.
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to append.
 */
const appendToFormData = (formData, key, value) => {
  if (value instanceof File) {
    formData.append(key, value, value.name);
  } else {
    formData.append(key, value !== undefined ? value : null);
  }
};

/**
 * Processes an object and appends its key-value pairs to the FormData object.
 * @param {FormData} formData - The FormData object to append to.
 * @param {string} parentKey - The key under which the object is stored.
 * @param {Object} obj - The object to process.
 */
const appendObjectToFormData = (formData, parentKey, obj) => {
  Object.entries(obj).forEach(([subKey, subValue]) => {
    const fullKey = `${parentKey}.${subKey}`;
    appendToFormData(formData, fullKey, subValue);
  });
};

/**
 * Processes an array and appends its items to the FormData object.
 * @param {FormData} formData - The FormData object to append to.
 * @param {string} key - The key under which the array is stored.
 * @param {Array} array - The array to process.
 */
const appendArrayToFormData = (formData, key, array) => {
  array.forEach((item, index) => {
    const itemKey = `${key}[${index}]`;
    if (item instanceof File) {
      // For files, we need to append the file without index
      appendToFormData(formData, key, item);
    } else if (item instanceof Object) {
      appendObjectToFormData(formData, itemKey, item);
    } else {
      appendToFormData(formData, itemKey, item);
    }
  });
};

/**
 * Converts a given object into FormData.
 * @param {Object} fdObject - The input object to convert.
 * @returns {FormData} - The resulting FormData object.
 */
function getFormData(fdObject = {}) {
  const formData = new FormData();

  Object.entries(fdObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      appendArrayToFormData(formData, key, value);
    } else {
      appendToFormData(formData, key, value);
    }
  });
  return formData;
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
  const yearId = years.find((year) => year.name === today.getFullYear().toString())?.id
    ?? null;

  return { yearId, monthId };
}

/**
 * Returns the item from the given list that matches the specified key, or null if no match is found.
 *
 * @param {Array} list - The array of items to search through.
 * @param {String | Number | null} key - The key to search for in the items.
 * @return {Object | null} The item from the list that matches the key, or null if no match is found.
 */
function getAutoCompleteValue(list, key) {
  return list.find((item) => item.id === key) ?? null;
}

export {
  extractBirthDayFromIdentityNumber,
  formateDate,
  formatNumber,
  getCheckboxIcon,
  getDefaultYearAndMonth,
  getFormData,
  toArabicDigits,
  uuid,
  validateEmail,
  getAutoCompleteValue
};
