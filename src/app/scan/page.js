'use client'

import { Button, Container } from 'react-bootstrap'
import Head from 'next/head'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ShowAll from './showall.js'
import ScanIdCustomer from './idcustomer.js'
import FormSearchByCode from './code.js'
import SendPost from './posts.js'
import FormSearchByIdOrder from './idorder.js'
import TableOrder from '../order/order.js'

function Heading() {
  return (
    <>
      <h1>Scan QR Code Unit - Rental Barata Jaya</h1>
      <Button href={`${process.env.host}`} variant='warning'>Booking Order</Button>
      <hr />
    </>
  )
}

function App() {
  return (
    <div>
      <Container fluid>
        <Heading />
        <TableOrder />
        <hr />
        <SendPost />
        <hr />
        <FormSearchByIdOrder />
        <hr />
        <FormSearchByCode />
        <hr />
        <ScanIdCustomer />
        <hr />
        <ShowAll />
        <hr />
      </Container >
    </div>
  )
}

export default App