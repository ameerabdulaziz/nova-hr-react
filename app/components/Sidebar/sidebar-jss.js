import { makeStyles } from 'tss-react/mui';
import { alpha } from '@mui/material/styles';
import {
  lightGreen, red, amber, grey
} from '@mui/material/colors';

const drawerWidth = 260;
const useStyles = makeStyles()((theme, _params, classes) => ({
  user: {
    justifyContent: 'center'
  },
  drawer: {
    width: drawerWidth
  },
  drawerWrap: {
    position: 'relative',
    border: 'none',
    /* background: 'none' */
    background: theme.palette.mode === 'dark' ? '#292929' : 'white',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    border: 'none',
    background: 'none',
    color: theme.palette.text.primary,

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  swipeDrawerPaper: {
    width: drawerWidth,
  },
  opened: {
    [`& .${classes.primary}, & .${classes.icon}`]: {
      color: theme.palette.primary.main,
    },
  },
  drawerPaperClose: {
    width: theme.spacing(8),
    position: 'fixed',
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'background-color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [`& .${classes.user}`]: {
      justifyContent: 'flex-start'
    },
    [`& .${classes.bigAvatar}`]: {
      width: 40,
      height: 40,
    },
    '& nav': {
      display: 'none'
    },
    [`& .${classes.head}`]: {
      paddingLeft: `${theme.spacing(3)}!important`
    },
    '&:hover': {
      width: drawerWidth,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[6],
      '& nav': {
        display: 'block'
      }
    },
    [`& .${classes.brand}`]: {
      display: 'none'
    },
    [`& .${classes.profile}`]: {
      flexDirection: 'row',
      top: theme.spacing(6),
      padding: theme.spacing(0.5),
      textAlign: 'left',
      '& button': {
        width: 'auto'
      }
    },
    [`& .${classes.avatar}`]: {
      marginRight: theme.spacing(3)
    },
    [`& .${classes.menuContainer}`]: {
      [`&.${classes.menuContainer}`]: {
        paddingTop: theme.spacing(10),
        paddingBottom: 0,
      }
    },
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    position: 'fixed',
  },
  drawerInnerMobile: {
    // Make the items inside not wrap when transitioning:
    height: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.75) : alpha(theme.palette.background.paper, 0.95),
  },
  drawerHeader: {
    zIndex: 1,
    position: 'relative',
    minHeight: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(8),
    }
  },
  avatar: {
    margin: '10px 12px',
  },
  bigAvatar: {
    width: 80,
    height: 80,
    boxShadow: theme.shadows[2]
  },
  brandBar: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:after': {
      transition: theme.transitions.create(['box-shadow'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  },
  darker: {
    background: 'none',
  },
  nested: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    margin: `${theme.spacing(0.5)} 0`,
    paddingLeft: theme.spacing(4),
    color: theme.palette.text.primary
  },
  child: {
    '& a': {
      paddingLeft: theme.spacing(2),
    }
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(3),
    display: 'block',
    color: theme.palette.secondary.main,
    lineHeight: '28px',
    fontWeight: 'bold'
  },
  dense: {
    // shymaa
    padding: theme.spacing(0),
    [`& > .${classes.title}:first-of-type`]: {
      margin: '0'
    },
    [`& .${classes.head}`]: {
      paddingLeft: theme.spacing(4)
    }
  },
  active: {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    [`& .${classes.primary}`]: {
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
    },
    [`& .${classes.icon} svg`]: {
      fill: theme.palette.primary.dark,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.24) : theme.palette.primary.light,
    }
  },
  nolist: {
    listStyle: 'none',
  },
  primary: {
    whiteSpace: 'nowrap'
  },
  icon: {
    minWidth: theme.spacing(5),
    color: alpha(theme.palette.text.disabled, 0.48)
  },
  iconed: {
    [`&.${classes.opened}`]: {
      '&:before': {
        content: '""',
        position: 'absolute',
        width: 5,
        height: theme.spacing(6),
        top: 0,
        left: 0,
        background: alpha(theme.palette.primary.main, 0.5)
      }
    }
  },
  head: {
    padding: `${theme.spacing(1)} 0`,
    margin: `${theme.spacing(1)} 0`,
    borderRadius: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0`,
    paddingLeft: theme.spacing(2),
    [`&.${classes.iconed}`]: {
      paddingLeft: theme.spacing(2),
    },
    '& svg[class^="MuiSvgIcon"]': {
      left: -10,
      position: 'relative'
    },
  },
  headCapital: {
    padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(9)}`,
    left: theme.spacing(1) * -2,
    position: 'relative',
    textTransform: 'uppercase',
    borderRadius: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0`,
    margin: theme.spacing(1),
    '& span': {
      fontSize: 14
    }
  },
  copyright: {
    color: theme.palette.text.secondary,
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      background: 'none',
      position: 'absolute',
    },
    left: theme.spacing(3),
    lineHeight: '24px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 10px 5px',
    height: 64,
    position: 'relative',
    textDecoration: 'none',
    fontSize: 16,
    margin: 0,
    fontWeight: 500,
    color: theme.palette.text.primary,
    '& img': {
      width: 30,
      marginRight: 10,
    },
  },
  brandBig: {
    paddingTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: 68
    },
    '& h3': {
      fontSize: 18,
      marginTop: theme.spacing(2),
      fontWeight: 500,
      color: theme.palette.text.primary,
    }
  },
  profile: {
    height: 120,
    width: '100%',
    display: 'flex',
    fontSize: 14,
    padding: 10,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: `${theme.spacing(2)} 0`,
    zIndex: 0,
    '& h4': {
      fontSize: 18,
      marginBottom: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: 110
    },
    '& button': {
      fontSize: 12,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: 110,
      display: 'block',
      overflow: 'hidden',
      textTransform: 'capitalize',
      padding: 0,
      minHeight: 20,
      marginTop: 4,
    }
  },
  statusMenu: {
    '& li': {
      width: 100
    }
  },
  dotStatus: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: theme.spacing(0.5)
  },
  online: {
    backgroundColor: lightGreen[500]
  },
  bussy: {
    backgroundColor: red[500]
  },
  idle: {
    backgroundColor: amber[500]
  },
  offline: {
    backgroundColor: grey[500]
  },
  rounded: {},
  landingNav: {},
  withProfile: {},
  menuContainer: {
    overflow: 'auto',
    height: 'calc(100% - 64px)',
    width: drawerWidth,
    position: 'relative',
    display: 'block',
    padding: `${theme.spacing(5)} 0`,
    [`&.${classes.withProfile}`]: {
      paddingTop: theme.spacing(19)
    },
    [`&.${classes.landingNav}`]: {
      [theme.breakpoints.up('lg')]: {
        paddingTop: theme.spacing(5)
      },
      [theme.breakpoints.down('sm')]: {
        height: 'calc(100% - 80px)',
        paddingTop: theme.spacing(2)
      }
    },
    [`&.${classes.rounded}`]: {
      // shymaa
      paddingRight: theme.spacing(0),
      '& a': {
        borderRadius: theme.spacing(),
      },
      [`& .${classes.opened}`]: {
        '&:before': {
          background: theme.palette.primary.main
        }
      }
    },
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.4)',
      }
    }
  },
  divider: {
    marginTop: theme.spacing(1)
  },
  badge: {
    height: 'auto'
  }
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
