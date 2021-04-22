import React from 'react';
import PropTypes from 'prop-types';
import RouteSwitch from 'src/components/RouteSwitch';
import { connect } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { ADMIN, COMMON } from '../../../redux/constants';
import getDashboardModule from '../redux/module';

function View({ accountType, routes }) {
    routes = routes.filter((route) => (
        (route.accountType ? route.accountType === accountType : true)
        || route.accountType === COMMON
    ));
    return (
        <DynamicModuleLoader modules={[getDashboardModule()]}>
       
         <RouteSwitch routes={routes} redirectPath={localStorage.getItem('role') === 'Agent' ? '/dash360/admin/dashboard' : '/agent'} />
      
        {/* {localStorage.getItem('role') === 'Group admin' || 'Admin' ?
         <RouteSwitch routes={routes} redirectPath={accountType === ADMIN ? '/dash360/admin/dashboard' : '/dash360/user/profile'} />
         :
         null
         } */}
         
           
        </DynamicModuleLoader>
    );
}

View.propTypes = {
    accountType: PropTypes.string,
    routes: PropTypes.array
};

const mapStateToProps = (state) => ({
    // Added admin just for testing
    accountType: state.accountType || 'ADMIN'
});

export default connect(mapStateToProps)(View);
