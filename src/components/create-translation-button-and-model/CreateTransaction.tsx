import * as React from 'react';
import {LedgerRequest} from "../create-ledger-button-and-modal/CreateLedger";
import {Button, Modal} from "react-bootstrap";

export interface CreateTransactionProps {
    saveTransaction: any
}

export interface CreateTransactionState {
    show: boolean
}

export default class CreateTransaction extends React.Component<CreateTransactionProps, CreateTransactionState> {
    constructor(props: CreateTransactionProps) {
        super(props);
        this.state = {
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.saveTransactionToBackend = this.saveTransactionToBackend.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
        this.setState({show: true})
    }

    handleClose() {
        this.setState({show: false})
    }

    saveTransactionToBackend(payload: LedgerRequest) {
        this.props.saveTransaction(payload);
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

                        {/*<LedgerForm submitForm={this.saveTransactionToBackend}/>*/}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
