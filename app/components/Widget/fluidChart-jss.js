import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme, _params, classes) => ({
  chartFluid: {
    width: '100%',
    minWidth: 500,
    height: 398
  },
  smallTitle: {
    padding: `0 ${theme.spacing(2)}`,
    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  divider: {
    margin: `${theme.spacing(3)} 0`,
    display: 'block'
  },
  
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export default useStyles;
