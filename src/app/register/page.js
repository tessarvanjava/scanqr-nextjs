'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Form, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import crypto from 'crypto'
import axios from 'axios';
import token from '../../app/scan/module/token.js'

function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  // const router = useRouter()
  const url = `${process.env.api}/api/register`

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios.post(url,
      { data: { username, password, role } }, { headers: { sign: token } }
    ).then((res) => {
      console.log(res)
      if (res.data.status == false) {
        alert(res.data.message)
      } else {
        alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Register</h1><hr />
            <Form onSubmit={handleOnSubmit}>
              <Form.Label htmlFor="inputPassword5">Username</Form.Label>
              <Form.Control autoComplete='off' name='username' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Username
              </Form.Text><br />
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control autoComplete='off' name='password' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
              <Form.Text id="passwordHelpBlock" muted>
                Enter Your Password
              </Form.Text>
              <Form.Group controlId="formBasicSelect" className="mt-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Select onChange={(e) => setRole(e.target.value)} defaultValue="" required>
                  <option value="">Choose...</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <br /><br />
              <Button variant='primary' type='submit'>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Page;