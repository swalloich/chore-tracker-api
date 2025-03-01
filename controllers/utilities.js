const bcrypt = require('bcrypt')

/**
 * Hash a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Check if a decoded jwt token is expired
 * @param {Object} decodedToken - The decoded JWT token
 * @param {number} decodedToken.exp - The expiration time of the token
 * @param {number} decodedToken.iat - The time the token was issued
 * @returns {boolean} - Whether the token is expired
 */
function tokenIsExpired(decodedToken) {
  return decodedToken.exp < Date.now() / 1000
}

module.exports = { hashPassword, tokenIsExpired }