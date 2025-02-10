'use client'

import { Button, Container } from 'react-bootstrap'
import Head from 'next/head'
import { useState, Suspense, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import ShowAll from './component/showall.js'
import ScanIdCustomer from './component/idcustomer.js'
import FormSearchByCode from './component/code.js'
import SendPost from './component/posts.js'
import FormSearchByIdOrder from './component/idorder.js'
import TableOrder from './component/order.js'
import { hasCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { headers } from 'next/headers.js'

function Heading() {
  return (
    <>
      <h1>Scan QR Code Unit - Rental Barata Jaya</h1>
      <Button href={`${process.env.bookingorder}`} variant='warning'>Booking Order</Button>
      <hr />
    </>
  )
}

function App() {
  const router = useRouter()
  const valueUserCookie = getCookie('user')
  useEffect(() => {
    axios.post(`${process.env.api}/api/checkcookie`, {
      headers: valueUserCookie
    }).then((res) => {
      if (res.data.status === 'Success') {
        console.log('Welcome To Scanning Webpage Rental Barata Jaya')
      }
    }).catch(() => router.push('/login'))
  }, [router])

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