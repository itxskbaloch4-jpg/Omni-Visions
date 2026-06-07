import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Search, Filter, Calendar, ChevronRight, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react'

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-amber-400/10 text-amber-400 border-amber-400/20' },
  confirmed: { label: 'Confirmed', color: 'bg-green-400/10 text-green-400 border-green-400/20' },
  cancelled: { label: 'Cancelled', color: 'bg-red-400/10 text-red-400 border-red-400/20' },
  completed: { label: 'Completed', color: 'bg-blue-400/10 text-blue-400 border-blue-400/20' },
  'no-show': { label: 'No Show', color: 'bg-gray-400/10 text-gray-400 border-gray-400/20' },
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pagination, setPagination] = useState({ total: 0, pages: 1, page: 1 })

  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ page, limit: 20 })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      const res = await api.get(`/appointments?${params}`)
      setAppointments(res.data)
      setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAppointments() }, [search, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <p className="text-gray-400 mt-1">{pagination.total} total appointments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm"
        >
          <option value="">All Statuses</option>
          {Object.entries(STATUS_CONFIG).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No appointments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Client', 'Service', 'Date & Time', 'Status', 'Action'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {appointments.map(appt => {
                  const status = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending
                  return (
                    <tr key={appt._id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium">{appt.clientName}</p>
                        <p className="text-gray-500 text-xs">{appt.clientEmail}</p>
                        {appt.company && <p className="text-gray-600 text-xs">{appt.company}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm capitalize">{appt.service?.replace(/-/g, ' ')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">{new Date(appt.preferredDate).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-xs">{appt.preferredTime}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/ov-admin/appointments/${appt._id}`} className="flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm transition-colors">
                          View <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => fetchAppointments(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                pagination.page === page
                  ? 'bg-amber-400 text-gray-900'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
