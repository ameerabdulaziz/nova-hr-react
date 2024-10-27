import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx-js-style';
import PayRollLoader from '../../Component/PayRollLoader';
import PayrollTable from '../../Component/PayrollTable';
import { ServerURL } from '../../api/ServerConfig';
import payrollMessages from '../../messages';
import api from '../api/ImportEmployeeData';
import ErrorPopup from '../component/ImportEmployeeData/ErrorPopup';
import messages from '../messages';

const ALL_INFO_XLSX_COLUMNS = [
  { label: 'Employee Code', isRequired: true, type: 'number' }, // 0
  { label: 'Arabic Name', isRequired: true, type: 'string' }, // 1
  { label: 'English Name', isRequired: true, type: 'string' }, // 2
  { label: 'Ref.No', isRequired: false, type: 'number' }, // 3
  { label: 'Book No', isRequired: false, type: 'number' }, // 4
  { label: 'Gender', isRequired: false, type: 'number' }, // 5
  { label: 'Region', isRequired: false, type: 'number' }, // 6
  { label: 'Birth Date', isRequired: false, type: 'date' }, // 7
  { label: 'Nationality', isRequired: false, type: 'number' }, // 8
  { label: 'Governorate', isRequired: false, type: 'number' }, // 9
  { label: 'City', isRequired: false, type: 'number' }, // 10
  { label: 'Social Status', isRequired: false, type: 'number' }, // 11
  { label: 'Military Status', isRequired: false, type: 'number' }, // 12
  { label: 'Work Email', isRequired: false, type: 'string' }, // 13
  { label: 'Hiring Date', isRequired: true, type: 'date' }, // 14
  { label: 'Organization', isRequired: true, type: 'number' }, // 15
  { label: 'Report To', isRequired: false, type: 'number' }, // 16
  { label: 'Job', isRequired: true, type: 'number' }, // 17
  { label: 'Insured', isRequired: false, type: 'boolean' }, // 18
  { label: 'Insurance Date', isRequired: false, type: 'date' }, // 19
  { label: 'Roles Template', isRequired: false, type: 'string' }, // 20
  { label: 'Card Type', isRequired: true, type: 'number' }, // 21
  { label: 'Card Issuing Auth', isRequired: false, type: 'string' }, // 22
  { label: 'Identity no', isRequired: true, type: 'number' }, // 23
  { label: 'Issuing Date', isRequired: false, type: 'date' }, // 24
  { label: 'Expire Date', isRequired: false, type: 'date' }, // 25
];

