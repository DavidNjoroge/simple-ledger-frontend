
import React, { Component } from 'react'
import MainNavbar from '../components/MainNavbar';
import RouteWithSubRoutes from '../RouteWithSubRoutes';

export interface IDashboardProps {
    location:any
}

export default class Dashboard extends Component<any, any> {
  render() {
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
