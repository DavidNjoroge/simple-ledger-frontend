import React from 'react';
import './DashboardPage.css';
import LedgerInterface, {
    AccountInterface,
    LedgerDetailInterface
} from '../shared/interfaces/LedgerInterface';
import { Form} from 'react-bootstrap';
import { DashboardService } from '../api';
import CreateLedger, {
    LedgerRequest
} from '../components/create-ledger-button-and-modal/CreateLedger';
import { getLatestLedger } from '../shared/helpers/ledger';
import CreateTransaction, {TransactionRequest} from "../components/create-transaction-button-and-modal/CreateTransaction";
import TransactionTable from "../components/transaction-table/TransactionTable";
import LedgerOverview from "../components/ledger-overview/LedgerOverview";

export interface DashboardState {
    selectedLedger?: LedgerDetailInterface;
    ledgers?: LedgerInterface[];
    searchedAccounts?: AccountInterface[];
    selectedAccount?: AccountInterface;
}

export default class DashboardPage extends React.Component<
{},
DashboardState
> {
    dashboardService = new DashboardService();

    constructor(props: {}) {
        super(props);

        this.state = {
            ledgers: [],
        };

        this.saveLedger = this.saveLedger.bind(this);
        this.saveTransaction = this.saveTransaction.bind(this);
        this.getLedgers = this.getLedgers.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.autoCompleteInput = this.autoCompleteInput.bind(this);
        this.selectAccount = this.selectAccount.bind(this);
    }

    componentDidMount(): void {
        this.getLedgers();
    }

    selectAccount(event: any): void {
        const accountId = event.target.value
        const account = this.state.searchedAccounts?.find(account => account.id === parseInt(accountId, 10))
        this.setState({selectedAccount: account})
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

    autoCompleteInput(event: any): void {
        const textInput = event.target.value;
        const selectedLedger: LedgerDetailInterface | undefined = this.state.selectedLedger;
        if (textInput.length > 2 && selectedLedger) {
            this.dashboardService.searchAccounts(selectedLedger.ledger.id, textInput).then(searchedAccounts => {
                this.setState({ searchedAccounts: searchedAccounts })
            })
        }
    }

    saveLedger(payload: LedgerRequest): void {
        const state = this.state;
        this.dashboardService.saveLedger(payload).then((ledger: LedgerDetailInterface) => {
            this.setState({ ...state, selectedLedger: ledger });
            this.getLedgers();
        });
    }


    saveTransaction(payload: TransactionRequest): void {
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
                        <div className="col-9 ledger-section padding-left--sm">
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
                    <div className="row">
                        <div className="col-3">
                            <LedgerOverview selectedLedger={this.state.selectedLedger}/>
                        </div>

                        <div className="col-3">
                        </div>


                    </div>


                    <div>
                        <div className="sl-padding row">
                            <div className="col-3">
                                <h4>Transactions</h4>
                            </div>
                            <div className="col-9 ledger-section padding-left--sm">
                                <CreateTransaction selectedLedger={this.state.selectedLedger} accounts={this.state.searchedAccounts} saveTransaction={this.saveTransaction} />
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
