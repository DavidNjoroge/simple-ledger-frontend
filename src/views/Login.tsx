import * as React from 'react';
import LoginForm from "../auth/LoginForm"
import { Card } from 'react-bootstrap';
import "./Login.css"

export interface ILoginProps {
}

export default class Login extends React.Component<ILoginProps, any> {
    render() {
    return (
      <div className="container login-page">
        <Card>
          <Card.Body>
            <LoginForm />

          </Card.Body>
        </Card>

      </div>
    );
  }
}