function ImportEmployeeData(props) {
  const { intl } = props;

  const locale = useSelector((state) => state.language.locale);
  const title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(true);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);

  const [formInfo, setFormInfo] = useState({
    file: null,
    rows: [],
    modifyExistEmployee: false,
    fieldId: null,
    updateType: 'all',
  });

  const [fieldsList, setFieldsList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [fileTitle, setFileTitle] = useState('');

  const fetchNeededData = async () => {
    setIsLoading(true);

    try {
      const fields = await api(locale).GetExcelFieldList();
      setFieldsList(fields);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const resetFields = () => {
    setTableData([]);
    setColumns([]);
    setFileTitle('');

    setFormInfo({
      file: null,
      rows: [],
      modifyExistEmployee: false,
      fieldId: null,
      updateType: 'all',
    });
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (!formInfo.file) {
      toast.error(intl.formatMessage(messages.selectFileFirst));
      return;
    }

    setIsLoading(true);

    try {debugger;
      if (formInfo.updateType === 'field') {
        
        const Data= formInfo.rows.filter(item => item.employeeCode !='');
        await api(locale).UpdateField(formInfo.fieldId, Data);
      } else {
        const Data = formInfo.rows.map((row) => ({
          id: 0,
          employeeCode: row[0],
          arName: row[1],
          enName: row[2],
          machineCode: row[3],
          erpcode: row[4],
          genderId: row[5],
          religionId: row[6],
          birthDate: row[7],
          nationalityId: row[8],
          birthGovId: row[9],
          birthCityId: row[10],
          socialStatusId: row[11],
          militaryStatusId: row[12],
          workEmail: row[13],
          hiringDate: row[14],
          organizationId: row[15],
          reportTo: row[16],
          jobId: row[17],
          isInsured: row[18],
          insuranceDate: row[19],
          controlParameterId: row[20],
          identityTypeId: row[21],
          identityIssuingAuth: row[22],
          identityNumber: row[23],
          identityIssuingDate: row[24],
          identityExpiry: row[25],
        }));
        const rows= Data.filter(item => item.employeeCode !='');
        const body = {
          modifyExistEmployee: formInfo.modifyExistEmployee,
          rows,
        };

        await api(locale).save(body);
      }

      toast.success(notif.saved);
      resetFields();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const checkAllRowsValidation = (sheet) => {
    const [header, ...rows] = sheet;

    const errors = [];

    rows.forEach((row, rowIndex) => {
      // Insured is true with Insurance Date
      if (['true', 'TRUE'].includes(row[18])) {
        if (!row[19]) {
          errors.push(
            locale === 'en'
              ? `Row ${rowIndex + 1}, column ${header[19]} , value is required.`
              : `الصف ${rowIndex + 1} ، العمود (${header[19]}) ، القيمة مطلوبة.`
          );
        }
      }

      header.forEach((columnName, columnIndex) => {
        if (
          ALL_INFO_XLSX_COLUMNS[columnIndex].isRequired
					&& !row[columnIndex]
        ) {
          errors.push(
            locale === 'en'
              ? `Row ${
                rowIndex + 1
							  }, column (${columnName}) , value is required.`
              : `الصف ${rowIndex + 1} ، العمود (${columnName}) ، القيمة مطلوبة.`
          );
        }

        if (row[columnIndex]) {
          switch (ALL_INFO_XLSX_COLUMNS[columnIndex].type) {
            case 'number':
              if (isNaN(row[columnIndex])) {
                errors.push(
                  locale === 'en'
                    ? `Row ${rowIndex + 1}, column (${columnName}) , value (${
                      row[columnIndex]
										  }) should be a number.`
                    : `الصف ${
                      rowIndex + 1
										  } ، العمود (${columnName}) ، القيمة (${
                      row[columnIndex]
										  }) يجب أن تكون رقمًا.`
                );
              }
              break;
            case 'date':
              const date = moment(row[columnIndex], 'YYYY-MM-DD', true);

              // checks if the input can be parsed as a valid date.
              const isValidDate = date.isValid();

              // checks if the formatted date matches the original input.
              const isMatch = date.format('YYYY-MM-DD') === row[columnIndex];

              if (!(isValidDate && isMatch)) {
                errors.push(
                  locale === 'en'
                    ? `Row ${rowIndex + 1}, column (${columnName}) , value (${
                      row[columnIndex]
										  }) should be a valid date on format 'YYYY-MM-DD'.`
                    : `الصف ${
                      rowIndex + 1
										  } ، العمود (${columnName}) ، القيمة (${
                      row[columnIndex]
										  }) يجب أن تكون تاريخ صحيح بتنسيق 'YYYY-MM-DD'.`
                );
              }
              break;
            case 'boolean':
              if (
                !['true', 'false', 'TRUE', 'FALSE'].includes(row[columnIndex])
              ) {
                errors.push(
                  locale === 'en'
                    ? `Row ${rowIndex + 1}, column (${columnName}) , value (${
                      row[columnIndex]
										  }) should be a boolean.`
                    : `الصف ${rowIndex + 1}، العمود (${columnName}) ، القيمة (${
                      row[columnIndex]
										  })  يجب أن تكون قيمة منطقية (boolean).`
                );
              }
              break;
            case 'string':
            default:
              break;
          }
        }
      });
    });

    return { errors, rows };
  };

  const onFileExcelLoaded = (result) => {
    const workbook = XLSX.read(result);
    const sheets = workbook.SheetNames;

    if (sheets.length) {
      const arraySheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]], {
        raw: false,
        header: 1,
        defval: '',
      });

      if (arraySheet.length > 0) {
        if (formInfo.updateType === 'all') {
          // Get data in JSON format for table display
          const sheetAsJSON = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheets[0]],
            {
              raw: false,
              header: 0,
              defval: '',
            }
          );

          const { errors, rows } = checkAllRowsValidation(arraySheet);
          if (errors.length === 0) {
            setFormInfo((prev) => ({ ...prev, rows }));

            setTableData(sheetAsJSON);

            if (sheetAsJSON[0]) {
              const cols = Object.keys(sheetAsJSON[0]).map((item) => ({
                name: item,
                label: item,
              }));

              setColumns(cols);
            }
          } else {
            setFileErrors(errors);
            setIsErrorPopupOpen(true);
          }
        } else if (formInfo.updateType === 'field') {
          const [header, ...rows] = arraySheet;
          const filledRows = rows.map((row) => ({
            employeeCode: row[0],
            updatedData: row[1],
          }));

          setColumns([
            { name: 'employeeCode', label: header[0] },
            { name: 'updatedData', label: header[1] },
          ]);

          setFormInfo((prev) => ({ ...prev, rows: filledRows }));
          setTableData(filledRows);
        }

        setIsLoading(false);
      } else {
        toast.error(intl.formatMessage(messages.fileIsEmpty));
        setIsLoading(false);
      }
    } else {
      toast.error(intl.formatMessage(messages.fileIsEmpty));
      setIsLoading(false);
    }
  };

  const onExcelFileInputChange = (evt) => {
    const file = evt.target.files[0];
debugger;
    setFormInfo((prev) => ({ ...prev, rows: [] }));
    setFileTitle(file.name.split('.')[0]);

    // to trigger onChange on the same file select
    evt.target.value = '';

    if (file) {
      // check if uploaded file is larger than 1MB
      if (file.size < 10000000) {
        if (
          file.type === 'application/vnd.ms-excel'
					|| file.type
						=== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          setFormInfo((prev) => ({ ...prev, file }));
          const reader = new FileReader();
          setIsLoading(true);

          reader.onload = (event) => {
            onFileExcelLoaded(event.target.result);
          };

          reader.readAsArrayBuffer(file);
        } else {
          toast.error(intl.formatMessage(messages.fileExtensionShouldBeExcel));
        }
      } else {
        toast.error(intl.formatMessage(messages.fileSizeShouldBeLessThan10MB));
      }
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  const onRadioInputChange = (evt) => {
    setTableData([]);
    setColumns([]);
    setFileTitle('');

    setFormInfo((prev) => ({
      ...prev,
      file: null,
      rows: [],
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <ErrorPopup
        isOpen={isErrorPopupOpen}
        setIsOpen={setIsErrorPopupOpen}
        errors={fileErrors}
        setErrors={setFileErrors}
      />

      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  row
                  value={formInfo.updateType}
                  onChange={onRadioInputChange}
                  name='updateType'
                >
                  <FormControlLabel
                    value='all'
                    control={<Radio />}
                    label={intl.formatMessage(messages.allData)}
                  />
                  <FormControlLabel
                    value='field'
                    control={<Radio />}
                    label={intl.formatMessage(messages.someData)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Autocomplete
                options={fieldsList}
                value={getAutoCompleteValue(fieldsList, formInfo.fieldId)}
                disabled={formInfo.updateType !== 'field'}
                onChange={(_, value) => onAutoCompleteChange(value, 'fieldId')}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id + option.name}>
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={formInfo.updateType !== 'field'}
                    required
                    label={intl.formatMessage(messages.field)}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                disabled={formInfo.updateType !== 'all'}
                control={
                  <Checkbox
                    disabled={formInfo.updateType !== 'all'}
                    checked={formInfo.modifyExistEmployee}
                    onChange={onCheckboxChange}
                    name='modifyExistEmployee'
                  />
                }
                label={intl.formatMessage(
                  messages.modifyEmployeeDataIfTheyAlreadyExist
                )}
              />
            </Grid>
          </Grid>

          <Stack direction='row' spacing={2} mt={3}>
            <Button
              variant='contained'
              component='a'
              download
              target='_blank'
              href={`${ServerURL}Doc/ExcelForm/EmployeeForm.xlsx`}
            >
              {intl.formatMessage(payrollMessages.Download)}
            </Button>

            <div>
              <input
                accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                id='excel-attachment-button-file'
                name='Competency'
                type='file'
                onChange={onExcelFileInputChange}
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                color='secondary'
                htmlFor='excel-attachment-button-file'
                component='label'
              >
                {intl.formatMessage(messages.uploadFile)}
              </Button>
            </div>

            <Button variant='contained' onClick={resetFields}>
              {intl.formatMessage(payrollMessages.reset)}
            </Button>

            <Button
              variant='contained'
              type='submit'
              disabled={formInfo.rows.length === 0}
            >
              {intl.formatMessage(payrollMessages.save)}
            </Button>
          </Stack>
        </PapperBlock>
      </form>

      {tableData.length !== 0 && (
        <PayrollTable title={fileTitle} data={tableData} columns={columns} />
      )}
    </PayRollLoader>
  );
}

ImportEmployeeData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ImportEmployeeData);
