import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Container,
  CardHeader,
  Box
} from '@material-ui/core';
import {
  GET_INBOUND_DASHBOARD_DATA,
  GET_INTERACTION_BY_AGENT_SIP_ID
} from 'src/modules/dashboard-360/utils/endpoints';
import Axios from 'axios';
import { grey } from '@material-ui/core/colors';

import socketIOClient from 'socket.io-client';


import CreateAgent from './CreateAgentform'
import AgentTable from './AgentTable'
import UploadAgent from './UploadAgent'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  grey: {
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50]
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center'
  },
  list: {},
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginRight: '0.5vw'
  },
  listItem: {
    padding: 0
  },
  cardcontent: {
    padding: '0 0 0 5%',
    '&:last-child': {
      paddingBottom: 0
    }
  }
}));


const AgentDashboard = () => {
  const classes = useStyles();
  const [agents, setAgents] = useState([]);

  useEffect(() => {



  }, [])
  function TableData() {
    const url = 'http://192.168.3.17:4000/admin/agent/viewAgent'

    Axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })
      .then(function (response) {
        // console.log(JSON.stringify(response.data.data));
        setAgents(response.data.data)

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    // <>
    <Container maxWidth={false}>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} lg={12} sm={4}>
            <div>

              <Card>
                <CardHeader title={'Create Agent'} />
                <CardContent>
                  <CreateAgent TableData={TableData} />
                  
                </CardContent>
              </Card>

            </div>

          </Grid>
          <Grid item xs={12} lg={12} sm={4}>
            <div>

              <Card>
                <CardHeader title={'Upload Agent details'} />
                <CardContent>
                  <UploadAgent TableData={TableData} />
                  
                </CardContent>
              </Card>

            </div>

          </Grid>
          <Grid item xs={12} lg={12} sm={8}>
            <div>
              <Card>
                <CardHeader title={'Agent Details'} />
                <CardContent>
                  <AgentTable />
                </CardContent>
              </Card>
            </div>

          </Grid>

        </Grid>
      </div>

    </Container>
    // </>
  );
};

export default AgentDashboard;
