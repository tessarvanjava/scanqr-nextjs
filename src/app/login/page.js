'use client'

import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';

function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const cookies = useCookies();

  const AlertLogin = () => <Alert variant="danger">Username Or Password Is Incorect</Alert>

  const handleOnSubmit = (e) => {
    console.log(password)
    e.preventDefault()
    if (username === process.env.username && password === process.env.password) {
      cookies.set('username', username)
      cookies.set('password', password)
      router.back()
    } else {
      alert('Username Or Password Is Incorect')
    }
  }

  const handleRemoveCookies = () => {
    cookies.remove('username')
    cookies.remove('password')
    alert('Cookies Has Been Removed')
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleOnSubmit}>
              <Form.Label htmlFor="inputPassword5">Username</Form.Label>
              <Form.Control type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Username
              </Form.Text><br />
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Password
              </Form.Text><br /><br />
              <Button variant='primary' type='submit'>Submit</Button>
              <Button variant='primary' onClick={handleRemoveCookies}>Remove Cookies</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Page;