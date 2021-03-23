import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setDistributorInvoices } from 'src/modules/dashboard-360/redux/action';
import { AgentCallColumns } from 'src/modules/dashboard-360/utils/columns-config';
import PropTypes from 'prop-types';
import CommonAlert from 'src/components/CommonAlert';
import MainLoader from 'src/components/MainLoader';
import { Box, makeStyles, Typography } from '@material-ui/core';
import {
  getDealerInvoiceDetails,
  getSingleInvoiceDetails
} from '../../DashboardView/apiCalls';
import { AGENT_SERVICE_URL } from '../../../utils/endpoints';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import DownloadReport from '../../DashboardView/DownloadReport';

const style = makeStyles(() => ({
  dgContainer: {
    maxHeight: 628,
    paddingLeft: '16px',
    paddingRight: '16px'
  }
}));
function Invoices({
  distributorInvoices,
  setDistributorInvoicesAction,
  ...props
}) {
  const classes = style();
  const [showLoader, setShowLoader] = useState(true);
  const {
    match: {
      params: { orderId }
    }
  } = props;


  const [invoiceDetails, setSingleInvoiceDetails] = useState(null);
  const [agentdisposedCalls, setagentdisposedCalls] = useState([]);

  const orderIdPrev = useRef(orderId);

  const agentServiceURL = `${AGENT_SERVICE_URL}/`;
  function getALF() {
    const axios = require('axios');
    let data = '';

    let config = {
      method: 'get',
      url:
        agentServiceURL +
        'crm/interactions/getByAgentSIPID?SipID=' +
        localStorage.getItem('AgentSIPID') +
        '',
      headers: {},
      data: data
    };

    axios(config)
      .then(async response => {
        var ALFDATA = response.data;
        console.log('ALFDATA', ALFDATA);
        ALFDATA = ALFDATA.reverse();
        setagentdisposedCalls(ALFDATA);
      })

      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getALF();
    if (!distributorInvoices || orderIdPrev !== orderId) {
      (async function getDetails() {
        try {
          const res = await (orderId
            ? getSingleInvoiceDetails(orderId)
            : getDealerInvoiceDetails(1001));
          if (!orderId) {
            setDistributorInvoicesAction(res.data.data);
          } else {
            setSingleInvoiceDetails(res.data.data);
          }
        } catch (error) {
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, [orderId]);
  const [page, setPage] = useState(1);
  return agentdisposedCalls ? (
    // <Card>
    <div className={classes.dgContainer}>
      <Box>
        <CustomBreadcrumbs />
      </Box>
      <Box padding="1rem 0.5rem">
        <Typography variant="h6" component="h4">
          All Disposed Calls
        </Typography>
      </Box>
      {agentdisposedCalls.length ? (
        <DownloadReport DownloadData={agentdisposedCalls} />
      ) : (
        <></>
      )}
      <DataGrid
        page={page}
        onPageChange={params => {
          setPage(params.page);
        }}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
        columns={AgentCallColumns}
        exportButton={true}
        rows={agentdisposedCalls.map(calls => ({
          ...calls,
          id: calls._id
        }))}
      />
    </div>
  ) : // </Card>
    showLoader ? (
      <MainLoader />
    ) : (
      <CommonAlert style={{ margin: 20 }} />
    );
}

Invoices.propTypes = {
  distributorInvoices: PropTypes.arrayOf(PropTypes.object),
  setDistributorInvoicesAction: PropTypes.func
};

const mapStateToProps = state => ({
  distributorInvoices: state.distributorInvoices
});

const mapDispatchToProps = dispatch => ({
  setDistributorInvoicesAction: invoices =>
    dispatch(setDistributorInvoices(invoices))
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
