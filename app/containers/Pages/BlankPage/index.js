import {
  FormGroup,
  FormLabel,
  FormControl,
  ListItemText,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ActionDelete from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Create';
import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { format, isValid, zonedTimeToUtc } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import MUIDataTable from 'mui-datatables';
import ApiData from './ApiData';
import { useSelector } from 'react-redux';
import {  ToastContainer,toast } from 'react-toastify';

const useStyles = makeStyles()((theme) => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('lg')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  }
}));

function BlankPage() {
  const notify = () => {
    
    toast.error("error.response.data.error",{
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  }
  

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        {/* <ToastContainer /> */}
      </div>
    );
}

export default BlankPage;
