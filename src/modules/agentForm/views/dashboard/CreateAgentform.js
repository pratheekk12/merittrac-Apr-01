import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';
import { useEffect } from 'react';
import {
  UPDATE_CALL_STATUS,
  UPDATE_CURRENT_STATUS,
  AGENT_SERVICE_URL
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
// import config from '../../../ticketing/views/config.json';g
import { Autocomplete } from '@material-ui/lab';
import { set } from 'lodash';
// import { AlternateEmailTwoTone } from '@material-ui/icons';
const useStyle = makeStyles(() => ({
  fieldContainer: {
    width: '100%'
  }
}));
export default function DispositionForm({ ...props }) {
  const config = "http://192.168.3.45:8083/"

  const [initialValue, setInitialValue] = useState({

    AgentName: '',
    AgentEmail: '',
    Agentcontact: '',
    enable: false,
    AgentType: {
      value: "",
      label: ""
    },
    Group: {
      value: "",
      label: ""
    }
  });
  const [Groups, setGroups] = useState([]);
  const classes = useStyle();
  const formRef = useRef({});
  const agentServiceURL = `${AGENT_SERVICE_URL}/`;
  const AgentType = [
    {
      id: '1', value: 'L1',
    },
    {
      id: '2', value: 'L2',
    },

  ]
  // const Groups = [
  //   {
  //     id: '1', value: 'Grassroots DD',
  //   },
  //   {
  //     id: '2', value: 'Grassroots OMR',
  //   },
  //   {
  //     id: '3', value: 'Grassroots Site1',
  //   },

  // ]


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
      url: `${AGENT_SERVICE_URL}/crm/currentstatuses`,
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
  async function pushAgentCurrentStatusData(data) {
    const url = agentServiceURL + 'crm/currentstatuses';
    const result = await fetch(url, { method: 'post', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    console.log("result", result)
    return await result.json();
  }
  function handleSubmit(e) {

    console.log('formRef', formRef.current.values);
    const data = {
      "AgentName": formRef.current.values.AgentName,
      "AgentEmail": formRef.current.values.AgentEmail,

      "Agentcontact": formRef.current.values.Agentcontact,
      "AgentType": formRef.current.values.AgentType.value,
      "group": formRef.current.values.Group.group_name,
    }
    const url = 'http://106.51.86.75:4000/admin/agent/addAgent'

    Axios.post(url, { data }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log(response);
        if (response.data.status === 200) {
          alert("Created Agent Successfully")
          // updateAgentCallStatus(formRef.current.values.Agentcontact)
          const result = {
            "agentCallDispositionStatus": "NA",
            "agentCallType": "Inbound",
            "agentCallUniqueId": "NA",
            "agentCallEvent": "NewState",
            "agentCallStatus": "ringing",
            "agentID": data.Agentcontact,
            "agentSipID": data.Agentcontact,
            "breakStatus": "NA",
            "newstateinbound": "",
            "newstateoutbound": "NA",
            "bridgeUniqueid1": "NA",
            "bridgeUniqueid2": "NA",
            "channel": "NA",
            "contactNumber": data.Agentcontact,
            "agenttype": data.AgentType
          }

          pushAgentCurrentStatusData(result)
          props.TableData()
        }
        else {
          alert(response.data.message)
          console.log("formRef.current", formRef.current)

        }
      })

    setInitialValue({

      AgentName: '',
      AgentEmail: '',
      Agentcontact: '',
      location: '',

      AgentType: {
        value: "",
        label: "",
        id: ""
      }
    });

    formRef.current.values.AgentName = ""
    formRef.current.values.AgentEmail = ""
    formRef.current.values.Agentcontact = ""
    formRef.current.values.location = ""
    formRef.current.values.AgentType.label = ""
    formRef.current.values.AgentType.value = ""
    formRef.current.values.AgentType.id = ""
    formRef.current.values.Group = {
      value: "",
      label: ""
    }
    console.log("initialValue", initialValue)

    e.preventDefault()


  }




  useEffect(() => {
    console.log('formRef', formRef.current.values);
    console.log("initialValue", initialValue)
    const url = 'http://106.51.86.75:4000/admin/group/getGroup'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log(response);
        if (response.data.status === 200) {
          // roup=response.data.data
          setGroups(response.data.data)
        }
        else {
          alert(response.data.message)


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
        AgentType: yup
          .object()
          .required('Please select a Agent Type')
          .typeError('Please select a valid Agent Type'),
        Group: yup
          .object()
          .required('Please select a Group')
          .typeError('Please select a Group'),
        AgentName: yup.string().required('Please Enter Agent Name'),
        AgentEmail: yup.string().required('Please Enter Agent Email'),
        Agentcontact: yup.string().required('Please Enter Agent Contact Number'),
        location: yup.string().required('Please Enter Location'),
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Field
                className={classes.fieldContainer}
                name="AgentName"
                component={TextField}
                variant="outlined"
                multiline
                // value="AgentName"
                label="Agent Name"

              />
            </Grid>
            <Grid item>
              <Field
                className={classes.fieldContainer}
                name="AgentEmail"
                component={TextField}
                variant="outlined"
                multiline
                label="Agent Email"
              />
            </Grid>
            <Grid item>
              <Field
                className={classes.fieldContainer}
                name="Agentcontact"
                component={TextField}
                variant="outlined"
                multiline
                label="Agent Contact Number"
              />
            </Grid>

            {localStorage.getItem('role') === "Admin" ? <Grid item >
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >


                <Autocomplete
                  options={Groups}
                  getOptionLabel={option => option.group_name}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {

                    setFieldValue('Group', value);

                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select Groups"
                      variant="outlined"
                      name="Group"
                    />
                  )}
                  name="Group"
                />
              </FormControl>

            </Grid> : <></>}

            <Grid item >
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >


                <Autocomplete
                  options={AgentType}
                  getOptionLabel={option => option.value}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {

                    setFieldValue('AgentType', value);

                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select Agent Type"
                      variant="outlined"
                      name="AgentType"
                    />
                  )}
                  name="AgentType"
                />
              </FormControl>

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
