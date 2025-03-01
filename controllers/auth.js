const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const NodeCache = require('node-cache')

const db = require('../db')
const { tokenIsExpired } = require('./utilities')

const tokenCache = new NodeCache()
const collection = 'users'

async function login(req, res) {
  /* #swagger.parameters['login'] = {
          in: 'body',
          description: 'User login credentials',
          required: true,
          schema: {
              $ref: "#/definitions/Login"
          }
      }
  */
  const { email, password } = req.body

  try {
    const user = await db.findOne({ collection, query: { email } })
    if (!user) return res.status(401).json({ message: 'Invalid email and/or password' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid email and/or password' })

    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET, { expiresIn: '1d' })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

async function logout(req, res) {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(400).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    const expiresIn = decoded.exp = Math.floor(Date.now() / 1000)

    tokenCache.set(`blacklist:${token}`, 'blacklist', expiresIn)
    res.clearCookie('token', { httpOnly: true })
    res.json({ message: 'Logged out' })
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

function isAuthenticated(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const isBlacklisted = tokenCache.get(`blacklist:${token}`)
    if (isBlacklisted) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.AUTH_SECRET)

    if (tokenIsExpired(decoded)) {
      tokenCache.set(`blacklist:${token}`, 'blacklist', decoded.exp)
      return res.status(401).json({ message: 'Token expired' })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { isAuthenticated, login, logout }