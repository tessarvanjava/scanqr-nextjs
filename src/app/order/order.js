'use client'

import { Button, Container, Table, Form, Alert } from 'react-bootstrap'
import Head from 'next/head'
import useSWR, { mutate, useSWRConfig } from 'swr'
import moment from 'moment'
import 'moment/locale/id'
import Loading from './loading.js'
import axios from 'axios'
import token from './token.js'
import Link from 'next/link.js'

const fetcher = (url) => axios.get(url, { headers: { sign: token } }).then((res) => res.data.data)

function AlertDelete() {
  return (
    <Alert variant="warning">
      Delete Success id
    </Alert>
  )
}

function TableOrder() {
  const url = `${process.env.api}/api/pemesanan/show/1/30`
  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: true
  })

  if (error) return <Alert variant="danger">Gagal memuat data</Alert>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Order</h1>
      <Button size='lg' type='submit' onClick={() => mutate(`${process.env.api}/api/pemesanan/show/1/30`)}>Refresh Data</Button><br />
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Order</th>
            <th>ID Customer</th>
            <th>Nama</th>
            <th>S.Bayar</th>
            <th>Unit</th>
            <th>a.tgl</th>
            <th>a.jam</th>
            <th>k.tgl</th>
            <th>k.jam</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            <tr key={item.id_pemesanan}>
              <td>{item.id_pemesanan}</td>
              <td>{item.id_pelanggan}</td>
              <td>{item.nama}</td>
              <td>{item.status_bayar}</td>
              <td><a style={{ color: 'black' }} href={`/scan?idorder=${item.id_pemesanan}&idcustomer=${item.id_pelanggan}`}>{item.unit}</a></td>
              <td>{moment(item.ambil_tgl).format("dddd, LL")}</td>
              <td>{item.ambil_jam}</td>
              <td>{moment(item.kembali_tgl).format("dddd, LL")}</td>
              <td>{item.kembali_jam}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default TableOrder
