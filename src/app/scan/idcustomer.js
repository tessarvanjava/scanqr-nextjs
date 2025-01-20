'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import axios from 'axios'

function FormSearchByIdCustomer() {
  const [idcustomer, setIdcustomer] = useState('')
  const [datas, setDatas] = useState([])

  const handleOnSbumit = (e) => {
    e.preventDefault()
    axios.get(`${process.env.api}/unit/idpel/${idcustomer}`)
      .then((res) => setDatas(res.data))
      .catch((error) => {
        if (error) {
          console.log(error)
        }
      })
    setIdcustomer('')
  }

  return (
    <>
      <h4>Scan ID Customer</h4>
      <Form onSubmit={handleOnSbumit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control size='lg' type="text" placeholder="Enter ID Customer" onChange={(e) => setIdcustomer(e.target.value)} value={idcustomer} />
        </Form.Group>
        <Button type='submit' variant='primary'>Submit</Button><br /><br />
      </Form>

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
          {datas ? datas.map((item, index) => {
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
          }) : <tr><td colSpan={9}>Waiting Data</td></tr>}
        </tbody>
      </Table>
    </>
  )
}

export default FormSearchByIdCustomer