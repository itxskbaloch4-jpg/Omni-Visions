import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.model.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : null

    if (!token) return res.status(401).json({ success: false, message: 'Not authorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = await Admin.findById(decoded.id).select('-password')

    if (!req.admin) return res.status(401).json({ success: false, message: 'Admin not found' })
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalid' })
  }
}

export const superAdmin = (req, res, next) => {
  if (req.admin?.role !== 'superadmin') {
    return res.status(403).json({ success: false, message: 'Super admin access required' })
  }
  next()
}
