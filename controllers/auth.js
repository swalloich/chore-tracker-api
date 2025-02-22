function isAuthenticated(res) {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
}

module.exports = {
  isAuthenticated,
}