import * as React from 'react';
import {Button, Modal} from "react-bootstrap";
import LedgerForm from "../LedgerForm";
import {DashboardService} from "../../api";

export interface ICreateLedgerProps {
    saveLedger: any
}

export interface ICreateLedgerState {
    show: boolean
}

export interface LedgerRequest {
    name: string

}

export default class CreateLedger extends React.Component<ICreateLedgerProps, ICreateLedgerState> {
    dashboardService: DashboardService = new DashboardService();

    constructor(props: ICreateLedgerProps) {
        super(props);
        this.state = {
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.saveLedgerToBackend = this.saveLedgerToBackend.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
        this.setState({show: true})

    }

    handleClose() {
        this.setState({show: false})

    }

    saveLedgerToBackend(payload: LedgerRequest) {
        this.props.saveLedger(payload);
        this.setState({show: false})
    }

    render(){
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Create Ledger
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Ledger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <LedgerForm submitForm={this.saveLedgerToBackend}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
