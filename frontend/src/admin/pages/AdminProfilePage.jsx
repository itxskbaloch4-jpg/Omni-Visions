import { useState } from 'react'
import api from '../../services/api'
import { useAdminAuth } from '../context/AdminAuthContext'
import { Save, User, Lock, AlertCircle } from 'lucide-react'

export default function AdminProfilePage() {
  const { admin } = useAdminAuth()
  const [profileForm, setProfileForm] = useState({ name: admin?.name || '', email: admin?.email || '' })
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [profileMsg, setProfileMsg] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const [savingPass, setSavingPass] = useState(false)

  const saveProfile = async () => {
    setSaving(true)
    try {
      await api.put('/auth/profile', profileForm)
      setProfileMsg('Profile updated!')
      setTimeout(() => setProfileMsg(''), 3000)
    } catch (err) { setProfileMsg(err.message) }
    finally { setSaving(false) }
  }

  const savePassword = async () => {
    if (passForm.newPassword !== passForm.confirm) {
      setPassMsg('Passwords do not match')
      return
    }
    if (passForm.newPassword.length < 8) {
      setPassMsg('Password must be at least 8 characters')
      return
    }
    setSavingPass(true)
    try {
      await api.put('/auth/change-password', { currentPassword: passForm.currentPassword, newPassword: passForm.newPassword })
      setPassMsg('Password changed!')
      setPassForm({ currentPassword: '', newPassword: '', confirm: '' })
      setTimeout(() => setPassMsg(''), 3000)
    } catch (err) { setPassMsg(err.message) }
    finally { setSavingPass(false) }
  }

  const Field = ({ label, name, type = 'text', form, setForm }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input type={type} value={form[name] || ''} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm" />
    </div>
  )

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-gray-400 mt-1">Manage your admin account</p>
      </div>

      {/* Profile */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-amber-400" />
          <h2 className="text-white font-semibold">Profile Information</h2>
        </div>
        {profileMsg && (
          <div className={`p-3 rounded-xl text-sm ${profileMsg.includes('!') ? 'bg-green-400/10 border border-green-400/20 text-green-400' : 'bg-red-400/10 border border-red-400/20 text-red-400'}`}>
            {profileMsg}
          </div>
        )}
        <Field label="Full Name" name="name" form={profileForm} setForm={setProfileForm} />
        <Field label="Email Address" name="email" type="email" form={profileForm} setForm={setProfileForm} />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
            <span className="text-amber-400 font-bold">{admin?.name?.[0]?.toUpperCase()}</span>
          </div>
          <div>
            <p className="text-white text-sm">{admin?.name}</p>
            <p className="text-gray-500 text-xs capitalize">{admin?.role} · Last login: {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        <button onClick={saveProfile} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      {/* Password */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-amber-400" />
          <h2 className="text-white font-semibold">Change Password</h2>
        </div>
        {passMsg && (
          <div className={`p-3 rounded-xl text-sm ${passMsg.includes('!') ? 'bg-green-400/10 border border-green-400/20 text-green-400' : 'bg-red-400/10 border border-red-400/20 text-red-400'}`}>
            {passMsg}
          </div>
        )}
        <Field label="Current Password" name="currentPassword" type="password" form={passForm} setForm={setPassForm} />
        <Field label="New Password" name="newPassword" type="password" form={passForm} setForm={setPassForm} />
        <Field label="Confirm New Password" name="confirm" type="password" form={passForm} setForm={setPassForm} />
        <button onClick={savePassword} disabled={savingPass}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Lock className="w-4 h-4" />{savingPass ? 'Saving...' : 'Change Password'}
        </button>
      </div>
    </div>
  )
}
