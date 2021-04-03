import { PinDropSharp } from '@material-ui/icons';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainLoader from './components/MainLoader';
import RouteSwitch from './components/RouteSwitch';
import TopBar from './components/TopBar';
import NavBar from './modules/dashboard-360/layouts/DashboardLayout/NavBar';
import { setAccountType, setLoggedIn, setUserDetails } from './redux/action';
import { ADMIN, USER } from './redux/constants';
import routes from './routes';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import {
  SOCKETENDPOINT1, SOCKETENDPOINT2, SOCKETENDPOINT3, SOCKETENDPOINT4, SOCKETENDPOINT5, UPDATE_CURRENT_STATUS
} from './modules/dashboard-360/utils/endpoints'
import { useHistory } from 'react-router-dom'


function Main({
  isLoggedIn,
  classes,
  setUserDetailsMain,
  setAccountTypeMain,
  setLoggedInMain
}) {
  const [loading, setLoading] = useState(true);
  const [filteredRoutes, setfilteredRoutes] = useState(
    routes.filter(route => route.requiresAuth === false)
  );

  const [localLoggedInState, setLocalLoggedIn] = useState(false);
  const [routeAccess, setRouteAccess] = useState(false);
  const dispatch = useDispatch()
  const user_Details = useSelector(state => state.userData)

  let history = useHistory()

  function removeFromQueue(agentId, queue, user_Details) {
    const axios = require('axios');
    var APIENDPOINT = '';
    // console.log('userDetails sdsdfgsdfgsdf', user_Details)
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
    // console.log('remove', agentId);
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
        // console.log(error);
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
        // console.log(error);
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
        //console.log(error);
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
        //console.log(error);
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
        //console.log(error);
      });
  }

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
        //console.log('update', JSON.stringify(response.data));
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  useEffect(() => {
    (async function checkLoggedInState() {
      try {
        if (localStorage.getItem('jwtToken')) {
          setLoggedInMain(true);
          var test = await Axios.post('http://106.51.86.75:4000/auth/apiM/verifyClient', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
            .then(async response => {
              //console.log('respose', response)
              var result = response.data.userDetails
              if (response.data.status != 200) {
                try {
                  removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
                  updateAgentCallStatusV2(localStorage.getItem('callStatusId'), { loginStatus: 'false' })
                  const userData = localStorage.jwtToken

                  const url = 'http://106.51.86.75:4000/auth/apiM/logout'
                  axios.delete(url, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } });

                  localStorage.clear();

                  dispatch(setLoggedIn(false))
                } catch (err) {
                  //console.log(err);
                }
              } else {
                const GET_CURRENT_STATUS_BY_AGENT_SIP_ID = `http://106.51.86.75:42004/crm/currentstatuses/agentSipID?agentSipID=${localStorage.getItem('AgentSIPID')}`;
                const getCurrentStatus = await Axios.get(GET_CURRENT_STATUS_BY_AGENT_SIP_ID);
                //console.log('getCurrentStatus',getCurrentStatus)

                if (getCurrentStatus.data[0].jwtToken === localStorage.getItem('jwtToken')) {
                  var obj = {
                    UserID: result.UserID,
                    AllowPublic: result.AllowPublic,
                    UserName: result.UserName,
                    EmployeeName: result.EmployeeName,
                    EmailID: result.EmailID,
                    OTP: result.OTP,
                    tenetID: result.tenetID,
                    tenentId: result.tenentId,
                    tenentName: result.tenentName,
                    roleids: result.roleids,
                    role: result.role,
                    modules: result.modules,
                    External_num: result.External_num,
                    Server: result.Server,
                    AgentQueueStatus: result.AgentQueueStatus
                  }
                  setUserDetailsMain(obj)
                  localStorage.setItem('AgentSIPID', obj.External_num);
                  setAccountTypeMain(obj.role === 'Agent' || obj.role === 'Admin' || obj.role === 'Group admin' ? ADMIN : USER);
                  // setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);
                  if (obj.role === 'Agent') {
                    setRouteAccess(true)
                  }

                } else {
                  localStorage.clear();
                  setLoggedInMain(false);
                  // history.push('/auth/login')

                }

              }

            })
            .catch(error => console.log(error));
        } else {
          setLoggedInMain(false);
        }
      } catch (error) {
        setLoggedInMain(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setfilteredRoutes(
      routes.filter(route => route.requiresAuth === isLoggedIn)
    );
    setLocalLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  return loading ? (
    <MainLoader />
  ) : localLoggedInState ? (
    <>
      <TopBar />
      <NavBar openMobile={false} onMobileClose={() => null} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <RouteSwitch
              routes={filteredRoutes}
              isRoot
              redirectPath="/dash360"
            />
            {/* <RouteSwitch
              routes={filteredRoutes}
              isRoot
              redirectPath="/telephony"
            /> */}

          </div>
        </div>
      </div>
    </>
  ) : (
    <RouteSwitch routes={filteredRoutes} isRoot redirectPath="/auth/login" />
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.logInState
});
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
