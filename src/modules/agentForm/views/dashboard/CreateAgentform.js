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
  const path4 = "http://localhost"
  const [initialValue, setInitialValue] = useState({

    AgentName: '',
    AgentEmail: '',
    Agentcontact: '',
    location: {
      value: "",
      label: ""
    },
    enable: true,
    AgentType: {
      value: "",
      label: ""
    },
    Group: {
      value: "",
      label: ""
    },
    agentqueue: {
      value: "",
      label: ""
    }
  });
  const [Groups, setGroups] = useState([]);
  const classes = useStyle();
  const formRef = useRef({});
  // const agentServiceURL = `${Agent_service_url}/`;
  const AgentType = [
    {
      id: '1', value: 'L1',
    },
    {
      id: '2', value: 'L2',
    },

  ]
  const location = [
    {
      id: '1', value: 'Chennai',
    },
    {
      id: '2', value: 'OMR',
    },

  ]
  const agentqueue = [
    {
      id: '1', value: 'dynamic',
    },
    {
      id: '2', value: 'static',
    },

  ]




  function handleSubmit(e) {

    console.log('formRef', formRef.current.values);

    const data = {
      "AgentName": formRef.current.values.AgentName,
      "AgentEmail": formRef.current.values.AgentEmail,
      "Location": formRef.current.values.location.value,
      "Agentcontact": formRef.current.values.Agentcontact,
      "AgentType": formRef.current.values.AgentType.value,
      "queuetype": formRef.current.values.queuetype.value,
      "group": formRef.current.values.Group.Group_name,
    }
    const url = path4+':4000/admin/agent/addAgent1'

    Axios.post(url, { data }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log(response);
        if (response.data.status === 200) {
          alert("Created Agent Successfully")
          // updateAgentCallStatus(formRef.current.values.Agentcontact)
          window.location.reload();

          props.TableData()
        }
        else {
          // alert(response.data.message)
          console.log("formRef.current", formRef.current)

        }
      })

    setInitialValue({

      AgentName: '',
      AgentEmail: '',
      Agentcontact: '',
      location: {
        value: "",
        label: "",
        id: ""
      },

      AgentType: {
        value: "",
        label: "",
        id: ""
      },
      agentqueue: {
        value: "",
        label: ""
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
    const url = path4+':4000/admin/group/getGroup'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        console.log("getgroup", response);
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
        AgentType: yup
          .object()
          .required('Please select a Agent Type')
          .typeError('Please select a valid Agent Type'),
        // Group: yup
        //   .object()
        //   .required('Please select a Group')
        //   .typeError('Please select a Group'),
        AgentName: yup.string().required('Please Enter Agent Name'),
        AgentEmail: yup.string().required('Please Enter Agent Email'),
        Agentcontact: yup.string().required('Please Enter Agent Contact Number'),
        location: yup
          .object()
          .required('Please select a Agent Type')
          .typeError('Please select a valid Agent Type'),
        agentqueue: yup
          .object()
          .required('Please select a Agent queue Type')
          .typeError('Please select a valid Agent queue Type'),
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <Grid container spacing={2} >
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <Field
                className={classes.fieldContainer}
                name="AgentEmail"
                component={TextField}
                variant="outlined"
                multiline
                label="Agent Email"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                className={classes.fieldContainer}
                name="Agentcontact"
                component={TextField}
                variant="outlined"
                multiline
                label="Agent Contact Number"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >


                <Autocomplete
                  options={location}
                  getOptionLabel={option => option.value}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {

                    setFieldValue('location', value);

                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select location"
                      variant="outlined"
                      name="location"
                    />
                  )}
                  name="location"
                />
              </FormControl>


            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >


                <Autocomplete
                  options={agentqueue}
                  getOptionLabel={option => option.value}
                  // style={{ width: 400, overflow: "hidden" }}
                  getOptionSelected={(option, value) =>
                    value.id === option.id
                  }
                  key={autoCompleteKey}
                  onChange={(event, value) => {

                    setFieldValue('queuetype', value);

                  }}
                  renderInput={params => (
                    <Field
                      component={TextField}
                      {...params}
                      label="Select Queue Type"
                      variant="outlined"
                      name="queuetype"
                    />
                  )}
                  name="queuetype"
                />
              </FormControl>


            </Grid>
            {localStorage.getItem('role') === "Admin" ? <Grid item item xs={6}>
              <FormControl
                variant="outlined"
                className={classes.fieldContainer}
              >


                <Autocomplete
                  options={Groups}
                  getOptionLabel={option => option.Group_name}
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

            <Grid item xs={6}>
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
