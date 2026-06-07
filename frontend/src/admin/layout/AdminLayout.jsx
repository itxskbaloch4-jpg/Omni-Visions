import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import {
  LayoutDashboard, Calendar, Settings, Palette, Navigation,
  FileText, Image, Globe, User, LogOut, Menu, X,
  ChevronDown, ChevronRight, Layers
} from 'lucide-react'

const navGroups = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/ov-admin', icon: LayoutDashboard, exact: true },
      { label: 'Appointments', href: '/ov-admin/appointments', icon: Calendar },
    ]
  },
  {
    label: 'Content',
    items: [
      { label: 'Blog Posts', href: '/ov-admin/blog', icon: FileText },
      { label: 'Media Library', href: '/ov-admin/media', icon: Image },
      { label: 'Pages', href: '/ov-admin/pages', icon: Layers },
    ]
  },
  {
    label: 'Design & Settings',
    items: [
      { label: 'Site Settings', href: '/ov-admin/site-settings', icon: Settings },
      { label: 'Color Palette', href: '/ov-admin/site-settings/colors', icon: Palette },
      { label: 'Navbar Editor', href: '/ov-admin/site-settings/navbar', icon: Navigation },
      { label: 'Footer Editor', href: '/ov-admin/site-settings/footer', icon: Globe },
    ]
  },
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { admin, logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (href, exact = false) => {
    if (exact) return location.pathname === href
    return location.pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    navigate('/ov-admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex font-sans">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">OV</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Admin Panel</p>
                <p className="text-gray-500 text-xs">Omnivision Design</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
          {navGroups.map(group => (
            <div key={group.label}>
              {sidebarOpen && (
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map(item => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                          active
                            ? 'bg-amber-400/15 text-amber-400 border border-amber-400/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                        title={!sidebarOpen ? item.label : ''}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-800">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-semibold text-sm">{admin?.name?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{admin?.name}</p>
                <p className="text-gray-500 text-xs truncate">{admin?.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <Link to="/ov-admin/profile" className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                  <User className="w-4 h-4" />
                </Link>
                <button onClick={handleLogout} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <nav className="text-sm text-gray-400">
              <span className="text-gray-500">Admin</span>
              <ChevronRight className="w-3 h-3 inline mx-1" />
              <span className="text-white">{location.pathname.split('/').filter(Boolean).slice(1).join(' / ') || 'Dashboard'}</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
