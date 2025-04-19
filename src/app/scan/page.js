'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import TableOrder from './component/order.js'
import ShowAll from './component/showall.js'
import axios from 'axios'

function App() {
  return (
    <div>
      <Container fluid>
        <TableOrder />
        <hr />
        <ShowAll />
        <hr />
      </Container >
    </div>
  )
}

export default App