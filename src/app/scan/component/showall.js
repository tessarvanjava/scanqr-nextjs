'use client'

import { Button, Container, Table, Form, Alert } from 'react-bootstrap'
import Head from 'next/head'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Loading from '../module/loading.js'
import axios from 'axios'
import UpdateNotes from '../component/updatenotes.js'

function AlertDelete() {
  const variant = 'warning'
  return (
    <Alert key={variant} variant={variant}>
      Delete Success id
    </Alert>
  )
}

function ShowAll() {

  // Start Of Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // End Of Modal

  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `${process.env.api}/unit`
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
    // refreshInterval: 3000  
  })

  const handleOnDeleteId = (e) => {
    const id = e.target.value
    alert(`Delete Success ID ${id}`)
    axios.delete(`${process.env.api}/api/scan/${id}`).then((res) => {
      console.log(res)
    })
  }

  if (error) return <Alert variant="danger">Gagal memuat data</Alert>
  if (!data) return <Loading />

  const handleOnClick = () =>{
    mutate(`${process.env.api}/unit`)
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Show All</h1>
      <UpdateNotes show={show} handleClose={handleClose} handleShow={handleShow} buttonTitle={'Update'} />
      <Button size='md' type='submit' onClick={handleOnClick}>Refresh Data</Button><br />
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th><center>D</center></th>
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
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td><center><Button type='submit' variant='danger' onClick={handleOnDeleteId} value={item.id}>Delete</Button></center></td>
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
          })}
        </tbody>
      </Table>
    </>
  )
}

export default ShowAll