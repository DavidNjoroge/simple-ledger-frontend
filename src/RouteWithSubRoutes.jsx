import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default withRouter(RouteWithSubRoutes);

// const switchRoutes =  (route: any) => {
//   if(route.redirect) {
//     return (<Redirect from={route.path} to={route.to} />)
//   }
//   return (<Route 
//     path={route.path} 
//     render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes} />
//     )} />)
// };


// return (
//   <Switch>
//     {dashboardRoutes.map((prop, key) => {
//       if (prop.redirect)
//         return <Redirect from={prop.path} to={prop.to} key={key} />;
//       return <Route path={prop.path} component={prop.component} key={key} />;
//     })}
//   </Switch>
// )};



// export interface IAppProps {
// }

// export function RouteWithSubRoute (props: IAppProps) {
//   return (
//     <Switch>
//       {if (props) {

//       }}
      
//     </Switch>
//   );
// }
