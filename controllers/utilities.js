const bcrypt = require('bcrypt')

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

function tokenIsExpired(token) {
  const decoded = jwt.decode(token)
  return decoded.exp < Date.now() / 1000
}

module.exports = { hashPassword, tokenIsExpired }