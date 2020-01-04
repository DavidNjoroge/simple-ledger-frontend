import * as React from 'react';
import {AccountInterface} from "../../shared/interfaces/LedgerInterface";


export interface TransactionFormProps {
    submitForm: any
    accounts?: AccountInterface[]
}


export interface TransactionFormState {
    name?: string,
    description?: string
    account?: string
}

export default class TransactionForm extends React.Component<TransactionFormProps, TransactionFormState> {
    constructor(props: TransactionFormProps) {
        super(props);

        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any): void {
        const form = event.target.name;
        const state: any = {};
        state[form] = event.target.value;

        this.setState(state);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.props.submitForm(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="accountSelect">Account</label>
                    <select name="account" onChange={this.handleChange} className="form-control"  id="accountSelect" required>
                        <option defaultChecked={true}></option>
                        {
                            this.props.accounts?.map((account, i) =>
                                <option value={account.id} key={i}>{account.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="referenceNumber">Reference Number</label>
                    <input name="referenceNumber" onChange={this.handleChange} type="text" className="form-control" id="referenceNumber" placeholder="Reference Number" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input name="description" onChange={this.handleChange} type="text" className="form-control" id="description" placeholder="description"/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input name="amount" onChange={this.handleChange} type="number" className="form-control" id="amount" placeholder="amount" required />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
