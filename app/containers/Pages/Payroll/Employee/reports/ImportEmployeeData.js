import {
  Autocomplete,
  Button,
  Grid,
  Stack,
  TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx-js-style';
import PayRollLoader from '../../Component/PayRollLoader';
import { ServerURL } from '../../api/ServerConfig';
import { getFormData } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ImportEmployeeData';
import messages from '../messages';

function ImportEmployeeData(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');
  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(false);
  const [workSheetList, setWorkSheetList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    file: null,
    workSheet: null,
    startFromLine: '',
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await api(locale).getWorkSheetList();
      setWorkSheetList(company);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    if (!formInfo.file) {
      toast.error(intl.formatMessage(messages.selectFileFirst));
      return;
    }

    setIsLoading(true);

    const fd = getFormData(formInfo);

    try {
      await api().save(fd);
      toast.success(notif.saved);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onNumericInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value.replace(/[^\d]/g, ''),
    }));
  };

  const onExcelFileInputChange = (evt) => {
    const file = evt.target.files[0];

    if (file) {
      // check if uploaded file is larger than 1MB
      if (file.size < 10000000) {
        if (file.type === 'application/vnd.ms-excel') {
          setFormInfo((prev) => ({ ...prev, file }));
          const reader = new FileReader();

          reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result);
            const sheets = workbook.SheetNames;

            if (sheets.length) {
              const rows = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheets[0]],
                { raw: false }
              );
              console.log(rows);
            } else {
              toast.error(intl.formatMessage(messages.fileIsEmpty));
            }
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

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <PapperBlock whiteBg icon='border_color' title={title} desc=''>
          <Grid container mt={0} spacing={3}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={workSheetList}
                value={getAutoCompleteValue(workSheetList, formInfo.workSheet)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'workSheet')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.workSheet)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='startFromLine'
                value={formInfo.startFromLine}
                required
                onChange={onNumericInputChange}
                label={intl.formatMessage(messages.startFromLineNumber)}
                fullWidth
                variant='outlined'
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction='row' spacing={2}>
                <Button
                  variant='contained'
                  component='a'
                  download
                  href={`${ServerURL}`}
                >
                  {intl.formatMessage(payrollMessages.Download)}
                </Button>

                <div>
                  <input
                    accept='application/vnd.ms-excel'
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
                    {intl.formatMessage(messages.upload)}
                  </Button>
                </div>

                <Button variant='contained' type='submit'>
                  {intl.formatMessage(payrollMessages.save)}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </PapperBlock>
      </form>
    </PayRollLoader>
  );
}

ImportEmployeeData.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ImportEmployeeData);
