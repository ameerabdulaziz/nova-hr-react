import { makeStyles } from 'tss-react/mui';
import { darken, alpha } from '@mui/material/styles';
import {
  amber,
  blue,
  deepPurple as purple,
  teal,
  brown,
  red,
} from '@mui/material/colors';

const drawerWidth = 300;
const drawerHeight = 540;

const gradient = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage: `linear-gradient(to right, ${
    theme.palette.background.paper
  } 0%, ${alpha(theme.palette.divider, 0.03)} 50%, ${alpha(
    theme.palette.divider,
    0.03
  )} 70%, ${theme.palette.background.paper} 100%)`,
  backgroundRepeat: 'no-repeat',
});

const useStyles = makeStyles()((theme, _params, classes) => ({
  higher: {},
  padding: {},
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    background:
      theme.palette.mode === 'dark'
        ? darken(theme.palette.primary.main, 0.6)
        : theme.palette.primary.light,
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light,
    marginBottom: theme.spacing(3),
    [`&.${classes.padding}`]: {
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  autocomplete: {
    marginTop: -30,
  },
  fixHeight: {},
  appBar: {
    height: 'auto',
    background:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.grey[800], 0.75)
        : alpha(theme.palette.background.paper, 0.95),
    justifyContent: 'center',
    [`& .${classes.avatar}`]: {
      width: 80,
      height: 80,
      marginRight: 30,
    },
    '& h2': {
      flex: 1,
      color: theme.palette.text.primary,
      '& span': {
        color: theme.palette.text.secondary,
      },
    },
  },
  detailContact: {
    background: theme.palette.background.paper,
    borderRadius: 8,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  online: {
    background: '#CDDC39',
  },
  bussy: {
    background: '#EF5350',
  },
  idle: {
    background: '#FFC107',
  },
  offline: {
    background: '#9E9E9E',
  },
  statusLine: {},
  status: {
    padding: '2px 6px',
    [`& .${classes.statusLine}`]: {
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: 2,
      width: 10,
      height: 10,
      border: `1px solid ${theme.palette.common.white}`,
    },
  },
  appBarShift: {
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('lg')]: {
      zIndex: 1300,
    },
  },
  total: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.palette.text.disabled,
    textTransform: 'uppercase',
  },
  drawerPaper: {
    background: 'none',
    position: 'relative',
    paddingBottom: 65,
    border: 'none',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    height: drawerHeight + 200,
    [theme.breakpoints.up('sm')]: {
      height: drawerHeight,
      width: drawerWidth,
    },
  },
  clippedRight: {},
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)} 0`,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create(['left', 'opacity'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
    [theme.breakpoints.down('sm')]: {
      left: '100%',
      top: 0,
      opacity: 0,
      position: 'absolute',
      zIndex: 1200,
      width: '100%',
      overflow: 'auto',
      height: '100%',
    },
  },
  detailPopup: {
    [theme.breakpoints.down('sm')]: {
      left: 0,
      opacity: 1,
      zIndex: 2001,
      background:
        theme.palette.mode === 'dark'
          ? darken(theme.palette.primary.main, 0.6)
          : theme.palette.primary.light,
    },
  },
  title: {
    display: 'flex',
    flex: 1,
    '& svg': {
      marginRight: 5,
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 8,
    //display: 'flex',
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    marginRight: theme.spacing(0.5),
    margin: '0px',
  },
  search: {
    width: 'auto',
    height: '100%',
    top: 0,
    left: 20,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)} ${theme.spacing(
      0.5
    )} ${theme.spacing(6)}`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  EditBtn: {
    background: theme.palette.background.paper,
  },
  bottomFilter: {
    position: 'absolute',
    width: '100%',
    background:
      theme.palette.mode === 'dark'
        ? darken(theme.palette.primary.main, 0.6)
        : theme.palette.primary.light,
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    zIndex: 2000,
    bottom: 0,
    left: 0,
  },
  avatar: {},
  userName: {
    textAlign: 'left',
    lineHeight: '24px',
  },
  cover: {
    padding: '20px 8px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [`& .${classes.avatar}`]: {
      width: 60,
      height: 60,
      margin: `0 ${theme.spacing(2)}`,
      [theme.breakpoints.down('md')]: {
        width: 50,
        height: 50,
        marginRight: 20,
      },
    },
  },
  opt: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favorite: {
    color: amber[500],
  },
  redIcon: {
    background: red[50],
    '& svg': {
      color: red[500],
    },
  },
  brownIcon: {
    background: brown[50],
    '& svg': {
      color: brown[500],
    },
  },
  tealIcon: {
    background: teal[50],
    '& svg': {
      color: teal[500],
    },
  },
  blueIcon: {
    background: blue[50],
    '& svg': {
      color: blue[500],
    },
  },
  amberIcon: {
    background: amber[50],
    '& svg': {
      color: amber[500],
    },
  },
  purpleIcon: {
    background: purple[50],
    '& svg': {
      color: purple[500],
    },
  },
  field: {
    width: '100%',
    marginBottom: theme.spacing(1),

    '& svg': {
      color: theme.palette.grey[400],
      fontSize: 18,
    },
  },
  form: {
    // width: '100%',
    margin: theme.spacing(2),
  },
  uploadAvatar: {
    width: '100%',
    height: '100%',
    background:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[100],
  },
  contactList: {
    '& > div': {
      borderRadius: 8,
      padding: theme.spacing(1),
      margin: `${theme.spacing(1)} 0`,
    },
  },
  selected: {
    background: alpha(
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      0.8
    ),
    '& span': {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    '& svg': {
      fill:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    '&:focus, &:hover': {
      background: alpha(
        theme.palette.mode === 'dark'
          ? theme.palette.primary.dark
          : theme.palette.background.default,
        0.8
      ),
    },
  },
  hiddenDropzone: {
    display: 'none',
  },
  avatarWrap: {
    width: 100,
    height: 100,
    margin: '10px auto 30px',
    position: 'relative',
  },
  avatarTop: {
    display: 'block',
    textAlign: 'center',
    padding: theme.spacing(3),
    [`& .${classes.avatar}`]: {
      width: 100,
      height: 100,
      margin: '0 auto',
    },
  },
  buttonUpload: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  navIconHide: {
    marginRight: theme.spacing(1),
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  img: {},
  subtitle: {},
  textContent: {},
  placeLoader: {
    maxWidth: 920,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    [`& .${classes.img}, .${classes.title}, .${classes.subtitle}`]: {
      ...gradient(theme),
    },
    [`& .${classes.img}`]: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      display: 'block',
      animation: '2s $placeHolderImg linear infinite',
    },
    [`& .${classes.textContent}`]: {
      flex: 1,
      padding: `0 ${theme.spacing(2)}`,
    },
    [`& .${classes.title}`]: {
      width: '80%',
      height: 20,
      borderRadius: 8,
      display: 'block',
      animation: '2s $placeHolderTitle linear infinite',
    },
    [`& .${classes.subtitle}`]: {
      width: '50%',
      height: 10,
      borderRadius: 8,
      marginTop: theme.spacing(1),
      display: 'block',
      animation: '2s placeHolderTitle linear infinite',
    },
  },
  buttonProgress: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  placeLoaderCover: {
    width: 300,
    margin: `${theme.spacing(1) * -4}px 0`,
    '& figure': {
      width: '60px !important',
      height: '60px !important',
    },
  },
  '@keyframes placeHolderImg': {
    from: {
      backgroundPosition: '-60px 0',
    },
    to: {
      backgroundPosition: '60px 0',
    },
  },
  '@keyframes placeHolderTitle': {
    from: {
      backgroundPosition: '-600px 0',
    },
    to: {
      backgroundPosition: '600px 0',
    },
  },
  table: {
    minwidth: '360px',
  },

  '.mui-style-ltr-i3m2oj-MuiTable-root-table-stripped': {
    minwidth: '360px',
  },
  '.mui-style-ltr-17vbkzs-MuiFormControl-root-MuiTextField-root': {
    margintop: '-15px',
    marginbottom: '8px',
    height: '58px',
    // background: 'white !important',
  },
  //   .mui-style-ltr-i3m2oj-MuiTable-root-table-stripped {
  //     display: table;
  //     width: 100%;
  //     border-collapse: collapse;
  //     border-spacing: 0;
  //     min-width: 560px;
  // }
  compo: {
    margintop: '-15px',
    marginbottom: '10px',
    height: '58px',
    background: 'white !important',
  },
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
