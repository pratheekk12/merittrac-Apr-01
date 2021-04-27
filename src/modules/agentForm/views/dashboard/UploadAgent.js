import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { TextField, RadioGroup } from 'formik-material-ui';
import { useEffect } from 'react';
import axios from 'axios';
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
export default function DispositionForm({ ...props }) {
    const path6 = "http://localhost"
    const config = "http://192.168.3.45:8083/"
    const [uploadfile, setUploadfile] = useState('')
    const [file, setFile] = useState('');
    const imageInputRef = React.useRef();
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

    //   const agentServiceURL = `${Agent_service_url}/`;
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
    // const Groups = [
    //   {
    //     id: '1', value: 'Grassroots DD',
    //   }


    // ]
    function onChange(e) {
        // alert(e.target.files[0])
        setUploadfile(e.target.files[0])

    }
    function uploadFile(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('file', uploadfile, uploadfile.name);
        // formdata.append("file", fileInput.files[0], "Book1.xlsx");

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch(path6+":4000/admin/agent/upload", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error_code === 0) {
                    setFile();
                    setUploadfile();

                    alert("Uploaded successfully")
                    imageInputRef.current.value = "";
                }
                //   console.log("e", e)
                //   e.target.files=null;
                console.log(JSON.stringify(result.error_code))
            })
            .catch(error => console.log('error', error));

        // console.log("formdata",formData)

    }

    useEffect(() => {

    }, [])

    return (
        <div>


            <input
                type="file"
                onChange={(e) => onChange(e)}
                // value={file}
                ref={imageInputRef}
                accept=".xlsx"
            />

            <Button color="primary" variant="contained" onClick={(e) => uploadFile(e)}>
                Upload
          </Button>
        </div>
    );
}
