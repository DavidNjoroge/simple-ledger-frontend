

import * as React from 'react';
import { Form, Button } from 'react-bootstrap';


export interface ILoginFormProps {
    submitForm: any
}

export interface ILoginFormState {
    value?: any
}

export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);

        this.state = {
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event: any) {
        let form = event.target.name;
        let state: any = {};
        state[form] = event.target.value;

        this.setState(state);
    }

    handleSubmit(event: any) {
        console.log('A name was submitted: ', this.state);
        this.props.submitForm(this.state)
        event.preventDefault();
    }

  public render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange} required/>
            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required/>
        </Form.Group>
        <Button variant="primary" type="submit" value="Submit" >
            Submit
        </Button>
    </form>
    );
  }
}
