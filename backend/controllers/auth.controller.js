import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.model.js'

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export const createFirstAdmin = async (req, res) => {
  try {
    const count = await Admin.countDocuments()
    if (count > 0) {
      return res.status(403).json({ success: false, message: 'Admin already exists. Use login.' })
    }
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password required' })
    }
    const admin = await Admin.create({ name, email, password, role: 'superadmin' })
    const token = signToken(admin._id)
    res.status(201).json({ success: true, token, data: admin })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const admin = await Admin.findOne({ email }).select('+password')
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    admin.lastLogin = new Date()
    await admin.save({ validateBeforeSave: false })
    const token = signToken(admin._id)
    res.json({ success: true, token, data: admin })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getMe = async (req, res) => {
  res.json({ success: true, data: req.admin })
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body
    const admin = await Admin.findByIdAndUpdate(req.admin._id, { name, email, avatar }, { new: true, runValidators: true })
    res.json({ success: true, data: admin })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const admin = await Admin.findById(req.admin._id).select('+password')
    if (!await admin.comparePassword(currentPassword)) {
      return res.status(400).json({ success: false, message: 'Current password incorrect' })
    }
    admin.password = newPassword
    await admin.save()
    res.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
