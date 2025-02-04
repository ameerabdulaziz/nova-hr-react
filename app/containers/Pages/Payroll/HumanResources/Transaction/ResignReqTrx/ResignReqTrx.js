import notif from 'enl-api/ui/notifMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import SimplifiedPayrollTable from '../../../Component/SimplifiedPayrollTable';
import { formateDate } from '../../../helpers';
import api from '../../api/ResignReqTrxData';
import messages from '../../messages';
import payrollMessages from '../../../messages';
import {
  Tooltip,
  IconButton,
} from '@mui/material';
import FileViewerPopup from "../../../../../../components/Popup/fileViewerPopup";
import { ServerURL } from "../../../api/ServerConfig";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SITEMAP from '../../../../../App/routes/sitemap';

function ResignReqTrx(props) {
  const { intl } = props;
  const title = localStorage.getItem('MenuName');

  const locale = useSelector((state) => state.language.locale);
  const [openParentPopup, setOpenParentPopup] = useState(false);
  const [uploadedFileType, setUploadedFileType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validImageTypes, setValidImageTypes] = useState([
    "image/jpg",
    "jpg",
    "image/jpeg",
    "jpeg",
    "image/png",
    "png",
    "image/apng",
    "apng",
    "image/webp",
    "webp",
    "image/svg+xml",
    "svg+xml",
  ]);
  const [validPDFTypes, setValidPDFTypes] = useState([
    "application/pdf",
    ".pdf",
    "pdf",
  ]);



  async function fetchData() {
    try {
      const dataApi = await api(locale).getList();
      setData(dataApi);
    } catch (err) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id) {
    try {
      setIsLoading(true);

      await api(locale).delete(id);

      toast.success(notif.saved);

      fetchData();
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: 'id',
      options: {
        filter: false,
        display: false,
        print: false,
      },
    },

    {
      name: 'date',
      label: intl.formatMessage(messages.resignationDate),
    },

    {
      name: 'lworkingDay',
      label: intl.formatMessage(messages.lastWorkingDay),
      options: {
        customBodyRender: (value) => (value ? <pre>{formateDate(value)}</pre> : ''),
      },
    },

    {
      name: 'resignReasonName',
      label: intl.formatMessage(messages.resignReasonName),
    },

    {
      name: 'notes',
      label: intl.formatMessage(messages.note),
      options: {
        noWrap: true,
      },
    },
  ];

  const actions = {
    add: {
      url: SITEMAP.humanResources.ResignReqTrxCreate.route,
    },
    edit: {
      url: SITEMAP.humanResources.ResignReqTrxEdit.route,
    },
    delete: {
      callback: deleteRow,
    },
    extraActions: (row) => (
      <>     
        <Tooltip
          placement='bottom'
          title={intl.formatMessage(payrollMessages.viewAttachment)}
        >

          <span>
            <IconButton onClick={() => {
                  handleClickOpen(row)
              }}>
              <AttachFileIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </span>
        </Tooltip>
      </>
    ),
  };


  const handleClickOpen = (item) => {    
    setOpenParentPopup(true);
    setUploadedFile(
      item && item.docName ? ` ${ServerURL}${item.docName} ` : ""
    );

    setUploadedFileType(
      item && item.docName
        ? ` ${ServerURL}${item.docName} `
            .split(/[#?]/)[0]
            .split(".")
            .pop()
            .trim()
        : null
    );
  };

  const handleClose = () => {
    setOpenParentPopup(false);
  };


  return (
    <>
        <SimplifiedPayrollTable
          isLoading={isLoading}
          showLoader
          title={title}
          data={data}
          columns={columns}
          actions={actions}
        />

        <FileViewerPopup
        handleClose={handleClose}
        open={openParentPopup}
        uploadedFileType={uploadedFileType}
        uploadedFile={uploadedFile}
        validImageTypes={validImageTypes}
        validPDFTypes={validPDFTypes}
      />
  </>
  );
}

ResignReqTrx.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(ResignReqTrx);
