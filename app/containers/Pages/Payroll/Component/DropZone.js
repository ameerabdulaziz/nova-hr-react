import { CloudUpload } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { injectIntl } from 'react-intl';
import payrollMessages from '../messages';
import Previews from './DropZone/Previews';
import useDropzoneStyles from './DropZone/styles';

import 'enl-styles/vendors/react-dropzone/react-dropzone.css';

function DropZone(props) {
  const {
    showPreviews,
    maxSize,
    filesLimit,
    files,
    setFiles,
    acceptedFiles,
    intl,
    ...rest
  } = props;

  const { classes, cx } = useDropzoneStyles();

  const onDrop = useCallback(
    (filesVal) => {
      const clonedFiles = [...files, ...filesVal];

      // Limit the number of files if there is a limit
      if (filesLimit && clonedFiles.length > filesLimit) {
        toast.error(
          intl.formatMessage(payrollMessages.cantUploadMoreThan)
            + ` ${filesLimit} `
            + intl.formatMessage(payrollMessages.items)
        );
      } else {
        setFiles(clonedFiles);
      }
    },
    [files, filesLimit]
  );

  const onDropRejected = () => {
    toast.error(intl.formatMessage(payrollMessages.fileIsTooBig));
  };

  const onPreviewRemove = useCallback(
    (file, fileIndex) => {
      // This is to prevent memory leaks.
      window.URL.revokeObjectURL(file.preview);

      const filesClone = [...files];

      filesClone.splice(fileIndex, 1);

      setFiles(filesClone);
    },
    [files]
  );

  return (
    <div>
      <Dropzone
        accept={acceptedFiles.join(',')}
        onDrop={onDrop}
        onDropRejected={onDropRejected}
        acceptClassName='stripes'
        rejectClassName='rejectStripes'
        maxSize={maxSize}
        {...rest}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={cx(classes.dropItem, 'dropZone')}>
            <div className='dropzoneTextStyle'>
              <input {...getInputProps()} />
              <p className='dropzoneParagraph'>
                {intl.formatMessage(payrollMessages.dragAndDropFilesOrClick)}
              </p>
              <div className={classes.uploadIconSize}>
                <CloudUpload />
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      {showPreviews && (
        <div className='row preview'>
          <Previews filesArray={files} onRemove={onPreviewRemove} />
        </div>
      )}
    </div>
  );
}

DropZone.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  acceptedFiles: PropTypes.array,
  showPreviews: PropTypes.bool,
  maxSize: PropTypes.number,
  filesLimit: PropTypes.number,
  intl: PropTypes.object.isRequired,
};

DropZone.defaultProps = {
  acceptedFiles: [],
  showPreviews: true,
};

export default memo(injectIntl(DropZone));
