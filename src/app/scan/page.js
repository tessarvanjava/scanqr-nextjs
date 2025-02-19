'use client'

import { Button, Container, Modal } from 'react-bootstrap'
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
import FormSearchByIdCustomer from './component/idcustomer.js'

function ModalScanCode({ showCode, setShowCode }) {
  return (
    <>
      <Modal
        show={showCode}
        onHide={() => setShowCode(false)}
        dialogClassName="modal-300w"
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Scan Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSearchByCode />
        </Modal.Body>
      </Modal>
    </>
  );
}

function ModalIdOrder({ showOrder, setShowOrder }) {
  return (
    <>
      <Modal
        show={showOrder}
        onHide={() => setShowOrder(false)}
        dialogClassName="modal-300w"
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Scan Id Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSearchByIdOrder />
        </Modal.Body>
      </Modal>
    </>
  );
}


function ModalIdCustomer({ showCustomer, setShowCustomer }) {
  return (
    <>
      <Modal
        show={showCustomer}
        onHide={() => setShowCustomer(false)}
        dialogClassName="modal-300w"
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Scan Id Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSearchByIdCustomer />
        </Modal.Body>
      </Modal>
    </>
  );
}


function ModalScanQrcode({ showScanQrCode, setShowScanQrCode }) {
  return (
    <>
      <Modal
        show={showScanQrCode}
        onHide={() => setShowScanQrCode(false)}
        dialogClassName="modal-300w"
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Scan Id Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense>
            <SendPost />
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}

function Heading() {
  const [showCode, setShowCode] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showScanQrCode, setShowScanQrCode] = useState(false);
  return (
    <>
      <h1>Scan QR Code Unit - Rental Barata Jaya</h1>
      <Button href={`${process.env.bookingorder}`} variant='primary'>Booking Order</Button>
      <Button variant='warning' onClick={() => setShowCode(true)}>Scan Code</Button>
      <Button variant='warning' onClick={() => setShowOrder(true)}>Scan ID Order</Button>
      <Button variant='warning' onClick={() => setShowCustomer(true)}>Scan ID Customer</Button>
      <Button variant='warning' onClick={() => setShowScanQrCode(true)}>Scan QrCode</Button>
      <hr />

      <ModalScanCode showCode={showCode} setShowCode={() => setShowCode(false)} />
      <ModalIdOrder showOrder={showOrder} setShowOrder={() => setShowOrder(false)} />
      <ModalIdCustomer showCustomer={showCustomer} setShowCustomer={() => setShowCustomer(false)} />
      <ModalScanQrcode showScanQrCode={showScanQrCode} setShowScanQrCode={() => setShowScanQrCode(false)} />
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
        <ShowAll />
        <hr />
      </Container >
    </div>
  )
}

export default App