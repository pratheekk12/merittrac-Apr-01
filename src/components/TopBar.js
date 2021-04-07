import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import config from '../modules/ticketing/views/config.json';
import { Link, Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  InputBase,
  fade,
  Tooltip,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from 'src/modules/dashboard-360/components/Logo';
import { SearchIcon } from '@material-ui/data-grid';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { setLoggedIn, setSearchDistributor } from 'src/redux/action';
import { connect } from 'react-redux';
import Axios from 'axios';
import { SET_SEARCH_DISTRIBUTOR } from 'src/redux/constants';
import {
  SOCKETENDPOINT1, SOCKETENDPOINT2, SOCKETENDPOINT3, SOCKETENDPOINT4, SOCKETENDPOINT5, UPDATE_CURRENT_STATUS
} from '../modules/dashboard-360/utils/endpoints'
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 500,
    marginRight: 15,
    fontSize: '0.96rem',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  inputRoot: {
    color: 'white'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch'
      }
    }
  }
}));

var APIENDPOINT = SOCKETENDPOINT2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToQueue(agentId, queue) {
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueAdd'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/addq?Interface=' + agentId + '&Queue=' +
      queue +
      '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) { })
    .catch(function (error) {
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  const config5 = {
    method: 'get',
    url:
      `${SOCKETENDPOINT5
      }/ami/actions/rmq?Queue=7003&Interface=${agentId}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config5)
    .then((response) => {

    })
    .catch((error) => {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function updateAgentCallStatusV2(callStatusId, data) {
  // console.log("updateData", updateData)
  var axios = require('axios');
  var config = {
    method: 'put',
    url: UPDATE_CURRENT_STATUS + callStatusId,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      console.log('update', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

const TopBar = ({
  className,
  onMobileNavOpen,
  logout,
  searchDist,
  ...rest
}) => {
  const userData = useSelector(state => state.userData);
  const user_Details = useSelector(state => state.userData)
  const [createAccess, setCreateAccess] = useState(-1);
  const [viewAccess, setViewAccess] = useState(-1);
  const [assignAccess, setAssignAccess] = useState(-1);
  const [reportsAccess, setReportsAccess] = useState(-1);
  const [editAccess, setEditAccess] = useState(-1);
  const [role, setRole] = useState(-1);
  const classes = useStyles();
  const [notifications] = useState([]);
  const [searchText, setSearchText] = useState('');
  let history = useHistory();
  useEffect(() => {
    // const apiUrl = config.APIS_URL + '/access/email/' + userData.email;
    // fetch(apiUrl)
    //   .then(res => res.json())
    //   .then(repos => {
    //     setRole(repos.role.role);
    //     setCreateAccess(
    //       parseInt(
    //         (
    //           repos.data.filter(
    //             access => access.functionalityId === '1'
    //           )[0] || { accessLevelId: -1 }
    //         ).accessLevelId
    //       )
    //     );
    //     setViewAccess(
    //       parseInt(
    //         (
    //           repos.data.filter(
    //             access => access.functionalityId === '2'
    //           )[0] || { accessLevelId: -1 }
    //         ).accessLevelId
    //       )
    //     );
    //     setEditAccess(
    //       parseInt(
    //         (
    //           repos.data.filter(
    //             access => access.functionalityId === '3'
    //           )[0] || { accessLevelId: -1 }
    //         ).accessLevelId
    //       )
    //     );
    //     setAssignAccess(
    //       parseInt(
    //         (
    //           repos.data.filter(
    //             access => access.functionalityId === '4'
    //           )[0] || { accessLevelId: -1 }
    //         ).accessLevelId
    //       )
    //     );
    //     setReportsAccess(
    //       parseInt(
    //         (
    //           repos.data.filter(
    //             access => access.functionalityId === '5'
    //           )[0] || { accessLevelId: -1 }
    //         ).accessLevelId
    //       )
    //     );
    //   });
  }, []);
  const updateSearchText = evt => {
    setSearchText(evt.target.value);
  };
  const distributorID = evt => {
    console.log('searchText', searchText);
    searchDist(searchText);
  };
  async function logoutUser() {

    try {
      removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
      // if (localStorage.getItem('Agenttype') === 'L1') {
      //   // removeFromQueue('Local/5'+localStorage.getItem('AgentSIPID')+'@from-internal', 7001)
      //   if (user_Details.AgentQueueStatus === 'dynamic') {
      //     removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
      //   }
      // }
      // if (localStorage.getItem('Agenttype') === 'L2') {
      //   // removeFromQueue('Local/3'+localStorage.getItem('AgentSIPID')+'@from-internal', 7002)
      //   if (user_Details.AgentQueueStatus === 'dynamic') {
      //     removeFromQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 7002, user_Details);
      //   }
      // }
      updateAgentCallStatusV2(localStorage.getItem('callStatusId'), { loginStatus: 'false' })
      // axios
      // .delete(BackendURL.AuthenticationURL + '/auth/api/logout', { headers: { "authorization": userData } })
      const userData = localStorage.jwtToken

      const url = 'http://106.51.86.75:4000/auth/apiM/logout'
      await Axios.delete(url, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } });

      localStorage.clear();

      logout();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  var test = "green"
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} style={{ background: `${test}` }}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={updateSearchText}
            value={searchText}
            onBlur={distributorID}
          />
        </div> */}
        <Box flexGrow={1} />
        <IconButton color="inherit" onClick={() => history.push('/dash360')}>
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <Button variant="contained" color="secondary" > Fetch Info </Button>
          </Badge>
        </IconButton>


        <Hidden mdDown>
          {localStorage.getItem("role") === "Agent" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/dash360" className="color-white">
              Agent {localStorage.getItem('Agenttype') + ' ' + localStorage.getItem('AgentSIPID')}
            </Link>
          </Typography> : <></>}
          {localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Group admin" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/telephony/dashboard" className="color-white">
              Telephony
            </Link>
          </Typography> : <></>}
          {localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Group admin" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/agent/dashboard" className="color-white">
              Agents
            </Link>
          </Typography> : <></>}
          {localStorage.getItem("role") === "Admin" ? <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/group/dashboard" className="color-white">
              Groups
            </Link>
          </Typography> : <></>}
          {viewAccess === -1 ? (
            ''
          ) : (
            <></>
          )}
          {/* <IconButton color="inherit">
            <AccountBoxRoundedIcon />
          </IconButton> */}
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={() => logoutUser()}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
        <IconButton color="inherit" onClick={() => logoutUser()}>
              <ExitToAppIcon />
            </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = state => ({
  searchtextdist: state.searchDistributor
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(setLoggedIn(false)),
  searchDist: val => dispatch(setSearchDistributor(val))
});

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logout: PropTypes.func,
  searchDist: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
