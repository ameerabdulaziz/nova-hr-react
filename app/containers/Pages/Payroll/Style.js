import { makeStyles } from 'tss-react/mui';
import { lighten, darken, alpha } from '@mui/material/styles';
const useMainStyles = makeStyles()((theme,_params,classes) => ({
  
  CustomMUIDataTable: {
    '& .MuiToolbar-root':{background:theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light},
    '& .MuiTableCell-head':{color: theme.palette.primary.main,},
    '& .MuiTableCell-root':{paddingRight:'0px',paddingTop:'0px',paddingBottom:'0px'},
    '& .MuiTablePagination-toolbar':{background:'transparent'},
    '& .tss-qbo1l6-MUIDataTableToolbar-actions':{justifyContent:'flex-end', gap: '5px', alignItems: 'center', display: 'flex'},
    '& .mui-style-ltr-bfklix-rootTable':{marginTop:'0px'},
    '& .tss-1cdcmys-MUIDataTable-responsiveBase':{position: 'inherit !important'},
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important",

    // Table toolbar
    '.MuiPaper-root > .MuiPaper-root + .MuiToolbar-root' :{
      borderRadius: 0,
    },
    // Table selection toolbar
    '.MuiPaper-root > .MuiPaper-root' :{
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
  },

 
  

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
 /*  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  }, */

  
group: {
  width: 'auto',
  height: 'auto',
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'row',
},
rootTable: {
"& .MuiTableHead-root": {
  background:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.light,
},
"& .MuiTable-root":
    {
      margin: "0px !Important",
    },
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important",
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
    marginTop: '10px'
  },
  card2: {
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.20);',
    width : "34%",
    marginRight : "auto",
    marginLeft : "auto"
  },
  content: {
    width: '100%',
    textAlign: 'center',
    margin: '0px',
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2),
    },
  },
  hr: {
    border: 0,
    clear: 'both',
    display: 'block',
    width: '100%',
    backgroundColor: '#ecece9',
    height: '1px',
    marginBottom: '1em'
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
    // [`& .${classes.avatar}`]: {
    //   width: 100,
    //   height: 100,
    //   margin: '0 auto',
    // },
  },
  uploadAvatar: {
    width: '100%',
    height: '100%',
    background:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[100],
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
  buttonLink: {
    /* background: 'none', */
    padding: 0,
    textTransform: 'none',
    transition: 'color ease 0.3s',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.875rem',
    '&:hover': {
      /* background: 'none', */
      color: theme.palette.secondary.main,
    },
  },
  cover: {
    [`& .${classes.name}, & .${classes.subheading}`]: {
      color: theme.palette.common.white
    },
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    height: 'auto',
    backgroundColor: theme.palette.mode === 'dark' ? darken(theme.palette.primary.dark, 0.8) : theme.palette.primary.dark,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundSize: 'cover',
    textAlign: 'center',
    boxShadow: theme.shadows[7],
    backgroundPosition: 'bottom center',
    borderRadius: theme.rounded.medium,
  },
  cover2: {
    [`& .${classes.name}, & .${classes.subheading}`]: {
      color: theme.palette.common.white
    },
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    height: 'auto',
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundSize: 'cover',
    textAlign: 'center',
    boxShadow: theme.shadows[7],
    backgroundPosition: 'bottom center',
    borderRadius: theme.rounded.medium,
  },
  profileTab: {
    marginTop: -48,
    [theme.breakpoints.down('sm')]: {
      marginTop: -48,
    },
    borderRadius: `0 0 ${theme.rounded.medium} ${theme.rounded.medium}`,
    background: alpha(theme.palette.background.paper, 0.8),
    position: 'relative',    
    
  },
  profileTab2: {
    marginTop: -48,
    [theme.breakpoints.down('sm')]: {
      marginTop: -48,
    },
    borderRadius: `0 0 ${theme.rounded.medium} ${theme.rounded.medium}`,
    background: alpha(theme.palette.background.paper, 0.8),
    position: 'relative',    
    '& svg': {
      fontSize: 25,
      //fill: theme.palette.primary.main
    },
  },
  headercontent: {
    background: alpha(theme.palette.secondary.main, 0.3),
    height: '100%',
    width: '100%',
    padding: `30px ${theme.spacing(3)} 60px`
  },
  headercontent2: {
    height: '100%',
    width: '100%',
    padding: `30px ${theme.spacing(3)} 60px`
  },
  redLabel: {
    color: "red",
  },
  selectEmpButton: {
    width:"70%",float:"left"
  },
  searchButton: {
    width:"20%",float:"left"
  },

 examMainSty:{
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
  
},

textSty:{
  color:theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light
},

containerSty:{
  border: "1px solid",
  borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light
},

textareaSty:{
  color:theme.palette.mode === 'dark' ? "#ffffff": "#000000",

  '&:hover': {
      border: "1px solid",
      borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    },
    '&:focus': {
      border: "1px solid",
      borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    },
},

colorSty:{
      color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
},

backgroundColorSty:{
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
},

sectionBackgroundColorSty:{
  backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '#ffffff',
},

  surveyMainSty:{
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
  },
  

  'bg-theme': {
    color: 'white',
    background:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.light,
  },
}));

export default useMainStyles;
