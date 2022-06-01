import React, { useEffect, useState } from 'react';

import {
  Form,
  Button,
  Col
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

export default function Signup() {
  
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const [validated, setValidated] = useState(false);
  
  // useEffect(() => {
  //   const pw = document.querySelector('#formPassword');
  //   const pwConfirm = document.querySelector('#formConfirmPassword');

  //   pw.onChange = confirmPassword();
  //   pwConfirm.onKeyUp = confirmPassword();

  //   function confirmPassword() {
  //     if (pw.value !== pwConfirm.value) {
  //       setPWMatch('not a match');
  //       return;
  //     }
  //     setPWMatch('passwords match')
  //   }
  // }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setValidated(true);
    
    const {username, password, confirmPassword, email} = signupFormData;

    if (password !== confirmPassword) {
      console.log('not a match');
      return;
    }

    try {

      const { data } = await addUser({
        variables: { 
          username,
          email,
          password
        },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      console.log(`data: ${data}`);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }

    setSignupFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  return (
    <Col>
      <Form 
        className="login-form"
        onSubmit={handleFormSubmit}
        noValidate
        validated={validated}
      >
        <h3 className='text-center'>Sign Up</h3>
        <Form.Group className="mb-3" controlId="formUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleInputChange}
            name="username"
            value={signupFormData.username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
            name="email"
            value={signupFormData.email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            name="password"
            value={signupFormData.password}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={handleInputChange}
            name="confirmPassword"
            value={signupFormData.confirmPassword}
            pattern={signupFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Passwords don't match
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
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