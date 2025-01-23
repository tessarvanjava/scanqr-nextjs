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
import ShowErrorModal from './modal.js'
import { useSearchParams } from 'next/navigation'

function SendPost() {
  const params = useSearchParams()

  const [idorder, setIdorder] = useState(params.get('idorder') === null ? '' : params.get('idorder'))
  const [idcustomer, setIdCustomer] = useState(params.get('idcustomer') === null ? '' : params.get('idcustomer'))
  const [code, setCode] = useState('')
  const [showError,setShowError] = useState('')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.api}/api/scan/`, {
      data: {
        idorder, idcustomer, code
      }
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        setShow(true)
      });
    setCode('')
  }

  return (
    <>
      <ShowErrorModal handleClose={handleClose} show={show} />
      <h4>Scan QrCode</h4>
      <Form onSubmit={handleOnSubmit} encType="application/x-www-form-urlencoded">
        <Form.Group className="mb-3">
          <Form.Control required size='lg' type="text" placeholder="Enter ID Order" name='idorder' onChange={(e) => setIdorder(e.target.value)} value={idorder} /><br />
          <Form.Control required size='lg' type="text" placeholder="Enter ID Customer" name='idcustomer' onChange={(e) => setIdCustomer(e.target.value)} value={idcustomer} /><br />
          <Form.Control required size='lg' type="text" placeholder="Code" name='code' onChange={(e) => setCode(e.target.value)} value={code} /><br />
          <Form.Text muted>{showError}</Form.Text><br />
          <Button size='lg' variant="primary" type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default SendPost