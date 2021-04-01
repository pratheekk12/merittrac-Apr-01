import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Typography,

} from '@material-ui/core';
import {
  PUT_BREAK_AGENT,
  GET_INTERACTION_BY_DISTRIBUTOR_ID,
  GET_INTERACTION_BY_AGENT_SIP_ID,
  UPDATE_CURRENT_STATUS,
  GET_CURRENT_STATUS_BY_AGENT_SIP_ID,
  ORIGINATE_CALL_WITH_SIP_ID,
  SOCKETENDPOINT1,
  SOCKETENDPOINT2,
  SOCKETENDPOINT3,
  SOCKETENDPOINT4,
  SOCKETENDPOINT5,
  AGENT_SERVICE_URL,
} from 'src/modules/dashboard-360/utils/endpoints';
import Iframe from 'react-iframe'
import { ExpandMore } from '@material-ui/icons';
import FAQ from './FAQ'
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import CustomTabs from 'src/modules/dashboard-360/components/CustomTabs';
import CustomTabPanel from 'src/modules/dashboard-360/components/CustomTabPanel';
import BasicTable from 'src/modules/dashboard-360/components/BasicTable';
import MainLoader from 'src/components/MainLoader';
import {
  invoicesColumns,
  orderColumns,
  lastFiveCallData
} from 'src/modules/dashboard-360/utils/columns-config';
import CommonAlert from 'src/components/CommonAlert';
import EditIcon from '@material-ui/icons/Edit';
import { connect, useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
// import CreateTicket from 'src/modules/ticketing/views/create-ticket';
import CallIcon from '@material-ui/icons/Call';
import DealerCard from './DealerCard';
// import TicketsList from './TicketsList';
import dealerAPICalls from './apiCalls';
import { setDistributorOrders } from '../../redux/action';
import { setSearchDistributor } from '../../../../redux/action';
import { searchDistributor } from '../../../../redux/action';
import DispositionForm from './DispositionForm';
import socketIOClient from 'socket.io-client';
import { setAgentCurrentStatus } from 'src/redux/action';
import DistributorSelectPopup from './DistributorSelectModal';
import data from '../customer/CustomerListView/data';
import { da } from 'date-fns/locale';
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
// import CreateCaller from '../../../agentForm/views/dashboard/Createcaller'


// const socket1 = socketIOClient(SOCKETENDPOINT1, { transports: ['websocket'] });
// const socket2 = socketIOClient(SOCKETENDPOINT2 , { transports: ['websocket'] });
// const socket3 = socketIOClient(SOCKETENDPOINT3, { transports: ['websocket'] });
// const socket4 = socketIOClient(SOCKETENDPOINT4, { transports: ['websocket'] });

const socket1 = socketIOClient(SOCKETENDPOINT1, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
const socket2 = socketIOClient(SOCKETENDPOINT2, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
const socket3 = socketIOClient(SOCKETENDPOINT3, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
const socket4 = socketIOClient(SOCKETENDPOINT4, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });
const socket5 = socketIOClient(SOCKETENDPOINT5, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });




const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    },
    modal: {
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    timerComp: {
      position: 'absolute',
      top: 0,
      left: '55%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      backgroundColor: theme.palette.secondary.light,
      padding: '8px 10px',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    callWrapper: {
      left: 'calc(55% + 90px)'
    },
    callInbound: {
      backgroundColor: theme.palette.success.light
    },
    callOutbound: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    }
  };
});

