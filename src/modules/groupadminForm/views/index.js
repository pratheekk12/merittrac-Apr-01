import React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import getGroupModule from '../redux/module';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';

export default function index({ routes }) {
  return (
    <DynamicModuleLoader modules={[getGroupModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} redirectPath="/group/dashboard" />
    </DynamicModuleLoader>
  );
}
