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

const host = 'http://192.168.1.15'

function SendPost() {
  const [idorder, setIdorder] = useState('')
  const [idcustomer, setIdCustomer] = useState('')
  const [code, setCode] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
  }

  const clearTextInput = (e) => {
    // axiosRetry(axios,{retries:3})
    axios.post(`${host}:4000/api/scan/`, {
      data: {
        idorder, idcustomer, code
      }
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
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
          <Button variant="primary" type="submit" onClick={clearTextInput}>Submit</Button>
        </Form.Group>
      </Form>

    </>
  )
}

export default SendPost