const Dashboard = ({
  distributorOrders,
  setDistributorOrdersAction,
  setAgentCurrentStatusAction,
  setSearchDistributor,
  searchDistributor
}) => {
  const classes = useStyles();
  const reduxState = useSelector(state => state);
  const user_Details = useSelector(state => state.userData)
  const [tab, setTab] = useState(0);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [rootData, setRootData] = useState(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({});
  const [medium, setMedium] = useState([]);
  const [loginToken, setLoginToken] = useState(true)
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    value: '',
    label: ''
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: '',
    label: ''
  });
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    value: '',
    label: ''
  });
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    value: '',
    label: ''
  });
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({
    value: '',
    label: '',
    sla: 0
  });
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({
    value: '',
    label: '',
    slaOnHold: false
  });
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({
    value: '',
    label: '',
    executiveEmail: '',
    executiveMobile: ''
  });
  const [ticket, setTicket] = useState({});
  const [createdTime, setCreatedTime] = useState();
  const [currentCall, setCurrentCall] = useState({
    callUniqueId: '',
    callType: '',
    callStatus: '',
    callDetails: '',
    callDispositionStatus: '',
    callerNumber: '',
    breakStatus: ''
  });
  const [user, setUserDetails] = useState({
    userType: 'Agent'
  });
  const [agent, setAgent] = useState({
    AgentId: '1234',
    AgentType: localStorage.getItem('AgentType'),
    AgentSipId: localStorage.getItem('AgentSIPID')
  });
  const [ALF, setALF] = useState([]);
  const [DLF, setDLF] = useState([]);
  const agentServiceURL = '/agentservice/';
  const [disForm, setdisForm] = useState({});
  const [mobile, setmobile] = useState('');
  const [
    showDistributorDetailsModal,
    setShowDistributorDetailsModal
  ] = useState(false);
  const [dealerDetails, setdealerDetails] = useState({});
  const [distributorModal, setDistributorModal] = useState({});
  function getDLF() {
    const axios = require('axios');
    let data = '';
    let config = {
      method: 'get',
      url:
        GET_INTERACTION_BY_DISTRIBUTOR_ID +
        localStorage.getItem('callerNumber') +
        '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async response => {
        var DLFDATA = response.data;
        DLFDATA = DLFDATA.reverse();
        console.log("DLF", DLFDATA)
        setDLF(DLFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      setLoginToken(true)
    }
  }, [])

  function getALF() {
    const axios = require('axios');
    let data = '';
    let config = {
      method: 'get',
      url: GET_INTERACTION_BY_AGENT_SIP_ID + agent.AgentSipId + '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async response => {
        var ALFDATA = response.data;
        ALFDATA = ALFDATA.reverse();
        setALF(ALFDATA);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function getOpenTickets(agentType, status) {

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `${AGENT_SERVICE_URL}/crm/interactions/getByAgentStatus?type=` + agentType + '&status=' + status + '',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var ALFDATA = response.data;
        console.log('calling the open tickets', ALFDATA)
        // ALFDATA = ALFDATA.reverse();
        setALF(ALFDATA);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function setCurrentCallDetails(
    callStatusId,
    callUniqueId,
    callType,
    callStatus,
    callEvent,
    callDispositionStatus,
    callerNumber,
    breakStatus
  ) {
    setCurrentCall({
      callStatusId: callStatusId,
      callUniqueId: callUniqueId,
      callType: callType,
      callStatus: callStatus,
      callEvent: callEvent,
      callDispositionStatus: callDispositionStatus,
      callerNumber: callerNumber,
      breakStatus: breakStatus
    });
    localStorage.setItem('callStatusId', callStatusId);
    localStorage.setItem('callUniqueId', callUniqueId);
    localStorage.setItem('callType', callType);
    localStorage.setItem('callStatus', callStatus);
    localStorage.setItem('callEvent', callEvent);
    localStorage.setItem('callDispositionStatus', callDispositionStatus);
    localStorage.setItem('callerNumber', callerNumber);
    localStorage.setItem('breakStatus', breakStatus);
  }

  var APIENDPOINT = SOCKETENDPOINT2;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function addToQueue(agentId, queue, user_Details) {
  //   var axios = require('axios');

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
        data.push(items.server1, items.server2, items.server3, items.server4, items.server5)
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
        if (getKeyByValue(items, data[0]) === 'server5') {
          APIENDPOINT = 'http://106.51.86.75:42009';
          queue = 7003
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


  function updateAgentCallStatus(updateData) {
    console.log("updateData", updateData)
    var axios = require('axios');
    var data = {
      agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber,
      breakStatus: updateData.breakStatus
    };
    var config = {
      method: 'put',
      url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
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

  function getAgentCallStatus(agentSipID) {
    console.log('calling the', agentSipID)
    var axios = require('axios');
    var config = {
      method: 'get',
      url: GET_CURRENT_STATUS_BY_AGENT_SIP_ID + agentSipID,
      headers: {}
    };

    axios(config)
      .then(function (response) {

        if (response.data) {
          console.log('getAgentCallStatus....................', response.data);
          updateAgentCallStatusV2(response.data[0]._id, { loginStatus: 'true' })
          setCurrentCallDetails(
            response.data[0]._id,
            response.data[0].agentCallUniqueId,
            response.data[0].agentCallType,
            response.data[0].agentCallStatus,
            response.data[0].agentCallEvent,
            response.data[0].agentCallDispositionStatus,
            response.data[0].contactNumber,
            response.data[0].breakStatus
          );
          setAgentCurrentStatusAction({
            AgentType: agent.AgentType,
            role: user.userType,
            callUniqueId: response.data[0].agentCallUniqueId,
            distributer_id: '',
            callStatusId: response.data[0]._id,
            callDispositionStatus: response.data[0].agentCallDispositionStatus,
            callType: response.data[0].agentCallType,
            callEvent: response.data[0].agentCallEvent,
            callerNumber: response.data[0].contactNumber,
            callStatus: response.data[0].agentCallStatus,
            AgentSIPID: agent.AgentSipId,
            breakStatus: response.data[0].breakStatus
          });
          if (response.data[0].channel !== null || response.data[0].channel !== undefined) {
            // localStorage.setItem('channel', response.data[0].channel);
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onClick = event => {
    console.log('mobile', mobile);
    if (mobile.length === 10) {
      console.log(
        'valid number',
        ORIGINATE_CALL_WITH_SIP_ID +
        'sipAgentID=SIP%2F' +
        agent.AgentSipId +
        '&NumbertobeCalled=5' +
        mobile
      );

      const axios = require('axios');

      let config = {
        method: 'get',
        url:
          ORIGINATE_CALL_WITH_SIP_ID +
          'sipAgentID=SIP%2F' +
          agent.AgentSipId +
          '&NumbertobeCalled=5' +
          mobile,
        headers: {}
      };

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Invalide number');
    }
    // alert('clicked', mobile);
  };

  const onChange = event => {
    setmobile(event.target.value);
  };



  async function disProfileByNum(mobile) {

    // const axios = require('axios');

    // let config = {
    //   method: 'get',
    //   url: '/bo/boapi/profile?mobilenumber=' + mobile,
    //   headers: {}
    // };


    // const response = await axios.get(config.url);
    // if (response.data.status === '1') {
    //   var data1 = response.data.data;
    //   if (data1.length) {
    //     if (data1.length > 1) {
    //       multipleDistributorDetails(data1, true);
    //       setShowDistributorDetailsModal(true);
    //     } else {
    //       get(data1[0].distributor_id);
    //     }
    //     localStorage.setItem('distributer_id', data1[0].distributor_id);
    //   }
    // }

  }
  function multipleDistributorDetails(distData, popUp) {
    setDistributorModal({ distrtbutorDetails: distData, modalValue: popUp });
  }
  async function get(distributor_id) {
    try {
      const response = await Promise.allSettled(dealerAPICalls(distributor_id));
      setRootData(
        response.map(res => (res.status === 'fulfilled' ? res.value.data : {}))
      );
      setDistributorOrdersAction(
        response[2].status === 'fulfilled' ? response[2].value.data.data : null
      );
      setLoadingDetails(false);
    } catch (err) {
      console.log(err.response);
    }
  }

  ///socket1 start
  if (user.userType === 'Agent') {
    socket1.on('AstriskEvent', data => {


      if (data.Event === 'Bridge') {

      }

      if (data.Event === 'Hangup') {

      }
      var Channel1 = data.Channel1;
      var unlinkcounter = 0;
      if (
        data.Bridgestate === 'Unlink' &&
        Channel1.includes('SIP/' + agent.AgentSipId + '')
      ) {
        unlinkcounter++;
        if (
          localStorage.getItem('callEvent') === 'Bridge' &&
          unlinkcounter === 1
        ) {

        }
      }
    });
  }

  function breakService(e) {
    console.log('Break', localStorage.getItem('breakStatus'));
    var BreakStatus = localStorage.getItem('breakStatus');
    if (BreakStatus === 'NA') {
      console.log('Inside the NA');
      removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
      addToQueue('Local/5' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
      localStorage.setItem('breakStatus', 'IN');
    }
    if (BreakStatus === 'IN') {
      console.log('Inside the IN');
      removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
      addToQueue('Local/5' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
      localStorage.setItem('breakStatus', 'OUT');
    }
    if (BreakStatus === 'OUT') {
      console.log('Inside the OUT');
      localStorage.setItem('breakStatus', 'IN');
      removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
    }

    updateAgentCallStatus({
      callStatusId: localStorage.getItem('callStatusId'),
      callUniqueId: localStorage.getItem('callUniqueId'),
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callEvent: localStorage.getItem('callEvent'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus'),
      callerNumber: localStorage.getItem('callerNumber'),
      breakStatus: localStorage.getItem('breakStatus')
    });

    setCurrentCallDetails(
      localStorage.getItem('callStatusId'),
      localStorage.getItem('callUniqueId'),
      localStorage.getItem('callType'),
      localStorage.getItem('callStatus'),
      localStorage.getItem('callEvent'),
      localStorage.getItem('callDispositionStatus'),
      localStorage.getItem('callerNumber'),
      localStorage.getItem('breakStatus')
    );

    var axios = require('axios');
    var data = JSON.stringify({
      agentID: agent.AgentId,
      agentSIPID: agent.AgentSipId,
      breakStatus: localStorage.getItem('breakStatus')
    });

    var config = {
      method: 'post',
      url: PUT_BREAK_AGENT,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ///socket1 ends
  useEffect(() => {
    // getALF();
    if (localStorage.getItem('Agenttype') === 'L1') {
      // getOpenTickets(localStorage.getItem('Agenttype'), 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      getOpenTickets('L2', 'open');
    }

    async function getInitialData() {
      try {
        const response = await getAgentCallStatus(agent.AgentSipId);
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setRootData(
      [[], [], [], [], []].map(res =>
        res.status === 'fulfilled' ? res.value.data : {}
      )
    );
    setLoadingDetails(false);
    ///socket1 1///////////////////////////////
    socket1.on('AstriskEvent', data => {
      if (data.Event === 'Hangup') {
        // console.log('AstriskEvent', data)
      }
      if (data.Event === 'Bridge') {
        // console.log('AstriskEvent', data)
      }

    })
    // socket1.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket1.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', "325" + data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket1.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket1.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket1.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });
    // /////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////////////////////////////////
    // //1//////////////////////////////////////////////////////////////////////////////////
    // socket2.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket2.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket2.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', "331" + data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket2.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket2.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket2.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });


    // /////////////////////////////////////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////////////////////////////////
    // //socket3//////////////////////////////////////////////////////////////////////////////////
    // socket3.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket3.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket3.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', "332" + data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket3.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket3.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket3.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });


    // /////////////////////////////////////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////////////////////////////////
    // //socket4//////////////////////////////////////////////////////////////////////////////////
    // socket4.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket4.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket4.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', "334" + data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket4.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket4.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket4.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });


    // /////////////////////////////////////////////////////////////////////////////////////////



    // ////////////////////////////////////////////////////////////////////////////////////////////
    // //socket5//////////////////////////////////////////////////////////////////////////////////
    // socket5.on('AstriskEvent', data => {
    //   if (data.Event === 'Hangup') {
    //     // console.log('AstriskEvent', data)
    //   }
    //   if (data.Event === 'Bridge') {
    //     // console.log('AstriskEvent', data)
    //   }

    // })
    // socket5.on('ringing1', data => {
    //   console.log('ringing1', data);
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('channel', data.event.Channel)
    //     //   console.log('AstriskEventBridgeOutbound', data);

    //     // setCurrentCallDetails(
    //     //   localStorage.getItem('callStatusId'),
    //     //   data.Uniqueid,
    //     //   agent.AgentType,
    //     //   'connected',
    //     //   'Bridge',
    //     //   'NotDisposed',
    //     //   '',
    //     //   localStorage.getItem('breakStatus')
    //     // );
    //   }
    // });

    // socket5.on('ringing2', data => {
    //   console.log('ringing2', data)
    //   // var Channel1 = data.Channel1;
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {

    //     localStorage.setItem('callUniqueId', "3011" + data.event.Uniqueid)
    //     localStorage.setItem('callerNumber', data.event.ConnectedLineNum)
    //     // //   console.log('AstriskEventBridgeOutbound', data);

    //     //   setCurrentCallDetails(
    //     //     localStorage.getItem('callStatusId'),
    //     //     localStorage.getItem('callUniqueId'),
    //     //     agent.AgentType,
    //     //     'connected',
    //     //     'Bridge',
    //     //     'NotDisposed',
    //     //     data.contactNumber,
    //     //     localStorage.getItem('breakStatus')
    //     //   );
    //   }
    // });
    // socket5.on('transfercallnumber', data => {
    //   if (localStorage.getItem('Agenttype') === 'L2') {
    //     localStorage.setItem('callerNumber', data.contactnumber)
    //   }

    // })
    // socket5.on('connected', data => {
    //   console.log('connected', data);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // getInitialData();
    //     // console.log('AstriskEventBridgeInbound', data);
    //     localStorage.setItem('distributer_id', agent.AgentSipId);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       agent.AgentType,
    //       'connected',
    //       'Bridge',
    //       'NotDisposed',
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //     // removeFromQueue(agent.AgentSipId, '7001');
    //   }
    // });
    // socket5.on('hangup', data => {
    //   console.log('hangup', data);
    //   // var str = data.Channel;
    //   // var agentsipid = str.substring(4, 8);
    //   // console.log('agentsipid', agentsipid);
    //   var agentExtension = data.agentNumber;
    //   if (agentExtension === agent.AgentSipId) {
    //     // console.log('AstriskEventHangup', data);
    //     setCurrentCallDetails(
    //       localStorage.getItem('callStatusId'),
    //       localStorage.getItem('callUniqueId'),
    //       localStorage.getItem('callType'),
    //       'disconnected',
    //       'Hangup',
    //       localStorage.getItem('callDispositionStatus'),
    //       localStorage.getItem('callerNumber'),
    //       localStorage.getItem('breakStatus')
    //     );
    //   }
    // });


    /////////////////////////////////////////////////////////////////////////////////////////



    return () => {
      // socket1.off('ringing');
      // socket1.off('connected');
      // socket1.off('hangup');
      // socket1.off('transfercallnumber');

      // socket2.off('ringing');
      // socket2.off('connected');
      // socket2.off('hangup');
      // socket2.off('transfercallnumber');

      // socket3.off('ringing');
      // socket3.off('connected');
      // socket3.off('hangup');
      // socket3.off('transfercallnumber');

      // socket4.off('ringing');
      // socket4.off('connected');
      // socket4.off('hangup');
      // socket4.off('transfercallnumber');

      // socket5.off('ringing');
      // socket5.off('connected');
      // socket5.off('hangup');
      // socket5.off('transfercallnumber');

    };
  }, []);

  useEffect(() => {
    console.log('data second useEffect', currentCall);
    console.log('currentCall.callerNumber', currentCall.callerNumber);


    if (
      currentCall.callerNumber !== '' &&
      currentCall.callDispositionStatus === 'NotDisposed'
    ) {
      disProfileByNum(currentCall.callerNumber);
      getDLF();

    }
    // getALF();
    if (localStorage.getItem('Agenttype') === 'L1') {
      // getOpenTickets(localStorage.getItem('Agenttype'), 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      getOpenTickets('L1', 'open');
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      getOpenTickets('L2', 'open');
    }

  }, [
    currentCall.callDispositionStatus,
    currentCall.callStatus,
    currentCall.breakStatus
  ]);

  let history = useHistory();

  useEffect(() => {
    console.log("currentCall", currentCall)
    if (reduxState.searchDistributor.length >= 4) {
      get(reduxState.searchDistributor);
    } else {
      get();
    }
  }, [reduxState.searchDistributor]);


  return !loadingDetails && loginToken ? (
    <div style={{ position: 'relative' }}>
      {currentCall.callStatus === 'connected' && currentCall.callDispositionStatus != 'Disposed' ? (
        <div>

          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callInbound}`}
          >
            <CallIcon />
            &nbsp;
            <Typography display="inline">
              Inbound Call In Progress
            </Typography>
          </Box>{' '}
        </div>
      ) : null}
      {currentCall.callDispositionStatus === 'NotDisposed' &&
        currentCall.callStatus === 'disconnected' ? (
        <div>

          <Box
            alignItems="center"
            display="flex"
            className={`${classes.timerComp} ${classes.callWrapper} ${classes.callOutbound}`}
          >
            <CallIcon />
            &nbsp;
            <Typography display="inline">
              Inbound Call Is Disconnected
            </Typography>
          </Box>{' '}
        </div>
      ) : null}
      <CustomBreadcrumbs />
      {/* <button onClick={history.push("/dash360")}>fetch info</button> */}

      {
        agent.AgentType === 'Outbound' &&
          localStorage.getItem('callDispositionStatus') === 'Disposed' &&
          localStorage.getItem('callStatus') === 'disconnected' &&
          localStorage.getItem('breakStatus') === 'OUT' ? (
          <div>
            <Input value={mobile} onChange={onChange} margin="dense" />
            <CallIcon onClick={onClick} />

          </div>
        ) : null
      }
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              {user_Details.AgentQueueStatus === 'dynamic' ?
                <Grid item>


                  {currentCall.callDispositionStatus === 'Disposed' && currentCall.callStatus != 'connected' ? <Button
                    color="secondary"
                    variant="contained"
                    style={{ color: 'white' }}
                    onClick={(e) => breakService(e)}
                  >
                    {currentCall.breakStatus === 'OUT' || currentCall.breakStatus === 'NA' ? <label>TAKE A BREAK</label> : <label>YOU ARE IN BREAK</label>}
                  </Button> : null}
                  {/* <Button
                  color="secondary"
                  variant="contained"
                  style={{ color: 'white' }}
                  onClick={e => breakService(e)}
                >

                  <label>Break IN</label>

                </Button> */}

                </Grid> : null}


            </Grid>



          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} xs={12}>

              <Grid item>
                {localStorage.getItem('Agenttype') === 'L2' ?
                  <Card>
                    <CardHeader title={'Caller details'} />

                    <div>
                      <DealerCard
                        dealerDetails={dealerDetails}
                      />
                    </div>

                  </Card> : null}
                <br />
                {/* <Card>
                  <CardHeader title={'Caller last five interactions'} />
                  {DLF.length && currentCall.callDispositionStatus === 'NotDisposed'? (
                    <div>
                      <BasicTable
                        columns={lastFiveCallData}
                        records={ALF.slice(0, 3)}
                        redirectLink="/dash360/admin/distributerDisposedCallList"
                        redirectLabel="View All"
                      />
                    </div>
                  ) : (
                      <CommonAlert text="Unable to get Caller details" />
                    )}
                </Card> */}
                <br />
                {localStorage.getItem('Agenttype') === 'L2' ?
                  <Card>
                    <CardHeader
                      title={
                        'Open Tickets (' + agent.AgentSipId + ')'
                      }
                    />
                    {ALF.length ? (
                      <div>
                        <BasicTable
                          setRootData={setRootData}
                          setdealerDetails={setdealerDetails}
                          columns={lastFiveCallData}
                          records={ALF.slice(0, 3)}
                        // redirectLink="/dash360/admin/agentlastfive"
                        // redirectLabel="View All"
                        />
                      </div>
                    ) : (
                      <CommonAlert text="N/A" />
                    )}
                  </Card> : null}
              </Grid>
            </Grid>
            {localStorage.getItem('Agenttype') === 'L2' ?
              <Grid item lg={8} md={12} xs={12}>

                <Card>
                  <CardHeader title="Interaction Details" />
                  <Divider />
                  {currentCall.callDispositionStatus === 'NotDisposed' &&
                    user.userType === 'Agent' ? (<CardContent>
                      <DispositionForm
                        agentSipID={agent.AgentSipId}
                        DLF={DLF}
                        setCurrentCallDetails={setCurrentCallDetails}
                        addToQueue={addToQueue}
                        removeFromQueue={removeFromQueue}
                        // getALF={getALF}
                        disForm={disForm}
                        setdisForm={form => {
                          setdisForm(form);
                        }}
                        category={category}
                        setCategory={cat => {
                          setCategory(cat);
                        }}
                        ticketType={ticketType}
                        setTicketType={tkstyp => {
                          setTicketType(tkstyp);
                        }}
                        subCategory={subCategory}
                        setSubCategory={subcat => {
                          setSubCategory(subcat);
                        }}
                        subCategoryItem={subCategoryItem}
                        setSubCategoryItem={subcatitem => {
                          setSubCategoryItem(subcatitem);
                        }}
                        remarks={remarks}
                        setRemarks={rks => {
                          setRemarks(rks);
                        }}
                      />
                    </CardContent>
                  ) : (
                    <></>
                    // <CommonAlert text="Unable to get disposition details" />
                  )}
                </Card>


                <br />
                {/* <FAQ /> */}
                <Iframe url="http://106.51.86.75:4444"
                  position="absolute"
                  width="100%"
                  height="500Px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative" />
              </Grid> :
              <Grid item lg={12} md={12} xs={12}>

                <Card>
                  <CardHeader title="Disposition Details" />
                  <Divider />
                  {currentCall.callDispositionStatus === 'NotDisposed' &&
                    user.userType === 'Agent' ? (<CardContent>
                      <DispositionForm
                        agentSipID={agent.AgentSipId}
                        DLF={DLF}
                        setCurrentCallDetails={setCurrentCallDetails}
                        addToQueue={addToQueue}
                        removeFromQueue={removeFromQueue}
                        // getALF={getALF}
                        disForm={disForm}
                        setdisForm={form => {
                          setdisForm(form);
                        }}
                        category={category}
                        setCategory={cat => {
                          setCategory(cat);
                        }}
                        ticketType={ticketType}
                        setTicketType={tkstyp => {
                          setTicketType(tkstyp);
                        }}
                        subCategory={subCategory}
                        setSubCategory={subcat => {
                          setSubCategory(subcat);
                        }}
                        subCategoryItem={subCategoryItem}
                        setSubCategoryItem={subcatitem => {
                          setSubCategoryItem(subcatitem);
                        }}
                        remarks={remarks}
                        setRemarks={rks => {
                          setRemarks(rks);
                        }}
                      />
                    </CardContent>
                  ) : (
                    <></>
                    // <CommonAlert text="Unable to get disposition details" />
                  )}
                </Card>


                <br />
                {/* <FAQ /> */}
                <Iframe url="http://106.51.86.75:4444"
                  width="100%"
                  height="500Px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative" />
              </Grid>
            }

          </Grid>

        </Container>
      </Page>

    </div >
  ) : (
    <MainLoader />
  );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func,
  searchDistributor: PropTypes.string
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall,
    searchDistributor: state.searchDistributor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders =>
      dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall =>
      dispatch(setAgentCurrentStatus(currentCall)),
    setSearchDistributor: dist => dispatch(setSearchDistributor(dist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
