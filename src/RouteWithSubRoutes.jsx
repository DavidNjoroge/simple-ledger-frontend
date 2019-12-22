import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

// const RouteWithSubRoutes = route => (
//   <Route
//     path={route.path}
//     render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes} />
//     )}
//   />
// );

const switchRoutes =  (route) => {
  if(route.redirect) {
    return (<Redirect from={route.path} to={route.to} />)
  }
  return (<Route 
    path={route.path} 
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )} />)
};


export default withRouter(switchRoutes);

