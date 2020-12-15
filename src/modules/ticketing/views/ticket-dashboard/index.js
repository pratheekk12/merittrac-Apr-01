import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
  Button,
  Avatar,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { purple, orange, green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  },
  paper: {
    padding: theme.spacing(1)
  },
  listRow: {
    flexGrow: 1,
    fontSize: 10,
    padding: 0
  },
  ticketMargin: {
    marginLeft: 5
  },
  listItemClass: {
    paddingLeft: 10,
    paddingRight: 10
  },
  metadataClass: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  labelClass: {
    fontWeight: '500',
    float: 'left',
    width: '50%'
  },
  valueClass: {
    width: '50%'
  },
  belowMargin: {
    marginBottom: 20
  },
  dateMargin: {
    marginBottom: 5
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatarValue: {
    marginLeft: 5,
    marginTop: 5
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
    marginTop: 10
  },
  button: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  boxDiv: {
    paddingBottom: 10,
    paddingTop: 10
  },
  detailTitle: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 600
  },
  drawer: {
    width: '100%',
    flexShrink: 0
  },
  drawerPaper: {
    width: '25%'
  },
  modal: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
}));

export default function TicketDashboard() {
  const classes = useStyles();
  const ticketListData = [
    {
      id: 'IV-10202',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10222',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10122',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10732',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10312',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-12302',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    },
    {
      id: 'IV-10232',
      title:
        'This captures all user stories and tasks related to the Cloud Deployment Framework.'
    }
  ];

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  function getTicketList() {
    return (
      <List className={classes.listRow}>
        {ticketListData.map((ticket) => (
          <>
            <ListItem alignItems="flex-start" className={classes.listItemClass}>
              <ListItemText>
                <div className={classes.textBold}>
                  <ListItemIcon>
                    <OfflineBoltIcon style={{ color: purple[500] }} />
                    <span className={classes.ticketMargin}>{ticket.id}</span>
                  </ListItemIcon>
                </div>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  style={{ textOverflow: 'ellipsis' }}
                  noWrap
                >
                  {ticket.title}
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider light />
          </>
        ))}
      </List>
    );
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{marginBottom:15}}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create Ticket
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Create Ticket'}</DialogTitle>
        <DialogContent dividers>
          <CreateTicket />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="small"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <box component="div" overflow="auto">
              {getTicketList()}
            </box>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <div className={classes.listItemClass}>
              <Box display="flex" flexDirection="row">
                <Avatar
                  alt="IV"
                  src="/static/images/products/product_1.png"
                  className={classes.large}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.ticketMargin}
                >
                  <Typography variant="body1" className={classes.textBold}>
                    IV-38648
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    This captures all user stories and tasks related to the
                    Cloud Deployment Framework.
                  </Typography>
                </Box>
              </Box>
              <div display="flex" flexDirection="row">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<AttachFileIcon />}
                >
                  Attach
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<LinkIcon />}
                >
                  Link issue
                </Button>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Details
                </Typography>
                <div style={{ paddingRight: 15, paddingLeft: 15 }}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Type :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Epic
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Priority :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <ArrowUpwardIcon style={{ color: orange[500] }} />
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Medium
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <React.Fragment>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Category :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                variant="body1"
                                className={classes.ticketMargin}
                                component="span"
                              >
                                Survey
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontWeight: '500',
                                float: 'left',
                                width: '35%'
                              }}
                            >
                              Status :
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              className={classes.valueClass}
                            >
                              <Typography
                                component="span"
                                variant="body1"
                                // style={{ color: green[500] }}
                                className={classes.ticketMargin}
                              >
                                Active
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Description
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Add a description..."
                  rows={10}
                  fullWidth
                  multiline
                  variant="outlined"
                />
              </div>
              <div component="div" className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.detailTitle}
                >
                  Attachments
                </Typography>
                <TextField
                  id="outlined-textarea"
                  placeholder="Drop files to attach, or browse"
                  rows={5}
                  rowsMax={20}
                  multiline
                  fullWidth
                  variant="outlined"
                />
              </div>
            </div>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Avatar className={classes.green}>SA</Avatar>
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    Sandra Adams
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    SA26744
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Avatar className={classes.green}>AS</Avatar>
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    Adams Sandra
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    SA23344
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Media
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    ABCD
                  </Typography>
                </Box>
              </Box>
            </div>
            <Divider light />
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Due:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  20/12/2020
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Created:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  12/12/2020, 9:40 AM
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Updated:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  12/12/2020, 12:40 PM
                </Typography>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}