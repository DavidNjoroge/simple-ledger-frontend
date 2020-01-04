import * as React from 'react';
import {Button, Modal} from "react-bootstrap";
import TransactionForm from "./TransactionForm";
import {AccountInterface} from "../../shared/interfaces/LedgerInterface";

export interface CreateTransactionProps {
    saveTransaction: (data: TransactionRequest) => void
    accounts?: AccountInterface[]
}

export interface CreateTransactionState {
    show: boolean
}

export interface TransactionRequest {
    referenceNumber?: string
    account: number
    amount: string
}


export default class CreateTransaction extends React.Component<CreateTransactionProps, CreateTransactionState> {
    constructor(props: CreateTransactionProps) {
        super(props);
        this.state = {
            show: false
        };
        this.saveTransactionToBackend = this.saveTransactionToBackend.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
        this.setState({show: true})
    }

    handleClose() {
        this.setState({show: false})
    }

    saveTransactionToBackend(payload: TransactionRequest) {
        this.props.saveTransaction(payload);
        console.log(payload);
        this.setState({show: false})
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Create Transaction
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <TransactionForm accounts={this.props.accounts} submitForm={this.saveTransactionToBackend}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
