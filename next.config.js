module.exports = {
  env: {
    bookingorder: 'http://192.168.0.15:3000',
    host: 'http://192.168.0.15:3001',
    api: 'http://192.168.0.15:4000',
    token:'317d33e8e25e92a1f7765cc53e5d8eb2835a0d105af2c958eed0140b9eadd74a2b94516d720a07689f4a4cd4b31ff39987f0b0b4aaf388d6c37892237c9411d7',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/scan',
        permanent: true
      }
    ]
  }
} 