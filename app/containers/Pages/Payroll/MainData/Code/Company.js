import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CompanyData from '../api/CompanyData';
import style from '../../../../../styles/styles.scss'
import PayRollLoader from '../../Component/PayRollLoader';
import { PapperBlock } from "enl-components";

// validation functions
//const required = (value) => (value == null ? 'Required' : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

const useStyles = makeStyles()((theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: '100%',
    marginBottom: 20,
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

function Company() {
  const title = localStorage.getItem('MenuName');
  const [id, setid] = useState(0);
  const [name, setName] = useState('');
  const [enname, setEnName] = useState('');
  const [phone, setphone] = useState('');
  const [mail, setmail] = useState('');
  const [address, setaddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { classes } = useStyles();
  // const { pristine, submitting, init } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      id: id,
      arName: name,
      enName: enname,
      address: address,
      mail: mail,
      phone: phone,
    };

    try {
      await CompanyData().Save(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  const clear = (e) => {
    setName('');
    setEnName('');
    setphone('');
    setmail('');
    setaddress('');
  };
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const dataApi = await CompanyData().GetList();

        if (dataApi.length > 0) {
          setid(dataApi[0].id);
          setName(dataApi[0].arName);
          setEnName(dataApi[0].enName);
          setphone(dataApi[0].phone);
          setmail(dataApi[0].mail);
          setaddress(dataApi[0].address);
        }
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // if (!data.length) { fetchData(); }
  }, []);
  return (
    <PayRollLoader isLoading={isLoading}>
      <Grid
        container
        alignItems="flex-start"
        direction="row"
      >
        <Grid item xs={12}>
          <PapperBlock whiteBg icon="border_color" title={title} desc="">

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} >
                <Grid item xs={12} md={3}>
                  <TextField
                    name="Cmp_name"
                    id="Cmp_name"
                    placeholder="Name"
                    label="Name"
                    // validate={required}
                    required
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    name="EnName"
                    id="EnName"
                    placeholder="English Name"
                    label="English Name"
                    // validate={required}
                    required
                    fullWidth
                    variant="outlined"
                    value={enname}
                    onChange={(e) => setEnName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    id="Cmp_Phone"
                    name="Cmp_Phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="Telephone"
                    label="Telephone"
                    // validate={required}
                    required
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    type="email"
                    error={email === 'Invalid email'}
                    id="Cmp_Mail"
                    name="Cmp_Mail"
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                    placeholder="Email"
                    label="Email"
                    required
                    // validate={[required, email]}
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="Cmp_address"
                    id="Cmp_address"
                    fullWidth
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Address"
                    label="Address"
                    multiline
                    rows={1}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    //disabled={submitting}
                    className={style.generalBtnStys}
                  >
                    Submit
                  </Button>
                  <Button type="reset" onClick={clear} className={style.generalBtnStys}>
                    Reset
                  </Button>
                </Grid>

              </Grid>
            </form>
          </PapperBlock>
        </Grid>
      </Grid>
    </PayRollLoader>
  );
}

//renderRadioGroup.propTypes = { input: PropTypes.object.isRequired };

// Company.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   reset: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   submitting: PropTypes.bool.isRequired,
//   init: PropTypes.func.isRequired,
//   clear: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   init: bindActionCreators(initAction, dispatch),
//   clear: () => dispatch(clearAction),
// });

// const ReduxFormMapped = reduxForm({
//   form: 'Company',
//   enableReinitialize: true,
// })(Company);

// const FormInit = connect(
//   (state) => ({
//     initialValues: state.initval.formValues,
//   }),
//   mapDispatchToProps
// )(ReduxFormMapped);

export default Company;
