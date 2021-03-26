import { Field, Form, Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';

import {
  UPDATE_CALL_STATUS,
  UPDATE_CURRENT_STATUS,
  GET_INTERACTION_BY_DISTRIBUTOR_ID,
  GET_INTERACTION_BY_CALLER_NUMBER,
  SOCKETENDPOINT1, SOCKETENDPOINT2, SOCKETENDPOINT4, SOCKETENDPOINT3, AGENT_SERVICE_URL
} from 'src/modules/dashboard-360/utils/endpoints';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio
} from '@material-ui/core';
import * as yup from 'yup';
// import config from '../../../ticketing/views/config.json';g
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux'
// import { AlternateEmailTwoTone } from '@material-ui/icons';
const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm(props) {
  const config = 'http://192.168.3.45:8083/';
  console.log('props.DLF', props.DLF);
  const { DLF } = props;
  let APIENDPOINT = SOCKETENDPOINT2;
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function addToQueue(agentId, queue, user_Details) {
  //   const axios = require('axios');

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
  //       `${APIENDPOINT}/ami/actions/addq?Interface=${agentId}&Queue=${queue}`,
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
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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


  const [initialValue, setInitialValue] = useState({

    subcategory: '',
    category: '',
    comments: '',
    type: '',
    subcategoryitem: '',
    enable: '',
    issuetype: '',
    devicetype: '',
    connectivitytype: '',
    speedtype: '',
    ostype: '',
    solution: '',
    issuedescription: '',
    CallerName: '',
    callerapplication: '',
    L1Name: '',
    status: ''
  });
  function getDLF() {
    const axios = require('axios');
    const number = localStorage.getItem('callerNumber');
    // number = number.substr(number.length -10);
    console.log('number', number);
    const data = '';
    const config = {
      method: 'get',
      url:
        `${GET_INTERACTION_BY_CALLER_NUMBER
        + number
        }`,
      headers: {},
      data
    };

    axios(config)
      .then(async response => {
        let DLFDATA = response.data;
        DLFDATA = await DLFDATA.reverse();
        console.log('DLFDATA INSIDE THE DIS FORM', DLFDATA);
        if (DLFDATA.length && localStorage.getItem('Agenttype') === 'L2') {
          console.log('DLFDATA INSIDE THE dispostionFormData', DLFDATA[0].dispostionFormData);
          setInitialValue(DLFDATA[0].dispostionFormData);
        }
        // setDLF(DLFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  const devicetype = [
    {
      id: '1', value: 'Mobile',
    },
    {
      id: '2', value: 'Laptop/ Desktop',
    }
  ];

  const ostype = [
    {
      id: '1', value: 'Android',
    },
    {
      id: '2', value: 'Win-7 / 8/10 '
    },
    {
      id: '3', value: 'MAC / Linux,'
    }
  ];
  const connectivitytype = [
    {
      id: '1', value: 'Hotspot',
    },
    {
      id: '2', value: 'DataCard',
    },
    {
      id: '3', value: 'Broadband',
    }
  ];
  const issuetype = [

  ];
  const speedtype = [
    {
      id: '1', value: 'Less than 2 MBPS',
    },
    {
      id: '2', value: 'More than 2 MBPS',
    }
  ];
  const L1Name = [
    {
      id: '1', value: 'Chaitra',
    },
    {
      id: '2', value: 'Priya',
    },
    {
      id: '3', value: 'Suma',
    },
    {
      id: '4', value: 'Latha',
    },
    {
      id: '5', value: 'Sonu',
    }
  ];
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = `${AGENT_SERVICE_URL}/`;
  const [category, setCategory] = useState({
    value: 'Enquiry',
    label: 'Enquiry'
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({
    ticketTypeId: '',
    ticketType: ''
  });
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
  const [selected, setSelected] = useState(false);
  const user_Details = useSelector(state => state.userData)
  const url = 'http://192.168.3.45:7002';
  const handleChange = (e, s) => {
    // updateCallData(localStorage.getItem('callUniqueId'), {
    //   type: formRef.current.values.type,
    //   dispostionFormData: formRef.current.values
    // });
    // console.log("change",e.target.defaultValue)
    if (e.target.defaultValue === 'transfercall') {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };
  useEffect(() => {
    let unmounted = false;
    getDLF();
    // console.log('initialValue', initialValue)
    // if (initialValue.category !== '') {
    //   getSubCategories(initialValue.category);
    // }
    // if (initialValue.subcategory !== ''){
    //   console.log("initialValue.subcategory", initialValue.subcategory)
    //   getSubCategoryItems(initialValue.category,initialValue.subcategory);
    // }
    async function getItems() {
      const body = [{
        id: '600bc52f997c4d29ff4e5609', category: 'Enquiry', active: true, createdAt: '2021-01-19T07:31:02.745Z', updatedAt: '2021-01-19T07:31:02.745Z', v: 0
      }, {
        id: '600bc578997c4d29ff4e560a', category: 'Complaints', active: true, createdAt: '2021-01-19T07:31:02.745Z', updatedAt: '2021-01-19T07:31:02.745Z', _v: 0
      }];
      if (!unmounted) {
        body[0]
          ? setCategory({
            label: body[0].category,
            value: body[0].id
          })
          : setCategory({});

        setCategories(
          body.map(({ id, category }) => ({
            label: category,
            value: id
          }))
        );
        setLoading(false);
      }
    }
    getItems();

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {

  }, [initialValue]);

  const getSubCategories = cat => {
    console.log('value', cat);
    let unmounted = false;
    async function getItems() {
      const InQuiry = [{
        id: '600bc7a9997c4d29ff4e560b', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'Exam Schedule', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600bc7b9997c4d29ff4e560c', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'SEB Link', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600bcb58997c4d29ff4e560d', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'Browser Version', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600bcb6e997c4d29ff4e560e', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'Mobile App Link', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600bcb78997c4d29ff4e560f', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'Minimum System Requirements', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600c7148f50bb21a5ea0919f', categoryId: '600bc52f997c4d29ff4e5609', category: 'Enquiry', subCategory: 'Internet Bandwidth Required', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', _v: 0
      }];
      const Compln = [{
        id: '600c738bf50bb21a5ea091a0', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategory: 'Hardware', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', v: 0
      }, {
        _id: '600c73adf50bb21a5ea091a1', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategory: 'Software', active: true, createdAt: '2021-01-19T07:44:05.559Z', updatedAt: '2021-01-19T07:44:05.559Z', _v: 0
      }];
      // const response = await fetch(
      //   url + '/level2/' + cat.value
      // );
      let body = [];
      if (cat.value === '600bc52f997c4d29ff4e5609') {
        body = InQuiry;
      }
      if (cat.value === '600bc578997c4d29ff4e560a') {
        body = Compln;
      }

      if (!unmounted) {
        setSubCategories(
          body.map(({ id, subCategory }) => ({
            label: subCategory,
            value: id
          }))
        );

        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  const getSubCategoryItems = (cat, sct) => {
    let unmounted = false;
    async function getItems() {
      const HardWare = [{
        id: '600c7421f50bb21a5ea091a2', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c738bf50bb21a5ea091a0', subCategory: 'Hardware', subCategoryItem: 'Webcam Issue', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', v: 0
      }, {
        _id: '600c74d5f50bb21a5ea091a3', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c738bf50bb21a5ea091a0', subCategory: 'Hardware', subCategoryItem: 'Microphone Issue', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', _v: 0
      }];
      const Software = [{
        id: '600c74e0f50bb21a5ea091a4', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c73adf50bb21a5ea091a1', subCategory: 'Software', subCategoryItem: 'SEB Installation Issue', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', v: 0
      }, {
        _id: '600c74ebf50bb21a5ea091a5', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c73adf50bb21a5ea091a1', subCategory: 'Software', subCategoryItem: 'App Issue', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', v: 0
      }, {
        _id: '600c750df50bb21a5ea091a6', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c73adf50bb21a5ea091a1', subCategory: 'Software', subCategoryItem: 'Browser Issue', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', v: 0
      }, {
        _id: '600c7517f50bb21a5ea091a7', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c73adf50bb21a5ea091a1', subCategory: 'Software', subCategoryItem: 'Login Error', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', v: 0
      }, {
        _id: '600c7522f50bb21a5ea091a8', categoryId: '600bc578997c4d29ff4e560a', category: 'Complaints', subCategoryId: '600c73adf50bb21a5ea091a1', subCategory: 'Software', subCategoryItem: 'RP Initiation Failed', active: true, createdAt: '2021-01-19T07:54:08.427Z', updatedAt: '2021-01-19T07:54:08.427Z', _v: 0
      }];
      let data = [];
      if (sct === '600bc7a9997c4d29ff4e560b') {
        data = HardWare;
      }
      if (sct === '600c738bf50bb21a5ea091a0') {
        data = Software;
      }
      //  alert(JSON.stringify(cat))
      // const response = await fetch(
      //   url + '/level3/' + cat + '/' + sct.value
      // );
      // const body = await response.json();

      if (!unmounted) {
        setSubCategoryItems(
          data.map(({ id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: id
          }))
        );

        setLoading(false);

        data[0]
          ? setSubCategoryItem({
            label: data[0].subCategoryItem,
            value: data[0].id
          })
          : setSubCategoryItem({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  function updateCallData(uniqueid, dispostionData) {
    const axios = require('axios');
    const data = JSON.stringify(dispostionData);
    console.log('updateCAllData', data, uniqueid);

    const config = {
      method: 'post',

      url: UPDATE_CALL_STATUS + uniqueid,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then(response => {
        console.log('dispostionForm', JSON.stringify(response.data));
        props.getALF();
      })
      .catch(error => {
        console.log('dispostionFrom', error);
      });
  }

  function updateAgentCallStatus(updateData) {
    const axios = require('axios');
    const data = {
      agentCallStatus: updateData.callStatus,
      agentCallEvent: updateData.callEvent,
      agentCallUniqueId: updateData.callUniqueId,
      agentCallType: updateData.callType,
      agentCallDispositionStatus: updateData.callDispositionStatus,
      callerNumber: updateData.callerNumber
    };
    const config = {

      method: 'put',
      url: UPDATE_CURRENT_STATUS + updateData.callStatusId,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    };

    axios(config)
      .then((response) => {
        console.log('update', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function transfercall(Channel) {
    const axios = require('axios');

    const config = {
      method: 'get',
      url: `${SOCKETENDPOINT2}/ami/actions/atxfer?Channel=${Channel}&NumbertobeCalled=7002`,
      headers: {}
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleSubmit(e) {
    console.log('formRefasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfs', formRef.current.values);

    console.log('state', initialValue);
    console.log('dispostion', {
      // tickettype: formRef.current.values.tickettype.label,
      category: formRef.current.values.category.label,
      subcategory: formRef.current.values.subcategory.label,
      subcategoryitem: formRef.current.values.subcategoryitem.label,
      comments: formRef.current.values.comments,
      type: formRef.current.values.type,

    });

    localStorage.setItem('callDispositionStatus', 'Disposed');
    var serverPrefix = localStorage.getItem('callUniqueId');

    // if (user_Details.Server === 'server1') {
    //   serverPrefix = `325${localStorage.getItem('callUniqueId')}`
    // }
    // if (user_Details.Server === 'server2') {
    //   serverPrefix = `331${localStorage.getItem('callUniqueId')}`
    // }
    // if (user_Details.Server === 'server3') {
    //   serverPrefix = `332${localStorage.getItem('callUniqueId')}`
    // }
    // if (user_Details.Server === 'server4') {
    //   serverPrefix = `334${localStorage.getItem('callUniqueId')}`
    // }
    if (localStorage.getItem('Agenttype') === 'L1') {
      // if (user_Details.AgentQueueStatus === 'dynamic') {
      //   removeFromQueue(`Local/5${localStorage.getItem('AgentSIPID')}@from-queue`, 7001, user_Details);
      // }

      if (user_Details.AgentQueueStatus === 'dynamic') {
        addToQueue('Local/5' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
      }
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      // if (user_Details.AgentQueueStatus === 'dynamic') {
      //   removeFromQueue(`Local/3${localStorage.getItem('AgentSIPID')}@from-queue`, 7002, user_Details);
      // }

      if (user_Details.AgentQueueStatus === 'dynamic') {
        addToQueue('Local/3' + localStorage.getItem('AgentSIPID') + '@from-queue\n', 7001, user_Details)
      }
    }
    // // props.removeFromQueue(props.AgentSipId, '7001');
    // // props.addToQueue(props.agentSipID, '7001');
    // // props.setCurrentCallDetails(localStorage.getItem("callUniqueId"), localStorage.getItem("callType"), localStorage.getItem("callStatus"), localStorage.getItem("callEvent"), localStorage.getItem("callDispositionStatus"))
    props.setCurrentCallDetails(
      localStorage.getItem('callStatusId'),
      localStorage.getItem('callUniqueId'),
      localStorage.getItem('callType'),
      localStorage.getItem('callStatus'),
      localStorage.getItem('callEvent'),
      localStorage.getItem('callDispositionStatus'),
      localStorage.getItem('callerNumber'),
      localStorage.getItem('breakStatus')
    );
    updateAgentCallStatus({
      callStatusId: localStorage.getItem('callStatusId'),
      callUniqueId: serverPrefix,
      callType: localStorage.getItem('callType'),
      callStatus: localStorage.getItem('callStatus'),
      callEvent: localStorage.getItem('callEvent'),
      callDispositionStatus: localStorage.getItem('callDispositionStatus'),
      callerNumber: localStorage.getItem('callerNumber'),

    });
    if (localStorage.getItem('Agenttype') === 'L1') {
      updateCallData(serverPrefix, {
        category: formRef.current.values.category.label,
        subcategory: formRef.current.values.subcategory.label,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        comments: formRef.current.values.comments,
        type: formRef.current.values.type,
        distributerID: localStorage.getItem('distributer_id'),
        CallerName: formRef.current.values.CallerName,
        callerapplication: formRef.current.values.callerapplication,
        connectivitytype: formRef.current.values.connectivitytype.value,
        devicetype: formRef.current.values.devicetype.value,
        enable: `${formRef.current.values.enable}`,
        issuedescription: formRef.current.values.issuedescription,
        issuetype: formRef.current.values.issuetype,
        ostype: formRef.current.values.ostype.value,
        speedtype: formRef.current.values.speedtype.value,
        status: formRef.current.values.status,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        type: formRef.current.values.type,
        dispostionFormData: formRef.current.values,
        anydeskid: formRef.current.values.anydeskid,
        solution: formRef.current.values.solution,
        L1ID: serverPrefix
      });
    }
    if (localStorage.getItem('Agenttype') === 'L2') {
      updateCallData(serverPrefix, {
        category: formRef.current.values.category.label,
        subcategory: formRef.current.values.subcategory.label,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        comments: formRef.current.values.comments,
        type: formRef.current.values.type,
        distributerID: localStorage.getItem('distributer_id'),
        CallerName: formRef.current.values.CallerName,
        callerapplication: formRef.current.values.callerapplication,
        connectivitytype: formRef.current.values.connectivitytype.value,
        devicetype: formRef.current.values.devicetype.value,
        enable: `${formRef.current.values.enable}`,
        issuedescription: formRef.current.values.issuedescription,
        issuetype: formRef.current.values.issuetype,
        ostype: formRef.current.values.ostype.value,
        speedtype: formRef.current.values.speedtype.value,
        status: formRef.current.values.status,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        type: formRef.current.values.type,
        dispostionFormData: formRef.current.values,
        anydeskid: formRef.current.values.anydeskid,
        solution: formRef.current.values.solution,
        L1ID: serverPrefix
      });
      updateCallData(localStorage.getItem('L1ID'), {
        L2ID: serverPrefix,
        type: formRef.current.values.type,
        agenttype: 'L2'
      });
    }
    if (localStorage.getItem('Agenttype') === 'L3') {
      updateCallData(serverPrefix, {
        category: formRef.current.values.category.label,
        subcategory: formRef.current.values.subcategory.label,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        comments: formRef.current.values.comments,
        type: formRef.current.values.type,
        distributerID: localStorage.getItem('distributer_id'),
        CallerName: formRef.current.values.CallerName,
        callerapplication: formRef.current.values.callerapplication,
        connectivitytype: formRef.current.values.connectivitytype.value,
        devicetype: formRef.current.values.devicetype.value,
        enable: `${formRef.current.values.enable}`,
        issuedescription: formRef.current.values.issuedescription,
        issuetype: formRef.current.values.issuetype,
        ostype: formRef.current.values.ostype.value,
        speedtype: formRef.current.values.speedtype.value,
        status: formRef.current.values.status,
        subcategoryitem: formRef.current.values.subcategoryitem.label,
        type: formRef.current.values.type,
        dispostionFormData: formRef.current.values,
        anydeskid: formRef.current.values.anydeskid,
        solution: formRef.current.values.solution,
        L1ID: localStorage.getItem('callUniqueId')
      });
      updateCallData(localStorage.getItem('L2ID'), {
        L2ID: localStorage.getItem('callUniqueId'),
        type: formRef.current.values.type,
        agenttype: 'L3'
      });
    }
  }
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValue}
      disform={initialValue}
      onSubmit={(e, { validate }) => {
        handleSubmit(e);
        validate(e);
      }}
      innerRef={formRef}
      validationSchema={yup.object({

        category: yup
          .object()
          .required('Please select a  category')
          .typeError('Please select a valid  category'),
        subcategory: yup
          .object()
          .required('Please select a  subcategory')
          .typeError('Please select a valid  subcategory'),
        subcategoryitem: yup
          .object()
          .required('Please select a  subcategoryitem')
          .typeError('Please select a valid  subcategoryitem'),
        comments: yup.string().required('Please Enter Comments'),
        type: yup.string().required('Please Enter type'),
        issuetype: yup
          .object()
          .required('Please select a Issue Type')
          .typeError('Please select a valid Issue Type'),
        devicetype: yup
          .object()
          .required('Please select a  Device Type')
          .typeError('Please select a valid  Device Type'),
        ostype: yup
          .object()
          .required('Please select a OS Type ')
          .typeError('Please select a valid  OS Type'),
        connectivitytype: yup
          .object()
          .required('Please select a  Internet Connectivity Type')
          .typeError('Please select a valid  Internet Connectivity Type'),
        speedtype: yup
          .object()
          .required('Please select a Internet Speed ')
          .typeError('Please select a valid  Internet Speed'),
        L1Name: yup
          .object()
          .required('Please select a L2')
          .typeError('Please select a L2'),
        anydeskid: yup.string().required('Please Enter Any Desk ID'),
        CallerName: yup.string().required('Please Enter Caller Name'),
        callerapplication: yup.string().required('Please Enter Caller Application'),
        issuedescription: yup.string().required('Please Enter Issue Description'),
        solution: yup.string().required('Please Enter Response /Solution Provided')
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="row">
            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="CallerName"
                component={TextField}
                variant="outlined"
                multiline

                label="Caller Name"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="callerapplication"
                component={TextField}
                variant="outlined"
                multiline

                label="Caller Application"
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >

                <Autocomplete
                  options={categories}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  value={initialValue.category}
                  getOptionSelected={(option, value) => {
                    console.log('category', value);
                    return value.label === option.label;
                  }}
                  key={autoCompleteKey}
                  onChange={(event, value) => {
                    console.log('value', value);
                    if (value !== null) {
                      setFieldValue('category', value);

                      // updateCallData(localStorage.getItem('callUniqueId'), {
                      //   type: formRef.current.values.type,
                      //   dispostionFormData: formRef.current.values
                      // });

                      const i = initialValue;
                      i.category = value;
                      //  getSubCategories(value)
                      //  i.subcategory.value=""
                      //  i.subcategory.label=""
                      //  i.subcategoryitem.value=""
                      //  i.subcategoryitem.label=""
                      //  setSubCategories([])
                      getSubCategories(value);
                      setInitialValue(i);
                    }
                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a Issue Type"
                      variant="outlined"
                      name="category"
                    />
                  )}
                  name="category"
                />
              </FormControl>
            </Grid>
            {subCategories.length > 0 ? (
              <Grid item xs={4} sm={4}>

                <Autocomplete
                  options={subCategories}
                  getOptionLabel={option => option.label}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) => value.id === option.id}
                  value={initialValue.subcategory}
                  key={autoCompleteKey}
                  onChange={(event, value) => {
                    if (value !== null) {
                      setFieldValue('subcategory', value);

                      // updateCallData(localStorage.getItem('callUniqueId'), {
                      //   type: formRef.current.values.type,
                      //   dispostionFormData: formRef.current.values
                      // });
                      props.setSubCategory(value);
                      getSubCategoryItems(
                        formRef.current.values.category.value,
                        value
                      );
                      const i = initialValue;
                      i.subcategory = value;
                      setInitialValue(i);
                    }
                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}

                      label="Select a Type1"
                      variant="outlined"
                      name="subcategory"
                    />
                  )}
                  name="subcategory"
                />
              </Grid>
            ) : (
              <></>
            )}
            {subCategoryItems.length > 0 ? (
              <Grid item xs={4} sm={4}>
                <FormControl
                  variant="outlined"
                  className={classes.fieldContainer}
                >

                  <Autocomplete
                    options={subCategoryItems}
                    getOptionLabel={option => option.label}
                    // style={{ width: 400, overflow: "hidden" }}
                    value={initialValue.subCategoryItem}
                    getOptionSelected={(option, value) => value.id === option.id}
                    key={autoCompleteKey}

                    onChange={(event, value) => {
                      if (value !== null) {
                        setFieldValue('subcategoryitem', value);
                        props.setSubCategoryItem(value);

                        // updateCallData(localStorage.getItem('callUniqueId'), {
                        //   type: formRef.current.values.type,
                        //   dispostionFormData: formRef.current.values
                        // });
                        const i = initialValue;
                        i.subCategoryItem = value;
                        setInitialValue(i);
                      }
                    }}
                    renderInput={params => (
                      <Field
                        component={TextField}
                        {...params}
                        label="Select a Type2"
                        variant="outlined"
                        name="subcategoryitem"
                      />
                    )}
                    name="subcategoryitem"
                  />
                </FormControl>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={4} sm={4}>

              <Autocomplete
                options={devicetype}
                getOptionLabel={option => option.value}
                // style={{ width: 400, overflow: "hidden" }}
                value={initialValue.devicetype}
                getOptionSelected={(option, value) => value.id === option.id}
                key={autoCompleteKey}
                onChange={(event, value) => {
                  if (value !== null) {
                    setFieldValue('devicetype', value);

                    // updateCallData(localStorage.getItem('callUniqueId'), {
                    //   type: formRef.current.values.type,
                    //   dispostionFormData: formRef.current.values
                    // });
                    const i = initialValue;
                    i.devicetype = value;
                    setInitialValue(i);
                  }
                  //  props.setSubCategory(value);
                  //  getSubCategoryItems(
                  //    formRef.current.values.category.value,
                  //    value
                  //  );
                }}
                renderInput={params => (
                  <Field
                    component={TextField}
                    {...params}
                    label="Select a Device Type"
                    variant="outlined"
                    name="devicetype"
                  />
                )}
                name="devicetype"
              />
            </Grid>

            <Grid item xs={4} sm={4}>

              <Autocomplete
                options={ostype}
                getOptionLabel={option => option.value}
                // style={{ width: 400, overflow: "hidden" }}
                getOptionSelected={(option, value) => {
                  return value.id === option.id;
                }}
                value={initialValue.ostype}
                key={autoCompleteKey}
                onChange={(event, value) => {
                  if (value !== null) {
                    setFieldValue('ostype', value);

                    // updateCallData(localStorage.getItem('callUniqueId'), {
                    //   type: formRef.current.values.type,
                    //   dispostionFormData: formRef.current.values
                    // });
                    console.log('asdfasf', initialValue);
                    initialValue.ostype = value;
                    setInitialValue(initialValue);
                  }
                  //  var inivalues = initialValues;
                  //  initialValues.ostype = value.label
                  //  setInitialValue(initialValues)
                }}
                renderInput={params => (
                  <Field
                    component={TextField}
                    {...params}
                    label="Select a OS Type"
                    variant="outlined"
                    name="ostype"
                  />
                )}
                name="ostype"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="anydeskid"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Any desk ID"
              />
            </Grid>
            <Grid item xs={4} sm={4}>

              <Autocomplete
                options={connectivitytype}
                getOptionLabel={option => option.value}
                // style={{ width: 400, overflow: "hidden" }}
                value={initialValue.connectivitytype}
                getOptionSelected={(option, value) => value.id === option.id}
                key={autoCompleteKey}
                onChange={(event, value) => {
                  if (value !== null) {
                    setFieldValue('connectivitytype', value);

                    // updateCallData(localStorage.getItem('callUniqueId'), {
                    //   type: formRef.current.values.type,
                    //   dispostionFormData: formRef.current.values
                    // });
                    const i = initialValue;
                    i.connectivitytype = value;
                    setInitialValue(i);
                  }
                }}
                renderInput={params => (
                  <Field
                    component={TextField}
                    {...params}
                    label="Select a Internet Connectivity Type"
                    variant="outlined"
                    name="connectivitytype"
                  />
                )}
                name="connectivitytype"
              />
            </Grid>

            <Grid item xs={4} sm={4}>

              <Autocomplete
                options={speedtype}
                getOptionLabel={option => option.value}
                // style={{ width: 400, overflow: "hidden" }}
                value={initialValue.speedtype}
                getOptionSelected={(option, value) => value.id === option.id}
                key={autoCompleteKey}
                onChange={(event, value) => {
                  if (value !== null) {
                    setFieldValue('speedtype', value);

                    // updateCallData(localStorage.getItem('callUniqueId'), {
                    //   type: formRef.current.values.type,
                    //   dispostionFormData: formRef.current.values
                    // });
                    const i = initialValue;
                    i.speedtype = value;
                    setInitialValue(i);
                  }
                }}
                renderInput={params => (
                  <Field
                    component={TextField}
                    {...params}
                    label="Select a Internet Speed"
                    variant="outlined"
                    name="speedtype"
                  />
                )}
                name="speedtype"
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="issuedescription"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Issue Description"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="solution"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Response /Solution Provided"
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <Field
                className={classes.fieldContainer}
                name="comments"
                component={TextField}
                variant="outlined"
                multiline
                rows={2}
                label="Comments"
              />
            </Grid>

            {/* {selected === true ? (<Grid item item xs={4} sm={4}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >

                <Autocomplete
                  options={L1Name}
                  getOptionLabel={option => option.value}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {
                    if (value !== null) {

                      updateCallData(localStorage.getItem('callUniqueId'), {
                        type: formRef.current.values.type,
                        dispostionFormData: formRef.current.values
                      })
                      setFieldValue('L1Name', value);
                      transfercall(localStorage.getItem('channel'))

                    }

                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select a L1"
                      variant="outlined"
                      name="L1Name"
                    />
                  )}
                  name="L1Name"
                />
              </FormControl>

            </Grid>) : (<></>)
            } */}
            <Grid item>

              <Field component={RadioGroup} name="type" row>
                {/* <FormControlLabel value="FCR" control={<Radio />} label="FCR" /> */}
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Open"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Closed"
                  onChange={handleChange}

                />
                <FormControlLabel
                  value="disconnected"
                  control={<Radio />}
                  label="disconnected"
                  onChange={handleChange}
                />
                {/* {localStorage.getItem('callStatus') === 'connected' ?                 <FormControlLabel
                  value="transfercall"
                  control={<Radio />}
                  label="Transfer Call"
                  onChange={handleChange}
                />: null} */}

              </Field>
            </Grid>
          </Grid>
          <br />
          {/* {selected === true ?

<Button color="primary" variant="contained"  onClick={(e) =>   transfercall(localStorage.getItem('channel'))}>
Transfer
</Button>

                  : null} */}
          <span>  </span>
          <span> </span>
          <span> </span>
          <span> </span>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>

        </Form>
      )}
    </Formik>
  );
}
