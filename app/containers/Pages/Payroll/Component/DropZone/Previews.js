import ActionDelete from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/Description';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { uuid } from '../../helpers';

const isImage = (file) => {
  const fileName = file.name || file.path;

  const suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();

  const acceptedImages = ['jpg', 'jpeg', 'bmp', 'png'];

  return acceptedImages.includes(suffix);
};

const DeleteBtn = (props) => {
  const { file, index, onRemove } = props;

  const onRemoveBtnClick = () => {
    onRemove(file, index);
  };

  return (
    <div className='middle'>
      <IconButton onClick={onRemoveBtnClick} size='large'>
        <ActionDelete className='removeBtn' />
      </IconButton>
    </div>
  );
};

DeleteBtn.propTypes = {
  file: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

function Previews(props) {
  const { filesArray, onRemove } = props;

  const previews = useMemo(
    () => filesArray.map((file, index) => {
      const base64Img = URL.createObjectURL(file);
      const dummyIndex = uuid();

      const isRealImage = isImage(file);

      return (
        <Tooltip key={dummyIndex} title={file.name} placement='top'>
          <div className='imageContainer col fileIconImg'>
            {isRealImage ? (
              <figure className='imgWrap'>
                <img
                  className='smallPreviewImg'
                  src={base64Img}
                  alt='preview'
                />
              </figure>
            ) : (
              <FileIcon className='smallPreviewImg' />
            )}
            <DeleteBtn file={file} index={index} onRemove={onRemove} />
          </div>
        </Tooltip>
      );
    }),
    [props]
  );

  return <>{previews}</>;
}

Previews.propTypes = {
  filesArray: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default memo(Previews);
