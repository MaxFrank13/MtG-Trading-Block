import React, { useState } from 'react';

import {
  Form,
  Button,
  Col
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export default function Login() {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    
    try {

      const { data } = await loginUser({
        variables: { ...loginFormData }
      });

      
      if (!data) {
        throw new Error('something went wrong!');
      }
      
      Auth.login(data.loginUser.token);
      console.log('data was good');
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    };

    console.log('submitting');
    setLoginFormData({
      email: '',
      password: '',
    });
  }

  return (
      <Col>
        <Form 
          className="login-form"
          onSubmit={handleLoginSubmit}
          noValidate
          validated={validated}
        >
          <h3 className='text-center'>Login</h3>
          <Form.Group className="mb-3" controlId="formEmailLogin">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange={handleInputChange}
              name="email"
              value={loginFormData.email}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPasswordLogin">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"
              onChange={handleInputChange} 
              name="password"
              value={loginFormData.password}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit"
          >
            Submit
          </Button>
        </Form>
        {error && (
      <div className="my-3 p-3 bg-danger text-white">
        {error.message}
      </div>
      )}
      </Col>
  )
}