'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ShowAll from './showall.js'
import ScanIdCustomer from './idcustomer.js'
import ScanCode from './code.js'
import SendPost from './posts.js'

function Heading() {
  return (
    <>
      <h1>Scan QR Code Unit - Rental Barata Jaya</h1>
      <Button href='http://192.168.0.15:3000' variant='warning'>Booking Order</Button>
      <hr />
    </>
  )
}


function App() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Container fluid>
        <Heading />
        <SendPost />
        <hr />
        <ScanCode />
        <hr />
        <ScanIdCustomer />
        <hr />
        <ShowAll />
      </Container >
    </div>
  )
}

export default App