import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Calendar, CheckCircle, Clock, XCircle, TrendingUp, Users, FileText, Image, ArrowRight, AlertTriangle } from 'lucide-react'

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <p className="text-3xl font-bold text-white mb-1">{value ?? '—'}</p>
    <p className="text-gray-400 text-sm">{label}</p>
    {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
  </div>
)

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentAppts, setRecentAppts] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    Promise.all([
      api.get('/appointments/stats'),
      api.get('/appointments?limit=5&status=pending'),
    ]).then(([statsRes, apptRes]) => {
      setStats(statsRes.data)
      setRecentAppts(apptRes.data)
    }).catch(() => setApiError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" />
    </div>
  )

  if (apiError) return (
    <div className="bg-gray-900 border border-amber-400/20 rounded-2xl p-8 text-center">
      <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
      <h2 className="text-white text-lg font-semibold mb-2">API Not Connected</h2>
      <p className="text-gray-400 text-sm">Start the backend server to see live data. The website is running in static mode.</p>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Appointments" value={stats?.total} icon={Calendar} color="bg-blue-500/10 text-blue-400" sub={`${stats?.thisMonth} this month`} />
        <StatCard label="Pending" value={stats?.pending} icon={Clock} color="bg-amber-400/10 text-amber-400" />
        <StatCard label="Confirmed" value={stats?.confirmed} icon={CheckCircle} color="bg-green-400/10 text-green-400" />
        <StatCard label="Completed" value={stats?.completed} icon={TrendingUp} color="bg-purple-400/10 text-purple-400" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Manage Appointments', href: '/ov-admin/appointments', icon: Calendar, desc: 'View, confirm, and manage all client appointments' },
          { label: 'Edit Blog Posts', href: '/ov-admin/blog', icon: FileText, desc: 'Create and manage blog content' },
          { label: 'Site Settings', href: '/ov-admin/site-settings', icon: Image, desc: 'Colors, fonts, logo, navbar, footer' },
        ].map(item => (
          <Link key={item.href} to={item.href} className="bg-gray-900 border border-gray-800 hover:border-amber-400/30 rounded-2xl p-6 group transition-all">
            <item.icon className="w-6 h-6 text-amber-400 mb-3" />
            <h3 className="text-white font-semibold mb-1 group-hover:text-amber-400 transition-colors">{item.label}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all mt-3" />
          </Link>
        ))}
      </div>

      {/* Recent Pending Appointments */}
      {recentAppts.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-white font-semibold">Pending Appointments</h2>
            <Link to="/ov-admin/appointments" className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {recentAppts.map(appt => (
              <Link key={appt._id} to={`/ov-admin/appointments/${appt._id}`} className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div>
                  <p className="text-white text-sm font-medium">{appt.clientName}</p>
                  <p className="text-gray-500 text-xs">{appt.service} · {appt.clientEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 text-sm">{new Date(appt.preferredDate).toLocaleDateString()}</p>
                  <p className="text-gray-500 text-xs">{appt.preferredTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
