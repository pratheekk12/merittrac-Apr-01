import { SET_USER_DATA } from 'src/modules/dashboard-360/redux/constants';
import {
  SET_LOGGED_IN,
  SET_ACCOUNT_TYPE,
  SET_ACTIVATED_ROUTE,
  SET_NEW_CRUMB,
  SET_URL_MATCH_FOUND,
  SET_AGENT_CURRENT_STATUS,
  SET_SEARCH_DISTRIBUTOR
} from './constants';

export const setLoggedIn = isLoggedIn => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn
  };
};
export const setUserDetails = details => {
  return {
    type: SET_USER_DATA,
    payload: details
  };
};

export const setAccountType = accType => {
  return {
    type: SET_ACCOUNT_TYPE,
    payload: accType
  };
};
export const setActivatedRoute = route => {
  return {
    type: SET_ACTIVATED_ROUTE,
    payload: route
  };
};
export const setNewCrumb = ({ key, value }) => {
  return {
    type: SET_NEW_CRUMB,
    key,
    value
  };
};
export const setUrlMatchFound = val => {
  return {
    type: SET_URL_MATCH_FOUND,
    payload: val
  };
};

export const setAgentCurrentStatus = val => {
  // console.log("val", val)
  return {
    type: SET_AGENT_CURRENT_STATUS,
    payload: val
  };
};
export const setSearchDistributor = val => {
  console.log("val", val)
  return {
    type: SET_SEARCH_DISTRIBUTOR,
    payload: val
  };
};
