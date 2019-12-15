import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import './MainNavbar.css';


export default class MainNavbar extends Component<any, any> {

  render() {
    return (
      <Navbar expand="lg" className="dashboard-navbar">
        <Navbar.Brand href="#home">Simple Ledger</Navbar.Brand>
        {/* this is the right humbergur button on mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Overview</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                David Mwangi
              </Navbar.Text>

              <Nav.Link href="#link">Logout</Nav.Link>

            </Navbar.Collapse>
      </Navbar>
    )
  }
}
