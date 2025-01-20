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
      <h1>Scan QR Code Unit - Rental Barata Jaya</h1><hr />
    </>
  )
}


function App() {
  return (
    <>
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
    </>
  )
}

export default App