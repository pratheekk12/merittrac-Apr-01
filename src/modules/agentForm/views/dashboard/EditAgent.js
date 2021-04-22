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
import { Agent_service_url } from '../../../dashboard-360/utils/endpoints'
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

    const [showModal, setShowModal] = useState(true);

    const Data = props.EditData[0]

    const [formData, setFormData] = useState(Data);
    // const agentServiceURL = `${Agent_service_url}/`;
    const path5 = "http://localhost"
    const handleChange = (e) => {
        console.log("target", e.target)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function pushAgentCurrentStatusData(data) {
        const url = path5+':42004/crm/agentupdate/?userID=' + data._id;
        const result = await fetch(url, { method: 'post', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
        console.log("result", result)
        return await result.json();
    }
    const handleSubmit = (e) => {

        console.log("formData", formData)
        const url = path5+':4000/admin/agent/updateAgent1'

        Axios.post(url, { formData },)
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    alert("Updated Agent Successfully")

                    pushAgentCurrentStatusData(formData)
                    setShowModal(false)
                    props.TableData()

                }
            })

    }
    useEffect(() => {
        const url = path5+':4000/admin/group/getGroup'

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


                            {/* <br/>
                            <br/> */}
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

                            {localStorage.getItem('role') === "Admin" ? <TextField
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
                                        key={option.Group_name}
                                        value={option.Group_name}
                                    >
                                        {option.Group_name}
                                    </option>
                                ))}


                            </TextField> : <></>}
                            <br />
                            <br />
                            <TextField
                                fullWidth
                                label="Select Type"
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
