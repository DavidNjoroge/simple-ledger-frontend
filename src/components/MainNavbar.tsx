import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './MainNavbar.css';
import UserPrincipalInterface from '../shared/interfaces/UserPrincipalInterface';




export interface MainNavbarState {
  userPrincipal: UserPrincipalInterface,
}


export default class MainNavbar extends Component<any, MainNavbarState> {

  constructor(props: any) {
    super(props);
    this.state = {
      userPrincipal: this.getUser()
    }
  }

  getUser() {
    const localData = localStorage.userPrincipal
    if (localData) {
      return JSON.parse(localData)
    } else {
      return null
    }
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
                {this.state.userPrincipal?.name}
              </Navbar.Text>

              <Nav.Link href="#/login" onClick={this.logOut} >Logout</Nav.Link>

            </Navbar.Collapse>
      </Navbar>
    )
  }
}
