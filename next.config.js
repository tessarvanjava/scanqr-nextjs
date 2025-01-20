module.exports = {
  env: {
    host: 'http://192.168.1.15',
    api: 'http://192.168.1.15:4000'
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