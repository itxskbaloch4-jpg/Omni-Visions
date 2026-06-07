import Appointment from '../models/Appointment.model.js'
import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  await transporter.sendMail({ from: `"Omnivision Design" <${process.env.SMTP_USER}>`, to, subject, html })
}

export const createAppointment = async (req, res) => {
  try {
    const appt = await Appointment.create({
      ...req.body,
      ipAddress: req.ip,
    })

    // Notify admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Appointment: ${appt.clientName}`,
      html: `<h2>New Appointment Request</h2>
             <p><strong>Client:</strong> ${appt.clientName}</p>
             <p><strong>Email:</strong> ${appt.clientEmail}</p>
             <p><strong>Phone:</strong> ${appt.clientPhone}</p>
             <p><strong>Service:</strong> ${appt.service}</p>
             <p><strong>Date:</strong> ${new Date(appt.preferredDate).toLocaleDateString()}</p>
             <p><strong>Time:</strong> ${appt.preferredTime}</p>
             <p><strong>Notes:</strong> ${appt.notes}</p>`
    }).catch(() => {}) // Don't fail if email fails

    // Confirm to client
    await sendEmail({
      to: appt.clientEmail,
      subject: 'Appointment Request Received — Omnivision Design',
      html: `<h2>Hello ${appt.clientName},</h2>
             <p>We received your appointment request for <strong>${appt.service}</strong> on <strong>${new Date(appt.preferredDate).toLocaleDateString()}</strong>.</p>
             <p>Our team will confirm your appointment within 24 hours.</p>
             <p>Thank you for choosing Omnivision Design!</p>`
    }).catch(() => {})

    res.status(201).json({ success: true, data: appt, message: 'Appointment booked successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id)
    if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' })
    res.json({ success: true, data: appt })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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

    // Notify client of status change
    const statusMessages = {
      confirmed: `Your appointment on ${new Date(appt.preferredDate).toLocaleDateString()} has been confirmed!`,
      cancelled: `Your appointment has been cancelled. ${cancelReason ? 'Reason: ' + cancelReason : ''}`,
      completed: 'Thank you for meeting with us! We hope we can work together.',
    }
    if (statusMessages[status]) {
      await sendEmail({
        to: appt.clientEmail,
        subject: `Appointment ${status} — Omnivision Design`,
        html: `<h2>Hello ${appt.clientName},</h2><p>${statusMessages[status]}</p>`
      }).catch(() => {})
    }

    res.json({ success: true, data: appt, message: `Appointment ${status}` })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Appointment deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
      createdAt: { $gte: new Date(new Date().setDate(1)) }
    })

    const byService = await Appointment.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    res.json({ success: true, data: { total, pending, confirmed, completed, cancelled, thisMonth, byService } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
