import * as React from 'react';
import LoginForm from "../auth/LoginForm"
import { Card } from 'react-bootstrap';
import "./Login.css"
import { LoginRequestInterface } from '../api';
import { AuthService } from "../services/AuthService";
import LoginResponse from '../shared/interfaces/LoginResponse';

export interface ILoginProps {
  history: any
}

export default class Login extends React.Component<ILoginProps, any> {
    authService = new AuthService()

    constructor(props: ILoginProps) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(loginRequest: LoginRequestInterface) {
      this.authService.login(loginRequest).then((response: LoginResponse) => {
        localStorage.clear()
        localStorage.setItem('userPrincipal', JSON.stringify(response.userPrincipal))
        localStorage.setItem('accessToken', response.accessToken)
        this.props.history.push('/');
      })


    }

    render() {
        return (
            <div className="container login-page">
                <Card>
                    <Card.Body>
                        <LoginForm submitForm={this.handleFormSubmit} />

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

