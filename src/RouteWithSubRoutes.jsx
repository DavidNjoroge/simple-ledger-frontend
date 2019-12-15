import React from 'react';
import { Route, withRouter } from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} key={props.key} />
    )}
  />
);

export default withRouter(RouteWithSubRoutes);
