import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './MainNavbar.css';
import UserPrincipalInterface from '../shared/interfaces/UserPrincipalInterface';


export default class MainNavbar extends Component<any, any> {
  userPrincipal: UserPrincipalInterface;

  constructor(props: any) {
    super(props);
    this.userPrincipal = JSON.parse(localStorage.userPrincipal)
  }


  logOut() {
    localStorage.clear();
}
  render() {
    return (
      <Navbar expand="lg" className="dashboard-navbar">
        <Navbar.Brand href="#">Simple Ledger</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#dashboard">Overview</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {this.userPrincipal.name}
              </Navbar.Text>

              <Nav.Link href="#/login" onClick={this.logOut} >Logout</Nav.Link>

            </Navbar.Collapse>
      </Navbar>
    )
  }
}
