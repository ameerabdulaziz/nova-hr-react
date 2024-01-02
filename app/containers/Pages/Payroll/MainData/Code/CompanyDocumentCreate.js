import { Delete } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import FileViewerPopup from '../../../../../components/Popup/fileViewerPopup';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import { default as api } from '../api/CompanyDocumentData';
import EmployeePopup from '../components/CompanyDocument/EmployeePopup';
import messages from '../messages';
import { ServerURL } from '../../api/ServerConfig';

function CompanyDocumentCreate(props) {
  const { intl } = props;
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;
  const title = localStorage.getItem('MenuName');

  const validPDFTypes = ['application/pdf', '.pdf', 'pdf'];
  const validImageTypes = [
    'image/jpg',
    'jpg',
    'image/jpeg',
    'jpeg',
    'image/png',
    'png',
    'image/apng',
    'apng',
    'image/webp',
    'webp',
    'image/svg+xml',
    'svg+xml',
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEmployeePopupOpen, setIsEmployeePopupOpen] = useState(false);

  const [isAttachmentPopupOpen, setIsAttachmentPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const typeList = [
    {
      id: 1,
      name: intl.formatMessage(messages.hrForm),
    },
    {
      id: 2,
      name: intl.formatMessage(messages.companyPolicy),
    }
  ];

  const [categoryList, setCategoryList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const [formInfo, setFormInfo] = useState({
    id,

    employeeId: null,
    categoryID: null,
    mdCompanyDocumentEmployee: [],
    docTypeId: null,
    docDesc: '',
    docType: '',
    image: null,
  });

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () => formInfo.mdCompanyDocumentEmployee.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
    [page, rowsPerPage, formInfo.mdCompanyDocumentEmployee]
  );

  const onEmployeeRemove = (index) => {
    const clonedItems = [...formInfo.mdCompanyDocumentEmployee];

    clonedItems.splice(index, 1);

    if (visibleRows.length === 1) {
      setPage((prev) => (prev === 0 ? 0 : prev - 1));
    }

    setFormInfo((prev) => ({
      ...prev,
      mdCompanyDocumentEmployee: clonedItems,
    }));
  };

  const onEmployeePopupBtnClick = async () => {
    setIsEmployeePopupOpen(true);
  };

  const onEmployeeSave = (items) => {
    setFormInfo((prev) => ({
      ...prev,
      mdCompanyDocumentEmployee: items,
    }));

    setIsEmployeePopupOpen(false);
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const formData = {
      ...formInfo,
      mdCompanyDocumentEmployee: formInfo.mdCompanyDocumentEmployee.map(item => ({
        employeeId: item.employeeId,
        companyDocumentId: id
      }))
    };

    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        if (formData[key].length > 0) {
          formData[key].forEach((item, index) => {
            if (typeof item === 'object') {
              Object.keys(item).forEach(subKey => {
                fd.append(key + `[${index}].${subKey}`, item[subKey]);
              });
            } else {
              fd.append(key + `[${index}]`, item);
            }
          });
        } else {
          fd.append(key, []);
        }
      } else {
        fd.append(key, formData[key]);
      }
    });

    try {
      await api(locale).save(fd);
      toast.success(notif.saved);
      history.push('/app/Pages/MainData/CompanyDocument');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const departments = await GeneralListApis(locale).GetDepartmentList();
      setDepartmentList(departments);

      const category = await api(locale).MdDocumentCategory();
      setCategoryList(category);

      const employees = await api(locale).GetEmployeeList();
      setEmployeeList(employees.map(item => ({ ...item, isSelect: false })));

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo({
          ...dataApi,
          mdCompanyDocumentEmployee: dataApi.mdCompanyDocumentEmployee.map((item) => ({
            ...item,
            isSelect: true,
          })),
        });

        setUploadedFile(`${ServerURL}Doc/CompanyDoc/${dataApi.docPath}`);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onAttachmentPopupClose = () => {
    setIsAttachmentPopupOpen(false);
  };

  const onAttachmentPopupBtnClick = () => {
    setIsAttachmentPopupOpen(true);
  };

  const getAttachmentType = () => {
    if (uploadedFile && typeof uploadedFile === 'string') {
      return uploadedFile?.split('.').pop().toLowerCase().trim();
    }

    if (uploadedFile instanceof File) {
      return uploadedFile.type;
    }

    return 'pdf';
  };

  const onDocumentInputChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      if (file.size < 10000000) {
        setFormInfo((prev) => ({
          ...prev,
          image: file,
        }));
        setUploadedFile(file);
      } else {
        toast.error(intl.formatMessage(messages.uploadFileErrorMes));
      }
    }
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/MainData/CompanyDocument');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <EmployeePopup
        isOpen={isEmployeePopupOpen}
        setIsOpen={setIsEmployeePopupOpen}
        onSave={onEmployeeSave}
        departmentList={departmentList}
        employeeList={employeeList}
        selectedEmployees={formInfo.mdCompanyDocumentEmployee}
      />

      <form onSubmit={onFormSubmit}>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Typography variant='h6'>{title}</Typography>

                <Grid container spacing={3} mt={0} direction='row'>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={typeList}
                      value={
                        typeList.find((item) => item.id === formInfo.docTypeId)
												?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'docTypeId')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.type)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={categoryList}
                      value={
                        categoryList.find(
                          (item) => item.id === formInfo.categoryID
                        ) ?? null
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id
                      }
                      getOptionLabel={(option) => (option ? option.name : '')}
                      renderOption={(propsOption, option) => (
                        <li {...propsOption} key={option.id}>
                          {option.name}
                        </li>
                      )}
                      onChange={(_, value) => onAutoCompleteChange(value, 'categoryID')
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label={intl.formatMessage(messages.category)}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={formInfo.docType}
                      label={intl.formatMessage(messages.documentType)}
                      name='docType'
                      onChange={onInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField
                      value={formInfo.docDesc}
                      label={intl.formatMessage(messages.documentDescription)}
                      name='docDesc'
                      multiline
                      rows={1}
                      onChange={onInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <div>
                        <input
                          accept='image/*, .pdf, .doc, .docx'
                          id='attachment-button-file'
                          type='file'
                          style={{ display: 'none' }}
                          onChange={onDocumentInputChange}
                        />
                        <label htmlFor='attachment-button-file'>
                          <Button variant='contained' component='span'>
                            <FormattedMessage {...messages.uploadAttachment} />
                          </Button>
                        </label>
                      </div>

                      {uploadedFile && (
                        <Button
                          component='span'
                          onClick={onAttachmentPopupBtnClick}
                        >
                          <FormattedMessage {...payrollMessages.preview} />
                        </Button>
                      )}
                    </Stack>

                    <FileViewerPopup
                      handleClose={onAttachmentPopupClose}
                      open={isAttachmentPopupOpen}
                      uploadedFileType={getAttachmentType()}
                      uploadedFile={uploadedFile}
                      validImageTypes={validImageTypes}
                      validPDFTypes={validPDFTypes}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                  mb={3}
                >
                  <Grid item>
                    <Typography variant='h6'>
                      {intl.formatMessage(messages.employeeInfo)}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={onEmployeePopupBtnClick}
                      color='primary'
                    >
                      {intl.formatMessage(messages.addOrChangeEmployee)}
                    </Button>
                  </Grid>
                </Grid>

                {formInfo.mdCompanyDocumentEmployee.length > 0 ? (
                  <>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {intl.formatMessage(messages.employeeCode)}
                            </TableCell>

                            <TableCell>
                              {intl.formatMessage(messages.employeeName)}
                            </TableCell>

                            <TableCell>
                              {intl.formatMessage(messages.department)}
                            </TableCell>

                            <TableCell>
                              {intl.formatMessage(messages.actions)}
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {visibleRows.map((employee, index) => (
                            <TableRow
                              key={employee.employeeId}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component='th' scope='row'>
                                {employee.employeeCode}
                              </TableCell>

                              <TableCell component='th' scope='row'>
                                {employee.employeeName}
                              </TableCell>

                              <TableCell component='th' scope='row'>
                                {employee.organizationName}
                              </TableCell>

                              <TableCell>
                                <IconButton
                                  color='error'
                                  onClick={() => onEmployeeRemove(index)}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component='div'
                      count={formInfo.mdCompanyDocumentEmployee.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={onPageChange}
                      onRowsPerPageChange={onRowsPerPageChange}
                    />
                  </>
                ) : (
                  <Stack
                    direction='row'
                    sx={{ minHeight: 200 }}
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <Box>
                      <PeopleIcon sx={{ color: '#a7acb2', fontSize: 30 }} />
                      <Typography color='#a7acb2' variant='body1'>
                        {intl.formatMessage(messages.noEmployeeFound)}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: '16px!important' }}>
                <Stack direction='row' gap={2}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>

                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </PayRollLoader>
  );
}

CompanyDocumentCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(CompanyDocumentCreate);
