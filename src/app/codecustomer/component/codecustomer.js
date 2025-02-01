'use client'

import { Button, Container, Table, Form, Alert } from 'react-bootstrap'
import useSWR, { mutate, useSWRConfig } from 'swr'
import moment, { locale } from 'moment'
import 'moment/locale/id'
import Loading from '../../scan/module/loading.js'
import token from '../../scan/module/token.js'
import axios from 'axios'
import { useSearchParams } from 'next/navigation.js'
import defaultCurrency from 'currency-formatter'

const fetcher = (url) => axios.get(url, { headers: { sign: token } }).then((res) => res.data.data)

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

function currency(value) {
  return defaultCurrency.format(value, { locale: 'id-ID'})
}

function CodeCustomer() {


  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const url = `${process.env.api}/api/order/${id}`
  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: true
  })

  if (error) return <Alert variant="danger">Gagal memuat data</Alert>
  if (!data) return <h1><center>Waiting Data</center></h1>

  return (
    <>
      <h1>Code Customer</h1>
      <Button size='lg' type='submit' onClick={() => mutate()}>Refresh Data</Button><br />
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Order</th>
            <th>Nama</th>
            <th>Unit</th>
            <th>Total</th>
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
              <td>{item.nama}</td>
              <td>{item.unit}</td>
              <td>{currency(item.total_bayar)}</td>
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

export default CodeCustomer