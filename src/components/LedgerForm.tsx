
import * as React from 'react';


export interface IReusableFormProps {

    submitForm: any
}


export interface IReusableFormState {
    value?: any,
    name?: string,
    description?: string
}

export default class LedgerForm extends React.Component<IReusableFormProps, IReusableFormState> {
    constructor(props: IReusableFormProps) {
        super(props);

        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        let form = event.target.name;
        let state: any = {};
        state[form] = event.target.value;

        this.setState(state);
    }

    handleSubmit(event: any) {
        this.props.submitForm(this.state);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={this.state.value} name="name" onChange={this.handleChange} type="text" className="form-control" id="name" placeholder="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input value={this.state.value} name="description" onChange={this.handleChange} type="text" className="form-control" id="description" placeholder="description" />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
