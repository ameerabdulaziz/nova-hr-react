import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { PapperBlock } from 'enl-components';
import React, {
  useState
} from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { read, utils } from 'xlsx';
import PayRollLoader from '../../../Component/PayRollLoader';
import PayrollTable from '../../../Component/PayrollTable';
import { ServerURL } from '../../../api/ServerConfig';
import Payrollmessages from '../../../messages';
import ApiData from '../../api/ShiftEmployeeData';

function ShiftImport({ intl }) {
  const locale = useSelector((state) => state.language.locale);
  const [cols, setCols] = useState('');
  const [fileData, setFileData] = useState([]);
  const [fileTitle, setFileTitle] = useState('');
  const [file, setFile] = useState('');
  const Title = localStorage.getItem('MenuName');

  const [isLoading, setIsLoading] = useState(false);

  const handleImport = ($event) => {
    const { files } = $event.target;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
            raw: false,
            defval:"",
          });
          setFileData(rows);
          setCols(Object.keys(rows[0]).map((item) => ({
            name: item,
            label: item,
            options: {
              filter: true,
            },
          })));
        }
      };
      reader.readAsArrayBuffer(file);
      setFileTitle(file.name.split('.')[0]);
    }
  };
  const resetDataFun = () => {
    setFileData([]);
    setFileTitle('');
    setCols('');
    setFile('');
  };

  const submitFun = async (e) => {
    try {
      setIsLoading(true);
      const response = await ApiData(locale).SaveListFromImport(fileData);

      if (response.status == 200) {
        toast.error(response.data);
        resetDataFun();
      } else {
        toast.error(response.statusText);
      }
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' title={Title} desc=''>
        <Grid container mt={0} spacing={3}>
          <Grid item>
            <a
              href={`${ServerURL}Doc/ExcelForm/EmployeeShifts.xlsx`}
              target='_blank'
              rel='noreferrer'
              download
            >
              <Button
                variant='contained'
                color='secondary'
              >
                <FormattedMessage {...Payrollmessages.Download} />
              </Button>
            </a>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              component='label'
              startIcon={<AddIcon />}
            >
              <FormattedMessage {...Payrollmessages.Import} />
              <input
                hidden
                value={file}
                type='file'
                name='file'
                className='custom-file-input'
                id='inputGroupFile'
                onChange={handleImport}
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              onClick={resetDataFun}
            >
              <FormattedMessage {...Payrollmessages.reset} />
            </Button>
          </Grid>

          <Grid item>
            <span>
              <Button
                variant='contained'
                color='secondary'
                onClick={submitFun}
                disabled={fileData.length === 0}
              >
                <FormattedMessage {...Payrollmessages.save} />
              </Button>
            </span>
          </Grid>
        </Grid>
      </PapperBlock>

      {fileData.length !== 0 && (
        <PayrollTable title={fileTitle} data={fileData} columns={cols} />
      )}
    </PayRollLoader>
  );
}

export default injectIntl(ShiftImport);
