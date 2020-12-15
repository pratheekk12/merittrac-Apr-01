import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setDistributorInvoices } from 'src/modules/dashboard-360/redux/action';
import { invoicesColumns } from 'src/modules/dashboard-360/utils/columns-config';
import PropTypes from 'prop-types';
import ErrorAlert from 'src/components/ErrorAlert';
import MainLoader from 'src/components/MainLoader';
import { Box, makeStyles, Typography } from '@material-ui/core';
import {
  getDealerInvoiceDetails,
  getSingleInvoiceDetails
} from '../../DashboardView/apiCalls';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';

const style = makeStyles(() => ({
  dgContainer: {
    maxHeight: 628
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

  const orderIdPrev = useRef(orderId);

  useEffect(() => {
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
          console.log(error);
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, [orderId]);
  const [page, setPage] = useState(1);
  return distributorInvoices ? (
    // <Card>
    <div className={classes.dgContainer}>
      <Box>
        <CustomBreadcrumbs />
      </Box>
      <Box padding="1rem 0.5rem">
        <Typography variant="h6" component="h4">
          All Invoices
        </Typography>
      </Box>
      <DataGrid
        page={page}
        onPageChange={params => {
          setPage(params.page);
        }}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
        columns={invoicesColumns}
        rows={distributorInvoices.map(order => ({
          ...order,
          id: order.InvoiceNumber
        }))}
      />
    </div>
  ) : // </Card>
  showLoader ? (
    <MainLoader />
  ) : (
    <ErrorAlert style={{ margin: 20 }} />
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