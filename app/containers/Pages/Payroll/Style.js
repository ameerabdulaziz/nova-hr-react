import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles()((theme) => ({
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
    field: {
      width: '100%',
      
      //marginBottom: 20,
      //margin: theme.spacing(1),
    },
    fieldBasic: {
      width: '100%',
      marginBottom: 20,
      marginTop: 10,
    },
    inlineWrap: {
      display: 'flex',
      flexDirection: 'row',
    },
    buttonInit: {
      margin: theme.spacing(4),
      textAlign: 'center',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    menu: {
      width: 200,
    },
  }));

  export default useStyles;
  