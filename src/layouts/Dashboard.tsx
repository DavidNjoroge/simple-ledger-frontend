
import React, { Component } from 'react'
import MainNavbar from '../components/MainNavbar';
import RouteWithSubRoutes from '../RouteWithSubRoutes';
// import dashboardRoutes from "../routes/dashboardRoutes";

export interface IDashboardProps {
    location:any,
    classes: any
}

export default class Dashboard extends Component<any, any> {

  render() {
    console.log(this.props)

    return (
        <div className="container-fluid App">
        <MainNavbar/>
        {this.props.routes.map((route: any, i: any) => {
          return <RouteWithSubRoutes key={i} {...route} />;
        })}

      </div>
    );
  }
}
