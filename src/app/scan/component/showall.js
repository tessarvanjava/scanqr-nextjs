'use client'

import { Button, Container, Table, Form, Alert, Pagination } from 'react-bootstrap'
import Head from 'next/head'
import useSWR, { mutate } from 'swr'
import { useState } from 'react'
import moment from 'moment'
import 'moment/locale/id'
import Loading from '../module/loading.js'
import axios from 'axios'
import UpdateNotes from '../component/updatenotes.js'

function ShowAll() {
  const [showModal, setShowModal] = useState(false);

  // State untuk halaman aktif
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data dengan SWR
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `${process.env.api}/unit`
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
  });

  if (error) return <Alert variant="danger">Gagal memuat data</Alert>
  if (!data) return <Loading />

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Ambil data berdasarkan halaman aktif
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk mengganti halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOnDeleteId = (e) => {
    const id = e.target.value
    axios.delete(`${process.env.api}/api/scan/${id}`).then((res) => {
      console.log("Success Delete")
    }).catch((err) => {
      alert("Failed To Delete")
    })

    axios.get(`${process.env.api}/unit`).then((res) => {
      console.log("Success Fetch")
    }).catch((err) => {
      console.log(err)
    })
    alert(`Delete Success ID ${id}`)
  }

  const handleOnClick = () => {
    mutate(`${process.env.api}/unit`)
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Show All</h1>
      <UpdateNotes show={showModal} handleClose={() => setShowModal(false)} handleShow={() => setShowModal(true)} buttonTitle={'Update'} />
      <Button size='md' type='submit' onClick={handleOnClick}>Refresh Data</Button><br />
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th><center>D</center></th>
            <th>ID</th>
            <th>Code</th>
            <th>ID Order</th>
            <th>ID Customer</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td><center><Button type='submit' variant='danger' onClick={handleOnDeleteId} value={item.id}>Delete</Button></center></td>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td><a target='blank' href={`${process.env.bookingorder}/pemesanan/${item.idorder}`}>{item.idorder}</a></td>
              <td><a target='blank' href={`${process.env.bookingorder}/pelanggan/${item.idpel}`}>{item.idpel}</a></td>
              <td>{item.nama}</td>
              <td>{item.status}</td>
              <td>{item.notes}</td>
              <td>{moment(item.created_at).format("dddd, DD MMMM YYYY - HH:mm:ss")}</td>
              <td>{item.updated_at ? moment(item.updated_at).format("dddd, DD MMMM YYYY - HH:mm:ss") : ''}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  )
}

export default ShowAll;