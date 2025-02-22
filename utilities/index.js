function getCurrentUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://fantastic-parakeet-ogz0.onrender.com'
  } else {
    return 'http://localhost:8080'
  }
}

module.exports = {
  getCurrentUrl,
}