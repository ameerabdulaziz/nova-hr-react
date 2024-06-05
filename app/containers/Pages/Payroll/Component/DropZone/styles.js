import { makeStyles } from 'tss-react/mui';

const useDropzoneStyles = makeStyles()((theme) => ({
  dropItem: {
    borderColor: theme.palette.divider,
    background: theme.palette.background.default,
    borderRadius: theme.rounded.medium,
    color: theme.palette.text.disabled,
    textAlign: 'center',
  },
  uploadIconSize: {
    display: 'inline-block',
    '& svg': {
      width: 60,
      height: 60,
      fill: theme.palette.secondary.main,
    },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    '& svg': {
      fill: theme.palette.common.white,
    },
  },
  button: {
    marginTop: 20,
  },
}));

export default useDropzoneStyles;
