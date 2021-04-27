import Axios from 'axios';
import {
  GET_DEALER_INVOICES,
  GET_DEALER_JOINING_DETAILS,
  GET_DEALER_KYC,
  GET_DEALER_ORDERS,
  GET_DEALER_PROFILE
} from 'src/modules/dashboard-360/utils/endpoints';
const u = 'http://192.168.3.17:3000';
export const getDealerDetails = distributorID => {
  // console.log("distributorID",distributorID)
  Axios.get(u + GET_DEALER_PROFILE, {
    params: { distributorID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });
}
export const getDealerJoiningDetails = distributorID =>
  Axios.get(u + GET_DEALER_JOINING_DETAILS, {
    params: { distributorID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export const getDealerOrderDetails = distributorID =>
  Axios.get(u + GET_DEALER_ORDERS, {
    params: { distributorID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export const getSingleOrderDetails = orderID =>
  Axios.get(u + GET_DEALER_ORDERS, {
    params: { orderID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export const getDealerInvoiceDetails = distributorID =>
  Axios.get(u + GET_DEALER_INVOICES, {
    params: { distributorID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export const getSingleInvoiceDetails = orderID =>
  Axios.get(u + GET_DEALER_ORDERS, {
    params: { orderID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export const getDealerKYCDetails = distributorID =>
  Axios.get(u + GET_DEALER_KYC, {
    params: { distributorID },
    headers: { "Access-Control-Allow-Origin": "*" }
  });

export default distributorID => [
  getDealerDetails(distributorID),
  getDealerJoiningDetails(distributorID),
  getDealerOrderDetails(distributorID),
  getDealerInvoiceDetails(distributorID),
  getDealerKYCDetails(distributorID)
];
