import React from "react";
import './DashboardPage.css';
import LedgerInterface from "../shared/interfaces/LedgerInterface";
import { Form, Card, Table } from "react-bootstrap";
import { DashboardService } from "../api";

export interface IAppProps {
}


export interface IDashboardState {
  selectedLedger: LedgerInterface,
  ledgers: any[]
}


export default class DashboardPage extends React.Component<IAppProps, IDashboardState> {
    dashboardService: DashboardService = new DashboardService();

  constructor(props: IAppProps) {
    
    super(props);

    this.state = {
      selectedLedger: {
        name: "test",
        debit: 0,
        credit: 0,
        status: "ACTIVE"
      },
      ledgers: []
    }

  }

  componentDidMount() {
    this.dashboardService.getLedgers().then(ledgers => {
      this.setState({ledgers: ledgers})

      if (ledgers.length > 0) {
        
      }
    })

  }

  render() {
    return (
      <div className="overview-wrapper">
        <div className="overview container-fluid">
          <div className="overview-header row">
            <div className="col-3">
              <h3>Overview</h3>
            </div>
            <div className="col-6">

            </div>

            <div className="col-3">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            </div>

          </div>

          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Test Ledger</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Credit: <strong>1000</strong></Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Credit: <strong>1000</strong></Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>

          </div>

        </div>
      </div>
    )
  }
}
