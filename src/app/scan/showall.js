'use client'

import { Button, Container, Table, Form, Alert } from 'react-bootstrap'
import Head from 'next/head'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Loading from './loading.js'
import axios from 'axios'

function AlertDelete() {
  const variant = 'warning'
  return (
    <Alert key={variant} variant={variant}>
      Delete Success id
    </Alert>
  )
}

function ShowAll() {
  // const fetcher = (...args) => fetch(...args).then(res => res.json())
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `${process.env.api}/unit`
  const { data, isError, isLoading } = useSWR(url, fetcher, {
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

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Show All</h1>
      <Button size='lg' type='submit' onClick={() => mutate(`${process.env.api}/unit`)}>Refresh Data</Button><br />
      <hr />
      {isLoading ? <Loading /> :
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><center>X</center></th>
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
                  <td><Button type='submit' variant='danger' onClick={handleOnDeleteId} value={item.id}>Delete</Button></td>
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
            }) : <tr><td colSpan={9}><Loading /></td></tr>}
          </tbody>
        </Table>}
    </>
  )
}

export default ShowAll