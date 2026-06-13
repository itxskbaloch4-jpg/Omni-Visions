import express from 'express'
import Appointment from '../models/Appointment.model.js'
import nodemailer from 'nodemailer'
import Joi from 'joi'

const router = express.Router()

const contactSchema = Joi.object({
  clientName: Joi.string().trim().min(2).max(100).required(),
  clientEmail: Joi.string().trim().email().required(),
  clientPhone: Joi.string().trim().max(30).allow('', null),
  service: Joi.string().trim().max(100).allow('', null),
  notes: Joi.string().trim().max(2000).required(),
  preferredDate: Joi.date().iso().allow('', null),
  preferredTime: Joi.string().trim().max(50).allow('', null),
})

const escapeHtml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

router.post('/', async (req, res) => {
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  })
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    })
  }

  try {
    // Save as appointment with source=contact
    await Appointment.create({
      clientName: value.clientName,
      clientEmail: value.clientEmail,
      clientPhone: value.clientPhone || '',
      service: value.service || 'consultation',
      preferredDate: value.preferredDate || new Date(),
      preferredTime: value.preferredTime || 'Flexible',
      notes: value.notes,
      source: 'contact-form',
      ipAddress: req.ip,
    })

    // Notify admin
    await transporter.sendMail({
      from: `"Omnivision Design" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form: ${escapeHtml(value.clientName)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(value.clientName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(value.clientEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(value.clientPhone || 'Not provided')}</p>
        <p><strong>Service:</strong> ${escapeHtml(value.service || 'Not specified')}</p>
        <p><strong>Message:</strong> ${escapeHtml(value.notes)}</p>
      `,
    }).catch(() => {}) // don't fail request if email fails

    res.status(201).json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    console.error('contact form error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
})

export default router
