import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';
import { useEffect } from 'react';
import {
  UPDATE_CALL_STATUS,
  UPDATE_CURRENT_STATUS,
  Agent_service_url
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
import Axios from 'axios';

import { Autocomplete } from '@material-ui/lab';
import { set } from 'lodash';

const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm(props) {
  const config = "http://192.168.3.45:8083/"
  const path = "http://192.168.3.17"
  const [initialValue, setInitialValue] = useState({

    GroupAdminName: '',
    GroupAdminEmail: '',
    groupcontact: '',

    Group: ''
  });
  const [Groups, setGroups] = useState([]);
  const classes = useStyle();
  const formRef = useRef({});
  // const agentServiceURL = `${Agent_service_url}/`;



  function updateAgentCallStatus(contactNumber) {
    console.log("contactNumber", contactNumber)
    var axios = require('axios');

    var data = {
      agentCallDispositionStatus: "NotDisposed",
      agentCallType: "Inbound",
      agentCallUniqueId: "1610712538.46886",
      agentCallEvent: "Bridge",
      agentCallStatus: "disconnected",
      agentID: "9998",
      agentSipID: "9998",
      contactNumber: contactNumber,
      breakStatus: "OUT",

    };
    var config = {

      method: 'post',
      url: path+':42004/crm/currentstatuses',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log("update", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleSubmit(e) {

    console.log('formRef', formRef.current.values);
    const data = {
      "GName": formRef.current.values.GroupAdminName,
      "GEmail": formRef.current.values.GroupAdminEmail,

      "Gcontact": formRef.current.values.groupcontact,

      "groupslabel": formRef.current.values.Group,
    }

    const url = path+':4000/admin/group/addGroup'
    console.log("data", data)
    Axios.post(url, {data}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
    // Axios.post(url, data)
      .then(function (response) {
        console.log(response);
        if (response.data.status === 200) {
          alert("Created Successfully")
          window.location.reload();
          // updateAgentCallStatus(formRef.current.values.Agentcontact)
        }
        else {
          // alert(response.data.message)
          console.log("formRef.current", formRef.current)

        }
      })

    setInitialValue({

      GroupAdminName: '',
      GroupAdminEmail: '',
      groupcontact: '',

      Group: {
        value: "",
        label: ""
      }
    });

    formRef.current.values.GroupAdminName = ""
    formRef.current.values.GroupAdminEmail = ""
    formRef.current.values.groupcontact = ""

    formRef.current.values.Group = ""
    console.log("initialValue", initialValue)

    e.preventDefault()


  }




  useEffect(() => {
    console.log('formRef', formRef.current.values);
    console.log("initialValue", initialValue)
    const url = path+':4000/admin/group/getGroup'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log(response);
        if (response.data.status === 200) {
          // roup=response.data.data
          setGroups(response.data.data)
        }
        else {
          // alert(response.data.message)


        }
      })


  }, [])
  const [autoCompleteKey, setAutoCompleteKey] = useState(0);
  return (
    <Formik
      validateOnBlur={false}
      initialValues={initialValue}
      disform={initialValue}
      onSubmit={(e, { validate }, { resetForm }) => {
        console.log("e", e)
        handleSubmit(e);
        validate(e);
        resetForm({ e: '' })
      }}
      innerRef={formRef}
      validationSchema={yup.object({

       
        Group: yup.string().required('Please Enter Group Name'),
        GroupAdminName: yup.string().required('Please Enter Group Admin Name'),
        GroupAdminEmail: yup.string().required('Please Enter Group Admin Email'),
        groupcontact: yup.string().required('Please Enter  Group Admin Contact Number'),

      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} >
            <Grid item xs={6} >
               <Field
                className={classes.fieldContainer}
                name="Group"
                component={TextField}
                variant="outlined"
                multiline
                // value="AgentName"
                label="Group Name"

              />
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.fieldContainer}
                name="GroupAdminName"
                component={TextField}
                variant="outlined"
                multiline
                // value="AgentName"
                label="Group Admin Name"

              />
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.fieldContainer}
                name="GroupAdminEmail"
                component={TextField}
                variant="outlined"
                multiline
                label="Group Admin Email"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.fieldContainer}
                name="groupcontact"
                component={TextField}
                variant="outlined"
                multiline
                label="Group Admin Contact Number"
              />
            </Grid>




          </Grid>
          <br />

          <Button color="primary" variant="contained" disabled={localStorage.getItem('callStatus') === 'connected' ? true : false} onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
