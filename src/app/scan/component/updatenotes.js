'use client'

import { Button, Container, Table, Form, Modal } from 'react-bootstrap'
import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'


function FormUpdateNotes() {
  const [showError, setShowError] = useState('')
  const [notes, setNotes] = useState('')
  const [id, setId] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    axios.patch(`${process.env.api}/api/scan/`, {
      /* axios.patch(`http://192.168.224.172:4000/api/scan/`, { */
      data: {
        id, notes
      }
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error)
      });
    setId('')
    setNotes('')
  }

  return (
    <>
      <Form onSubmit={handleOnSubmit} encType="application/x-www-form-urlencoded" autoComplete='off'>
        <Form.Group className="mb-3">
          <Form.Control required size='lg' type="text" placeholder="ID" name='id' onChange={(e) => setId(e.target.value)} value={id} /><br />
          <Form.Control required size='lg' as="textarea" rows={5} placeholder="Notes" name='notes' onChange={(e) => setNotes(e.target.value)} value={notes} /><br />
          <Form.Text muted>{showError}</Form.Text>
          <Button size='lg' variant="primary" type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </>
  )
}


function UpdateNotes({ handleShow, handleClose, show, buttonTitle }) {

  return (
    <>
      <Button variant="primary" size='md' onClick={handleShow}>
        {buttonTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Notes By Id</Modal.Title>
        </Modal.Header>
        <Modal.Body><FormUpdateNotes /></Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateNotes