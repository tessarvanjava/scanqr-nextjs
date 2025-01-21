module.exports = {
  env: {
    host: 'http://192.168.0.15',
    api: 'http://192.168.0.15:4000'
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