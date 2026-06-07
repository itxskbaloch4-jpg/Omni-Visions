import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { ArrowLeft, CheckCircle, XCircle, Clock, User, Mail, Phone, Building, Calendar, MessageSquare, Save } from 'lucide-react'

export default function AppointmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appt, setAppt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [cancelReason, setCancelReason] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/appointments/${id}`)
      .then(res => { setAppt(res.data); setAdminNotes(res.data.adminNotes || '') })
      .catch(() => navigate('/ov-admin/appointments'))
      .finally(() => setLoading(false))
  }, [id])

  const updateStatus = async (status) => {
    setSaving(true)
    try {
      const res = await api.put(`/appointments/${id}/status`, { status, adminNotes, cancelReason })
      setAppt(res.data)
      setMessage(`Appointment ${status} successfully`)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>
  if (!appt) return null

  const statusColors = {
    pending: 'text-amber-400', confirmed: 'text-green-400',
    cancelled: 'text-red-400', completed: 'text-blue-400',
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/ov-admin/appointments" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Appointment Details</h1>
          <p className={`text-sm font-medium mt-0.5 capitalize ${statusColors[appt.status] || 'text-gray-400'}`}>
            Status: {appt.status}
          </p>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">
          {message}
        </div>
      )}

      {/* Client Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Client Information</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: User, label: 'Name', value: appt.clientName },
            { icon: Mail, label: 'Email', value: appt.clientEmail },
            { icon: Phone, label: 'Phone', value: appt.clientPhone || '—' },
            { icon: Building, label: 'Company', value: appt.company || '—' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="text-white text-sm">{value}</p>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Appointment Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Appointment Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Calendar, label: 'Service', value: appt.service?.replace(/-/g, ' ') },
            { icon: Calendar, label: 'Date', value: new Date(appt.preferredDate).toLocaleDateString() },
            { icon: Clock, label: 'Time', value: appt.preferredTime },
            { icon: Clock, label: 'Duration', value: `${appt.duration} minutes` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="text-white text-sm capitalize">{value}</p>
              </div>
            </div>
          ))}
        </dl>
        {appt.notes && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Client Notes</p>
            <p className="text-gray-300 text-sm">{appt.notes}</p>
          </div>
        )}
      </div>

      {/* Admin Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Admin Actions</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none"
              placeholder="Internal notes visible only to admins..."
            />
          </div>

          {appt.status !== 'cancelled' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cancel Reason (if cancelling)</label>
              <input
                type="text"
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm"
                placeholder="Reason for cancellation..."
              />
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {appt.status === 'pending' && (
              <button onClick={() => updateStatus('confirmed')} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                <CheckCircle className="w-4 h-4" /> Confirm
              </button>
            )}
            {(appt.status === 'pending' || appt.status === 'confirmed') && (
              <button onClick={() => updateStatus('completed')} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                <CheckCircle className="w-4 h-4" /> Mark Completed
              </button>
            )}
            {appt.status !== 'cancelled' && (
              <button onClick={() => updateStatus('cancelled')} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
                <XCircle className="w-4 h-4" /> Cancel
              </button>
            )}
            <button onClick={() => updateStatus(appt.status)} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 hover:bg-amber-400/20 rounded-xl text-sm font-medium transition-colors disabled:opacity-60">
              <Save className="w-4 h-4" /> Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
