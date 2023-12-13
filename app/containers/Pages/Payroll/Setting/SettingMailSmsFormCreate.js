import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';
import { EditorState, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import useEmailStyles from 'enl-components/Email/email-jss';
import 'enl-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../Component/PayRollLoader';
import payrollMessages from '../messages';
import api from './api/SettingMailSmsFormData';
import messages from './messages';

function SettingMailSmsFormCreate(props) {
  const { intl } = props;
  const { classes: emailClasses } = useEmailStyles();
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;

  const title = localStorage.getItem('MenuName');

  const [formTypesList, setFormTypesList] = useState([]);
  const [dropdownList, setDropdownList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState({
    id,

    formTypeId: null,
    subject: '',
    body: EditorState.createEmpty(),
  });

  useEffect(() => {
    if (formInfo.formTypeId) {
      setDropdownList(formTypesList.find(
        (item) => item.id === formInfo.formTypeId
      )?.keyList);
    }
  }, [formInfo.formTypeId]);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    const formData = {
      ...formInfo,
      body: stateToHTML(formInfo.body.getCurrentContent()),
    };

    setIsLoading(true);

    try {
      await api(locale).save(formData);
      toast.success(notif.saved);
      history.push('/app/Pages/Setting/SettingMailSmsForm');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const formTypes = await api(locale).GetType();
      setFormTypesList(formTypes);

      if (id !== 0) {
        const dataApi = await api(locale).GetById(id);

        setFormInfo({
          ...dataApi,
          body: EditorState.createWithContent(stateFromHTML(dataApi.body)),
        });
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
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const onEditorChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      body: value,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onCancelBtnClick = () => {
    history.push('/app/Pages/Setting/SettingMailSmsForm');
  };

  return (
    <PayRollLoader isLoading={isLoading}>
      <PapperBlock whiteBg icon='border_color' desc='' title={title}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={3} direction='row'>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={formTypesList}
                value={
                  formTypesList.find(
                    (item) => item.id === formInfo.formTypeId
                  ) ?? null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option ? option.name : '')}
                renderOption={(propsOption, option) => (
                  <li {...propsOption} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => onAutoCompleteChange(value, 'formTypeId')
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label={intl.formatMessage(messages.formTypeName)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                value={formInfo.subject}
                label={intl.formatMessage(messages.subject)}
                name='subject'
                required
                onChange={onInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Editor
                editorState={formInfo.body}
                editorClassName={emailClasses.textEditor}
                toolbarClassName={emailClasses.toolbarEditor}
                onEditorStateChange={onEditorChange}
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontSize',
                    'list',
                    'textAlign',
                  ],
                }}
                toolbarCustomButtons={[<MentionDropdown key='mention' dropdownList={dropdownList} />]}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    type='submit'
                    size='medium'
                    color='secondary'
                  >
                    <FormattedMessage {...payrollMessages.save} />
                  </Button>
                </Grid>

                <Grid item xs={12} md={1}>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={onCancelBtnClick}
                  >
                    <FormattedMessage {...payrollMessages.cancel} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PapperBlock>

      <PapperBlock
        whiteBg
        icon='border_color'
        desc=''
        title={intl.formatMessage(payrollMessages.preview)}
      >
        <Box
          sx={{
          // display: 'none',
            '@media print': {
              display: 'block',
            },
            ul: {
              listStyleType: 'disc',
              px: '1rem',
            },
            ol: {
              listStyleType: 'decimal',
              px: '1rem',
            },
            '& > p': {
              mb: '0.3rem'
            },
            code: {
              fontFamily: 'monospace',
              overflowWrap: 'break-word',
              background: 'rgb(241, 241, 241)',
              borderRadius: '3px',
              padding: '1px 3px',
            }
          }}
        >
          {parse(stateToHTML(formInfo.body.getCurrentContent()))}
        </Box>
      </PapperBlock>
    </PayRollLoader>
  );
}

const MentionDropdown = (props) => {
  const { editorState, onChange, dropdownList = [] } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const onBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const onItemClick = async (key) => {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      key,
      editorState.getCurrentInlineStyle(),
    );

    await onChange(EditorState.push(editorState, contentState, 'insert-characters'));

    closeDropdown();
  };

  if (dropdownList.length === 0) { return null; }

  return (
    <>
      <IconButton onClick={onBtnClick}>
        <AlternateEmailIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdown}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              minWidth: 200,
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {
          dropdownList.map((item) => (
            <MenuItem onClick={() => onItemClick(item.key)} key={item.id} >
              {item.name}
            </MenuItem>
          ))
        }

      </Menu>
    </>

  );
};

MentionDropdown.propTypes = {
  editorState: PropTypes.object,
  dropdownList: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

SettingMailSmsFormCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SettingMailSmsFormCreate);
