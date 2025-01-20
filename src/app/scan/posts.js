'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Loading from './loading.js'
import Error from './error.js'
import axios from 'axios'
import ScanIdCustomer from './idcustomer.js'
import axiosRetry from 'axios-retry'

function SendPost() {
  const [idorder, setIdorder] = useState('')
  const [idcustomer, setIdCustomer] = useState('')
  const [code, setCode] = useState('')
  const [showError,setShowError] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.host}:4000/api/scan/`, {
      data: {
        idorder, idcustomer, code
      }
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error);
        setShowError('Connection Error')
      });
    setCode('')
  }

  return (
    <>
      <h4>Scan QrCode</h4>
      <Form onSubmit={handleOnSubmit} encType="application/x-www-form-urlencoded">
        <Form.Group className="mb-3">
          <Form.Control size='lg' type="text" placeholder="Enter ID Order" name='idorder' onChange={(e) => setIdorder(e.target.value)} value={idorder} /><br />
          <Form.Control size='lg' type="text" placeholder="Enter ID Customer" name='idcustomer' onChange={(e) => setIdCustomer(e.target.value)} value={idcustomer} /><br />
          <Form.Control size='lg' type="text" placeholder="Code" name='code' onChange={(e) => setCode(e.target.value)} value={code} /><br />
          <Form.Text muted>{showError}</Form.Text><br />
          <Button variant="primary" type="submit">Submit</Button>
        </Form.Group>
      </Form>

    </>
  )
}

export default SendPost