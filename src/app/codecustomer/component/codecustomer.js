'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form, Alert } from 'react-bootstrap'
import useSWR, { mutate } from 'swr'
import moment from 'moment'
import 'moment/locale/id'
import axios from 'axios'
import { useSearchParams } from 'next/navigation.js'
import defaultCurrency from 'currency-formatter'
import { useEffect, useState } from 'react'

const fetcher = (url) => axios.get(url).then((res) => res.data.data)

const returnUnit = (a) => {
  return <span>{moment(a).format("dddd, LL")}</span>;
}

function currency(value) {
  return defaultCurrency.format(value, { locale: 'id-ID' });
}

function CodeCustomer() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [count, setCount] = useState();
  const [totalBayar, setTotalBayar] = useState();

  useEffect(() => {
    axios.get(`${process.env.api}/api/order/${id}`).then((res) => {
      setCount(res.data.count)
      setTotalBayar(res.data.total_bayar)
    })
  })

  const url = `${process.env.api}/api/order/${id}`;
  const { data, error } = useSWR(url, fetcher, { revalidateOnFocus: true });

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman

  if (error) return <Alert variant="danger">Gagal memuat data</Alert>;
  if (!data) return <h1><center>Waiting Data</center></h1>;

  // Hitung indeks awal dan akhir data yang akan ditampilkan
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      {/* <Button size='lg' type='submit' onClick={() => { mutate(); setCurrentPage(1); }}>Refresh Data</Button>
      <br /> */}
      <h2>Total Record : {count}</h2>
      <h2>Total Pembayaran : {currency(totalBayar)}</h2>
      <hr />

      <Table striped bordered hover responsive style={{ fontSize: 15 }}>
        <thead style={{ fontSize: 16, backgroundColor: "black", color: "white" }}>
          <tr >
            <th>ID Order</th>
            <th>Nama</th>
            <th>Unit</th>
            <th>Total</th>
            <th>Event</th>
            <th>Lokasi Kegiatan</th>
            <th>a.tgl</th>
            <th>a.jam</th>
            <th>k.tgl</th>
            <th>k.jam</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id_pemesanan}>
              <td>{item.id_pemesanan}</td>
              <td>{item.nama}</td>
              <td>{item.unit}</td>
              <td>{currency(item.total_bayar)}</td>
              <td>{item.kegiatan}</td>
              <td>{item.lokasikegiatan}</td>
              <td>{returnUnit(item.ambil_tgl)}</td>
              <td>{item.ambil_jam}</td>
              <td>{returnUnit(item.kembali_tgl)}</td>
              <td>{item.kembali_jam}</td>
              <td>{item.catatan}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      {data.length > itemsPerPage && (
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
    </>
  );
}

export default CodeCustomer;