import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

import {
  Row
} from 'react-bootstrap';

export default function Login() {

  return (
    <Row>
      <LoginForm />
      <SignupForm />
    </Row>
  )
}