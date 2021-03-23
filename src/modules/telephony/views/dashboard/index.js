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
  Box
} from '@material-ui/core';
import {
  GET_INBOUND_DASHBOARD_DATA,
  GET_INTERACTION_BY_AGENT_SIP_ID,
  AGENT_SERVICE_URL
} from 'src/modules/dashboard-360/utils/endpoints';
import CallIcon from '@material-ui/icons/Call';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import QueueIcon from '@material-ui/icons/Queue';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import VoicemailIcon from '@material-ui/icons/Voicemail';
import ListAltIcon from '@material-ui/icons/ListAlt';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import TimelapseRoundedIcon from '@material-ui/icons/TimelapseRounded';
import Timer10RoundedIcon from '@material-ui/icons/Timer10Rounded';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import StarsIcon from '@material-ui/icons/Stars';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey } from '@material-ui/core/colors';

import socketIOClient from 'socket.io-client';
import DaterangeReport from './DaterangeReport';
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport';
import DispositionTable from './DispositionTable';
import { DataGrid } from '@material-ui/data-grid';
import CurrentStatus from './CurrentStatus'
import { SOCKETENDPOINT2 } from '../../../dashboard-360/utils/endpoints'
import {

  lastFiveCallData
} from 'src/modules/dashboard-360/utils/columns-config';
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


const Inbound = () => {
  const classes = useStyles();
  const [agentdisposedCalls, setagentdisposedCalls] = useState([])
  const [Inbound, setInbound] = useState(
    {
      "callarrived": 0,
      "callsoffered": 0,
      "callsanswered": 0,
      "callsabandonedonivr": 0,
      "callsabandonedonqueue": 0,
      "shortabandoned": 0,
      "shortabandoned_ten": 0,
      "callsansweredwithin20": 0,
      "callsansweredwithin10": 0,
      "servicelevel": null,
      "answerlevel": null,
      "servicelevel_ten": null,
      "answerlevel_ten": null,
      "aht": null,
      "ooohourscalls": 0,
      "livecalls": 0,
      "queuecalls": 0,
      "callstransferedtoCSAT": 0,
      "GaveCSAT": 0,
      "totalcsatscore": null
    }
  )

  const InboundDataList = [
    {
      icon: <CallIcon color="primary" />,
      data: Inbound.callarrived,
      label: 'I/B Calls Arrived'
    },
    {
      icon: <QueryBuilderIcon color="primary" />,
      data: Inbound.ooohourscalls,
      label: 'OOO Hours Calls'
    },
    {
      icon: <AddIcCallIcon color="primary" />,
      data: Inbound.callsoffered,
      label: 'I/B Calls Offered'
    },
    {
      icon: <CallReceivedIcon color="primary" />,
      data: Inbound.callsanswered,
      label: 'I/B Calls Answered'
    },
    {
      icon: <QueueIcon color="primary" />,
      data: Inbound.queuecalls,
      label: 'I/B Calls in Queue'
    },
    {
      icon: <SupervisorAccountIcon color="primary" />,
      data: '0',
      label: 'I/B Agents Available'
    },
    {
      icon: <AvTimerIcon color="primary" />,
      data: '0',
      label: 'I/B Ans within SL'
    },
    {
      icon: <RecordVoiceOverIcon color="primary" />,
      data: Inbound.shortabandoned,
      label: 'I/B IVR Aband'
    },
    {
      icon: <VoicemailIcon color="primary" />,
      data: '0',
      label: 'I/B Queue Aband'
    },
    {
      icon: <ListAltIcon color="primary" />,
      data: '0',
      label: 'I/B Service Level (SL-20)'
    },
    {
      icon: <QuestionAnswerRoundedIcon color="primary" />,
      data: Inbound.callsansweredwithin20,
      label: 'I/B Answer Level (SL-20)'
    },
    {
      icon: <TimelapseRoundedIcon color="primary" />,
      data: Inbound.aht,
      label: 'I/B AHT'
    }
    // {
    //   icon: <Timer10RoundedIcon color="primary" />,
    //   data: '0',
    //   label: 'TeI/B Ans within SL=10 sec'
    // },
    // {
    //   icon: <HourglassEmptyRoundedIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Service Level (SL-10)'
    // },
    // {
    //   icon: <StarsIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Answer Level (SL-10)'
    // },
    // {
    //   icon: <StarsIcon color="primary" />,
    //   data: '09',
    //   label: 'I/B Answer Level (SL-10)'
    // }
  ];
  function getALF(startDate, endDate) {

    const axios = require('axios');
    let data = '';
    let u = AGENT_SERVICE_URL
    let config = {
      method: 'get',
      url: u + GET_INTERACTION_BY_AGENT_SIP_ID + localStorage.getItem('AgentSIPID') + '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async (response) => {
        var ALFDATA = response.data;
        ALFDATA = ALFDATA.reverse();
        var filteredData = ALFDATA.filter(data => data.created.substring(0, 10) >= startDate.toISOString().substring(0, 10) && data.created.substring(0, 10) <= endDate.toISOString().substring(0, 10))
        setagentdisposedCalls(filteredData)
        return filteredData;
      })

      .catch((error) => {
        console.log(error);
      });


  }
  function handleChange() {
    setagentdisposedCalls([])
  }
  function getIBdata() {
    const axios = require('axios');

    let config = {
      method: 'get',
      url: GET_INBOUND_DASHBOARD_DATA,
      headers: {}
    };

    axios(config)
      .then((response) => {

        var data = response.data;

        setInbound(data[0][0])
      })
      .catch((error) => {
        console.log(error);
      });


  }
  const SOCKETENDPOINT = SOCKETENDPOINT2;

  useEffect(() => {

    getIBdata();
    const socket = socketIOClient(SOCKETENDPOINT);

    socket.on('AstriskEvent', data => {
      if (data.Event === 'Bridge' && data.Bridgestate === 'Link') {
        getIBdata()
      }
      if (data.Event === 'Hangup') {
        getIBdata()
      }
    })

  }, [])

  return (
    <>
      <div className={classes.root}>
        <Box css={{ margin: '0.5rem' }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid container item xs={9} spacing={1}>
              {InboundDataList.map((array, index) => (
                <Grid item lg={3} sm={6} key={index}>
                  <Card>
                    <CardContent className={classes.cardcontent}>
                      <List key={index} className={classes.list}>
                        <ListItem classes={{ root: classes.listItem }}>
                          <ListItemAvatar>
                            <Avatar className={classes.grey}>
                              {array.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={array.data}
                            secondary={array.label}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              <DaterangeReport
                getALF={getALF}
                handleChange={handleChange}
              />
              <Grid item lg={3} sm={6}>
                <br />
                {agentdisposedCalls.length > 0 ? <DownloadReport
                  DownloadData={agentdisposedCalls}

                /> : <></>}
              </Grid>

            </Grid>
            <Grid item xs={3}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Calls in Queue (0)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Details</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Live Calls ({Inbound.livecalls})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Details</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Agents Live Status :: Logged in (34) / On Break (17)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Details</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
        {/* <CurrentStatus/> */}
      </div>
      {agentdisposedCalls.length > 0 ? <DispositionTable getALF={getALF} agentdisposedCalls={agentdisposedCalls} /> : <></>}

    </>
  );
};

export default Inbound;
