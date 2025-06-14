'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import axios from 'axios'
import ShowErrorModal from '../module/modal.js'

function FormSearchByIdOrder() {
  const [idorder, setIdOrder] = useState('')
  const [datas, setDatas] = useState([])
  const [showError, setShowError] = useState('Waiting Data')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios.get(`${process.env.api}/unit/idorder/${idorder}`)
      .then((res) => {
        setDatas(res.data)
        setShowError(res.data.error)
      })
      .catch((error) => {
        setShow(true)
      })
    setIdOrder('')
  }

  const handleOnDeleteId = (e) => {
    const id = e.target.value
    alert(`Delete Success ID ${id}`)
    axios.delete(`${process.env.api}/api/scan/${id}`).then((res) => {
      console.log(res)
    })
  }

  return (
    <>
      <ShowErrorModal handleClose={handleClose} show={show} header={'Need Attention'} message={'Connection Error'} />
      <Form onSubmit={handleOnSubmit} autoComplete='off'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control required size='lg' type="text" placeholder="ID Order" onChange={(e) => setIdOrder(e.target.value)} value={idorder} />
        </Form.Group>
        {/* <Form.Text muted>{showError}</Form.Text><br /> */}
        <Button type='submit' variant='primary' size='lg'>Submit</Button><br /><br />
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>D</th>
            <th>ID</th>
            <th>Code</th>
            <th>ID Order</th>
            <th>ID Customer</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {datas.length >= 1 ? datas.map((item, index) => {
            return (
              <tr key={index}>
                <td><Button type='submit' variant='danger' onClick={handleOnDeleteId} value={item.id}>D</Button></td>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td><a target='blank' href={`${process.env.bookingorder}/pemesanan/single/${item.idorder}`}>{item.idorder}</a></td>
                <td><a target='blank' href={`${process.env.bookingorder}/pelanggan/single/${item.idpel}`}>{item.idpel}</a></td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>{item.notes}</td>
                <td>{item.updated_at ? moment(item.updated_at).format("dddd, DD MMMM YYYY - HH:mm:ss") : ''}</td>
              </tr>
            )
          }) : <tr><td colSpan={9}>{showError}</td></tr>}
        </tbody>
      </Table>
    </>
  )
}

export default FormSearchByIdOrder