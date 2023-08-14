import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Add from '@mui/icons-material/Add';
import { injectIntl } from 'react-intl';
import messages from './messages';
import AddContactForm from './AddContactForm';
import FloatingPanel from '../Panel/FloatingPanel';
import useStyles from './contact-jss';

function AddContact(props) {
  const { classes } = useStyles();
  const {
    openForm,
    closeForm,
    avatarInit,
    addContact,
    processing,
    intl,
    submit
  } = props;
  const [img, setImg] = useState(null);
  const [files] = useState([]);

  const onDrop = (filesVal) => {
    let oldFiles = files;
    const filesLimit = 2;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log('Cannot upload more than ' + filesLimit + ' items.');
    } else {
      setImg(filesVal[0]);
    }
  };

  const sendValues = async (values) => {
    await submit(values, img);
    setImg(null);
  };

  const branch = '';
  return (
    <div>
      <Tooltip title={intl.formatMessage(messages.add_contacts)}>
        <Fab color="secondary" onClick={() => addContact()} className={classes.addBtn}>
          <Add />
        </Fab>
      </Tooltip>
      <FloatingPanel title={intl.formatMessage(messages.add_contacts)} openForm={openForm} branch={branch} closeForm={closeForm}>
        <AddContactForm
          onSubmit={(values) => sendValues(values)}
          onDrop={onDrop}
          imgAvatar={img === null ? avatarInit : img}
          processing={processing}
        />
      </FloatingPanel>
    </div>
  );
}

AddContact.propTypes = {
  submit: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  openForm: PropTypes.bool.isRequired,
  avatarInit: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  processing: PropTypes.bool,
  intl: PropTypes.object.isRequired
};

AddContact.defaultProps = {
  processing: false
};

export default injectIntl(AddContact);
