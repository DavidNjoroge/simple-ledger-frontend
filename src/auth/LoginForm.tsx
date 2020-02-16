

import * as React from 'react';
import { Form, Button } from 'react-bootstrap';


export interface LoginFormProps {
    submitForm: any
}

export interface LoginFormState {
    value?: any
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);

        this.state = {
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event: any) {
        const form = event.target.name;
        const state: any = {};
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
