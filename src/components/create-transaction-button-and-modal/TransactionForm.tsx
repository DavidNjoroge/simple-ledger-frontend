import * as React from 'react';
import {AccountInterface} from "../../shared/interfaces/LedgerInterface";
import AutoCompleteInput from "../auto-complete-input/AutoCompleteInput";


export interface TransactionFormProps {
    submitForm: any
    accounts?: AccountInterface[]
    searchedAccounts?: AccountInterface[];
    selectedAccount?: AccountInterface;
    autoCompleteInput: any;
    selectAccount: any;
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
        this.selectAccount = this.selectAccount.bind(this);
    }

    selectAccount(account: any) {
        console.log(account)
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

                    <AutoCompleteInput selectedAccount={this.props.selectedAccount} searchedAccounts={this.props.accounts} autoCompleteInput={this.props.autoCompleteInput} selectAccount={this.props.selectAccount}/>

                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" onChange={this.handleChange} className="form-control" id="description" placeholder="description"/>

                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="referenceNumber">Reference Number</label>
                        <input name="referenceNumber" onChange={this.handleChange} type="text" className="form-control" id="referenceNumber" placeholder="Reference Number" required />
                    </div>
                    <div className="col">
                        <label htmlFor="amount">Amount</label>
                        <input name="amount" onChange={this.handleChange} type="number" className="form-control" id="amount" placeholder="amount" required />
                    </div>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
