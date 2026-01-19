'use client'

import { Button, Container, Table, Form } from 'react-bootstrap'
import Head from 'next/head'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import axios from 'axios'
import ShowErrorModal from '../module/modal.js'

function FormSearchByCode() {
  const [code, setCode] = useState('')
  const [datas, setDatas] = useState([])
  const [showError, setShowError] = useState('Waiting Data')

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah data per halaman

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios.get(`${process.env.api}/unit/code/${code}`)
      .then((res) => {
        const responseData = res.data;
        if (Array.isArray(responseData)) {
          setDatas(responseData);
          setShowError('');
        } else {
          setDatas([]);
          setShowError(responseData.error || 'No data found');
        }
        setCurrentPage(1);
      })
      .catch((error) => {
        setShow(true);
        setShowError(error)
      });
    setCode('');
  };

  const handleOnDeleteId = (e) => {
    const id = e.target.value;
    alert(`Delete Success ID ${id}`);
    axios.delete(`${process.env.api}/api/scan/${id}`).then((res) => {
      console.log(res);
    });
  };

  // Hitung indeks awal dan akhir data yang akan ditampilkan
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = datas.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(datas.length / itemsPerPage);

  return (
    <>
      <ShowErrorModal handleClose={handleClose} show={show} header={'Need Attention'} message={'Connection Error'} />
      <Form onSubmit={handleOnSubmit} autoComplete='off'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control required size='lg' type="text" placeholder="Code Unit" onChange={(e) => setCode(e.target.value)} value={code} />
        </Form.Group>
        <Button type='submit' variant='primary' size='lg'>Submit</Button><br /><br />
      </Form>

      {/* Pagination Controls */}
      {datas.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="mx-3">Page {currentPage} of {totalPages}</span>

          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <br />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>D</th>
            <th>ID</th>
            <th>Code</th>
            <th>ID Order</th>
            <th>ID Customer</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentData) && currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr key={index}>
                <td><Button type='submit' variant='danger' onClick={handleOnDeleteId} value={item.id}>D</Button></td>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td><a target='blank' href={`${process.env.bookingorder}/pemesanan/single/${item.idorder}`}>{item.idorder}</a></td>
                <td><a target='blank' href={`${process.env.bookingorder}/pelanggan/single/${item.idpel}`}>{item.idpel}</a></td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>{item.notes}</td>
                <td>{item.updated_at ? moment(item.updated_at).format("dddd, DD MMMM YYYY - HH:mm:ss") : ''}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={10}>{showError}</td></tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default FormSearchByCode;
