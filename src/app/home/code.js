'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Loading from './loading.js'
import Error from './error.js'

const host = 'http://192.168.1.15'

function FormSearchByCode({ handleOnClick, handleOnChange, idcustomer }) {
  return (
    <>
      <h4>Scan Code Unit</h4>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label>ID Customer</Form.Label> */}
          <Form.Control size='lg' type="text" placeholder="Enter Code Unit" onChange={handleOnChange} value={idcustomer} />
          {/* <Form.Text className="text-muted">
            Search by Id Customers
          </Form.Text><br /> */}
          {/* <Button variant="primary" type="submit" onClick={handleOnClick}>Submit</Button> */}
        </Form.Group>
      </Form>
      {/* <h1>{idcustomer}</h1> */}
    </>
  )
}

function TableScanCode({ id }) {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `${host}:4000/unit/code/${id}` // by id customer
  // const url = '${host}/unit/' // show all unit
  const { data, isError, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
    // refreshInterval: 3000
  })

  return (
    <>
      {isLoading ? <Loading /> :
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>ID Order</th>
              <th>ID Customer</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.idorder}</td>
                  <td>{item.idpel}</td>
                  <td>{item.nama}</td>
                  <td>{item.status}</td>
                  <td>{item.notes}</td>
                  <td>{moment(item.created_at).format("dddd, LL")}</td>
                  <td>{item.updated_at ? moment(item.updated_at).format("dddd, LL") : ''}</td>
                </tr>
              )
            }) : "Still Waiting"}
          </tbody>
        </Table>}
    </>
  )
}

function ScanCode() {
  const [idcustomer, setIdcustomer] = useState('0')

  function handleOnClick(e) {
    alert('Done')
  }

  function handleOnChange(e) {
    setIdcustomer(e.target.value)
  }

  return (
    <>
      <FormSearchByCode handleOnClick={handleOnClick} idcustomer={idcustomer} handleOnChange={handleOnChange} />
      <TableScanCode id={idcustomer} />
    </>
  )
}

export default ScanCode