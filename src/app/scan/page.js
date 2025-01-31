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

import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation'

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
  const router = useRouter();

  useEffect(() => {
    // Ambil cookies di sisi klien
    const cookies = parseCookies();
    const username = cookies.username || null;
    const password = cookies.password || null;

    if (username === 'tessar' && password === 'maverick') {
      // Jika username kosong, redirect ke halaman login
      router.push('/scan'); // Ganti dengan path halaman login Anda
    } else {
      router.push('/login');
    }
  }, [router]);

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