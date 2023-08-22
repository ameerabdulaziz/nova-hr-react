import { makeStyles } from 'tss-react/mui';
import { lighten, darken, alpha } from '@mui/material/styles';
const useMainStyles = makeStyles()((theme) => ({
  table: {
    '& > div': {
      overflow: 'auto',
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all',
      },
      [theme.breakpoints.down('lg')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  },
  root: {
    flexGrow: 1,
    padding: 30,
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableSmall: {
    minWidth: 500,
  },
  stripped: {
    '& tbody tr:nth-of-type(even)': {
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.grey[900], 0.5)
          : theme.palette.grey[50],
    },
  },
  hover: {
    '& tbody tr:hover': {
      background:
        theme.palette.mode === 'dark'
          ? darken(theme.palette.primary.light, 0.8)
          : lighten(theme.palette.primary.light, 0.5),
    },
  },
  card: {
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '10px',
    borderColor: 'rgba(0, 0, 0, 0.20);',    
  },
  content: {
    width: '100%',
    textAlign: 'center',
    margin: '0px',
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2)
    }
  },
  hr: {
    border: 0,
  clear:'both',
  display:'block',
  width: '96%',               
  backgroundColor:'#ecece9',
  height: '1px'
  },
  field: {
    width: '100%',
  },
  field1: {
    width: '90%',
  },
  textField: {
    flexBasis: 200,
    width: 300,
    marginTop: 4,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInit: {
    margin: theme.spacing(40),
    textAlign: 'center',
  },
  button: {
    margin: `${theme.spacing(1)} 0`,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  menu: {
    width: 200,
  },
}));

export default useMainStyles;
