import React from 'react';
import './DashboardPage.css';
import LedgerInterface, {
    LedgerDetailInterface
} from '../shared/interfaces/LedgerInterface';
import { Form } from 'react-bootstrap';
import { DashboardService } from '../api';
import CreateLedger, {
    LedgerRequest
} from '../components/create-ledger-button-and-modal/CreateLedger';
import { getLatestLedger } from '../shared/helpers/ledger';
import CreateTransaction from "../components/create-transaction-button-and-modal/CreateTransaction";
import TransactionTable from "../components/transaction-table/TransactionTable";
import LedgerOverview from "../components/ledger-overview/LedgerOverview";

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
            ledgers: []
        };

        this.saveLedger = this.saveLedger.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
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


    saveTransaction(payload: LedgerRequest): void {
        const ledgerDetail = this.state.selectedLedger;
        if (ledgerDetail) {
            this.dashboardService.saveTransaction(ledgerDetail.ledger.id, payload).then((ledger: LedgerDetailInterface) => {
                this.updateSelectedLedger(ledgerDetail.ledger.id);
            });
        }
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

                    <LedgerOverview selectedLedger={this.state.selectedLedger}/>

                    <div>
                        <div className="sl-padding row">
                            <div className="col-3">
                                <h4>Transactions</h4>
                            </div>
                            <div className="col-9 ledger-section">
                                <CreateTransaction accounts={this.state.selectedLedger?.accounts} saveTransaction={this.saveTransaction} />
                            </div>
                        </div>

                        {/*transaction table section*/}
                        <TransactionTable transactions={this.state.selectedLedger?.transactions} ledgerSummary={this.state.selectedLedger?.ledgerSummary}/>

                    </div>
                </div>
            </div>
        );
    }
}
