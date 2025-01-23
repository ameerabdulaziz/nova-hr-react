import {
  Autocomplete,
  Button,
  Grid,
  Menu,
  MenuItem,
  TextField,
  TextareaAutosize
} from '@mui/material';
import notif from 'enl-api/ui/notifMessage';
import { PapperBlock } from 'enl-components';
import 'enl-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import PayRollLoader from '../Component/PayRollLoader';
import payrollMessages from '../messages';
import api from './api/SettingMailSmsFormData';
import messages from './messages';
import useStyles from "../Style";
import style from "../../../../styles/styles.scss";
import 'react-quill/dist/quill.snow.css';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser/lib/index';


function SettingMailSmsFormCreate(props) {
  const [getFocusInpuy, setFocusInpuy] = useState(true)
  const editor = useRef(null);
  const { intl, placeholder } = props;
  const location = useLocation();
  const history = useHistory();
  const locale = useSelector((state) => state.language.locale);
  const id = location.state?.id ?? 0;
  const { classes } = useStyles();
  const title = localStorage.getItem('MenuName');
  const [formTypesList, setFormTypesList] = useState([]);
  const [decoratorList, setDecoratorList] = useState([]);
  const [decoratorMenuAnchorEl, setDecoratorMenuAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState({
    id,
    formTypeId: null,
    subject: '',
    body: '',
    mobileBody: '',
  });

  console.log(formInfo.body)

  useEffect(() => {
    if (formInfo.formTypeId) {
      setDecoratorList(
        formTypesList.find((item) => item.id === formInfo.formTypeId)?.keyList
      );
    }
  }, [formInfo.formTypeId]);

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await api(locale).save(formInfo);
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
        setFormInfo(dataApi);
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
    setFocusInpuy(true)
    setFormInfo((prev) => ({
      ...prev,
      body: value,
    }));
  };

  const onEditorMobileChange = (value) => {
    setFormInfo((prev) => ({
      ...prev,
      mobileBody: value,
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

  const onAddDecoratorBtnClick = (event) => {
    setDecoratorMenuAnchorEl(event.currentTarget);
  };

  const closeDecoratorDropdown = () => {
    setDecoratorMenuAnchorEl(null);
  };

  const onDecoratorItemClick = async (key) => {
    if (editor.current) {
      if (getFocusInpuy === false) {
        setFormInfo((prev) => ({
          ...prev,
          mobileBody: prev.mobileBody + key,
        }));
      } else {
        setFormInfo((prev) => ({
          ...prev,
          body:  prev.body + key,
        }));
     
      }
    }

    closeDecoratorDropdown();
  };

  const config = useMemo(() => ({
    readonly: false,    
    placeholder: '',
    buttons: "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,symbols,indent,outdent,align,find,paragraph,lineHeight,brush,table,superscript,subscript,classSpan,image,hr,link,copy,paste,spellcheck,speechRecognize,selectall,source,preview,cut,fullsize,print"
  }),
    [placeholder]

  );

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
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>
              {decoratorList.length > 0 && (
                <Button
                  variant='contained'
                  size='medium'
                  color='primary'
                  onClick={onAddDecoratorBtnClick}
                  sx={{ mb: 2 }}
                >
                  {intl.formatMessage(messages.addDecorator)}
                </Button>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextareaAutosize
                onClick={() => setFocusInpuy(false)}
                name='customerAddress'
                value={formInfo.mobileBody}
                onChange={(e) => {
                  onEditorMobileChange(e.target.value)
                }}
                maxLength={100}
                placeholder={intl.formatMessage(messages.mobileNotification)}
                className={`${style.investigationAnswer} ${classes.textareaSty}`}
                autoComplete='off'
              />
            </Grid>

            <Grid item xs={12}>

              <p style={{ fontWeight: "bolder" }}>{intl.formatMessage(messages.emailNotification)}</p>

              <JoditEditor
                ref={editor}
                value={formInfo.body}
                className={style.textEditorSty}
                onBlur={onEditorChange}
                onChange={onEditorChange}
                onClick={onEditorChange}
                config={config}

              />

              <Menu
                anchorEl={decoratorMenuAnchorEl}
                open={Boolean(decoratorMenuAnchorEl)}
                onClose={closeDecoratorDropdown}
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
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {decoratorList.map((item) => (
                  <MenuItem
                    onClick={() => onDecoratorItemClick(item.key)}
                    key={item.id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>

            </Grid>

            <Grid item xs={12}>
              {formInfo.body && (
                <PapperBlock
                  whiteBg
                  icon='border_color'
                  desc=''
                  title={intl.formatMessage(payrollMessages.preview)}
                >
                  <div className='ql-snow'>
                    <div className='ql-editor'>{HTMLReactParser(formInfo.body)}</div>
                  </div>
                </PapperBlock>
              )}
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

    </PayRollLoader>
  );
}

SettingMailSmsFormCreate.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(SettingMailSmsFormCreate);
