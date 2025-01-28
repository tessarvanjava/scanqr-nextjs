'use client'

import { Button, Container } from 'react-bootstrap'
import Head from 'next/head'
import { useState, Suspense } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ShowAll from './component/showall.js'
import ScanIdCustomer from './component/idcustomer.js'
import FormSearchByCode from './component/code.js'
import SendPost from './component/posts.js'
import FormSearchByIdOrder from './component/idorder.js'
import TableOrder from './component/order.js'


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
        <Suspense>
          <SendPost />
        </Suspense>
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