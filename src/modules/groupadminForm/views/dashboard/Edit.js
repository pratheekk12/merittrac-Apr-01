import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
const useStyles = makeStyles(theme => ({
    dialog: {
        minWidth: 400
    }
}));

export default function DistSelect({ InputLabelProps = {}, ...props }) {
    const path2 = "http://localhost"
    const classes = useStyles();
    const [Groups, setGroups] = useState([]);
      console.log("EditData",props.EditData)

    const [showModal, setShowModal] = useState(true);

    const Data = props.EditData[0]

    const [formData, setFormData] = useState(Data);


    const handleChange = (e) => {
        console.log("target", e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
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
            url: path2+':42004/crm/currentstatuses',
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
    const handleSubmit = (e) => {

        console.log("formData", formData)
        const url = path2+':4000/admin/group/updateGroup'

        Axios.post(url, {formData},{ headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    alert("Updated Agent Successfully")
                    setShowModal(false)
                    props.TableData()
                    // updateAgentCallStatus(formData.External_num)
                }
            })

    }
    useEffect(() => {
       

    }, [])
    return (
        <div>
            {showModal && (
                <Dialog
                    open
                    onClose={() => setShowModal(false)}
                    classes={{ paper: classes.dialog }}
                >
                    <DialogTitle>Edit Group Details</DialogTitle>
                    <Divider light />
                    <DialogContent>
                        <Typography variant="h6">
 
                            <TextField
                                fullWidth
                                label="Admin Name"
                                name="Group_Admin_name"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.Group_Admin_name}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Admin Email"
                                name="Group_Admin_Email_id"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.Group_Admin_Email_id}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Admin Contact Number"
                                name="Group_Admin_ContactNumber"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.Group_Admin_ContactNumber}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Group name"
                                name="Group_name"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.Group_name}
                                variant="outlined"
                            />
                          
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Select Status"
                                name="Status"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formData.Status}
                                variant="outlined"
                            >
                                <option
                                    key="enable"
                                    value="enable"
                                >
                                    Enable
                                    </option>
                                <option
                                    key="disable"
                                    value="disable"
                                >
                                    Disable
                                    </option>

                            </TextField>
                            <br />
                            <br />
                            <Box style={{ flexBasis: '100%' }}>
                                <br />
                            </Box>
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={
                                (e) => {
                                    setShowModal(false)
                                }}
                        >
                            close
                </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={
                                handleSubmit}
                        >
                            Update
                </Button>

                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
