'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ShowAll from './showall.js'
import ScanIdCustomer from './idcustomer.js'
import ScanCode from './code.js'

function Title() {
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
        <Title />
        <ScanCode />
        <hr/>
        <ScanIdCustomer />
        <hr/>
        <ShowAll />
      </Container >
    </>
  )
}

export default App