import React from 'react';
import './DashboardPage.css';
import LedgerInterface, {
    LedgerDetailInterface
} from '../shared/interfaces/LedgerInterface';
import { Form, Card, Table, Button } from 'react-bootstrap';
import { DashboardService } from '../api';
import CreateLedger, {
    LedgerRequest
} from '../components/create-ledger-button-and-modal/CreateLedger';
import { getLatestLedger } from '../shared/helpers/ledger';

export interface DashboardState {
    selectedLedger?: LedgerDetailInterface;
    ledgers?: LedgerInterface[];
}

export default class DashboardPage extends React.Component<
{},
DashboardState
> {
    dashboardService = new DashboardService();

    constructor(props: {}) {
        super(props);

        this.state = {
            selectedLedger: {},
            ledgers: []
        };

        this.saveLedger = this.saveLedger.bind(this);
        this.getLedgers = this.getLedgers.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    componentDidMount(): void {
        this.getLedgers();
    }

    getLedgers() {
        this.dashboardService.getLedgers().then(ledgers => {
            this.setState({ ledgers: ledgers });
            const selectedLedger = getLatestLedger(ledgers);
            if (selectedLedger) {
                this.updateSelectedLedger(selectedLedger.id);
            }
        });
    }

    updateSelectedLedger(id: number) {
        this.dashboardService.getLedgerDetail(id).then(ledger => {
            this.setState({ selectedLedger: ledger });
        });
    }

    selectChange(event: any) {
        const ledgerId = parseInt(event.target.value, 10);
        this.updateSelectedLedger(ledgerId);
    }

    saveLedger(payload: LedgerRequest): void {
        this.dashboardService.saveLedger(payload).then((ledger: LedgerDetailInterface) => {
            this.setState({ selectedLedger: ledger });
            this.getLedgers();
        });
    }

    render() {
        return (
            <div className="overview-wrapper">
                <div className="overview container-fluid">
                    <div className="sl-padding row">
                        <div className="col-3">
                            <h3>Overview</h3>
                        </div>
                        <div className="col-9 ledger-section">
                            <div className="ledger-section-select">
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control
                                        as="select"
                                        onChange={this.selectChange}
                                        value={this.state.selectedLedger?.ledger?.id.toString()}
                                    >
                                        {this.state.ledgers?.map((ledger, index) => (
                                            <option value={ledger.id} key={index}>
                                                {ledger.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div>
                                <CreateLedger saveLedger={this.saveLedger} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                  Ledger: {this.state.selectedLedger?.ledger?.name}
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                  LedgerAccounts:{' '}
                                    <strong>{this.state.selectedLedger?.accounts?.length}</strong>
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                  Credit: <strong>1000</strong>
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                  Credit: <strong>1000</strong>
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>

                    <div>
                        <div className="sl-padding row">
                            <div className="col-3">
                                <h4>Transactions</h4>
                            </div>
                            <div className="col-9 ledger-section">
                                <Button variant="primary">New Transaction</Button>
                            </div>
                        </div>

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
        );
    }
}
