import Appointment from '../models/Appointment.model.js'
import nodemailer from 'nodemailer'
import Joi from 'joi'

// Fix #17 — create transporter once at module level, not per request
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Omnivision Design" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}

// Fix #5 — escape HTML entities so user input can't inject HTML into admin emails
const escapeHtml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

// Fix #4 — Joi schema for public appointment endpoint
const appointmentSchema = Joi.object({
  clientName: Joi.string().trim().min(2).max(100).required(),
  clientEmail: Joi.string().trim().email().required(),
  clientPhone: Joi.string().trim().max(30).allow('', null),
  service: Joi.string().trim().max(100).required(),
  preferredDate: Joi.date().iso().required(),
  preferredTime: Joi.string().trim().max(50).required(),
  notes: Joi.string().trim().max(2000).allow('', null),
  company: Joi.string().trim().max(100).allow('', null),
})

export const createAppointment = async (req, res) => {
  // Validate input — only allow known, typed fields
  const { error, value } = appointmentSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map((d) => d.message),
    })
  }

  try {
    const appt = await Appointment.create({ ...value, ipAddress: req.ip })

    // Fix #5 — escape all user-supplied values before putting them in email HTML
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Appointment: ${escapeHtml(appt.clientName)}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Client:</strong> ${escapeHtml(appt.clientName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(appt.clientEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(appt.clientPhone)}</p>
        <p><strong>Service:</strong> ${escapeHtml(appt.service)}</p>
        <p><strong>Date:</strong> ${new Date(appt.preferredDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${escapeHtml(appt.preferredTime)}</p>
        <p><strong>Notes:</strong> ${escapeHtml(appt.notes)}</p>
      `,
    }).catch(() => {})

    await sendEmail({
      to: appt.clientEmail,
      subject: 'Appointment Request Received — Omnivision Design',
      html: `
        <h2>Hello ${escapeHtml(appt.clientName)},</h2>
        <p>We received your appointment request for <strong>${escapeHtml(appt.service)}</strong> on <strong>${new Date(appt.preferredDate).toLocaleDateString()}</strong>.</p>
        <p>Our team will confirm your appointment within 24 hours.</p>
        <p>Thank you for choosing Omnivision Design!</p>
      `,
    }).catch(() => {})

    res.status(201).json({ success: true, data: appt, message: 'Appointment booked successfully' })
  } catch (err) {
    // Fix #14 — never leak internal error details to the client
    console.error('createAppointment error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again.' })
  }
}

export const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search, dateFrom, dateTo } = req.query
    const query = {}
    if (status) query.status = status
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { clientEmail: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ]
    }
    if (dateFrom || dateTo) {
      query.preferredDate = {}
      if (dateFrom) query.preferredDate.$gte = new Date(dateFrom)
      if (dateTo) query.preferredDate.$lte = new Date(dateTo)
    }

    const total = await Appointment.countDocuments(query)
    const appointments = await Appointment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      success: true,
      data: appointments,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
    })
  } catch (err) {
    console.error('getAppointments error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' })
    res.json({ success: true, data: appt })
  } catch (err) {
    console.error('getAppointment error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, adminNotes, cancelReason } = req.body
    const appt = await Appointment.findById(req.params.id)
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' })

    appt.status = status
    if (adminNotes) appt.adminNotes = adminNotes
    if (status === 'confirmed') appt.confirmedAt = new Date()
    if (status === 'cancelled') {
      appt.cancelledAt = new Date()
      appt.cancelReason = cancelReason || ''
    }
    await appt.save()

    const statusMessages = {
      confirmed: `Your appointment on ${new Date(appt.preferredDate).toLocaleDateString()} has been confirmed!`,
      cancelled: `Your appointment has been cancelled.${cancelReason ? ' Reason: ' + escapeHtml(cancelReason) : ''}`,
      completed: 'Thank you for meeting with us! We hope we can work together.',
    }
    if (statusMessages[status]) {
      await sendEmail({
        to: appt.clientEmail,
        subject: `Appointment ${status} — Omnivision Design`,
        html: `<h2>Hello ${escapeHtml(appt.clientName)},</h2><p>${statusMessages[status]}</p>`,
      }).catch(() => {})
    }

    res.json({ success: true, data: appt, message: `Appointment ${status}` })
  } catch (err) {
    console.error('updateAppointmentStatus error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Appointment deleted' })
  } catch (err) {
    console.error('deleteAppointment error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const getAppointmentStats = async (req, res) => {
  try {
    const [total, pending, confirmed, completed, cancelled] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
    ])

    const thisMonth = await Appointment.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) },
    })

    const byService = await Appointment.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({ success: true, data: { total, pending, confirmed, completed, cancelled, thisMonth, byService } })
  } catch (err) {
    console.error('getAppointmentStats error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
                                 }
