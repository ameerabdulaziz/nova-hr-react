import React, { useState } from 'react';
import { injectIntl,FormattedMessage } from 'react-intl';
import Payrollmessages from '../../messages';
import messages from '../messages';
import style from "../../../../../styles/styles.scss";
import AlertPopup from '../../Component/AlertPopup';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button ,
    Grid,
    TextField,
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton
  } from "@mui/material";

const MenuTemplatePopup = ({
    handleClose,
    openMenuTemplatePopup,
    menuTemplateList,
    menuTemplate,
    menuTemplateForm,
    onFieldChangeFun,
    onSubmitMenuTemplate,
    menuTemplateForPopup,
    setMenuTemplateForPopup,
    deleteFun,
    intl,
}) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);


  return (
    <>
        <AlertPopup
            handleClose={() => {
                setOpenDeletePopup(false);
            }}
            open={openDeletePopup}
            messageData={intl.formatMessage(Payrollmessages.deleteMessage)}
            callFun={() =>{
                deleteFun()
            }}
        />


      <Dialog
        open={openMenuTemplatePopup}
        onClose={handleClose}
        className={style.popupContainerStySize2}
      >
        <DialogTitle>{intl.formatMessage(Payrollmessages.menuTemplate)}</DialogTitle>

        <DialogContent style={{overflowY:"unset"}}>
            <Grid container item spacing={3} xs={12}>  
                <Grid container item spacing={3} xs={12}>            
                    <Grid item xs={6} md={4}>
                        <Autocomplete
                            id="ddlEmp"                        
                            options={menuTemplateList}
                            value={menuTemplateForPopup ? menuTemplateForPopup : null}
                            renderOption={(props, option) => {
                            return (
                            <li {...props} key={option.id} style={{display:"flex",justifyContent:"space-between"}}>
                                <span>
                                    {option.name}
                                </span>
                                <IconButton
                                    size="small"
                                    onClick={(event) => {
                                        setOpenDeletePopup(true)
                                        setMenuTemplateForPopup(option.id)
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                            );
                        }}                  
                            getOptionLabel={(option) =>option.name}
                            onChange={(event, value) => {
                                setMenuTemplateForPopup(value !== null ? value : null)
                        }}
                            renderInput={(params) => (
                            <TextField
                                variant="outlined"                            
                                {...params}
                                name="menuTemplate"
                                value={menuTemplate}
                                label={intl.formatMessage(Payrollmessages.menuTemplate)}
                            />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} xs={12}>   
                    <Grid item xs={6}>
                        <TextField
                        name="menuTemplateEN"
                        value={menuTemplateForm.enName}
                        label={intl.formatMessage(messages.menutemplateEN)}
                        fullWidth
                        onChange={(e)=>{
                            onFieldChangeFun(e,"enName")
                        }}
                        variant="outlined"
                        autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        name="menuTemplateAR"
                        value={menuTemplateForm.arName}
                        label={intl.formatMessage(messages.menutemplateAR)}
                        fullWidth
                        onChange={(e)=>{
                            onFieldChangeFun(e,"arName")
                        }}
                        variant="outlined"
                        autoComplete="off"
                        />
                    </Grid>
                </Grid>
            </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{intl.formatMessage(Payrollmessages.cancel)}</Button>
          <Button onClick={()=>{
                onSubmitMenuTemplate()
                handleClose()
            }}>
                
                {menuTemplateForPopup === null ? 
                    intl.formatMessage(Payrollmessages.save)
                : 
                    intl.formatMessage(Payrollmessages.edit)
                }
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default injectIntl(MenuTemplatePopup);