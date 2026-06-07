import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import AppointmentsPage from './pages/AppointmentsPage'
import AppointmentDetail from './pages/AppointmentDetail'
import SiteSettingsPage from './pages/SiteSettingsPage'
import ColorPalettePage from './pages/ColorPalettePage'
import NavbarEditorPage from './pages/NavbarEditorPage'
import FooterEditorPage from './pages/FooterEditorPage'
import BlogListPage from './pages/BlogListPage'
import BlogEditorPage from './pages/BlogEditorPage'
import MediaLibraryPage from './pages/MediaLibraryPage'
import PagesEditorPage from './pages/PagesEditorPage'
import AdminProfilePage from './pages/AdminProfilePage'

function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth()
  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" />
    </div>
  )
  return admin ? children : <Navigate to="/ov-admin/login" replace />
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="appointments" element={<AppointmentsPage />} />
                <Route path="appointments/:id" element={<AppointmentDetail />} />
                <Route path="site-settings" element={<SiteSettingsPage />} />
                <Route path="site-settings/colors" element={<ColorPalettePage />} />
                <Route path="site-settings/navbar" element={<NavbarEditorPage />} />
                <Route path="site-settings/footer" element={<FooterEditorPage />} />
                <Route path="blog" element={<BlogListPage />} />
                <Route path="blog/new" element={<BlogEditorPage />} />
                <Route path="blog/:id" element={<BlogEditorPage />} />
                <Route path="media" element={<MediaLibraryPage />} />
                <Route path="pages" element={<PagesEditorPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </AdminAuthProvider>
  )
}
