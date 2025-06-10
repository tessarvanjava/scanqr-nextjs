'use client'

import { Button, Container, Table, Form, Alert } from 'react-bootstrap'
import Head from 'next/head'
import useSWR, { mutate, useSWRConfig } from 'swr'
import moment from 'moment'
import 'moment/locale/id'
import Loading from '../module/loading.js'
import axios from 'axios'
import token from '../module/token.js'

const fetcher = (url) => axios.get(url, { headers: { sign: token } }).then((res) => res.data.data)

const returnUnitStyle = {
  color: 'Blue',
  fontWeight: 'Bold',
  fontSize: '20px'
}

const returnUnit = (a) => {
  let CurrentDate = moment().format('YYYY-MM-DD');
  if (a === CurrentDate) {
    return (
      <span style={returnUnitStyle}>{moment(a).format("dddd, LL")}</span>
    )
  } else {
    return (
      <span>{moment(a).format("dddd, LL")}</span>
    )
  }
}

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
      <Button size='md' type='submit' onClick={() => mutate(`${process.env.api}/api/pemesanan/show/1/30`)}>Refresh Data</Button><br />
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
              <td><a target='blank' href={`${process.env.bookingorder}/pemesanan/single/${item.id_pemesanan}`}>
                {item.id_pemesanan}
              </a>
              </td>
              <td>
                <a target='blank' href={`${process.env.bookingorder}/pelanggan/single/${item.id_pelanggan}`}>
                  {item.id_pelanggan}
                </a>
              </td>
              <td>{item.nama}</td>
              <td>{item.status_bayar}</td>
              <td><a style={{ color: 'black' }} href={`/scan?idorder=${item.id_pemesanan}&idcustomer=${item.id_pelanggan}`}>{item.unit}</a></td>
              <td>{returnUnit(item.ambil_tgl)}</td>
              <td>{item.ambil_jam}</td>
              <td>{returnUnit(item.kembali_tgl)}</td>
              <td>{item.kembali_jam}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default TableOrder
