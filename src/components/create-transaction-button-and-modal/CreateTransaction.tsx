import * as React from 'react';
import {Button, Modal} from "react-bootstrap";
import TransactionForm from "./TransactionForm";
import  {AccountInterface, LedgerDetailInterface} from "../../shared/interfaces/LedgerInterface";
import {DashboardService} from "../../api";

export interface CreateTransactionProps {
    saveTransaction: (data: TransactionRequest) => void
    accounts?: AccountInterface[]
    selectedLedger?: LedgerDetailInterface
}

export interface CreateTransactionState {
    show: boolean
    searchedAccounts?: AccountInterface[];
    selectedAccount?: AccountInterface;
}

export interface TransactionRequest {
    referenceNumber?: string
    account: number
    amount: string
}

export default class CreateTransaction extends React.Component<CreateTransactionProps, CreateTransactionState> {
    dashboardService = new DashboardService();

    constructor(props: CreateTransactionProps) {
        super(props);
        this.state = {
            show: false
        };
        this.saveTransactionToBackend = this.saveTransactionToBackend.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.autoCompleteInput = this.autoCompleteInput.bind(this);
        this.selectAccount = this.selectAccount.bind(this);
    }

    handleShow(): void {
        this.setState({show: true})
    }

    handleClose(): void {
        this.setState({show: false})
    }

    saveTransactionToBackend(payload: TransactionRequest): void {
        this.props.saveTransaction(payload);
        console.log(payload);
        this.setState({show: false})
    }

    autoCompleteInput(event: any): void {
        const textInput = event.target.value;
        const state = this.state
        const selectedLedger: LedgerDetailInterface | undefined = this.props.selectedLedger;
        if (textInput.length > 2 && selectedLedger) {
            this.dashboardService.searchAccounts(selectedLedger.ledger.id, textInput).then(searchedAccounts => {
                this.setState({...state, searchedAccounts: searchedAccounts })
            })
        }
    }

    selectAccount(event: any): void {
        const accountId = event.target.value
        const state = this.state
        const account = this.state.searchedAccounts?.find(account => account.id === parseInt(accountId, 10))
        console.log(account)
        this.setState({...state, selectedAccount: account})
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Create Transaction
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <div>Create New Transaction</div>
                    </Modal.Header>
                    <Modal.Body>
                        <TransactionForm selectedAccount={this.state.selectedAccount} selectAccount={this.selectAccount} autoCompleteInput={this.autoCompleteInput} accounts={this.state.searchedAccounts} submitForm={this.saveTransactionToBackend}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
