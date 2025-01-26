import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PayrollTable from '../../Component/PayrollTable';
import { formateDate } from '../../helpers';
import payrollMessages from '../../messages';
import api from '../api/ReviewEmploymentRequestData';
import RowDropdown from '../components/ReviewEmploymentRequest/RowDropdown';
import messages from '../messages';
import SITEMAP from '../../../../App/routes/sitemap';

function ReviewEmploymentRequest(props) {
  const { intl } = props;
  const history = useHistory();

  const locale = useSelector((state) => state.language.locale);
  const Title = localStorage.getItem('MenuName');

  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isCreateEmploymentRequest, setIsCreateEmploymentRequest] = useState(false);

  const [popupState, setPopupState] = useState({
    comments: '',
  });

  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const onSetHiringDateBtnClick = (id) => {
    setSelectedRowId(id);
    setIsPopupOpen(true);
  };

  const columns = [
    {
      name: 'departmentName',
      label: intl.formatMessage(messages.department),
    },

    {
      name: 'jobName',
      label: intl.formatMessage(messages.jobName),
    },

    {
      name: 'positionTypeName',
      label: intl.formatMessage(messages.positionType),
    },

    {
      name: 'reportingToName',
      label: intl.formatMessage(messages.reportingTo),
    },

    {
      name: 'insDate',
      label: intl.formatMessage(messages.insertDate),
      options: {
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },

    {
      name: '',
      label: '',
      options: {
        filter: false,
        print: false,
        customBodyRender: (_, tableMeta) => {
          const row = tableData[tableMeta.rowIndex];

          if (!row) {
            return '';
          }

          return (
            <RowDropdown
              row={row}
              tableMeta={tableMeta}
              onSetHiringDateBtnClick={onSetHiringDateBtnClick}
            />
          );
        },
      },
    },
  ];

  const onPopupClose = () => {
    setIsPopupOpen(false);

    setPopupState({
      comments: '',
    });
  };

  const onPopupInputChange = (evt) => {
    setPopupState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onPopupFormSubmit = async (evt) => {
    evt.preventDefault();

    onPopupClose();

    if (isCreateEmploymentRequest) {
      history.push(SITEMAP.recruitment.JobAdvertisementCreate.route, {
        employmentId: selectedRowId,
        employmentComments: popupState.comments,
      });
    } else {
      const body = {
        id: selectedRowId,
        ...popupState,
      };

      setIsLoading(true);

      try {
        await api(locale).save(body);
        toast.success(notif.updated);
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
        await fetchTableData();
      }
    }
  };

  return (
    <>
      <Dialog
        open={isPopupOpen}
        onClose={onPopupClose}
        component='form'
        onSubmit={onPopupFormSubmit}
        PaperProps={{
          sx: (th) => ({
            [th.breakpoints.down('md')]: {
              width: '100%',
            },
            width: '70vw',
          }),
        }}
      >
        <DialogTitle>
          <FormattedMessage {...payrollMessages.Actions} />
        </DialogTitle>

        <DialogContent sx={{ pt: '10px !important' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='comments'
                value={popupState.comments}
                onChange={onPopupInputChange}
                label={intl.formatMessage(messages.comments)}
                fullWidth
                variant='outlined'
                required
                multiline
                rows={1}
                autoComplete='off'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCreateEmploymentRequest}
                    onChange={(evt) => setIsCreateEmploymentRequest(evt.target.checked)
                    }
                  />
                }
                label={intl.formatMessage(messages.createJobAdvertisement)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onPopupClose}>
            <FormattedMessage {...payrollMessages.cancel} />
          </Button>

          <Button type='submit' variant='contained'>
            <FormattedMessage {...messages.confirm} />
          </Button>
        </DialogActions>
      </Dialog>

      <PayrollTable
        isLoading={isLoading}
        showLoader
        title={Title}
        data={tableData}
        columns={columns}
      />
    </>
  );
}

ReviewEmploymentRequest.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ReviewEmploymentRequest);
