import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import {
  setLoggedIn,
  setUserDetails,
  setAccountType
} from '../../../redux/action';
import {
  SOCKETENDPOINT1,
  SOCKETENDPOINT2,
  SOCKETENDPOINT3,
  SOCKETENDPOINT4,
  Agent_service_url
} from '../../dashboard-360/utils/endpoints'
import Axios from 'axios';
import { ADMIN, USER } from 'src/redux/constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Logo from '../../dashboard-360/components/loginlogo'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.grssl.com/">
        Grassroots
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/static/images/merittrack.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageWrapper: {
    background:
      'linear-gradient(45eg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15))',
    height: '100%',
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root1: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

}));


var APIENDPOINT = SOCKETENDPOINT2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



// function addToQueue(agentId, queue, user_Details) {
//   const axios = require('axios');
//   console.log(user_Details, "addddd")
//   var APIENDPOINT = '';
//   console.log('userDetails sdsdfgsdfgsdf', user_Details)
//   if (user_Details.Server === 'server1') {
//     APIENDPOINT = SOCKETENDPOINT1
//   }
//   if (user_Details.Server === 'server2') {
//     APIENDPOINT = SOCKETENDPOINT2
//   }
//   if (user_Details.Server === 'server3') {
//     APIENDPOINT = SOCKETENDPOINT3
//   }
//   if (user_Details.Server === 'server4') {
//     APIENDPOINT = SOCKETENDPOINT4
//   }

//   const config = {
//     method: 'get',
//     url:
//       `${APIENDPOINT
//       }/ami/actions/addq?Interface=${agentId}&Queue=${queue
//       }`,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   axios(config)
//     .then((response) => { })
//     .catch((error) => {
//       console.log(error);
//     });

// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  function addToQueue(agentId, queue, user_Details) {
    const axios = require('axios');

    var config1 = {
      method: 'get',
      url: 'http://106.51.86.75:42004/crm/serveragentcounts',
      headers: {}
    };

    axios(config1)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        var data = response.data


        var items = data.items[0];
        delete items['_id'];
        delete items['createdAt'];
        delete items['updatedAt'];
        delete items['__v'];

        var data = [];
        data.push(items.server1, items.server2, items.server3, items.server4)
        data = data.sort((a, b) => parseFloat(a) - parseFloat(b));

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        }

        console.log('data', data)
        console.log(getKeyByValue(items, data[0]));
        if (getKeyByValue(items, data[0]) === 'server1') {
          APIENDPOINT = 'http://106.51.86.75:42001';
        }
        if (getKeyByValue(items, data[0]) === 'server2') {
          APIENDPOINT = 'http://106.51.86.75:42002';
        }
        if (getKeyByValue(items, data[0]) === 'server3') {
          APIENDPOINT = 'http://106.51.86.75:42003';
        }
        if (getKeyByValue(items, data[0]) === 'server4') {
          APIENDPOINT = 'http://106.51.86.75:42005';
        }
        const config = {
          method: 'get',
          url:
            `${APIENDPOINT
            }/ami/actions/addq?Interface=${agentId}&Queue=${queue
            }`,
          headers: {
            'Content-Type': 'application/json'
          }
        };

        axios(config)
          .then((response) => { })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });




  }
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function removeFromQueue(agentId, queue, user_Details) {
    const axios = require('axios');
    var APIENDPOINT = '';
    console.log('userDetails sdsdfgsdfgsdf', user_Details)
    // if (user_Details.Server === 'server1') {
    //   APIENDPOINT = SOCKETENDPOINT1
    // }
    // if (user_Details.Server === 'server2') {
    //   APIENDPOINT = SOCKETENDPOINT2
    // }
    // if (user_Details.Server === 'server3') {
    //   APIENDPOINT = SOCKETENDPOINT3
    // }
    // if (user_Details.Server === 'server4') {
    //   APIENDPOINT = SOCKETENDPOINT4
    // }
    console.log('remove', agentId);
    const config1 = {
      method: 'get',
      url:
        `${SOCKETENDPOINT1
        }/ami/actions/rmq?Queue=${queue
        }&Interface=${agentId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config1)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      });


    const config2 = {
      method: 'get',
      url:
        `${SOCKETENDPOINT2
        }/ami/actions/rmq?Queue=${queue
        }&Interface=${agentId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config2)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      });


    const config3 = {
      method: 'get',
      url:
        `${SOCKETENDPOINT3
        }/ami/actions/rmq?Queue=${queue
        }&Interface=${agentId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config3)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      });


    const config4 = {
      method: 'get',
      url:
        `${SOCKETENDPOINT4
        }/ami/actions/rmq?Queue=${queue
        }&Interface=${agentId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios(config4)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Login({ setLoggedInMain, setAccountTypeMain, setUserDetailsMain }) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const user_Details = useSelector(state => state.userData)

  console.log(user_Details)

  async function authenticate(values) {
    setError('');
    try {
      const url = 'http://106.51.86.75:4000/auth/apiM/login'
      // const url='http://192.168.3.45:42009/user/login'
      console.log("values", values)

      const res = await Axios.post(url, values);
      var myObj = res.data;
      if ('statusCode' in myObj) {
        setLoggedInMain(false);
        setError(true);
      } if ('status' in myObj) {
        console.log("login api", res.data)
        const obj = res.data.userDetails;
        const { accessToken } = res.data;

        if (res.data.userDetails.AgentType === 'L1') {
          // addToQueue('Local/5'+localStorage.getItem('AgentSIPID')+'@from-internal', 5000)
          // var queue=res.data.userDetails.AgentQueueStatus
          if (res.data.userDetails.AgentQueueStatus === 'dynamic') {
            removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
            addToQueue('Local/5' + res.data.userDetails.External_num + '@from-queue\n', 7001, res.data.userDetails)
          }
          console.log('data resppppp', res.data)
          localStorage.setItem("jwtToken", accessToken);
          localStorage.setItem('AgentSIPID', res.data.userDetails.External_num);
          localStorage.setItem('role', res.data.userDetails.role);
          localStorage.setItem('Agenttype', res.data.userDetails.AgentType);
          localStorage.setItem('AgentType', 'Inbound')
          setUserDetailsMain(obj);
          setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);
          setLoggedInMain(true);
        } else if (res.data.userDetails.AgentType === 'L2') {
          setError(true)
        }
      } else {
        setLoggedInMain(false);
        setError(true);
      }

    } catch (err) {
      setLoggedInMain(false);
      setError(true);
    }
  }



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
        <div className={classes.imageWrapper} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        style={{ display: 'flex' }}
      >
        <div className={`${classes.paper}`}>
          <div>
            <div className={classes.avatarWrapper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required')
              })}
              onSubmit={values => {
                console.log('values', values);
                localStorage.setItem('AgentType', values.AgentType);
                localStorage.setItem('role', values.role);
                localStorage.setItem('AgentSIPID', values.AgentSIPID);

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}
                  <Box my={2} mt={5}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <div className={classes.root1}>
              {
                error && <span><Alert severity="error">You are not authorized to login</Alert></span>
              }
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});

export default connect(null, mapDispatchToProps)(Login);
