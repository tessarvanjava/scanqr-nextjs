'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function App() {
  const [idPelanggan, setIdPelanggan] = useState('')
  const [idPemesanan, setIdPemesanan] = useState('')
  const [kegiatan,setKegiatan] = useState('')
  const [statusbayar,setStatusBayar] = useState('')
  const [totalBayar,setTotalBayar] = useState('')
  const [ambilTgl,setAmbilTgl] = useState('')
  const [ambiljam,setAmbilJam] = useState('')
  const [kembaliTgl,setKembaliTgl] = useState('')
  const [kembaliJam,setKembaliJam] = useState('')
  const [unit, setUnit] = useState('')

  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.15:4000/api/pemesanan/cari/idpemesanan/4108", { withCredentials: true })
        setIdPelanggan(response.data.result.data[0].id_pelanggan)
        setIdPemesanan(response.data.result.data[0].id_pemesanan)
        setKegiatan(response.data.result.data[0].kegiatan)
        setStatusBayar(response.data.result.data[0].status_bayar) 
        setTotalBayar(response.data.result.data[0].total_bayar)
        setAmbilTgl(response.data.result.data[0].ambil_tgl)
        setAmbilJam(response.data.result.data[0].ambil_jam)
        setKembaliTgl(response.data.result.data[0].kembali_tgl)
        setKembaliJam(response.data.result.data[0].kembali_jam)
        setUnit(response.data.result.data[0].unit)
        // console.log(response.data.result.data[0])
      } catch (error) {
        console.error(error)
      }
    }

    axios.get(`${process.env.api}/api/get-cookie`, {
      withCredentials: true
    }).then((res) => {
      if (res.data.username) {
        console.log('Welcome to Webpage Rental Barata Jaya')
      } else {
        router.push('/login')
      }
    }).catch(() => router.push('/login'))


    fetchData()
  }, [])

  return (
    <>
      <h1>Invoice</h1>
      <p>Invoice Page</p>
      <ul>
        <li>ID Pelanggan : {idPelanggan}</li>
        <li>ID Pemesanan : {idPemesanan}</li>
        <li>Kegiatan : {kegiatan}</li>
        <li>Status Bayar : {statusbayar}</li>
        <li>Total Bayar : {totalBayar}</li>
        <li>Tanggal Ambil : {ambilTgl}</li>
        <li>Jam Ambil : {ambiljam}</li>
        <li>Tanggal Kembali : {kembaliTgl}</li>
        <li>Jam Kembali : {kembaliJam}</li>
        <li>Unit : {unit}</li>
      </ul>
    </>
  )
}