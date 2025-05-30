'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import token from '../scan/module/token.js';

function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleOnSubmit = (e) => {
    e.preventDefault()

    axios.post(`${process.env.api}/api/login`, {
      data: { username, password }
    },
      { headers: { sign: token }, withCredentials: true }
    ).then((res) => {
      if (res.data === 'Success') {
        router.push('/scan')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  // Check Cookies
  useEffect(() => {
    axios.get(`${process.env.api}/api/get-cookie`, {
      withCredentials: true
    }).then((res) => {

      if (res.data.username) {
        router.push('/scan')
      } else {
        router.push('/login')
      }
    }).catch(() => router.push('/login'))
  }, [])


  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Login</h1><hr />
            <Form onSubmit={handleOnSubmit}>
              <Form.Label htmlFor="inputPassword5">Username</Form.Label>
              <Form.Control required type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Username
              </Form.Text><br />
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control required type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Password
              </Form.Text><br /><br />
              <Button variant='primary' type='submit'>Submit</Button>
              {/* <Button variant='primary' onClick={handleRemoveCookies}>Remove Cookies</Button> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Page;