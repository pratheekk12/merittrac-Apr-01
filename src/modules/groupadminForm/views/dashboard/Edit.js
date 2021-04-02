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
    const classes = useStyles();
    const [Groups, setGroups] = useState([]);
    //   console.log("EditData",props.EditData)
    // const [formData, setFormData] = useState({
    //         AgentType: "",
    //         EmployeeName: "",
    //         External_num: "",
    //         Location: "",
    //         UserID: "",
    //         UserName: "",
    //         EmailID:""
    //     });
    const [showModal, setShowModal] = useState(true);

    const Data = props.EditData[0]

    const [formData, setFormData] = useState(Data);


    const handleChange = (e) => {
        console.log("target", e.target)
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
            url: 'https://localhost:42004/crm/currentstatuses',
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
        const url = 'http://106.51.86.75:4000/admin/agent/updateAgent'

        Axios.post(url, formData)
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    alert("Updated Agent Successfully")
                    setShowModal(false)
                    props.TableData()
                    updateAgentCallStatus(formData.External_num)
                }
            })

    }
    useEffect(() => {
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
    return (
        <div>
            {showModal && (
                <Dialog
                    open
                    onClose={() => setShowModal(false)}
                    classes={{ paper: classes.dialog }}
                >
                    <DialogTitle>Edit Agent Details</DialogTitle>
                    <Divider light />
                    <DialogContent>
                        <Typography variant="h6">
                            <TextField
                                fullWidth
                                label="Agent Name"
                                name="EmployeeName"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.EmployeeName}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Agent Email"
                                name="EmailID"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.EmailID}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Agent Contact Number"
                                name="External_num"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.External_num}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Location"
                                name="Location"
                                onChange={handleChange}
                                required

                                SelectProps={{ native: true }}
                                value={formData.Location}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Select Group"
                                name="GroupName"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formData.GroupName}
                                variant="outlined"
                                InputLabelProps={{ ...InputLabelProps, shrink: true }}
                                {...props}
                            >
                                {Groups.map((option) => (
                                    <option
                                        key={option.group_id}
                                        value={option.group_name}
                                    >
                                        {option.group_name}
                                    </option>
                                ))}


                            </TextField>
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Select Agent Type"
                                name="AgentType"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formData.AgentType}
                                variant="outlined"
                            >
                                <option
                                    key="L1"
                                    value="L1"
                                >
                                    L1
                                    </option>
                                <option
                                    key="L2"
                                    value="L2"
                                >
                                    L2
                                    </option>

                            </TextField>

                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Select Agent Type"
                                name="Enabled"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formData.Enabled}
                                variant="outlined"
                            >
                                <option
                                    key="1"
                                    value="True"
                                >
                                    Enable
                                    </option>
                                <option
                                    key="0"
                                    value="False"
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
