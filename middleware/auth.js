import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization')

  // Check if no token
  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: 'No token, authorization denied' })
  }

  // Verify token
  try {
    const secret = process.env.JWT_SECRET
    const payload = jwt.verify(token, secret)
    req.user = payload.id
    next()
  } catch (err) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'Token is not valid' })
  }
}
